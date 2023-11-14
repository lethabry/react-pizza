import { categories } from '../utils/constants';

export default function Categories({ value, onCategoryClick }) {
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
