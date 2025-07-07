import request from 'supertest';

export function getInstance(method: 'get' | 'post' | 'put' | 'delete' | 'patch', app: any, endpoint: string = '/'): request.Test {
  const agent = request(app);
  switch (method) {
    case 'get':
      return agent.get(endpoint);
    case 'post':
      return agent.post(endpoint);
    case 'patch':
      return agent.patch(endpoint);
    case 'put':
      return agent.put(endpoint);
    case 'delete':
      return agent.delete(endpoint);
    default:
      throw new Error(`Método HTTP no soportado: ${method}`);
  }
}
