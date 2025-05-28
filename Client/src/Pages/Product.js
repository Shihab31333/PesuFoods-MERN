import React from 'react';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.img} alt={product.name} style={{ width: '50px', marginRight: '10px' }} />
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
 