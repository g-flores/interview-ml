import React, { useState, useCallback } from "react";
import Link from "next/link";
import Router from "next/router";
import Container from "./Container";

function Navbar({ initialQuery = "" }) {
  const [search, setSearch] = useState(initialQuery);
  const handleChange = useCallback(e => {
    setSearch(e.target.value);
  }, []);
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (search === "") {
        alert("Ingrese un valor de búsqueda");
      } else {
        Router.push({ pathname: "/items", query: { q: search } });
      }
    },
    [search]
  );
  const canSubmit = search !== "";
  return (
    <nav className="bg-mercado pv2 shadow-1">
      <Container className="flex">
        <Link href="/">
          <a>
            <img src="http://static.mlstatic.com/org-img/mobile/ch/0.4.7/assets/logo-new.png" />
          </a>
        </Link>
        <form className="flex-auto flex" onSubmit={handleSubmit} disabled>
          <input
            className="flex-auto pa2 ba b--light-gray br2 br--left"
            type="search"
            name="q"
            placeholder="Nunca dejes de buscar"
            value={search}
            onChange={handleChange}
          />
          <button
            className={`ba br2 br--right pointer animate ${
              canSubmit ? "bg-blue white" : "bg-light-gray gray"
            }`}
            type="submit"
            disabled={!canSubmit}
          >
            Enviar
          </button>
        </form>
      </Container>
    </nav>
  );
}

export default Navbar;
