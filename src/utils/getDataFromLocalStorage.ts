export const getShoppingCartFromLocalStorage = () => {
  const data = localStorage.getItem('shoppingCart');
  return data ? JSON.parse(data) : [];
};
