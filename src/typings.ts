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
    info: (percent: number) => string;
};
