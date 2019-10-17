import React from "react";
import Link from "next/link";
import Price from "./Price";

function ListItem({ item }) {
  const { id, title, picture, price, free_shipping } = item;
  return (
    <Link href="/items/[id]" as={`/items/${id}`}>
      <a className="color-inherit no-underline">
        <article className="pa3 bg-white bb b--light-gray flex">
          <img src={picture} className="w4 h4 flex-shrink-0" alt={title} />
          <div className="flex-auto mh2 mh3-ns">
            <h3 className="f5 fw4 mv2">{title}</h3>
            <span className="db mb2 f4">
              <Price {...price} />
            </span>
            {free_shipping && <span className="f6 green">Envio gratis</span>}
          </div>
        </article>
      </a>
    </Link>
  );
}

export default ListItem;
