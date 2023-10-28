import { RefCallback, useEffect, useState } from "react";
import "./CartItem.css";
import { PurchaseData, UpdateItemValue } from "../types";
import { fetchItem, getPresignedUrl } from "../Utils";
import { Button } from "@aws-amplify/ui-react";
import { updateItemStatus } from "../Utils";

type Props = {
  PK: string;
  SK: string;
  onDelete: RefCallback<{PK: string, SK: string}>;
}

function CartItem( props: Props ) {
  const [curItem, setCurItem] = useState<PurchaseData>();
  const [presignedUrl, setPresignedUrl] = useState("");

  useEffect(() => {
    if (props.PK && props.SK) {
      fetchItem(props.PK, props.SK).then((res) => {
        setCurItem(res.data.getPurchaseTable);
        getPresignedUrl(res.data.getPurchaseTable?.imagefile).then((url) => {
          setPresignedUrl(url);
        });
      });
    }
  }, []);

  const deleteCurrentItem = () => {
    console.log(curItem);
    if (curItem) {
      const newItem: UpdateItemValue = {
        PK: curItem.PK || "",
        SK: curItem.SK,
        type: curItem.type,
        imagefile: curItem.imagefile,
        price: curItem.price,
        username: curItem.username,
        description: curItem.description,
        isInCart: 0
      }
      updateItemStatus(newItem);
    }
    props.onDelete({PK: curItem?.PK || "", SK: curItem?.SK});
  };

  return (
    <>
      <div className="CartItem_div">
        {presignedUrl !== "" && (
          <img src={presignedUrl} width="60" height="80" />
        )}
        <div className="CartItem_description">{curItem?.description}</div>
        <div className="CartItem_price">{curItem?.price} JPY</div>
        <div className="DeleteButton">
          <Button onClick={deleteCurrentItem}>Delete</Button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
