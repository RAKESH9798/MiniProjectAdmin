import React, { useState } from 'react';
import './AddProduct.css';
import uploadArea from '../../assets/upload_area.svg';


const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        old_price:"",
        new_price:""
    })

    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }
    
    
    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;
      
        let formData = new FormData();
        formData.append('product', image);
      
        await fetch('http://localhost:4000/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            responseData = data;
          });
      
        if (responseData.success) {
          product.image = responseData.image_url;
          console.log(product);
          await fetch('http://localhost:4000/addproduct', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              data.success ? alert('Product Added') : alert('Failed');
            });
        }
      };
      

  return (
    <div className='add-product'>
      <div className="input-group">
        <label htmlFor="product-title">Product Title</label>
        <input value={productDetails.name} onChange={changeHandler} type="text" id="product-title" name='name' placeholder='Type here' />
      </div>
      <div className="input-group">
        <label htmlFor="price">Price</label>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" id="price" name='old_price' placeholder='Type here' />
      </div>
      <div className="input-group">
        <label htmlFor="offer-price">Offer Price</label>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" id="offer-price" name='new_price' placeholder='Type here' />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="category">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="upload-group">
        <label htmlFor="file-input" className="upload-label">
          <img src={image?URL.createObjectURL(image):uploadArea} alt="Upload" className='upload-img'/>
          Upload Image
        </label>
        <input onChange={imageHandler} type="file" id="file-input" name='image' hidden />
      </div>
      <button onClick={Add_Product} className='add-btn'>Add Product</button>
    </div>
  );
}

export default AddProduct
