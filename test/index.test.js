const assert = require('assert');
const sinon = require('sinon');
const logAggregator = require('log-aggregator');

// Mock the GelfPro and AWS SDKs
const gelfProStub = sinon.stub();
const cloudWatchLogsStub = sinon.stub();

// Test configuration
const config = {
    loggingSystem: 'graylog',
    graylogHost: 'localhost',
    graylogPort: 12201,
    connection: 'wan',
    maxChunkSizeWan: 1420
};

describe('log-aggregator', function () {

    beforeEach(function () {
        // Reset the stubs between tests
        gelfProStub.reset();
        cloudWatchLogsStub.reset();
    });

    describe('#initialize()', function () {

        it('should initialize GelfPro client for Graylog logging system', function () {
            logAggregator.initialize(config);

            assert.strictEqual(gelfProStub.callCount, 1, 'GelfPro client not initialized');
        });

        it('should initialize CloudWatchLogs client for CloudWatch logging system', function () {
            config.loggingSystem = 'cloudwatch';
            logAggregator.initialize(config);

            assert.strictEqual(cloudWatchLogsStub.callCount, 1, 'CloudWatchLogs client not initialized');
        });

        it('should throw an error for an unknown logging system', function () {
            config.loggingSystem = 'invalid';
            assert.throws(() => logAggregator.initialize(config), /Unknown logging system/, 'No error thrown for unknown logging system');
        });

    });

    describe('#logMessage()', function () {

        it('should throw an error if logging client not initialized', function () {
            assert.throws(() => logAggregator.logMessage('test message'), /Logging client not initialized/, 'No error thrown for uninitialized logging client');
        });

        it('should call putLogEvents() for CloudWatchLogs logging system', function () {
            config.loggingSystem = 'cloudwatch';
            logAggregator.initialize(config);

            logAggregator.logMessage('test message');

            assert.strictEqual(cloudWatchLogsStub.callCount, 1, 'putLogEvents() not called for CloudWatchLogs logging system');
        });

        it('should call send() for GelfPro logging system', function () {
            logAggregator.initialize(config);

            logAggregator.logMessage('test message');

            assert.strictEqual(gelfProStub.callCount, 1, 'send() not called for GelfPro logging system');
        });

    });

});
