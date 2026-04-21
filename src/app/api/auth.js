const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.2.7:8000/api';

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
});

async function parseResponse(response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Request failed');
  }

  return data;
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return parseResponse(response);
}

export async function authLogin({ email, password }) {
  return request('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchProducts(token) {
  return request('/products', {
    headers: authHeaders(token),
  });
}

export async function fetchCatering(token) {
  return request('/catering', {
    headers: authHeaders(token),
  });
}

export async function fetchProfile(token) {
  return request('/profile', {
    headers: authHeaders(token),
  });
}
