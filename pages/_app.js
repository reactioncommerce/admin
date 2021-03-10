import "../styles/globals.css";
import PropTypes from "prop-types";

/**
 * Initial setup of admin home.
 * @returns {Component} initial Admin component
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object
};

export default MyApp;
