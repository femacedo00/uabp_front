import React, { useState, useEffect } from 'react';
import "../styles/ProductsScreen.css";
import FetchProducts from '../FetchProducts';

export default function Carousel({ onSelectCategories }) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { data, loading, error } = FetchProducts(localStorage.getItem('token'), "http://localhost:8080/v1/categoria/", undefined);

  useEffect(() => {
    if (data) {
      const categories = data.map(item => item.id);
      setSelectedCategories(categories);
      onSelectCategories(categories);
    }
  }, [data]);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 5;
      return newIndex >= data.length ? data.length - 5 : newIndex;
    });
  };

  const toggleCategory = (categoryId) => {
    let updatedCategories;
    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      updatedCategories = [...selectedCategories, categoryId];
    }
    setSelectedCategories(updatedCategories);
    onSelectCategories(updatedCategories);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  return (
    <>
      <button className="carousel-button" onClick={handlePrevClick}></button>
      <div className="carousel-track-container">
        <div className="carousel-track" style={{ transform: `translateX(-${startIndex * 100 / 5}%)` }}>
          {data.map((item) => (
            <div className={`carousel-item categoria-${item.id} ${!selectedCategories.includes(item.id) ? 'not-selected' : ''}`} key={item.id} onClick={() => toggleCategory(item.id)}>
              <img src={`/img/categories/${item.nome}.png`} alt={item.id} />
              <span>{item.nome}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNextClick}></button>
    </>
  );
}