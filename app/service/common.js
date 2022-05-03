"use strict";

const Service = require("egg").Service;

class CommonService extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.app.config.test;
  }
}

module.exports = CommonService;
