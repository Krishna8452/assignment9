const request = require('supertest');
const express = require('express');
const router = require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('User API Routes', () => {
  it('should login a user', async () => {
    const credentials = {
      username: 'birav10',
      password: 'birav84',
    };

    const response = await request(app).post('/api/users/login').send(credentials);
    expect(response.status).toBe(200);
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });

  it('should add a new user', async () => {
    const newUser = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'secret123',
      email: 'john@example.com',
      address: '123 Main St, City',
      phone: '9800761234',
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(200);
  });

  it('should get a user by ID', async () => {
    const userId = '2617affe-1d6c-46bb-9b68-795fceab8b80'; 

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });

  it('should update a user by ID', async () => {
    const userId = '2617affe-1d6c-46bb-9b68-795fceab8b80'; 
    const updatedUser = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'secret123',
      email: 'john@example.com',
      address: '123 Main St, City',
      phone: '9800761234',
    };

    const response = await request(app).put(`/api/users/${userId}`).send(updatedUser);
    expect(response.status).toBe(200);
  });

  it('should delete a user by ID', async () => {
    const userId = '2617affe-1d6c-46bb-9b68-795fceab8b80';
    const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYmlyYXYxMCIsInBhc3N3b3JkIjoiJDJiJDEwJHI5SlR3RVhwSTQ1cWltR3dXVXNyQmUuVUNFV3p4c0FCY1hLdndzOE94S2F6bXdKMnE2aHIuIn0sImlhdCI6MTY5OTU5NTM0MiwiZXhwIjoxNjk5NTk4OTQyfQ.uoiNGTSzKw-e2b_KDEpDWsT5rFEtyOYk2neOYovEo3Y"
    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${validToken}`);
      
    expect(response.status).toBe(200);
  });
});
