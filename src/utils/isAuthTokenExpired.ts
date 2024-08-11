import Base64 from 'base-64';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getExpirationDateFromToken = (token: string) => {
    const expirationStringPosition = 5;
    const expirationDatePosition = 2;

    return JSON.parse(Base64.decode(token))
        .body.split('\n')
        [expirationStringPosition].split(' ')[expirationDatePosition];
};

export const isAuthTokenExpired = (token: string) =>
    dayjs(getExpirationDateFromToken(token)).utc().diff(dayjs().utc()) < 0;
