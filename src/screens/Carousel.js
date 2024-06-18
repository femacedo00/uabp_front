import React, { useState } from 'react';
import "../styles/ProductsScreen.css";

const items = [
  { id: 1, categoria: 'Açougue', quant_items: 4, text: 'Itens' },
  { id: 2, categoria: 'Frios e laticínios', quant_items: 9, text: 'Itens' },
  { id: 3, categoria: 'Adega e bebidas', quant_items: 5, text: 'Itens' },
  { id: 4, categoria: 'Higiene e limpeza', quant_items: 6, text: 'Itens' },
  { id: 5, categoria: 'Hortifruti e mercearia', quant_items: 8, text: 'Itens' },
  { id: 6, categoria: 'Padaria', quant_items: 3, text: 'Itens' },
  { id: 7, categoria: 'Enlatados', quant_items: 4, text: 'Itens' },
  { id: 8, categoria: 'Cereais', quant_items: 10, text: 'Itens' },
  { id: 9, categoria: 'Rotisseria', quant_items: 1, text: 'Itens' }
];

export default function Carousel({ onSelectCategories }) {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState(items.map(item => item.id));
  onSelectCategories(selectedCategories);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => {
      const newIndex = prevIndex + 5;
      return newIndex >= items.length ? items.length - 5 : newIndex;
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

  return (
    <>
      <button className="carousel-button" onClick={handlePrevClick}></button>
      <div className="carousel-track-container">
        <div className="carousel-track" style={{ transform: `translateX(-${startIndex * 100 / 5}%)` }}>
          {items.map((item) => (
            <div className={`carousel-item categoria-${item.id} ${!selectedCategories.includes(item.id) ? 'not-selected' : ''}`} key={item.id} onClick={() => toggleCategory(item.id)}>
              <img src={`/img/categories/${item.categoria}.png`} alt={item.text} />
              <span>{item.categoria}</span>
              <p>{item.quant_items + " " + item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNextClick}></button>
    </>
  );
}