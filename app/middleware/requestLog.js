"use strict";

const uuid = require("uuid");
const requestLog = () => {
  return async (ctx, next) => {
    const traceId = ctx.request.header.traceId || uuid.v4();
    ctx.request.headers = Object.assign(
      Object.assign({}, ctx.request.headers),
      { traceId }
    );
    ctx.set("traceId", traceId);
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
  };
};
module.exports = requestLog;
