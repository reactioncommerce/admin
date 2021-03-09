import dynamic from "next/dynamic"

const AdminHome = dynamic(() => import("./admin.js"), {
  ssr: false,
})

const HomePage = () => <AdminHome />

export default HomePage;