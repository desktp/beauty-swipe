import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Card from './components/Card';
import Button from './components/Button';

import './App.css';

import { fetchProducts, rateProduct } from './ducks';

function App({ fetchProducts, rateProduct, products, page }) {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNextProduct = action => () => {
    // If we're reaching the end, fetch more products preemptively
    if ((currentProduct + 2) === products.length) {
      fetchProducts(page + 1);
    }

    rateProduct(products[currentProduct], action);
    setCurrentProduct(currentProduct + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        Beauty Swipe
      </header>
      <main>
        {
          products.length <= 0 ?
            <p>Loading...</p> :
            <>
              <Card product={products[currentProduct]} />
              <div>
                <Button text="Dislike" onClick={handleNextProduct('dislike')} />
                <Button text="Like" onClick={handleNextProduct('like')} />
              </div>
            </>
        }
      </main>
    </div>
  );
}

const mapState = ({ loading, products, page }) => ({ loading, products, page });

const mapDispatch = { fetchProducts, rateProduct };

export default connect(mapState, mapDispatch)(App);
