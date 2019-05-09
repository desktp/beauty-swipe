import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import { fetchProducts } from './ducks';

function App({ fetchProducts }) {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const mapState = ({ loading, products }) => ({ loading, products });

const mapDispatch = { fetchProducts };

export default connect(mapState, mapDispatch)(App);
