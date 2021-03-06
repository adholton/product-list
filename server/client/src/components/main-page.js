import React from 'react';
import { Component } from 'react';
import SearchFilterSortBar from './search-filter-sort-bar'
import ProductContainer from './product-container'


/* this will be a stateless component as it is only responsible for rendering the 
   search/filter/sort bar and product container
*/   
export default class MainPage extends Component {
  render() {
    return (
      <div>
        <h1 className="header text-center mt-3 mb-3">Peculiar Products</h1>
        <SearchFilterSortBar />
        <ProductContainer />
      </div>
    );
  }
}