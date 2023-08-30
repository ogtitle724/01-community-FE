import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import "./style.css";

export default function ItemDetail() {
  const [itemDetail, setItemDetail] = useState();
  const itemId = useParams().itemId;

  useEffect(() => {
    const getItemData = async () => {
      try {
        let path = process.env.REACT_APP_PATH_ITEM.replace("{item-id}", itemId);
        const res = await axios.get(path);

        setItemDetail(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItemData();
  }, [itemId]);

  return (
    <>
      <Header />
      <Gnb />
      <main className="item-detail__main">
        <div className="item-detail__wrapper">
          <h2 className="item-detail__title">(미개봉) 뉴발 993 트리플 블랙</h2>
          {false ? <img></img> : <div className="item-detail__no-img"></div>}
          <div className="item-detail__info">
            <button className="item-detail__btn-like"></button>
            <span className="item-detail__figure">99+</span>
            <button className="item-detail__btn-chat"></button>
            <span className="item-detail__figure">99+</span>
            <span className="item-detail__time">3시간전</span>
          </div>
          <div className="item-detail__description">
            뉴발란스993팝니다. 박스도 있습니다. 연락주세요!
          </div>
          <button className="item-detail__btn-ask">제안하기</button>
        </div>
      </main>
    </>
  );
}
