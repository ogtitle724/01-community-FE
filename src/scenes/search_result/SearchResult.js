import Header from "../../components/header/Header";
import Gnb from "../../components/gnb/Gnb";
import Snb from "../../components/snb/Snb";
import "./style.css";

export default function SearchResult({ domain }) {
  return (
    <div className="post-detail">
      <Header domain={domain} />
      <Gnb />
      <main className="post-detail__main"></main>
    </div>
  );
}
