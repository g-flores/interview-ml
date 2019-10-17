const fetch = require("cross-fetch");
const { formatResults, formatCategories } = require("./items.formatter");

/**
 * Handles requests made to the `/api/items` endpoint
 */
module.exports = async (req, res) => {
  try {
    const { q } = req.query;
    const { results, filters } = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?limit=4&q=${q}`
    ).then(res => res.json());

    const formattedResults = results.map(formatResults);
    const categories = formatCategories(filters);
    res.send({
      author: { name: "Gaston", lastName: "Flores" },
      items: formattedResults,
      categories
    });
  } catch (e) {
    console.error("[itemsHandler] Error while fetching items: ", e);
    res.sendStatus(500);
  }
};
