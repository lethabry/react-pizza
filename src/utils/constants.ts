export const BASE_URL: string = 'https://65530a115449cfda0f2e0475.mockapi.io';
export const categories: { id: number; name: string }[] = [
  {
    id: 0,
    name: 'Все',
  },
  {
    id: 1,
    name: 'Мясные',
  },
  {
    id: 2,
    name: 'Вегетарианская',
  },
  {
    id: 3,
    name: 'Гриль',
  },
  {
    id: 4,
    name: 'Острые',
  },
  {
    id: 5,
    name: 'Закрытые',
  },
];
export type SortItem = {
  title: string;
  property: string;
};
export const sort: SortItem[] = [
  {
    title: 'популярности',
    property: 'rating',
  },
  {
    title: 'цене',
    property: 'price',
  },
  {
    title: 'алфавиту',
    property: 'title',
  },
];

export type ShoppingCartItemType = {
  id: number;
  imageUrl: string;
  title: string;
  sizes: number;
  amount: number;
  price: number;
  types: number;
};

export type PizzaBlockProps = {
  id: number;
  imageUrl: string;
  title: string;
  sizes: number[];
  amount: number;
  price: number;
  types: number[];
};
