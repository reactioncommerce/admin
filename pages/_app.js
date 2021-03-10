import "../styles/globals.css";
import dynamic from "next/dynamic";

/**
 * Initial setup of admin home.
 * @returns {Component} initial Admin component
 */
const AdminHome = dynamic(() => import("./admin.js"), {
  ssr: false
});

const HomePage = () => <AdminHome />;

export default HomePage;
