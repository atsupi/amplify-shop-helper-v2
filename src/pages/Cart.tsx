import "./Cart.css";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createPurchaseTable } from "../graphql/mutations";
import { Button } from "@aws-amplify/ui-react";
import CartItem from "../components/CartItem";
import {
  fetchItem,
  listItemsInCart,
  listItemsInCartReturnValue,
} from "../Utils";
import { PurchaseData, UpdateItemValue } from "../types";
import { updateItemStatus } from "../Utils";

type Props = {
  username: string | undefined;
};

function Cart(props: Props) {
  const [itemList, setItemList] = useState(Array<PurchaseData>);

  useEffect(() => {
    let index = 0;
    let newItemList: Array<PurchaseData> = [];
    listItemsInCart().then((res: listItemsInCartReturnValue) => {
      res.data.purchaseTableByIsInCart.items.map((item: PurchaseData) => {
        newItemList = [
          ...newItemList,
          {
            id: item.id,
            index: index,
            PK: item.PK,
            SK: item.SK,
            type: item.type,
            imagefile: item.imagefile,
            price: item.price,
            username: props.username,
            description: item.description,
            isInCart: item.isInCart,
            isPurchased: 0,
          },
        ];
        index = index + 1;
      });
      setItemList(newItemList);
    });
  }, []);

  const onSubmit = async () => {
    const purId = new Date().getTime().toString();
    const newPurchase = {
      PK: "purchase#" + purId,
      SK: "#meta#" + purId,
      type: "purchase",
      username: props.username,
    };
    try {
      const res = await API.graphql(
        graphqlOperation(createPurchaseTable, { input: newPurchase })
      );
      console.log(res);
    } catch (event) {
      console.log(event);
    }

    itemList.map(async (item) => {
      console.log(item);
      const value = {
        PK: "purchase#" + purId,
        SK: item.PK,
        type: "pitem",
        username: props.username,
        isPurchased: 0,
      };
      try {
        const res = await API.graphql(
          graphqlOperation(createPurchaseTable, { input: value })
        );
        console.log(res);
      } catch (event) {
        console.log(event);
      }
    });
  };

  const onDeleteChild = (props: { PK: string; SK: string }) => {
    let newItemList: Array<PurchaseData> = [];
    itemList.map((item) => {
      if (item.PK !== props.PK) {
        newItemList = [...newItemList, item];
      }
    });
    setItemList(newItemList);
    fetchItem(props.PK, props.SK).then((res) => {
      const curItem = res.data.getPurchaseTable;
      const newItem: UpdateItemValue = {
        PK: curItem.PK || "",
        SK: curItem.SK,
        type: curItem.type,
        imagefile: curItem.imagefile,
        price: curItem.price,
        username: curItem.username,
        description: curItem.description,
        isInCart: 0,
      };
      updateItemStatus(newItem);
    });
  };

  return (
    <>
      <div className="Cart_div">
        <Button onClick={onSubmit} disabled={itemList.length < 1}>
          Submit
        </Button>
        <div className="CartItemList">
          {itemList.map((item) => {
            return (
              <div className="Item" key={`Item${item.index}`}>
                <CartItem
                  PK={item.PK || ""}
                  SK={item.SK}
                  onDelete={onDeleteChild}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Cart;
