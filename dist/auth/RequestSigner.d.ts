import { ClientAuthentication } from '../CoinbasePro';
export interface RequestSetup {
    httpMethod: string;
    payload: string;
    requestPath: string;
}
export interface SignedRequest {
    key: string;
    passphrase: string;
    signature: string;
    timestamp: number;
}
export declare class RequestSigner {
    static signRequest(auth: ClientAuthentication, setup: RequestSetup, clockSkew: number): SignedRequest;
}
