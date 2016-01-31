var exampleRoute = require('./server/routes/example');
module.exports = function (kibana) {
  return new kibana.Plugin({
    name: 'blackcat',
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: 'Blackcat',
        description: 'Blackcat Project',
        main: 'plugins/blackcat/app',
        injectVars: function (server, options) {
          var config = server.config();
          return {
            kbnIndex: config.get('kibana.index'),
            esShardTimeout: config.get('elasticsearch.shardTimeout'),
            esApiVersion: config.get('elasticsearch.apiVersion')
          };
        }
      }
    },
    config: function (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },
    init: function (server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }
  });
};

