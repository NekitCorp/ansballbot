import {
    cloudApi,
    serviceClients,
    Session,
    waitForOperation,
    WrappedServiceClientType,
} from '@yandex-cloud/nodejs-sdk';
import { Operation } from '@yandex-cloud/nodejs-sdk/dist/generated/yandex/cloud/operation/operation';

const {
    resourcemanager: {
        folder: { Folder },
        folder_service: { CreateFolderRequest, ListFoldersRequest },
        cloud_service: { GetCloudRequest },
    },
    serverless: {
        functions_function: { Function },
        functions_function_service: { CreateFunctionRequest, ListFunctionsRequest },
    },
    access: {
        access: { AccessBinding, SetAccessBindingsRequest },
    },
} = cloudApi;

export class YandexCloudManager {
    private readonly session: Session;

    private readonly folderService: WrappedServiceClientType<typeof serviceClients.FolderServiceClient.service>;
    private readonly cloudService: WrappedServiceClientType<typeof serviceClients.CloudServiceClient.service>;
    private readonly serviceAccountService: WrappedServiceClientType<
        typeof serviceClients.ServiceAccountServiceClient.service
    >;
    private readonly functionService: WrappedServiceClientType<typeof serviceClients.FunctionServiceClient.service>;

    constructor(oauthToken: string) {
        // Initialize SDK with your token
        this.session = new Session({ oauthToken });

        this.folderService = this.session.client(serviceClients.FolderServiceClient);
        this.cloudService = this.session.client(serviceClients.CloudServiceClient);
        this.serviceAccountService = this.session.client(serviceClients.ServiceAccountServiceClient);
        this.functionService = this.session.client(serviceClients.FunctionServiceClient);
    }

    // `@yandex-cloud/nodejs-sdk` create example:
    // https://github.com/yandex-cloud/nodejs-sdk/blob/master/examples/compute-instance-create.ts
    private async waitAndDecodeOperation<T>(operation: Operation, decode: (value: Buffer) => T) {
        const finishedOperation = await waitForOperation(operation, this.session);
        const resource = finishedOperation.response && decode(finishedOperation.response.value);

        if (!resource) {
            console.error(operation);
            console.error(finishedOperation);
            throw new Error(`Failed to decode operation response: ${operation.id}`);
        }

        return resource;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Folder                                   */
    /* -------------------------------------------------------------------------- */

    /**
     * Creates a folder in the specified cloud.
     * @ref https://cloud.yandex.ru/docs/resource-manager/api-ref/Folder/create
     * @param cloudId Required. ID of the cloud to create a folder in.
     * @param name Required. Name of the folder. The name must be unique within the cloud.
     */
    async createFolder(cloudId: string, name: string) {
        const operation = await this.folderService.create(CreateFolderRequest.fromPartial({ cloudId, name }));
        return await this.waitAndDecodeOperation(operation, Folder.decode);
    }

    /**
     * Find folder resource in the specified cloud.
     * @ref https://cloud.yandex.ru/docs/resource-manager/api-ref/Folder/list
     * @param cloudId Required. ID of the cloud to list folders in.
     */
    async findFolderByName(cloudId: string, name: string) {
        const { folders } = await this.folderService.list(
            ListFoldersRequest.fromPartial({ cloudId, filter: `name="${name}"` }),
        );

        if (!folders[0]) {
            console.error(folders);
            throw new Error(`Folder ${name} doesn't found.`);
        }

        return folders[0];
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Cloud                                    */
    /* -------------------------------------------------------------------------- */

    /**
     * @ref https://cloud.yandex.ru/docs/resource-manager/api-ref/Cloud/get
     * @param cloudId Required. ID of the Cloud resource to return.
     * @returns Returns the specified Cloud resource.
     */
    async getCloud(cloudId: string) {
        return await this.cloudService.get(GetCloudRequest.fromPartial({ cloudId }));
    }

    /* -------------------------------------------------------------------------- */
    /*                               Cloud function                               */
    /* -------------------------------------------------------------------------- */

    /**
     * Creates a function in the specified folder.
     * @ref https://cloud.yandex.ru/docs/functions/functions/api-ref/Function/create
     * @param folderId Required. ID of the folder to create a function in.
     * @param name Name of the function. The name must be unique within the folder. Value must match the regular expression `|[a-z][-a-z0-9]{1,61}[a-z0-9]`.
     */
    async createFunction(folderId: string, name: string) {
        const operation = await this.functionService.create(CreateFunctionRequest.fromPartial({ folderId, name }));
        return await this.waitAndDecodeOperation(operation, Function.decode);
    }

    /**
     * Find function in the specified folder.
     * @ref https://cloud.yandex.ru/docs/functions/functions/api-ref/Function/list
     */
    async findFunctionByName(folderId: string, name: string) {
        const { functions } = await this.functionService.list(
            ListFunctionsRequest.fromPartial({ folderId, filter: `name="${name}"` }),
        );

        if (!functions[0]) {
            console.error(functions);
            throw new Error(`Cloud function ${name} doesn't found.`);
        }

        return functions[0];
    }

    /**
     * Sets access bindings for the function.
     * @ref https://cloud.yandex.ru/docs/functions/operations/function-public#public
     */
    async makeFunctionPublic(functionId: string) {
        const operation = await this.functionService.setAccessBindings(
            SetAccessBindingsRequest.fromPartial({
                resourceId: functionId,
                accessBindings: [
                    { roleId: 'serverless.functions.invoker', subject: { id: 'allUsers', type: 'system' } },
                ],
            }),
        );
        return await this.waitAndDecodeOperation(operation, AccessBinding.decode);
    }
}
