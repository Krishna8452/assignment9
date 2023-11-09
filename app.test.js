const request = require('supertest');
const express = require('express');
const router = require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('User API Routes', () => {
  it('should log in a user', async () => {
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
      image: 'path-to-your-test-image.jpg',
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(200);
  });

  it('should get a user by ID', async () => {
    const userId = 'e14347d2-7eba-4869-8696-55170693c6d1'; 

    const response = await request(app).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
  });

  it('should update a user by ID', async () => {
    const userId = 'e14347d2-7eba-4869-8696-55170693c6d1'; 
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
    const userId = 'e14347d2-7eba-4869-8696-55170693c6d1';
    const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYmlyYXYxMCIsInBhc3N3b3JkIjoiJDJiJDEwJHI5SlR3RVhwSTQ1cWltR3dXVXNyQmUuVUNFV3p4c0FCY1hLdndzOE94S2F6bXdKMnE2aHIuIn0sImlhdCI6MTY5OTUxNzY3NiwiZXhwIjoxNjk5NTIxMjc2fQ.M1NoydAALR7bOUCXqlAJiF07haOjhJQPBbH-APZ5KlY"
    const response = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${validToken}`);
      
    expect(response.status).toBe(200);
  });
});
