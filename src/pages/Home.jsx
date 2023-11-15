import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockLoader from '../components/PizzaBlockLoader';
import Pagination from '../components/Pagination';
import { getPizzas } from '../utils/api';
import { SearchContext } from '../context/SearchContext';
import { setActiveCategory } from '../store/filterSlice';

export default function Home() {
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const activeSort = useSelector((state) => state.filter.activeSort);

  const [selectedPage, setSelectedPage] = useState(1);

  const searchContext = useContext(SearchContext);
  useEffect(() => {
    setIsLoading(true);
    getPizzas({
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
    window.scrollTo(0, 0);
  }, [activeSort, activeCategory, searchContext.searchValue, selectedPage]);

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
      <Pagination onChangePage={(number) => setSelectedPage(number)} />
    </div>
  );
}
