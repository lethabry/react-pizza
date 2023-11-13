import { useState } from 'react';

const categories = [
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

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleIndex = (index) => setActiveIndex(index);

  return (
    <div className="categories">
      <ul>
        {categories.map(({ name, id }) => (
          <li
            onClick={() => handleIndex(id)}
            className={id === activeIndex ? 'active' : ''}
            key={id}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
