import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/allproducts');
    const data = await response.json();
    setAllProducts(data);
  };

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='product-nav'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Old Price</p>
        <p>Stock</p>
        <p>Delete</p>
      </div>

      {allproducts.map((product) => (
        <div className='product-card' key={product._id}>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>${product.new_price}</p>
          <p>${product.old_price}</p>
          <p>{product.available ? 'Available' : 'Out of stock'}</p>
          <img
            onClick={() => removeProduct(product.id)}
            src={cross_icon}
            alt='Delete'
          />
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
