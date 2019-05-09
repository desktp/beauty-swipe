import React from 'react';

const Card = ({ product }) => {
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.brand}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
}

export default Card;