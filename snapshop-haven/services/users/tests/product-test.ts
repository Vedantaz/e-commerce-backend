import request from './setup';

let token = '';
let productId = '';

beforeAll(async () => {
  const res = await request.post('/api/users/signup').send({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
  });

  token = res.body.token;
});

describe('Product API', () => {
  it('should create a product (admin)', async () => {
    const res = await request
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 1000,
        category: 'electronics',
        stock: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Product');
    productId = res.body._id;
  });

  it('should get all products', async () => {
    const res = await request.get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get product by ID', async () => {
    const res = await request.get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(productId);
  });

  it('should update the product', async () => {
    const res = await request
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ price: 1500 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(1500);
  });

  it('should delete the product', async () => {
    const res = await request
      .delete(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
