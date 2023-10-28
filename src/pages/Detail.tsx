import { Link, Outlet, useParams } from "react-router-dom";
import "./Detail.css";
import DetailList from "../components/DetailList";
import { useEffect, useState } from "react";

function Detail() {
  const [id, setId] = useState<string>("");
  const [isIdSet, setIsIdSet] = useState(0);
  const param = useParams();
  useEffect(() => {
    setId(param.id || "1");
    setIsIdSet(1);
  }, []);

  return (
    <div className="Detail_div">
      {isIdSet && <DetailList pindex={parseInt(id)} />}
      <div className="DetailLink">
        <Link to="/purchase">Back</Link>
      </div>
    </div>
  );
}

export default Detail;
