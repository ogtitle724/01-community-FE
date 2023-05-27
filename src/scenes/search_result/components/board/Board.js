import "./style.css";

export default function Board({ postData, page, setPage }) {
  const posts = postData.content;

  return (
    <>
      {posts.map((post, idx) => {
        return (
          <a key={"search_" + idx} href="/post" className="search-board__a">
            <h3 className="search-board__title">{post.title}</h3>
            <section className="search-board__data-wrapper">
              <span className="search-board__category">{post.category}</span>
              <span className="search-board__date">
                {post.wr_date.slice(-8, -3)}
              </span>
            </section>
          </a>
        );
      })}
      <Nav postData={postData} page={page} setPage={setPage} />
    </>
  );
}

function Nav({ postData, page, setPage }) {
  return (
    <nav className="search-board__nav">
      <li
        className="search-board__nav-btn"
        onClick={() => {
          if (page > 1) {
            setPage(page + 1);
          }
        }}
      >
        {"<"}
      </li>
      {Array(postData.totalPages)
        .fill("")
        .map((ele, idx) => {
          return (
            <li
              className={
                "search-board__nav-btn" +
                (page === idx + 1 ? " search-board__nav-btn--focus" : "")
              }
              key={idx}
              onClick={(e) => setPage(Number(e.target.innerText))}
            >
              {idx + 1}
            </li>
          );
        })}
      <li
        className="search-board__nav-btn"
        onClick={() => {
          if (page < postData.totalPages + 1) {
            setPage(page + 1);
          }
        }}
      >
        {">"}
      </li>
    </nav>
  );
}
