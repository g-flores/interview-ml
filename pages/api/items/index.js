import fetch from "cross-fetch";
import {
  applySpec,
  always,
  path,
  prop,
  propEq,
  compose,
  find,
  ifElse,
  isNil,
  isEmpty,
  either,
  map
} from "ramda";

const formatResults = applySpec({
  id: prop("id"),
  title: prop("title"),
  condition: prop("condition"),
  picture: prop("thumbnail"),
  free_shipping: path(["shipping", "free_shipping"]),
  price: applySpec({
    currency: prop("currency_id"),
    amount: prop("price"),
    decimals: always(2)
  })
});

/**
 * Returns `true` if a value is nil or empty
 */
const isNilOrEmpty = either(isNil, isEmpty);

/**
 * Extracts categories from filters, and if present, maps them to an array of strings
 */
const formatCategories = compose(
  map(prop("name")),
  ifElse(isNilOrEmpty, always([]), path(["values", 0, "path_from_root"])),
  find(propEq("id", "category"))
);

export default async (req, res) => {
  const { q } = req.query;
  const { results, filters } = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?limit=4&q=${q}`
  ).then(res => res.json());

  const formattedResults = results.map(formatResults);
  const categories = formatCategories(filters);

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
