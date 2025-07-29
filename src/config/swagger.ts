import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management System API',
      version: '1.0.0',
      description: 'API documentation for authentication and user management',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserLogin: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'student@example.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
          required: ['email', 'password'],
        },
        UserRegister: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'student@example.com' },
            password: { type: 'string', example: 'securePass123' },
            registrationNumber: { type: 'string', example: '202101001' },
            fieldOfStudy: { type: 'string', example: 'Computer Science' },
            year: { type: 'string', example: '2021' },
            role: { type: 'string', example: 'user' },
          },
          required: ['email', 'password', 'registrationNumber', 'fieldOfStudy'],
        },
        UserResponse: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60c72b2f9b1e8b001c8e4a4a' },
            email: { type: 'string', example: 'student@example.com' },
            registrationNumber: { type: 'string', example: '202101001' },
            fieldOfStudy: { type: 'string', example: 'Computer Science' },
            year: { type: 'string', example: '2021' },
            role: { type: 'string', example: 'user' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], // Adjust to match your project
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
