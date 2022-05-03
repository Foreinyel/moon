"use strict";

module.exports = (appInfo) => {
  const config = {};

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + "_123456",
  };

  config.onerror = {
    errorPageUrl: (err, ctx) => {
      ctx.logger.info(
        JSON.stringify({
          ...ctx.request.headers,
          err,
        })
      );
      return ctx.errorPageUrl || "/500";
    },
  };

  return config;
};
