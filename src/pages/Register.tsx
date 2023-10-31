import "./Register.css";
import { Storage } from "aws-amplify";
import { useState } from "react";
import { Button } from "@aws-amplify/ui-react";

import { API, graphqlOperation } from "aws-amplify";
import { createPurchaseTable } from "../graphql/mutations";
import { getPresignedUrl } from "../Utils";
import { Link } from "react-router-dom";
import { NewItemValue } from "../types";

type Props = {
  username: string | undefined
}

function Register( props: Props ) {
  const [presignedUrl, setPresignedUrl] = useState("");
  const [dataName, setDataName] = useState("No image");
  const [isUrlSet, setIsUrlSet] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const inputFile = (event: any) => {
    console.log(event.target.files[0]);
    if (event.target.files[0].size < 20000000) {
      Storage.put(event.target.files[0].name, event.target.files[0], {
        level: "public",
        progressCallback(progress) {
          let percentage = (100 * progress.loaded) / progress.total;
          console.log(`progress: ${percentage}%`);
        },
      })
        .then((_result) => {
          getPresignedUrl(event.target.files[0].name)
            .then((result) => {
              setPresignedUrl(result);
              setDataName(event.target.files[0].name);
              setIsUrlSet(true);
            })
            .catch((event) => {
              console.log(event);
            });
        })
        .catch((event) => {
          console.log(event);
        });
    }
  };

  const inputDescription = (event: any) => {
    setDescription(event.target.value);
  };

  const inputPrice = (event: any) => {
    setPrice(event.target.value);
  };

  const registerItem = async () => {
    const itemId = new Date().getTime().toString();
    const value: NewItemValue = {
      // `id` is not included as it is determined by AppSync
      PK: "item#" + itemId,
      SK: "#meta#" + itemId,
      type: "item",
      imagefile: dataName,
      price: parseInt(price),
      username: props.username || "unknown",
      description: description,
      isInCart: 0,
    };
    try {
      await API.graphql(
        graphqlOperation(createPurchaseTable, { input: value })
      );
    } catch (event) {
      console.log(event);
    }
  };

  const cancelRegistration = () => {
    if (isUrlSet) {
      Storage.remove(dataName)
        .then((res) => console.log(res))
        .catch((event) => console.log(event));
    }
  };

  return (
    <>
      <h2>Register Page</h2>
      <div className="Description">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={inputDescription}
          placeholder="No Description"
        />
      </div>
      <div className="Price">
        <label>Price (JPY):</label>
        <input
          type="text"
          value={price}
          placeholder="For free"
          onChange={inputPrice}
        />
      </div>
      <br />
      <div className="Uploader">
        <input type="file" onChange={inputFile} />
      </div>

      <div>
        {isUrlSet ? (
          <img src={presignedUrl} width="120" height="120" />
        ) : (
          `${dataName}`
        )}
      </div>
      <br />
      <div className="ControlButtons">
        <Button
          disabled={!(description !== "" && price !== "" && isUrlSet)}
          onClick={registerItem}
        >
          Submit
        </Button>
        <Link to="/shop">
          <Button onClick={cancelRegistration}>Cancel</Button>
        </Link>
      </div>
    </>
  );
}

export default Register;
