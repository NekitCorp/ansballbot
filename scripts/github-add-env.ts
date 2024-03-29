import 'dotenv-flow/config';
import fs from 'fs';
import { getEnv } from '../src/utils/helpers';
import { YandexCloudManager } from '../src/utils/yandex-cloud';

// https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-environment-variable
const GITHUB_ENV = getEnv('GITHUB_ENV');
const YC_CLOUD_FUNCTION_NAME = getEnv('YC_CLOUD_FUNCTION_NAME');
const YC_CLOUD_ID = getEnv('YC_CLOUD_ID');
const YC_FOLDER_NAME = getEnv('YC_FOLDER_NAME');
const YC_OAUTH_TOKEN = getEnv('YC_OAUTH_TOKEN');

const manager = new YandexCloudManager(YC_OAUTH_TOKEN);

async function main() {
    const folder = await manager.findFolderByName(YC_CLOUD_ID, YC_FOLDER_NAME);
    console.log(`Folder ${YC_FOLDER_NAME} id: ${folder.id}`);

    const fun = await manager.findFunctionByName(folder.id, YC_CLOUD_FUNCTION_NAME);
    console.log(`Cloud function ${YC_CLOUD_FUNCTION_NAME} id: ${fun.id}`);

    fs.appendFileSync(GITHUB_ENV, `YC_CLOUD_FUNCTION_ID=${fun.id}\n`);
}

main();
