import fetch from "cross-fetch";
import { applySpec, always, path, prop, compose, map } from "ramda";

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

export default async (req, res) => {
  try {
    const { id } = req.query;
    const [details, description] = await Promise.all([
      fetch(`https://api.mercadolibre.com/items/${id}`).then(res => res.json()),
      fetch(`https://api.mercadolibre.com/items/${id}/description`).then(res =>
        res.json()
      )
    ]);
    const { category_id } = details;
    const { plain_text } = description;

    const category = await fetch(
      `https://api.mercadolibre.com/categories/${category_id}`
    )
      .then(res => res.json())
      .then(formatCategories);

    const item = formatItemDetails(details, plain_text, category);

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        author: { name: "Gaston", lastName: "Flores" },
        item
      })
    );
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.end("Error while fetching item details");
  }
};
