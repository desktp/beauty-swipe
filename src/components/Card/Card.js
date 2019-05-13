import React, { useState, useEffect } from 'react';

import Spinner from '../Spinner';

import s from './Card.module.css';

const Card = ({ product = {} }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [product])

  const handleImageLoad = () => setImgLoaded(true);

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        {
          !imgLoaded && <Spinner />
        }
        <img src={product.imageUrl} alt={product.name} style={!imgLoaded ? { display: 'none' } : undefined} onLoad={handleImageLoad}/>
      </div>
      <p className={s.productName}>{product.name}</p>
      <p>{product.brand}</p>
    </div>
  );
}

export default Card;