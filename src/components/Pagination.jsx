import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { setSelectedPage } from '../store/filterSlice';
import styles from '../modules/Pagination.module.scss';

export default function Pagination() {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setSelectedPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
