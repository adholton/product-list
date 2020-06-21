import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

//dropdowns can be a button if needed
/*another option if needed:
        <div class="dropdown-menu">
          <h6 class="dropdown-header">Dropdown header</h6>
          <a class="dropdown-item" href="#">Action</a> 
          <a class="dropdown-item" href="#">Another action</a>
        </div>

From bootstrap docs:
Form controls
Textual form controls—like <input>s, <select>s, and <textarea>s—are styled with the .form-control class. Included are styles for general appearance, focus state, sizing, and more.
Be sure to explore our custom forms to further style <select>s.  

Where do we make our row? another outer div with class="row"?
 */
class SearchFilterSortBar extends Component {
  constructor(props) {
    super(props);
    console.log('Inside searchfiltersortbar constructor, props= ', props);
    //the props is an object that just contains the fetchProducts function

    //the state will contain our user search input, category selection and/or price sort selection
    this.state = {page: '1', search: '', category: '', price: '' };
    //this.componentDidMount();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.onPriceSortSelect = this.onPriceSortSelect.bind(this);
  }

  componentDidMount() {
    console.log("Inside component did mount for searchfilterbar, this.props=", this.props)
    //this.setState({ search: 'Shoes', category: 'Shoe', price: 'Highest' });
    //test for getting all products on page load
    
    this.props.fetchProducts(this.state);
  }

  onInputChange(event) {
    this.setState({ search: event.target.value });
    event.preventDefault();
  }

  onSearchButtonClick(event) {
    event.preventDefault();

    // This will fetch the products from the search input
    // the state at this point is already updated from event handler of the user typing, so we invoke the fetchProducts function (to make the api call) and then reset the state back back to its original state (clearing the search property value)
    this.props.fetchProducts(this.state);
    //this.setState({ term: '' });
  }

  //this will update the state if the user selects a category. Then the fetchProducts function will make the api call for the selected category's products
  // look up how to know when user selects an option..
  onCategorySelect(event) {
    this.setState({ category: event.target.value }, () => {
      console.log('State inside onCategorySelect:', this.state)
      this.props.fetchProducts(this.state);
  })
  event.preventDefault();
}

  // this will update the state if the user selects a price sort option (highest to lowest, and vice versa)
  // since we have query parameters for price sorting, I'm thinking this will also make an api call based on the user's selection
  // research the way our handler will be invoked, is it onChange? where will I put the handler in the jsx below?
  onPriceSortSelect(event) {
    this.setState({ price: event.target.value }, () => {
      console.log('State inside priceSortSelect:', this.state)
      this.props.fetchProducts(this.state);
    });
   // this.props.fetchProducts(this.state.price);
   event.preventDefault();
  }
  


  render() {
    return (
      <form className="form-inline">
        <label className="ml-2 mr-2" htmlFor="exampleFormControlInput1">Search</label>
        <input value={this.state.search} onChange={this.onInputChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
        <button onClick={this.onSearchButtonClick} type="submit" className="btn btm-primary">Search</button>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectCategory">Filter by Category: </label>
        <select onChange={this.onCategorySelect} className="form-control custom-select" id="inlineFormCustomSelectCategory">
          <option defaultValue="All">All</option>
          <option value="Baby">Baby</option>
          <option value="Books">Books</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
          <option value="Tools">Tools</option>
          <option value="Kids">Kids</option>
          <option value="Home">Home</option>
          <option value="Garden">Garden</option>
          <option value="Automotive">Automotive</option>
          <option value="Toys">Toys</option>
          <option value="Beauty">Beauty</option>
          <option value="Computers">Computers</option>
          <option value="Sports">Sports</option>
          <option value="Shoes">Shoes</option>
          <option value="Games">Games</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Electronics">Electronics</option>
          <option value="Industrial">Industrial</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Health">Health</option>
          <option value="Outdoors">Outdoors</option>
        </select>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectSort">Sort by Price: </label>
        <select onChange={this.onPriceSortSelect} className="form-control custom-select" htmlFor="inlineFormCustomSelectSort">
          <option selected>Sort Type</option>
          <option value="Highest">Price: Low to High</option>
          <option value="Lowest">Price: High to Low</option>
        </select>
      </form>
    );
  }
}

// the only action we're binding is fetchProducts. This function is wrapped in a dispatch call and will dispatch an action to our reducer
// we're invoking the fetchProducts action creator every time the user submits the search input, chooses a category or chooses a price sort. 
// this is the component is accessing the fetchProducts prop
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

// We pass in null (placeholder) as the first connect argument because we're only dispatching from this component.
// There is no mapStateToProps because we're not displaying any data in this component
export default connect(null, mapDispatchToProps)(SearchFilterSortBar);