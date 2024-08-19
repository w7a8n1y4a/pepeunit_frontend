import Base64 from 'base-64';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const getExpirationDateFromToken = (token: string) => {
    return JSON.parse(Base64.decode(token.split('.')[1])).exp;
};

export const isAuthTokenExpired = (token: string) =>{
    return getExpirationDateFromToken(token) - Math.floor(Date.now()/1000) < 0;
}