export enum LanguageCode {
    RU = 'ru',
    EN = 'en',
}

export type Messages = {
    start: (username?: string) => string;
    help: string;
    answers: {
        positive: string[];
        hesitantlyPositive: string[];
        nonCommittal: string[];
        negative: string[];
    };
    info: (info: string, percent: number) => string;
    when: (event: string, date: string) => string;
};

/**
 * Yandex Cloud request structure
 * https://cloud.yandex.ru/docs/functions/concepts/function-invoke#request
 */
export type ICloudEvent = {
    httpMethod?: 'GET' | 'POST' | 'DELETE';
    headers?: Record<string, string>;
    url?: string;
    params?: Record<string, string>;
    multiValueParams?: unknown;
    pathParams?: Record<string, string>;
    multiValueHeaders?: unknown;
    queryStringParameters?: Record<string, string>;
    multiValueQueryStringParameters?: Record<string, string[]>;
    requestContext?: unknown;
    body?: string | null;
    isBase64Encoded?: boolean;
    path?: string;
    messages?: {
        event_metadata: {
            event_id: string;
            event_type: string;
            created_at: string;
            cloud_id: string;
            folder_id: string;
        };
        details: {
            trigger_id: string;
        };
    }[];
};

/**
 * Yandex Cloud service data
 * https://cloud.yandex.ru/docs/functions/concepts/function-invoke#service-data
 */
export type ICloudServiceData = {
    requestId: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: string;
    token: string;
};

/**
 * Yandex Cloud response structure
 * https://cloud.yandex.ru/docs/functions/concepts/function-invoke#request
 */
export type ICloudResponse = {
    statusCode: number;
    headers?: Record<string, string>;
    multiValueHeaders?: Record<string, string[]>;
    body: string;
    isBase64Encoded?: boolean;
};
