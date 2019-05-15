import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from './components/Spinner';
import Card from './components/Card';
import Button from './components/Button';
import FilterBar from './components/FilterBar';

import './root.css';
import s from './App.module.css';

import { fetchProducts, rateProduct, setFilter } from './ducks';

const filterOptions = ['eyeshadow', 'concealer', 'foundation', 'lipstick', 'blush'];

function App({ fetchProducts, rateProduct, setFilter, products, ratedProducts, page, loading }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('');

  // Passing an empty array to the second arg makes this behave
  // like componentDidMount
  useEffect(() => {
    fetchProducts();
  }, []); // eslint-disable-line

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
          products.length <= 0 || loading ?
            <Spinner /> :
            <>
              <FilterBar
                opts={filterOptions}
                handleFilterSelection={handleFilterSelection}
                currentFilter={currentFilter}
              />
              <div className={s.likeCounter}>
                <div className={`${s.likeWrapper} ${s.dislike}`}>
                  <span>
                    {ratedProducts.dislike.length}
                  </span>
                </div>
                <div className={s.likeWrapper}>
                  <span>
                    {ratedProducts.like.length}
                  </span>
                </div>
              </div>
              <Card product={products[currentProduct]} />
              <div className={s.buttonWrapper}>
                <Button text="dislike" onClick={handleNextProduct('dislike')} />
                <Button text="like" onClick={handleNextProduct('like')} />
              </div>
            </>
        }
      </main>
    </>
  );
}

const mapState = ({ loading, products, ratedProducts, page }) => ({ loading, products, ratedProducts, page });

const mapDispatch = { fetchProducts, rateProduct, setFilter };

export default connect(mapState, mapDispatch)(App);
