import fetch from "cross-fetch";

export default async (req, res) => {
  const { id } = req.query;
  const [details, description] = await Promise.all([
    fetch(`https://api.mercadolibre.com/items/${id}`).then(res => res.json()),
    fetch(`https://api.mercadolibre.com/items/${id}/description`).then(res =>
      res.json()
    )
  ]);
  const {
    title,
    condition,
    thumbnail,
    shipping,
    price,
    currency_id,
    category_id,
    sold_quantity
  } = details;
  const { free_shipping } = shipping;
  const { plain_text } = description;

  const category = await fetch(
    `https://api.mercadolibre.com/categories/${category_id}`
  )
    .then(res => res.json())
    .then(({ path_from_root }) => path_from_root.map(({ name }) => name));

  const item = {
    id,
    title,
    condition,
    price: {
      currency: currency_id,
      amount: price,
      decimals: 2
    },
    free_shipping,
    sold_quantity,
    picture: thumbnail,
    description: plain_text,
    category
  };

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      author: { name: "Gaston", lastName: "Flores" },
      item
    })
  );
};
