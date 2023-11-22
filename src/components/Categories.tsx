import { categories } from '../utils/constants';

type CategoriesProps = {
  value: number;
  onCategoryClick: any;
};

export default function Categories({ value, onCategoryClick }: CategoriesProps) {
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
}
