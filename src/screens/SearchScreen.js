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
      query: value.trim().toLowerCase(),
    }));

    BooksApi.search(value).then((res) => {
      this.setState({
        filteredBooks: Array.isArray(res) ? res : [],
      });
    });
  }

  render() {
    const { query, filteredBooks } = this.state;
    const { handleBookUpdate } = this.props;

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
