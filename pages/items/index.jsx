import React from "react";
import Container from "../../components/Container";
import fetch from "cross-fetch";
import ListItem from "../../components/ListItem";
import Breadcrumbs from "../../components/Breadcrumbs";

/**
 * Renders a list of items, based on the user query. Corresponds to the route `/items`
 */
function Items({ items, categories }) {
  return (
    <Container className="mt4">
      <Breadcrumbs className="mb3" crumbs={categories} />
      {items.map((item, key) => (
        <ListItem item={item} key={key} />
      ))}
    </Container>
  );
}

Items.getInitialProps = async ({ query }) => {
  const { q } = query;
  const { items, categories } = await fetch(
    `http://localhost:3000/api/items?q=${q}`
  ).then(res => res.json());
  return { items, categories };
};

export default Items;
