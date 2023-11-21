import axios from 'axios';

import { BASE_URL } from './constants';
import { convertObjectToParams } from './convertObjectToParams';

const checkResonse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

export const getPizzas = (data) => {
  let params = '';
  if (data) {
    params = convertObjectToParams(data);
  }
  return fetch(`${BASE_URL}/items?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResonse);
};

export const getPizzasAxios = (data) => {
  let params = '';
  if (data) {
    params = convertObjectToParams(data);
  }
  return axios.get(`${BASE_URL}/items?${params}`).then((res) => res.data);
};
