const { httpTransport, emitterFor, CloudEvent } = require('cloudevents');

/**
 * Your CloudEvent handling function, invoked with each request.
 * This example function logs its input, and responds with a CloudEvent
 * which echoes the incoming event data
 *
 * It can be invoked with 'func invoke'
 * It can be tested with 'npm test'
 *
 * @param {Context} context a context object.
 * @param {object} context.body the request body if any
 * @param {object} context.query the query string deserialzed as an object, if any
 * @param {object} context.log logging object with methods for 'info', 'warn', 'error', etc.
 * @param {object} context.headers the HTTP request headers
 * @param {string} context.method the HTTP request method
 * @param {string} context.httpVersion the HTTP protocol version
 * See: https://github.com/knative/func/blob/main/docs/function-developers/nodejs.md#the-context-object
 * @param {CloudEvent} event the CloudEvent
 */
const emit = emitterFor(httpTransport("http://slack-message.default.svc.cluster.local"));

const f = (x) => {
	return (Math.pow(x, 2) * 3) + 5
}

const handle = async (context, event) => {
  // YOUR CODE HERE
  context.log.info("context", context);
  context.log.info("event", event);
  context.log.info(JSON.stringify(event.data));
  
  const ce = new CloudEvent({
    source: 'fx.handler',
    type: 'fx.calculated',
    data: {
		result: f(event.data.x)
	},
  });
  emit(ce);
  return new CloudEvent({
	  source: 'fx.handler',
	  type: 'fx.finished',
  })
};

module.exports = { handle };
