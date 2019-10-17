import React from "react";
import Head from "next/head";
import fetch from "cross-fetch";
import Container from "../../components/Container";
import Breadcrumbs from "../../components/Breadcrumbs";
import Price from "../../components/Price";

/**
 * Displays details about an item. Corresponds to the route `/items/:id`
 */
function ItemDetail({ item }) {
  const {
    category,
    title,
    description,
    price,
    picture,
    condition,
    sold_quantity
  } = item;
  return (
    <Container className="mt4">
      <Head>
        <title key="title">Entrevista Mercado Libre - {title}</title>
      </Head>
      <Breadcrumbs className="mb3" crumbs={category} />
      <article className="bg-white">
        <header className="flex-ns">
          <img
            src={picture}
            alt={title}
            className="w-100 w-60-ns h-auto bb bn-ns b--light-gray"
          />
          <div className="w-100 w-40-ns pa4 bl-ns b--light-gray">
            <span className="f5 ttc gray">
              {condition}
              {sold_quantity > 0 && ` - ${sold_quantity} vendidos`}
            </span>
            <h1 className="f3 ma0 mt1 mb3">{title}</h1>
            <span className="f2">
              <Price {...price} />
            </span>
            <button
              className="w-100 mv3 pa3 bg-blue white bn pointer"
              type="button"
            >
              Comprar
            </button>
          </div>
        </header>
        <div className="pa4 bt b--light-gray">
          <h2 className="f4">Descripción del producto</h2>
          <p className="description">{description}</p>
        </div>
        <style jsx>{`
          .description {
            white-space: pre-wrap;
            word-break: break-word;
          }
        `}</style>
      </article>
    </Container>
  );
}

/**
 * Note that the Next.js router handles route params as if they were part of the query. Despite this page handling requests
 * to `/items/MLA810840415`, Next.js will convert it to `/items?id=MLA810840415`
 */
ItemDetail.getInitialProps = async ({ query }) => {
  const { id } = query;
  const { item } = await fetch(`http://localhost:3000/api/items/${id}`).then(
    res => res.json()
  );
  return { item };
};

export default ItemDetail;
