import axios from 'axios';

import { BASE_URL, PizzaBlockProps } from './constants';
import { convertObjectToParams } from './convertObjectToParams';

const checkResonse = (res: { ok: boolean; status: number; json: () => void }) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const getPizzas = (data: Record<string, string>) => {
  let params = '';
  if (data) {
    params = convertObjectToParams(data);
  }
  return fetch(`${BASE_URL}/items?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResonse);
};

export const getPizzasAxios = (data: Record<string, string>) => {
  let params: string = '';
  if (data) {
    params = convertObjectToParams(data);
  }
  return axios.get<PizzaBlockProps[]>(`${BASE_URL}/items?${params}`).then((res) => res.data);
};
