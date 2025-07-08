
import mongoose from 'mongoose';
import app from '../src/app'; // your Express app
import request from 'supertest';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || '');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
export default request(app);