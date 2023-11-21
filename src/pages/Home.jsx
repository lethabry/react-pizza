import { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockLoader from '../components/PizzaBlockLoader';
import Pagination from '../components/Pagination';
import { getPizzasAxios } from '../utils/api';
import { SearchContext } from '../context/SearchContext';
import { setActiveCategory, setUrlFilters } from '../store/filterSlice';
import { convertObjectToParams } from '../utils/convertObjectToParams';
import { convertParamsToObject } from '../utils/convertParamsToObject';
import { sort } from '../utils/constants';
import { getPizzasFetch } from '../store/pizzasSlice';
import { setPizzas } from '../store/pizzasSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, activeSort, selectedPage } = useSelector((state) => state.filter);
  const { pizzas, status } = useSelector((state) => state.pizzas);

  const searchContext = useContext(SearchContext);

  const getPizzas = () => {
    dispatch(getPizzasFetch({ selectedPage, activeCategory, activeSort }))
      .then((pizzas) => {
        const filteredPizzas = pizzas.filter((pizza) =>
          pizza.title.toLowerCase().includes(searchContext.searchValue.toLowerCase()),
        );
        dispatch(setPizzas(filteredPizzas));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = convertParamsToObject(window.location.search.substring(1));
      const selectedSort = sort.find((item) => item.property === params.sortBy);
      dispatch(setUrlFilters({ ...params, sortBy: selectedSort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [activeSort, activeCategory, searchContext.searchValue, selectedPage]);

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
        <Categories
          value={activeCategory}
          onCategoryClick={(i) => dispatch(setActiveCategory(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading' ? (
          [...new Array(6)].map((_, i) => <PizzaBlockLoader key={i} />)
        ) : status === 'success' ? (
          pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
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
