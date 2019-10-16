import fetch from "cross-fetch";

export default async (req, res) => {
  const { q } = req.query;
  const { results, filters } = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?limit=4&q=${q}`
  ).then(res => res.json());

  const formattedResults = results.map(result => {
    const {
      id,
      title,
      condition,
      thumbnail,
      shipping,
      price,
      currency_id
    } = result;
    const { free_shipping } = shipping;
    return {
      id,
      title,
      condition,
      price: {
        currency: currency_id,
        amount: price,
        decimals: 2
      },
      free_shipping,
      picture: thumbnail
    };
  });

  const categoryFilters = filters.find(({ id }) => id === "category");
  const categories = categoryFilters
    ? categoryFilters.values[0].path_from_root.map(({ name }) => name)
    : [];

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      author: { name: "Gaston", lastName: "Flores" },
      items: formattedResults,
      categories
    })
  );
};
