const swaggerJsdoc = require('swagger-jsdoc');

// The swaggerOptions object is used to configure the Swagger specification for your API. 
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'User API',
			version: '1.0.0',
			description: 'API endpoints for managing users',
		},
		servers: [
			{
				url: 'http://localhost:3005/'
			}
		],
		securityDefinitions: {
			bearerAuth: {
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
				description:
					'Enter your bearer token in the format **Bearer &lt;token>**',
				example: 'Bearer adsdsadas'
			}
		},
	},
	apis: ['api/routes.js', 'api/routes/*.js', 'api/swagger/*.js'],
};

// generates the Swagger specification based on the provided swaggerOptions.
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
