import SearchBar from "../search_bar/SearchBar";
import "./style.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <a className="header__logo" href="/">
          COMMUNITY
        </a>
        <SearchBar />
      </header>
    </>
  );
}
