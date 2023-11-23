import { categories } from '../utils/constants';
import { memo } from 'react';

type CategoriesProps = {
  value: number;
  onCategoryClick: (i: number) => void;
};

const Categories = memo(({ value, onCategoryClick }: CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {categories.map(({ name, id }) => (
          <li onClick={() => onCategoryClick(id)} className={id === value ? 'active' : ''} key={id}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
