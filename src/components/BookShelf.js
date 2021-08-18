import React from "react";
import BookList from "./BookList";
import { correctShelfName } from "../utils/Methods";
import PropTypes from "prop-types";

function BookShelf({ shelf, books, handleBookUpdate }) {
  
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{correctShelfName(shelf)}</h2>
        <div className="bookshelf-books">
          {books === [] ? (
            <p>Nothings is here bro!!!</p>
          ) : (
            <BookList
              books={books}
              shelf={shelf}
              handleBookUpdate={handleBookUpdate}
            />
          )}
        </div>
      </div>
    );
  }

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  handleBookUpdate: PropTypes.func.isRequired,
};
export default BookShelf
