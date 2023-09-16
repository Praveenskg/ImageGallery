import React, { useState, useEffect } from "react";
import Gallery from "./Gallery";
import Loader from "./Loader";
import "../styles/App.css";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return <div className="App">{loading ? <Loader /> : <Gallery />}</div>;
}

export default App;
