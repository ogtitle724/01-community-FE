import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clip from "../../asset/clip.png";
import timeConverter from "../../util/time_converter";
import "./style.css";

export default function Showcase({ mainEle }) {
  const [order, setOrder] = useState("최신순");
  const [itemData, setItemData] = useState();
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const getItemData = async () => {
      try {
        let res = await axios.get(process.env.REACT_APP_PATH_ITEM_PAGING);
        setItemData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItemData();
  }, [order]);

  const handleClickBtnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="showcase">
      <div className="showcase__header">
        <input
          className="showcase__search"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="showcase__btn-search"></button>
        <select
          className="showcase__select-order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="최신순">최신순</option>
          <option value="등록일순">등록일순</option>
          <option value="인기순">인기순</option>
        </select>
      </div>
      <div className="showcase__item-wrapper">
        {itemData && itemData.content.map((data) => <ItemCard data={data} />)}
      </div>
      <button
        className="showcase__btn-to-top"
        onClick={handleClickBtnToTop}
      ></button>
    </section>
  );
}

function ItemCard({ data }) {
  const navigate = useNavigate();
  const handleClickCard = () =>
    navigate(process.env.REACT_APP_ROUTE_ITEM + `/${data.id}`);

  return (
    <div className="item-card" onClick={handleClickCard}>
      {false ? (
        <img src={clip} className="item-card__img" alt="product-img"></img>
      ) : (
        <div className="item-card__no-img"></div>
      )}
      <div className="item-card__info">
        <div className="item-card__title">{data.title}</div>
        <div className="item-card__indicator">
          <i className="item-card__i-like"></i>
          <span className="item-card__n-like">{data.interested_cnt}</span>
          <i className="item-card__i-chat"></i>
          <span className="item-card__n-chat">99+</span>
          <span className="item-card__time">{timeConverter(data.wr_date)}</span>
        </div>
      </div>
    </div>
  );
}
