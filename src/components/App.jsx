import { Routes, Route } from 'react-router-dom';

import '../scss/app.scss';
import Header from './Header';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ShoppingCart from '../pages/ShoppingCart';

function App() {
  return (
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
  );
}

export default App;
