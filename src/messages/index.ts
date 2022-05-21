import { LanguageCode, Messages } from '../typings';
import { enMessages } from './en';
import { ruMessages } from './ru';

export function getMessages(code: LanguageCode): Messages {
    switch (code) {
        case LanguageCode.RU:
            return ruMessages;
        case LanguageCode.EN:
        default:
            return enMessages;
    }
}
