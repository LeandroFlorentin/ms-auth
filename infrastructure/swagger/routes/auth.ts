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
];
