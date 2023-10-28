import React, { RefCallback, useEffect, useState } from "react";
import "./DetailItem.css";
import { getPresignedUrl } from "../Utils";
import { Checkbox } from "@mui/material";
import { ItemWithCheck } from "../types";

type Props = {
  item: ItemWithCheck,
  onChange: RefCallback<React.ChangeEvent<HTMLInputElement>>;
}

function DetailItem(props: Props) {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [isChecked, setIsChecked] = useState(props.item.isPurchased);

  useEffect(() => {
    getPresignedUrl(props.item.imagefile).then((data) => {
      setPresignedUrl(data);
    });
  }, []);

  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.item.isPurchased = 1 - props.item.isPurchased;
    setIsChecked(props.item.isPurchased);
    props.onChange(event);
  };

  return (
    <>
      <div className="DetailItem_div" key={props.item.id}>
        <div className="checkbox">
          <Checkbox
            checked={isChecked ? true : false}
            color="success"
            onChange={onChangeCheckbox}
            inputProps={{ "aria-label": `${props.item.index}` }}
          />
        </div>
        <img src={presignedUrl} width="60" height="80" />
        <p>{props.item.description}</p>
        <p>{props.item.price} JPY</p>
      </div>
    </>
  );
}

export default DetailItem;
