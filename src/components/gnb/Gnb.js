import "./style.css";

const category = [
  "HOME",
  "BEST",
  "유머",
  "게임/스포츠",
  "연예/방송",
  "여행",
  "취미",
  "경제/금융",
  "시사/이슈",
];

export default function Gnb() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="gnb">
      {category.map((item, idx) => {
        return (
          <a href="/" className="gnb__a" onClick={(e) => handleClick(e)}>
            {item}
          </a>
        );
      })}
    </nav>
  );
}
