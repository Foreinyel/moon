"use strict";

const uuid = require("uuid");
const requestLog = (options, app) => {
  return async (ctx, next) => {
    const start = Date.now();
    const traceId = ctx.request.header.traceId || uuid.v4();
    ctx.request.headers = Object.assign(
      Object.assign({}, ctx.request.headers),
      { traceId }
    );

    ctx.logger.info(
      JSON.stringify({
        traceId,
        ...ctx.request.header,
        ...ctx.request.body,
        ...ctx.request.queries,
        path: ctx.request.path,
      })
    );
    await next();
    ctx.set("traceId", traceId);
    const cost = Date.now() - start;
    if (ctx.statsd) {
      ctx.statsd.timing(
        `${app.config.appName}_${ctx.routerPath}`,
        cost,
        function (error, bytes) {}
      );
    }
    ctx.set("X-Response-Time", cost);
  };
};
module.exports = requestLog;
