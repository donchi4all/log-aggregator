const GelfPro = require('gelf-pro');
const AWS = require('aws-sdk');

let loggingClient;

function initializeGraylog(config) {
    const graylogConfig = {
        graylogHost: config.graylogHost,
        graylogPort: config.graylogPort,
        connection: config.connection || 'wan',
        maxChunkSizeWan: config.maxChunkSizeWan || 1420
    };

    loggingClient = new GelfPro(graylogConfig);
}

function initializeCloudWatch(config) {
    const cloudwatchLogs = new AWS.CloudWatchLogs({
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    });

    loggingClient = cloudwatchLogs;
}

function logMessage(message, metadata) {
    if (!loggingClient) {
        throw new Error('Logging client not initialized');
    }

    const logParams = {
        logGroupName: 'log-aggregator-group',
        logStreamName: 'log-aggregator-stream',
        logEvents: [
            {
                message: message,
                timestamp: new Date().getTime(),
                ...metadata
            }
        ]
    };

    loggingClient.putLogEvents(logParams, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });
}

function initialize(config) {
    const loggingSystem = config.loggingSystem || 'graylog';

    if (loggingSystem === 'graylog') {
        initializeGraylog({
            graylogHost: config.graylogHost,
            graylogPort: config.graylogPort,
            connection: config.connection,
            maxChunkSizeWan: config.maxChunkSizeWan
        });
    } else if (loggingSystem === 'cloudwatch') {
        initializeCloudWatch({
            region: config.region,
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey
        });
    } else {
        throw new Error(`Unknown logging system: ${loggingSystem}`);
    }
}

module.exports = {
    initialize,
    logMessage
};
