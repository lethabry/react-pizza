import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockLoader from '../components/PizzaBlockLoader';
import Pagination from '../components/Pagination';
import { setActiveCategory, setUrlFilters } from '../store/filterSlice';
import { convertObjectToParams } from '../utils/convertObjectToParams';
import { convertParamsToObject } from '../utils/convertParamsToObject';
import { sort, SortItem } from '../utils/constants';
import { getPizzasFetch } from '../store/pizzasSlice';
import { setPizzas } from '../store/pizzasSlice';
import { PizzaBlockProps } from '../utils/constants';
import { RootState } from '../store/store';

type PizzaType = {
  payload: {
    id: number;
    imageUrl: string;
    title: string;
    sizes: number[];
    amount: number;
    price: number;
    types: number[];
  }[];
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, activeSort, selectedPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const { pizzas, status } = useSelector((state: RootState) => state.pizzas);

  const onCatedoryChange = useCallback((i: number) => dispatch(setActiveCategory(i)), []);

  const getPizzas = () => {
    // @ts-ignore
    dispatch(getPizzasFetch({ selectedPage, activeCategory, activeSort }))
      .then((pizzas: PizzaType) => {
        const filteredPizzas = pizzas.payload.filter((pizza) =>
          pizza.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        dispatch(setPizzas(filteredPizzas));
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = convertParamsToObject(window.location.search.substring(1));
      const selectedSort: SortItem = sort.find((item) => item.property === params.sortBy) || {
        title: 'популярности',
        property: 'rating',
      };
      const object = {
        category: params.category,
        currentPage: params.currentPage,
        sortBy: selectedSort,
      };
      if (selectedSort) {
        dispatch(setUrlFilters(object));
      }
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [activeSort, activeCategory, searchValue, selectedPage]);

  useEffect(() => {
    if (isMounted.current) {
      const string =
        '?' +
        convertObjectToParams({
          category: activeCategory,
          sortBy: activeSort.property,
          currentPage: selectedPage,
        });
      navigate(string);
    }
    isMounted.current = true;
  }, [activeSort, activeCategory, selectedPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onCategoryClick={onCatedoryChange} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading' ? (
          [...new Array(6)].map((_, i) => <PizzaBlockLoader key={i} />)
        ) : status === 'success' ? (
          pizzas.map((pizza: PizzaBlockProps) => <PizzaBlock key={pizza.id} {...pizza} />)
        ) : (
          <div className="content__error-info">
            <h2>Прозошла ошибка</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
          </div>
        )}
      </div>
      <Pagination />
    </div>
  );
}
