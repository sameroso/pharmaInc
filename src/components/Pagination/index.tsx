import ReactPaginate from "react-paginate";

import style from "./style.module.scss";

interface Props {
  onPageChange: (selectedItem: { selected: number }) => void;
  activePage: number;
  pageCount: number;
  marginPagesDisplayed: number;
  pageRangeDisplayed: number;
}
export default function Pagination({
  onPageChange,
  activePage,
  pageCount,
  marginPagesDisplayed,
  pageRangeDisplayed,
}: Props) {
  return (
    <ReactPaginate
      previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      disableInitialCallback
      forcePage={activePage - 1}
      containerClassName={style.pagination}
      activeClassName={style.active}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onPageChange}
    />
  );
}
