import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import FetchProducts from '../FetchProducts';
import "../styles/ProductsScreen.css";
import "../styles/Categories.css";

export default function ProductsListing({ selectedCategories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: items, loading, error } = FetchProducts(localStorage.getItem('token'), "http://localhost:8080/v1/item/", undefined);
  const [stars, setStars] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [startPage, setStartPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true);
  const { addToList } = useContext(CartContext);
  const itemsPerPage = 9;
  const pagesToShow = 3;

  const navigate = useNavigate();

  useEffect(() => {
    if (items && items.length) {
      setStars(Array(items.length).fill(false));
    }
  }, [items]);

  useEffect(() => {
    if (items && items.length && selectedCategories.length > 0) {
      const filteredItems = items.filter(item => selectedCategories.includes(item.categoria.id));
      setFilteredItems(filteredItems);
      setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
      setCurrentPage(1);
    } else {
      setFilteredItems([]);
      setTotalPages(1);
    }
    setCurrentPage(1);
    setStartPage(1);
  }, [selectedCategories, items]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPages = () => {
    if (startPage > 1) {
      setStartPage(startPage - pagesToShow);
    }
  };

  const handleNextPages = () => {
    if (startPage + pagesToShow - 1 < totalPages) {
      setStartPage(startPage + pagesToShow);
    }
  };

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleCartVisibility = () => {
    setShowCart(prevShowCart => !prevShowCart);
  };

  const updateCartItemQuantity = (item, starState, amount) => {
    const updatedCartItems = [...cartItems];
    const cartItemIndex = updatedCartItems.findIndex(
      cartItem => cartItem.upc_a === item.upc_a
    );

    if (cartItemIndex !== -1) {
      updatedCartItems[cartItemIndex] = {
        ...updatedCartItems[cartItemIndex],
        quantity: updatedCartItems[cartItemIndex].quantity + amount,
        star: starState
      };

      if (updatedCartItems[cartItemIndex].quantity <= 0) {
        updatedCartItems.splice(cartItemIndex, 1);
      }

      setCartItems(updatedCartItems);
    } else {
      if (amount > 0) {
        setCartItems(prevCartItems => [
          ...prevCartItems,
          { ...item, quantity: amount, star: starState }
        ]);
      }
    }
  };

  const handleCartFinish = (e) => {
    e.preventDefault();
    addToList(cartItems);
    navigate("/comparar");
  }

  const toggleStar = (index) => {
    setStars((prevStars) => {
      const newStars = [...prevStars];
      newStars[index] = !newStars[index];

      const itemIndex = (currentPage - 1) * itemsPerPage + index;
      const item = filteredItems[itemIndex];
      const cartItemIndex = cartItems.findIndex(cartItem => cartItem.upc_a === item.upc_a);
      if (cartItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[cartItemIndex].star = newStars[index];
        setCartItems(updatedCartItems);
      }

      return newStars;
    });
  };

  return (
    <div className="item-list-container">
      <p className="item-list-counter">{filteredItems.length} Produtos encontrados</p>
      <div className="item-list">
        {currentItems.map((item, index) => (
          <div className={`item-card categoria-${item.categoria.id}`} key={item.upc_a}>
            <div className="item-name">{item.categoria.nome}</div>
            <div className="item-star" onClick={() => toggleStar((currentPage - 1) * itemsPerPage + index)}>
              {stars[(currentPage - 1) * itemsPerPage + index] ? '★' : '☆'}
            </div>
            <div className="image-container">
              <img src={'https://via.placeholder.com/100'} alt={item.nome} />
              <div className="bottom-right-text">{item.num_grand + ' ' + item.uni_grand}</div>
            </div>
            <div className="item-name">{item.nome}</div>
            <div className="item-details">
              <span>{item.marca}</span>
              <div className="item-container-counter">
                <div className="item-counter">
                  <span>{cartItems.find(cartItem => cartItem.upc_a === item.upc_a)?.quantity || 0}</span>
                </div>
                <div className="item-buttons">
                  <button className="arrow-simple up" onClick={() => updateCartItemQuantity(item, stars[(currentPage - 1) * itemsPerPage + index], 1)}></button>
                  <button className="arrow-simple down" onClick={() => updateCartItemQuantity(item, stars[(currentPage - 1) * itemsPerPage + index], -1)}></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className={`arrow-simple left ${startPage > 1 ? 'visible' : ''}`} onClick={handlePrevPages}></button>
        <div className="pages">
        {Array.from({ length: Math.min(pagesToShow, totalPages - startPage + 1) }, (_, i) => startPage + i).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
        <button className={`arrow-simple right next ${startPage + pagesToShow - 1 < totalPages ? 'visible' : ''}`} onClick={handleNextPages}></button>
      </div>
      {cartItems.length > 0 && 
      <>
        <div className={`toggle-cart-back ${!showCart ? "hide" : ""}`}>
          <button onClick={toggleCartVisibility} className={`toggle-cart-button arrow-simple ${showCart ? "next" : "right"} `}></button>
        </div>
        <>
          {showCart && <div className="cart-sidebar">
            <h2>Seu Carrinho</h2>
            <ul>
              {cartItems.map((cartItem) => (
                <li key={cartItem.upc_a}>
                  <div className="d-flex justify-content-between">
                    <span>{cartItem.star ? '★' : '☆'}{cartItem.nome}</span>
                    <div className="d-flex align-items-center" style={{gap: "1rem"}}>
                      <span>{cartItem.quantity}</span>
                      <div className="d-flex flex-column">
                        <button className="arrow-simple up" onClick={() => updateCartItemQuantity(cartItem, cartItem.star, 1)}></button>
                        <button className="arrow-simple down" onClick={() => updateCartItemQuantity(cartItem, cartItem.star, -1)}></button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleCartFinish} className="cart-finish-button">Finalizar Compras</button>
          </div>
          }
        </>
      </>
      }
    </div>
  );
}