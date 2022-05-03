'use strict';

const Logstash = require('logstash-client');
const { Transport } = require('egg-logger');
const assert = require('assert');

class LogstashTransport extends Transport {
  constructor(options) {
    assert(!!options.host && !!options.port, 'host/port required!');
    super({ ...options, json: true });
    this.logstashClient = new Logstash({
      type: 'tcp',
      host: options.host,
      port: options.port,
    });
  }

  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    const msgObj = JSON.parse(msg);

    const { message } = msgObj;
    let messageObj;
    try {
      messageObj = JSON.parse(message);
    } catch {
      messageObj = message;
    }

    const data = {
      ...msgObj,
      traceId: messageObj.traceId,
    };

    this.logstashClient.send(data);
  }
}

module.exports = {
  LogstashTransport,
};
