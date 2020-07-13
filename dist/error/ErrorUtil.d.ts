import { AxiosError } from 'axios';
export declare function inAirPlaneMode(error: AxiosError): boolean;
export declare function gotRateLimited(error: AxiosError): boolean;
export declare function getErrorMessage(error: AxiosError): string;
