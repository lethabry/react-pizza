import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectShoppingCart, setItem } from '../store/shoppingCartSlice';
import { PizzaBlockProps } from '../utils/constants';

// type PizzaBlockProps = {
//   id: number;
//   imageUrl: string;
//   title: string;
//   sizes: number[];
//   amount: number;
//   price: number;
//   types: number[];
// };

export default function PizzaBlock({ imageUrl, title, price, sizes, types, id }: PizzaBlockProps) {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);

  const [summaryAmount, setSummaryAmount] = useState(0);

  const dispatch = useDispatch();
  const { shoppingCart } = useSelector(selectShoppingCart);

  useEffect(() => {
    setSummaryAmount(() =>
      shoppingCart
        .filter((item: { id: number }) => item.id === id)
        .reduce((total: number, current: { amount: number }) => (total += current.amount), 0),
    );
  }, [shoppingCart]);

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number, i: number) => (
            <li
              onClick={() => setActiveType(i)}
              className={i === activeType ? 'active' : ''}
              key={i}
            >
              {type === 0 ? 'тонкое' : 'традиционное'}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, i: number) => (
            <li
              onClick={() => setActiveSize(i)}
              className={i === activeSize ? 'active' : ''}
              key={i}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={() =>
            dispatch(
              setItem({
                imageUrl,
                title,
                price,
                sizes: sizes[activeSize],
                types: activeType,
                id,
                amount: 1,
              }),
            )
          }
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{summaryAmount}</i>
        </button>
      </div>
    </div>
  );
}
