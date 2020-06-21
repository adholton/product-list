import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products`;

// set action type to a variable, to prevent possible typos in reducer
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export function fetchProducts(state) {
  console.log('inside fetchProducts, this is state: ', state)
  const page = state.page;
  const search = state.search;
  const category = state.category;
  const price = state.price;
  const queryArray = [];
  if (page) {
    queryArray.push(page)
  }
  if (search) {
    queryArray.push(search)
  }
  if (category) {
    queryArray.push(category)
  }
  if (price) {
    queryArray.push(price)
  }
  console.log('queryArray: ', queryArray)
  const queryCount = queryArray.length;
  console.log('queryArray count: ', queryArray.length)

  let url = ROOT_URL;
  if (page || search || category || price) {
    url = url + '?';
    if (page) {
      url = `${url}page=${page}`;
    }
    if (search && queryCount === 1) {
      url = `${url}search=${search}`;

    } else if (search) {
      url = `${url}&search=${search}`;
    }

    if (category && queryCount === 1) {
      
      url = `${url}category=${category}`;

    } else if (category) {
      
      url = `${url}&category=${category}`;
    }
    if (price && queryCount === 1) {
      
      url = `${url}price=${price}`;

    } else if (price) {
    
      url = `${url}&price=${price}`;
    }
  }
  //const url = `${ROOT_URL}?page=${page}&query=${search}&category=${category}&price=${sort}`;
  
  console.log('url with page: ', url);
  
  //testing for loading any products on page load
  console.log('Inside actions/index.js fetchProducts function')
  //const url = `http://localhost:8000/products`
  const request = axios.get(url);
  
  // at this point the request doesn't contain the returned api data yet, it's probably still in the pending state. We need a way to set our store state until AFTER the promise is fulfilled (when the api returns data). We only want to call the reducer when the data is returned, this is where applyMiddleware comes in (see the main index.js)
  //the payload is a promise (request)
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}