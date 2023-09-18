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

const emit = emitterFor(httpTransport(process.env.K_SINK));

const f = (y) => {
	return 150*Math.sin(y)
}

const handle = async (context, event) => {
  // YOUR CODE HERE
  context.log.info("context", context);
  context.log.info("event", event);
  context.log.info(JSON.stringify(event.data));

  const result = f(event.data.y)

  const ce = new CloudEvent({
    source: 'fy.handler',
    type: 'fy.calculated',
    data: result <= 100 ? { result } : { message: "Result is greater than 100!" },
	toolarge: result > 100
  });
  emit(ce);
  return new CloudEvent({
	  source: 'fy.handler',
	  type: 'fy.finished',
	  toolarge: result > 100
  })
};

module.exports = { handle };
