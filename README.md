# Mercado Libre Interview

## Project setup

### Development
```
yarn install
yarn dev
```

### Production
```
yarn install
yarn build
yarn start
```

## Technologies used
* [Next.js](https://github.com/zeit/next.js/) - Server-side rendering for React. Includes routing, [styled-jsx](https://github.com/zeit/styled-jsx).
* [Tachyons](http://tachyons.io/) - Atomic CSS framework.
* [Ramda](https://ramdajs.com/) - Functional library for JS.
* [Express.js](https://expressjs.com/)

## Notes

### Server-client separation

Requests for both client pages and API endpoints are both handled by the same Express server at the moment. In order for the project to scale properly, the client and API should be separated.

### Next.js routing

The Next.js server determines which page to serve based on the structure of the `pages` folder. In this way, `pages/index.jsx` corresponds to the `/` route, and `pages/items/[id].jsx` corresponds to `/items/:id`. 

The Next router also differs from Express in that URL parameters such as `id` in `/items/:id` are passed as query parameters to the page. You can see an example of this in the `pages/items/[id].jsx` page.