import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import '../scss/app.scss';
import Header from './Header';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ShoppingCart from '../pages/ShoppingCart';
import { SearchContext } from '../context/SearchContext';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchValue = (value) => setSearchValue(value);
  return (
    <SearchContext.Provider value={{ searchValue, handleSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
