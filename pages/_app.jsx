import React, { Fragment } from "react";
import App from "next/app";
import Head from "next/head";
import tachyons from "tachyons";
import Navbar from "../components/Navbar";

/**
 * App component used by Next.js. Used to render the Navbar component in every page, and to inject tachyons and global styles
 */
class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const {
      query: { q }
    } = router;
    return (
      <Fragment>
        <Head>
          <title key="title">Entrevista Mercado Libre</title>
        </Head>
        <Navbar initialQuery={q} />
        <Component {...pageProps} />
        <style jsx global>
          {tachyons}
        </style>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css?family=Lato:400,700&display=swap");

          html,
          body {
            height: 100%;
          }
          body {
            font-family: "Lato", sans-serif;
            background-color: #ebebeb;
          }
          .bg-mercado {
            background-color: #fff159;
          }
          .animate {
            transition: all 100ms ease-in-out;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default MyApp;
