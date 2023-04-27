# Log Aggregator

`Log-aggregator` is a Node.js package that provides a simple way to aggregate logs from multiple sources. Whether you're using local file logging, a third-party logging service, or a cloud-based logging system like AWS CloudWatch, `log-aggregator` allows you to combine all your logs into a single, centralized location. This makes it easier to search and analyze your logs, identify trends and issues, and troubleshoot problems. With `log-aggregator`, you can improve your application's logging functionality and gain valuable insights into how your application is performing.

## Installation

```bash
 npm install log-aggregator
 ```


## Usage

### Initialization

Initialize the log aggregator by calling the `initialize` function with a configuration object. The configuration object must specify the logging system to use (`graylog` or `cloudwatch`) and any required configuration options.

```js
const { initialize } = require('log-aggregator');

initialize({
  loggingSystem: 'graylog',
  graylogHost: 'localhost',
  graylogPort: 12201,
  connection: 'lan',
  maxChunkSizeWan: 1420
});

const { initialize } = require('log-aggregator');

initialize({
  loggingSystem: 'cloudwatch',
  region: 'us-west-2',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key'
});
```

## Logging
Once the log aggregator is initialized, you can log messages using the `logMessage` function. The function takes a message string and an optional metadata object.

```js
const { logMessage } = require('log-aggregator');

logMessage('This is a log message', { foo: 'bar' });
```


# Supported Logging Systems
## Graylog
The log aggregator supports logging to a Graylog server using the GELF protocol. To log to a Graylog server, initialize the library with the `graylog` logging system and specify the `graylogHost` and `graylogPort` configuration options.

```js
const { initialize } = require('log-aggregator');

initialize({
  loggingSystem: 'graylog',
  graylogHost: 'localhost',
  graylogPort: 12201,
  connection: 'lan',
  maxChunkSizeWan: 1420
});
```

## AWS CloudWatch Logs
The log aggregator also supports logging to AWS CloudWatch Logs. To log to AWS CloudWatch Logs, initialize the library with the `cloudwatch` logging system and specify the `region`, `accessKeyId`, and `secretAccessKey` configuration options.

```js
const { initialize } = require('log-aggregator');

initialize({
  loggingSystem: 'cloudwatch',
  region: 'us-west-2',
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key'
});
```


#  Typescript

```ts
import { initialize, logMessage, LoggingConfig, GraylogConfig, CloudWatchConfig } from 'log-aggregator';

const myGraylogConfig: GraylogConfig = {
  graylogHost: 'localhost',
  graylogPort: 12201
};

const myCloudwatchConfig: CloudWatchConfig = {
  region: 'us-east-1',
  accessKeyId: 'my-access-key',
  secretAccessKey: 'my-secret-key'
};

const myLoggingConfig: LoggingConfig = {
  loggingSystem: 'graylog',
  graylogConfig: myGraylogConfig
};

initialize(myLoggingConfig);

logMessage('This is a log message', { foo: 'bar', baz: 123 });
```

The `initialize` function takes a `LoggingConfig` object as its parameter, which specifies the logging system to use and its configuration. The `logMessage` function takes a string message and an optional `metadata` object of type `Record<string, any>`.

Note that the library has been updated to allow metadata to accept a `string`, `array`, `object`, or `array of objects`.


# Contributing
Contributions are welcome! Please see `CONTRIBUTING.md` for more information.

# License
MIT