import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoes from "../../asset/shoes.jpeg";
import clip from "../../asset/clip.png";
import "./style.css";

export default function Showcase({ mainEle }) {
  const [order, setOrder] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    mainEle.current.addEventListener("scroll", () => {
      console.log(
        mainEle.current.scrollHeight, // H INCLUDE SCROLL 2682
        mainEle.current.scrollTop, // TOP TO SCROLL POS ~2000
        mainEle.current.clientHeight // ELE H 682
      );
    });
  }, [order]);

  /* const handleClickBtnSearch = asyn () => {
    try {
      
    } catch {

    }
  } */

  const handleClickBtnToTop = () => {
    mainEle.current.scrollTo({
      top: 0,
      left: 0,
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
        {Array(50)
          .fill(0)
          .map(() => (
            <ItemCard></ItemCard>
          ))}
      </div>
      <button
        className="showcase__btn-to-top"
        onClick={handleClickBtnToTop}
      ></button>
    </section>
  );
}

function ItemCard() {
  const navigate = useNavigate();
  const handleClickCard = () => navigate(process.env.REACT_APP_ROUTE_ITEM);

  return (
    <div className="item-card" onClick={handleClickCard}>
      {false ? (
        <img src={clip} className="item-card__img" alt="product-img"></img>
      ) : (
        <div className="item-card__no-img"></div>
      )}
      <div className="item-card__info">
        <div className="item-card__title">(미개봉) 뉴발 993 트리플 블랙</div>
        <div className="item-card__indicator">
          <i className="item-card__i-like"></i>
          <span className="item-card__n-like">99+</span>
          <i className="item-card__i-chat"></i>
          <span className="item-card__n-chat">99+</span>
          <span className="item-card__time">3시간전</span>
        </div>
      </div>
    </div>
  );
}
