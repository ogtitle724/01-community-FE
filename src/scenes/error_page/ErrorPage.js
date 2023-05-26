import { useRouteError } from "react-router-dom";

import "./style.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="error-page">
      <section className="error-page__wrapper">
        <h1 className="error-page__title">404 Not Found :(</h1>
        <a className="error-page__btn-home" href="/">
          Home
        </a>
      </section>
    </main>
  );
}
