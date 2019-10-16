const fetch = require("cross-fetch");
const {
  formatItemDetails,
  formatCategories
} = require("./itemDetails.formatter");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
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

    res.send({
      author: { name: "Gaston", lastName: "Flores" },
      item
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
