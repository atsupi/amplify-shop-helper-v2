import "./PaginateItems.css";
import React, { RefCallback, useState } from "react";
import ReactPaginate from "react-paginate";
import ShopItemList from "./ShopItemList";
import { PurchaseData } from "../types";

type Props = {
  itemsPerPage: number,
  items: Array<PurchaseData>,
  onChange: RefCallback<React.ChangeEvent<HTMLInputElement>>
}

function PaginateItems ( props: Props ) {
  const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + props.itemsPerPage;
  const currentItems = props.items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const onChangeChild = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };

  return (
    <>
      <div className="PaginateWrapper">
        <div className="ItemsStyle">
          <ShopItemList currentItems={currentItems} onChange={onChangeChild}/>
        </div>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
}

export default PaginateItems;
