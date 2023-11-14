import { BASE_URL } from './constants';

const checkResonse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

export const getPizzas = () =>
  fetch(`${BASE_URL}/items`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResonse);
