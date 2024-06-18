import React, { useState } from "react";
import "../styles/ProductsScreen.css";

import Carousel from "./Carousel.js";
import ProductsListing from "./ProductsListing.js";

export default function ProductsScreen() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelectCategories = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="container">
      <div className="inner-rectangle">
        <div className="carousel-container">
          <Carousel onSelectCategories={handleSelectCategories}/>
        </div>
        <div className="item-list-container">
          <ProductsListing selectedCategories={selectedCategories}/>
        </div>
      </div>
    </div>
  );
}