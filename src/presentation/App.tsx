import React, { lazy, Suspense } from "react";
import { Footer } from "./components/organisms/footer/Footer";
import { NoProvider } from "./views/no_provider/NoProvider";
const Home = lazy(() => import("./views/home/Home"));

function App() {
  const providerExist = window.ethereum ? true : false;
  return (
    <div className="container-fluid normalize">
      {!providerExist ? <NoProvider></NoProvider> : <Home />}
      <Footer></Footer>
    </div>
  );
}

export default App;
