const BASE_URL = 'http://127.0.0.1:8000/api'

function authHeaders() {
  const token = localStorage.getItem('accessToken')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export function apiGet(caminho) {
  return fetch(`${BASE_URL}${caminho}`, {
    headers: authHeaders()
  }).then(response => response.json())
}

export function apiPost(caminho, dados) {
  return fetch(`${BASE_URL}${caminho}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(dados)
  }).then(response => response.json())
}

export function apiPut(caminho, dados) {
  return fetch(`${BASE_URL}${caminho}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(dados)
  }).then(response => response.json())
}

export function apiDelete(caminho) {
  return fetch(`${BASE_URL}${caminho}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
}