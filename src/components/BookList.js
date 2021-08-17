import React, { Component } from "react";
import BookItem from "./BookItem";
import PropTypes from "prop-types";
export default class BookList extends Component {
  render() {
    const { books, shelf, handleBookUpdate } = this.props;
    return (
      <ol className="books-grid">
        {books.length !== 0 ? (
          !!shelf && shelf !== "" ? (
            books
              .filter((book) => book.shelf === shelf)
              .map((book, index) => (
                <BookItem
                  key={index}
                  book={book}
                  handleBookUpdate={handleBookUpdate}
                />
              ))
          ) : (
            books.map((book, index) => (
              <BookItem
                key={index}
                book={book}
                handleBookUpdate={handleBookUpdate}
              />
            ))
          )
        ) : (
          <li>
            <p>Nothing is here!!!</p>
          </li>
        )}
      </ol>
    );
  }
}
BookList.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string,
  handleBookUpdate: PropTypes.func.isRequired,
};
