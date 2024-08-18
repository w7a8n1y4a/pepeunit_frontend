import Base64 from 'base-64';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function getUserUuidByToken(token: string) {
    return JSON.parse(Base64.decode(token.split('.')[1])).uuid;
};