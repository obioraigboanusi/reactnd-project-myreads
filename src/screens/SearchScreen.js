import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
import * as BooksApi from "../BooksAPI";
import PropTypes from "prop-types";

export default class SearchScreen extends Component {
  state = {
    filteredBooks: [],
    query: "",
  };

  handleQueryChange(e) {
    const { value } = e.target;

    this.setState(() => ({
      query: value,
    }));

    if (!!value.trim) {
      BooksApi.search(value).then((res) => {
        const arr = Array.isArray(res) ? this.assignShelves(res) : [];
        this.setState({
          filteredBooks: arr,
        });
      });
    }
    if (value === "") {
      this.setState(() => ({
        filteredBooks: [],
      }));
    }
  }
  assignShelves(res) {
    const checkedBooks = [];
    res.map((item) => {
      const found = this.props.books.filter((book) => book.id === item.id);
      if (found.length !== 0) {
        // console.log("found it", item.title);
        item.shelf = found[0].shelf;
        checkedBooks.push(item);
      } else {
        item.shelf = "none";
        checkedBooks.push(item);
      }
    });
    return checkedBooks;
  }
  render() {
    const { query, filteredBooks } = this.state;
    const {handleBookUpdate } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.handleQueryChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList books={filteredBooks} handleBookUpdate={handleBookUpdate} />
        </div>
      </div>
    );
  }
}

SearchScreen.propTypes = {
  books: PropTypes.array.isRequired,
  handleBookUpdate: PropTypes.func.isRequired,
};
