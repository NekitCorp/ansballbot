import { cloudApi, serviceClients, Session, waitForOperation } from '@yandex-cloud/nodejs-sdk';
import { Operation } from '@yandex-cloud/nodejs-sdk/dist/generated/yandex/cloud/operation/operation';
import 'dotenv-flow/config';
import { getEnv } from '../src/helpers';

/* -------------------------------------------------------------------------- */
/*                                   Consts                                   */
/* -------------------------------------------------------------------------- */

const YC_CLOUD_FUNCTION_NAME = getEnv('YC_CLOUD_FUNCTION_NAME');
const YC_CLOUD_ID = getEnv('YC_CLOUD_ID');
const YC_FOLDER_NAME = getEnv('YC_FOLDER_NAME');
const YC_OAUTH_TOKEN = getEnv('YC_OAUTH_TOKEN');
const YC_SERVICE_ACCOUNT_NAME = getEnv('YC_SERVICE_ACCOUNT_NAME');

/* -------------------------------------------------------------------------- */
/*                            Yandex Cloud specific                           */
/* -------------------------------------------------------------------------- */

const {
    resourcemanager: {
        folder: { Folder },
        folder_service: { CreateFolderRequest, GetFolderRequest },
        cloud_service: { GetCloudRequest },
    },
    iam: {
        service_account: { ServiceAccount },
        service_account_service: { CreateServiceAccountRequest },
    },
    serverless: {
        functions_function: { Function },
        functions_function_service: { CreateFunctionRequest },
    },
    access: {
        access: { AccessBinding },
        access: { SetAccessBindingsRequest },
    },
} = cloudApi;

// Initialize SDK with your token
const session = new Session({ oauthToken: YC_OAUTH_TOKEN });

// Create services
const folderService = session.client(serviceClients.FolderServiceClient);
const cloudService = session.client(serviceClients.CloudServiceClient);
const serviceAccountService = session.client(serviceClients.ServiceAccountServiceClient);
const functionService = session.client(serviceClients.FunctionServiceClient);

/* -------------------------------------------------------------------------- */
/*                                  Methods                                   */
/* -------------------------------------------------------------------------- */

// `@yandex-cloud/nodejs-sdk` create example:
// https://github.com/yandex-cloud/nodejs-sdk/blob/master/examples/compute-instance-create.ts
async function waitAndDecodeOperation<T>(operation: Operation, decode: (value: Buffer) => T) {
    const finishedOperation = await waitForOperation(operation, session);
    const resource = finishedOperation.response && decode(finishedOperation.response.value);

    if (!resource) {
        console.error(operation);
        console.error(finishedOperation);
        throw new Error(`Failed to decode operation response: ${operation.id}`);
    }

    return resource;
}

/**
 * Creates a folder in the specified cloud.
 * @ref https://cloud.yandex.ru/docs/resource-manager/api-ref/Folder/create
 * @param cloudId Required. ID of the cloud to create a folder in. To get the cloud ID, use a list request.
 * @param name Required. Name of the folder. The name must be unique within the cloud.
 */
async function createFolder(cloudId: string, name: string) {
    const operation = await folderService.create(CreateFolderRequest.fromPartial({ cloudId, name }));
    return await waitAndDecodeOperation(operation, Folder.decode);
}

/**
 * @ref https://cloud.yandex.ru/docs/resource-manager/api-ref/Cloud/get
 * @param cloudId Required. ID of the Cloud resource to return. To get the cloud ID, use a list request.
 * @returns Returns the specified Cloud resource.
 */
async function getCloud(cloudId: string) {
    return await cloudService.get(GetCloudRequest.fromPartial({ cloudId }));
}

/**
 * Creates a service account in the specified folder.
 * @ref https://cloud.yandex.ru/docs/iam/api-ref/ServiceAccount/create
 * @param folderId Required. ID of the folder to create a service account in. To get the folder ID, use a list request.
 * @param name Required. Name of the service account. The name must be unique within the cloud.
 */
async function createServiceAccount(folderId: string, name: string) {
    const operation = await serviceAccountService.create(CreateServiceAccountRequest.fromPartial({ folderId, name }));
    return await waitAndDecodeOperation(operation, ServiceAccount.decode);
}

/**
 * Creates a function in the specified folder.
 * @ref https://cloud.yandex.ru/docs/functions/functions/api-ref/Function/create
 * @param folderId Required. ID of the folder to create a function in.
 * @param name Name of the function. The name must be unique within the folder. Value must match the regular expression `|[a-z][-a-z0-9]{1,61}[a-z0-9]`.
 */
async function createFunction(folderId: string, name: string) {
    const operation = await functionService.create(CreateFunctionRequest.fromPartial({ folderId, name }));
    return await waitAndDecodeOperation(operation, Function.decode);
}

/**
 * Sets access bindings for the function.
 * @ref https://cloud.yandex.ru/docs/functions/operations/function-public#public
 */
async function makeFunctionPublic(functionId: string) {
    const operation = await functionService.setAccessBindings(
        SetAccessBindingsRequest.fromPartial({
            resourceId: functionId,
            accessBindings: [{ roleId: 'serverless.functions.invoker', subject: { id: 'allUsers', type: 'system' } }],
        }),
    );
    return await waitAndDecodeOperation(operation, AccessBinding.decode);
}

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */

async function main() {
    console.log(`Trying to find a cloud with an id: ${YC_CLOUD_ID}...`);
    const cloud = await getCloud(YC_CLOUD_ID);
    console.log(`Cloud ${cloud.name} found!`);

    console.log(`Create a folder named: ${YC_FOLDER_NAME}...`);
    const folder = await createFolder(YC_CLOUD_ID, YC_FOLDER_NAME);
    console.log(`Folder ${folder.id} created!`);

    console.log(`Create a service account named: ${YC_SERVICE_ACCOUNT_NAME}...`);
    const sa = await createServiceAccount(folder.id, YC_SERVICE_ACCOUNT_NAME);
    console.log(`Service account ${sa.id} created!`);

    console.log(`Create a cloud function named: ${YC_CLOUD_FUNCTION_NAME}...`);
    const fun = await createFunction(folder.id, YC_CLOUD_FUNCTION_NAME);
    console.log(`Cloud function ${fun.id} created!`);

    console.log(`Make a cloud function ${fun.id} public...`);
    await makeFunctionPublic(fun.id);
    console.log(`Cloud function ${fun.id} is now public!`);

    console.log('\n===================================================');
    console.log(`Cloud function invoke url: ${fun.httpInvokeUrl}`);
    console.log('===================================================\n');

    console.log('Successful initialization!');
}

main();
