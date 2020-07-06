import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import PageNumber from './page-numbers'

/* in this component, the user will be able to click on a page number and see a new set of
 products render (if there is more than one page of products), so there will need to be a
 fetch call accessible (See mapDispatchToProps). Outgoing data will be the page number and
 the current query settings. Incoming product data will be limited to the products on the 
 new page
*/
class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {page: '1', search: '', category: '', price: '', productsCount: '' };
   
    this.onPageClick = this.onPageClick.bind(this);
   
  }

  /* When the user clicks a page number, the state that was mapped to this component and 
     the new page number will be used to make a new request with 'same query data-different
     page number'. The original query data was saved in the headers and added to the props
     through MapStateToProps. Fetch products is used as a callback to ensure the 
     asynchronous setSet is completed before fetching the next page of products
  */   
  onPageClick(event) {
    const page = event.target.innerHTML.toString();
    const originalData = this.props.products[2].split(', ');
    this.setState({ page: page, search: originalData[0], category: originalData[1], price: originalData[3]}, () => {
      this.props.fetchProducts(this.state);
   });
  }

  render() {
   /* the total number of products is sent back in the response and we're accessing it here
      in order to calculate and show the correct number of pages on the display
   */   
    const productsCount = this.props.products[1];
   
    const pageNumbers = [];
    let pageNumber = 1;
    pageNumbers.push(<PageNumber key={pageNumber} page={pageNumber} />)
    for (let i = 1; i < productsCount; i++) {
      if (i % 9 === 0) {
        pageNumber++;
        pageNumbers.push(
          <PageNumber key={pageNumber} page={pageNumber} />
        )
      }
    }


    return (
      <div className="row justify-content-center">
        <table className="table w-auto">
          <tbody><tr onClick={this.onPageClick} className="pages">{pageNumbers}</tr></tbody>
        </table>
      </div>
    )
  }
}


/* From this pagination component, we're invoking the fetchPage action creator every time
   the user clicks a page number, which calls our api to return the products for that page
*/
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

/* this component also needs to receive the persisted state, so the query doesn't change
   when a new page is clicked. Also we will need the total number of products from the
   search, so it can render the appropriate number of pages at the bottom of the screen
*/
function mapStateToProps({ products }) {
  return { products };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);