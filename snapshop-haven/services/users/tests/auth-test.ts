import request from './setup';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request.post('/api/users/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register with same email', async () => {
    const res = await request.post('/api/users/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.status).toBe(400);
  });

  it('should login successfully', async () => {
    const res = await request.post('/api/users/login').send({
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should fail login with wrong password', async () => {
    const res = await request.post('/api/users/login').send({
      email: 'test@example.com',
      password: 'wrongpass',
    });
    expect(res.status).toBe(400);
  });
});
