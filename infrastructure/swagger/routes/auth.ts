export default [
  {
    path: '/auth/login',
    object: {
      post: {
        tags: ['Autenticación'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'John doe',
                  },
                  password: {
                    type: 'string',
                    example: 'Password1!',
                  },
                },
                required: ['username', 'password'],
                example: {
                  username: 'John doe',
                  password: 'Password1!',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                    },
                  },
                  example: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZWFuZHJvNTQ2NiIsImVtYWlsIjoibGVhbmRyby5mbG9yZW50aW5AZ21haWwuY29tIiwicm9sZSI6IltcIlVTRVJcIl0iLCJjcmVhdGVkQXQiOiIyMDI1LTA2LTI2VDAwOjUzOjMzLjE4MloiLCJ1cGRhdGVkQXQiOm51bGwsImlhdCI6MTc1MDg5OTIyOCwiZXhwIjoxNzUwOTAyODI4fQ.ADhZ8GPdjGrU7GSvPR3QhT1pz-UKEhB_vwkFktXTTiM',
                  },
                },
              },
            },
          },
          400: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['Usuario incorrecto.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/auth/me',
    object: {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Autenticación'],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'number',
                    },
                    username: {
                      type: 'string',
                    },
                    email: {
                      type: 'string',
                    },
                    role: {
                      type: 'string',
                    },
                    createdAt: {
                      type: 'string',
                    },
                    updatedAt: {
                      oneOf: [{ type: 'string' }, { type: 'null' }],
                    },
                    iat: {
                      type: 'number',
                    },
                    exp: {
                      type: 'number',
                    },
                  },
                  example: {
                    id: 1,
                    username: 'leandro5466',
                    email: 'leandro.florentin@gmail.com',
                    role: '["USER"]',
                    createdAt: '2025-06-26T13:20:28.020Z',
                    updatedAt: null,
                    iat: 1750944046,
                    exp: 1750947646,
                  },
                },
              },
            },
          },
          400: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    errors: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    errors: ['No se envio token de autorización.'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];
