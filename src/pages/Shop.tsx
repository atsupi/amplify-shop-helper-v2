import { useEffect, useState } from "react";
import PaginateItems from "../components/PaginateItems";
import { Button } from "@aws-amplify/ui-react";
import { PurchaseData } from "../types";
import "./Shop.css";
import { Link } from "react-router-dom";
import { listItems, listItemsReturnValue } from "../Utils";
import { onCreatePurchaseTable } from "../graphql/subscriptions";
import Observable from "zen-observable-ts";
import { API } from "aws-amplify";

function Shop() {
  const [itemList, setItemList] = useState(Array<PurchaseData>);
  const [numberOfItems, setNumberOfItems] = useState(0);

  useEffect(() => {
    listItems("item").then((res: listItemsReturnValue) => {
      const items: Array<PurchaseData> = res.data.purchaseTableByType.items;
      setItemList(items);
      items.map((item) => {
        if (item.isInCart) {
          setNumberOfItems((number) => number + 1);
        }
      });
    });
    let sub: Observable<object>;
    try {
      sub = API.graphql<Observable<object>>({ query: onCreatePurchaseTable });
      console.log("Register:useEffect", sub);
      if ("subscribe" in sub) {
        console.log("Register:useEffect invoking subscribe()");
        sub.subscribe({
          next: (event) => console.log(event.value.data.onCreatePurchaseTable),
          error: (error) => console.log(error),
        });
      }
    } catch (event) {
      console.log(event);
    }
  }, []);

  const OpenCart = () => {
    console.log("OpenCart clicked");
  };

  const onChangeChild = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.checked) {
      setNumberOfItems((number) => number + 1);
    } else {
      setNumberOfItems((number) => number - 1);
    }
  };

  return (
    <>
      <div className="Shop_Wrapper">
        <div className="CartButton">
          <Link to="/cart">
            <Button onClick={OpenCart}>To Cart ({numberOfItems})</Button>
          </Link>
        </div>
        <div className="ShopItemList">
          <PaginateItems
            itemsPerPage={4}
            items={itemList}
            onChange={onChangeChild}
          />
        </div>
      </div>
    </>
  );
}

export default Shop;
