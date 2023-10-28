import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PurchaseItem from "../components/PurchaseItem";
import "./PurchaseList.css";
import { fetchPurchases, getListReturnValue } from "../Utils";
import { PurchaseData } from "../types";

function PurchaseList() {
  let index = 0;
  const [purchaseLists, setPurchaseLists] = useState(Array<PurchaseData>);

  useEffect(() => {
    fetchPurchases().then((res: getListReturnValue) => {
      setPurchaseLists(res.data.listPurchaseTables.items);
    });
  }, []);

  return (
    <>
      <h3>Purchase List</h3>
      <div className="PurchaseList_div">
        {purchaseLists.map((item) => {
          index = index + 1;
          return (
            <div className={`Item${index}`} key={`detail/${index}`}>
              <Link to={`/detail/${index}`} key={`linkToDetail/${index}`}>
                <PurchaseItem data={item} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PurchaseList;
