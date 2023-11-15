import { useEffect, useState, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockLoader from '../components/PizzaBlockLoader';
import { getPizzas } from '../utils/api';
import { SearchContext } from '../context/SearchContext';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({
    title: 'популярности',
    property: 'rating',
  });

  const searchContext = useContext(SearchContext);
  useEffect(() => {
    setIsLoading(true);
    getPizzas({
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
  }, [activeSort, activeCategory, searchContext.searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onCategoryClick={(i) => setActiveCategory(i)} />
        <Sort value={activeSort} onSortClick={(i) => setActiveSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaBlockLoader key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}
