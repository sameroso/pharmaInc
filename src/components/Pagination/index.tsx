import ReactPaginate from "react-paginate";
import "./style.css";


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
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      disableInitialCallback
      forcePage={activePage - 1}
      containerClassName={"pagination"}
      activeClassName={"active"}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onPageChange}
    />
  );
}
