import React from 'react';
import ProductList from  './components/ProductList';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Our Store</h1>
      <Signup />
      <Login />
      <ProductList />
    </div>
  );
}

export default App;