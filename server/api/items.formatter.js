const {
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
} = require("ramda");

const formatResults = applySpec({
  id: prop("id"),
  title: prop("title"),
  condition: prop("condition"),
  picture: prop("thumbnail"),
  free_shipping: path(["shipping", "free_shipping"]),
  price: applySpec({
    currency: prop("currency_id"),
    amount: prop("price"),
    decimals: always(0)
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

module.exports = { formatResults, formatCategories };
