import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Card from './components/Card';
import Button from './components/Button';

import './App.css';

import { fetchProducts } from './ducks';

function App({ fetchProducts, products, page }) {
  const [currentProduct, setCurrentProduct] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleNextProduct = () => {
    // If we're reaching the end, fetch more products preemptively
    if ((currentProduct + 2) === products.length) {
      fetchProducts(page + 1);
    }

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
                <Button text="Dislike" onClick={handleNextProduct} />
                <Button text="Like" onClick={handleNextProduct} />
              </div>
            </>
        }
      </main>
    </div>
  );
}

const mapState = ({ loading, products, page }) => ({ loading, products, page });

const mapDispatch = { fetchProducts };

export default connect(mapState, mapDispatch)(App);
