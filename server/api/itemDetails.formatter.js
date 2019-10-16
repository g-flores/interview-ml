const { applySpec, always, path, prop, compose, map } = require("ramda");

/**
 * Formats an item's details and adds its description and category
 * @param {Object} details
 * @param {String} description
 * @param {Array<String>} category
 * @returns {Object}
 */
const formatItemDetails = (details, description, category) =>
  applySpec({
    id: prop("id"),
    title: prop("title"),
    condition: prop("condition"),
    picture: prop("thumbnail"),
    free_shipping: path(["shipping", "free_shipping"]),
    sold_quantity: prop("sold_quantity"),
    description: always(description),
    category: always(category),
    price: applySpec({
      currency: prop("currency_id"),
      amount: prop("price"),
      decimals: always(2)
    })
  })(details);

/**
 * Extracts categories for the breadcrumbs from `path_from_root`
 */
const formatCategories = compose(
  map(prop("name")),
  prop("path_from_root")
);

module.exports = { formatItemDetails, formatCategories };
