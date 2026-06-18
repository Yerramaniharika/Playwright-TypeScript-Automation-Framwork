import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in';

test.describe('Users API Tests', () => {
  test('GET /api/users?page=2 → status 200 with user data', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/users?page=2`);
    
    expect(res.status()).toBe(200);
    
    const body = await res.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    // Verify each user has required fields
    body.data.forEach((user: any) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('first_name');
      expect(user).toHaveProperty('last_name');
    });
  });

  test('POST /api/users { name: "morpheus", job: "leader" } → status 201 with response fields', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/users`, {
      data: { name: 'morpheus', job: 'leader' }
    });
    
    expect(res.status()).toBe(201);
    
    const body = await res.json();
    expect(body).toMatchObject({
      name: 'morpheus',
      job: 'leader'
    });
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
  });

  test('BONUS: POST create user → verify returned id and createdAt fields', async ({ request }) => {
    // POST: Create a new user
    const createRes = await request.post(`${BASE_URL}/api/users`, {
      data: { name: 'alice', job: 'engineer' }
    });
    
    expect(createRes.status()).toBe(201);
    const createdUser = await createRes.json();
    
    // Chain: Verify response structure
    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('createdAt');
    expect(createdUser.id).toBeTruthy();
    expect(createdUser.createdAt).toBeTruthy();
    
    // Verify created user has all expected fields
    expect(createdUser).toMatchObject({
      name: 'alice',
      job: 'engineer'
    });
  });
});
