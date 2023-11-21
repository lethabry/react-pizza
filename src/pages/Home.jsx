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

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const activeSort = useSelector((state) => state.filter.activeSort);
  const selectedPage = useSelector((state) => state.filter.selectedPage);

  const searchContext = useContext(SearchContext);

  const getPizzas = () => {
    setIsLoading(true);
    getPizzasAxios({
      limit: '4',
      page: `${selectedPage}`,
      category: `${activeCategory === 0 ? '' : activeCategory}`,
      sortBy: activeSort.property,
      order: `${activeSort.property === 'rating' ? 'desc' : 'asc'}`,
    })
      .then((pizzas) => {
        const filteredPizzas = pizzas.filter((pizza) =>
          pizza.title.toLowerCase().includes(searchContext.searchValue.toLowerCase()),
        );
        setPizzas(filteredPizzas);
        setIsLoading(false);
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
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaBlockLoader key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination />
    </div>
  );
}
