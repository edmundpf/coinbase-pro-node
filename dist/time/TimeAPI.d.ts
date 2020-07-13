export interface TimeSkew {
    epoch: number;
    iso: string;
}
export declare class TimeAPI {
    static readonly URL: {
        TIME: string;
    };
    static getTime(baseURL: string): Promise<TimeSkew>;
    static getClockSkew(baseURL: string): Promise<number>;
}
