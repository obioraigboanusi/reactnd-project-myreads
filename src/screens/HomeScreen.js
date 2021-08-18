import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import PropTypes from "prop-types";

function HomeScreen({ shelves, books, handleBookUpdate }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf
              books={books}
              shelf={shelf}
              key={shelf}
              handleBookUpdate={handleBookUpdate}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

HomeScreen.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  handleBookUpdate: PropTypes.func.isRequired,
};

export default HomeScreen;
