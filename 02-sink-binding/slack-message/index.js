const { CloudEvent } = require('cloudevents');
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN; 

const web = new WebClient(token);

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
const handle = async (context, event) => {
  // YOUR CODE HERE
  context.log.info("context", context);
  context.log.info("event", event);
  
  try {

	const result = await web.chat.postMessage({
		text: `The result is: ${event.data.result}`,
		channel: "C05NK0NC83E",
	})


	return new CloudEvent({
		source: 'event.handler',
		type: 'echo',
		data: {
			result: result
		}
	});
  } catch (error) {
	  context.log.warn(error)
	  return new CloudEvent({
		  source: "event.handler",
		  type: "error",
		  data: {
			  error: error,
		  },
	  });
  }
};

module.exports = { handle };
