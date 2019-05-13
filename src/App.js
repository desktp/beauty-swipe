import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Card from './components/Card';
import Button from './components/Button';

import './App.css';

import { fetchProducts, rateProduct, setFilter } from './ducks';

function App({ fetchProducts, rateProduct, setFilter, products, page }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNextProduct = action => () => {
    // If we're reaching the end, fetch more products preemptively
    if ((currentProduct + 2) === products.length) {
      fetchProducts(page + 1, currentFilter);
    }

    rateProduct(products[currentProduct], action);
    setCurrentProduct(currentProduct + 1);
  };

  const handleFilterSelection = category => () => {
    // Needs to fetch from scratch with new filter;
    setFilter(category);

    if (currentFilter === category) return setCurrentFilter('');
    setCurrentFilter(category);
  }

  return (
    <>
      <header className={s.header}>
        Beauty Swipe
      </header>
      <main className={s.contentContainer}>
        {
          products.length <= 0 ?
            <p>Loading...</p> :
            <>
              <div>
                <input type="checkbox" name="eyeshadow" value="eyeshadow" checked={currentFilter === 'eyeshadow'} onChange={handleFilterSelection('eyeshadow')} />
                <label htmlFor="eyeshadow" onClick={handleFilterSelection('eyeshadow')}>Eyeshadow</label>
                <input type="checkbox" name="concealer" value="concealer" checked={currentFilter === 'concealer'} onChange={handleFilterSelection('concealer')} />
                <label htmlFor="concealer" onClick={handleFilterSelection('concealer')}>concealer</label>
                <input type="checkbox" name="foundation" value="foundation" checked={currentFilter === 'foundation'} onChange={handleFilterSelection('foundation')} />
                <label htmlFor="foundation" onClick={handleFilterSelection('foundation')}>foundation</label>
                <input type="checkbox" name="lipstick" value="lipstick" checked={currentFilter === 'lipstick'} onChange={handleFilterSelection('lipstick')} />
                <label htmlFor="lipstick" onClick={handleFilterSelection('lipstick')}>lipstick</label>
                <input type="checkbox" name="blush" value="blush" checked={currentFilter === 'blush'} onChange={handleFilterSelection('blush')} />
                <label htmlFor="blush" onClick={handleFilterSelection('blush')}>blush</label>
              </div>
              <Card product={products[currentProduct]} />
              <div>
                <Button text="Dislike" onClick={handleNextProduct('dislike')} />
                <Button text="Like" onClick={handleNextProduct('like')} />
              </div>
            </>
        }
      </main>
    </>
  );
}

const mapState = ({ loading, products, page }) => ({ loading, products, page });

const mapDispatch = { fetchProducts, rateProduct, setFilter };

export default connect(mapState, mapDispatch)(App);
