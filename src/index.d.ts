declare module 'log-aggregator' {
    export interface GraylogConfig {
        graylogHost: string;
        graylogPort: number;
        connection?: string;
        maxChunkSizeWan?: number;
    }

    export interface CloudWatchConfig {
        region: string;
        accessKeyId: string;
        secretAccessKey: string;
    }

    export interface LoggingConfig {
        loggingSystem: 'graylog' | 'cloudwatch';
        graylogConfig?: GraylogConfig;
        cloudwatchConfig?: CloudWatchConfig;
    }

    export function initialize(config: LoggingConfig): void;
    export function logMessage(message: string, metadata?: string | any[] | Record<string, any>): void;
}
