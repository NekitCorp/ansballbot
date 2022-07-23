import 'dotenv-flow/config';
import { getEnv } from '../src/utils/helpers';
import { YandexCloudManager } from '../src/utils/yandex-cloud';

const YC_CLOUD_FUNCTION_NAME = getEnv('YC_CLOUD_FUNCTION_NAME');
const YC_CLOUD_ID = getEnv('YC_CLOUD_ID');
const YC_FOLDER_NAME = getEnv('YC_FOLDER_NAME');
const YC_OAUTH_TOKEN = getEnv('YC_OAUTH_TOKEN');
const YC_SERVICE_ACCOUNT_NAME = getEnv('YC_SERVICE_ACCOUNT_NAME');

const manager = new YandexCloudManager(YC_OAUTH_TOKEN);

async function main() {
    console.log(`Trying to find a cloud with an id: ${YC_CLOUD_ID}...`);
    const cloud = await manager.getCloud(YC_CLOUD_ID);
    console.log(`Cloud ${cloud.name} found!`);

    console.log(`Create a folder named: ${YC_FOLDER_NAME}...`);
    const folder = await manager.createFolder(YC_CLOUD_ID, YC_FOLDER_NAME);
    console.log(`Folder ${folder.id} created!`);

    console.log(`Create a service account named: ${YC_SERVICE_ACCOUNT_NAME}...`);
    const sa = await manager.createServiceAccount(folder.id, YC_SERVICE_ACCOUNT_NAME);
    console.log(`Service account ${sa.id} created!`);

    // TODO: set sa role editor

    console.log(`Create a cloud function named: ${YC_CLOUD_FUNCTION_NAME}...`);
    const fun = await manager.createFunction(folder.id, YC_CLOUD_FUNCTION_NAME);
    console.log(`Cloud function ${fun.id} created!`);

    console.log(`Make a cloud function ${fun.id} public...`);
    await manager.makeFunctionPublic(fun.id);
    console.log(`Cloud function ${fun.id} is now public!`);

    console.log('\n===================================================');
    console.log(`Cloud function invoke url: ${fun.httpInvokeUrl}`);
    console.log('===================================================\n');

    console.log('Successful initialization!');
}

main();
