import React from "react";
import fetch from "cross-fetch";
import Container from "../../components/Container";
import Breadcrumbs from "../../components/Breadcrumbs";
import Price from "../../components/Price";

/**
 * Displays details about an item.
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
      <Breadcrumbs className="mb3" crumbs={category} />
      <div className="bg-white">
        <div className="flex-ns">
          <img src={picture} className="w-100 w-70-ns h-auto" />
          <div className="pa3">
            <span className="f5 ttc gray">
              {condition} - {sold_quantity} vendidos
            </span>
            <h1 className="f4 ma0 mt1 mb3">{title}</h1>
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
        </div>
        <div className="pa3">
          <h2 className="f4">Descripción del producto</h2>
          <p className="pre-wrap">{description}</p>
        </div>
        <style jsx>{`
          .pre-wrap {
            white-space: pre-wrap;
          }
        `}</style>
      </div>
    </Container>
  );
}

ItemDetail.getInitialProps = async ({ query }) => {
  const { id } = query;
  const { item } = await fetch(`http://localhost:3000/api/items/${id}`).then(
    res => res.json()
  );
  return { item };
};

export default ItemDetail;
