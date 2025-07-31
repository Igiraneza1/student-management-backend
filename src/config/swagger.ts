import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Management System API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for Student Management System',
      contact: {
        name: 'API Support',
        email: 'support@studentmanagement.com'
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server',
      },
      {
        url: 'https://api.studentmanagement.com/v1',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication operations',
      },
      {
        name: 'Users',
        description: 'Operations about users',
      },
      {
        name: 'Students',
        description: 'Student management operations',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            phone: {
              type: 'string',
              example: '+1234567890',
            },
            role: {
              type: 'string',
              enum: ['student', 'admin'],
              example: 'student',
            },
            profilePicture: {
              type: 'string',
              example: 'https://example.com/profile.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Student: {
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                course: {
                  type: 'string',
                  example: 'Computer Science',
                },
                enrollmentYear: {
                  type: 'integer',
                  example: 2023,
                },
                status: {
                  type: 'string',
                  enum: ['Active', 'Graduated', 'Dropped'],
                  example: 'Active',
                },
              },
              required: ['course', 'enrollmentYear'],
            },
          ],
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'student@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'securePassword123!',
              minLength: 8,
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            name: {
              type: 'string',
              example: 'John Smith',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.smith@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'securePassword123!',
              minLength: 8,
            },
            phone: {
              type: 'string',
              example: '+1234567890',
            },
            role: {
              type: 'string',
              enum: ['student', 'admin'],
              example: 'student',
            },
            course: {
              type: 'string',
              example: 'Computer Science',
            },
            enrollmentYear: {
              type: 'integer',
              example: 2023,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              example: 'John Smith',
            },
            email: {
              type: 'string',
              example: 'john.smith@example.com',
            },
            role: {
              type: 'string',
              example: 'student',
            },
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 400,
            },
            message: {
              type: 'string',
              example: 'Validation error',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email',
                  },
                  message: {
                    type: 'string',
                    example: 'Email is required',
                  },
                },
              },
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Unauthorized - Invalid or missing authentication token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                statusCode: 401,
                message: 'Unauthorized - Invalid token',
                timestamp: '2023-07-15T12:00:00Z',
              },
            },
          },
        },
        ValidationError: {
          description: 'Bad Request - Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
              example: {
                statusCode: 400,
                message: 'Validation error',
                errors: [
                  {
                    field: 'email',
                    message: 'Invalid email format',
                  },
                ],
                timestamp: '2023-07-15T12:00:00Z',
              },
            },
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
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/models/*.ts',
  ],
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app: Express) => {
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

 
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${process.env.PORT || 5000}/api-docs`);
};