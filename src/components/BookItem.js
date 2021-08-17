import React, { Component } from "react";
import { correctShelfName } from "../utils/Methods";
import PropTypes from "prop-types"
export default class BookItem extends Component {
  state = {
    moveBookTo: "",
  };
  handleChange(e) {
    const { value } = e.target;
    const { book, handleBookUpdate } = this.props;

    if (value !== "none" && value !== book.shelf) {
      handleBookUpdate(book, value);
    }
  }
  render() {
    const { moveBookTo } = this.state;
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${
                  !!book.imageLinks ? book.imageLinks.thumbnail : ""
                })`,
              }}
            />

            <div className="book-shelf-changer">
              <select value={moveBookTo} onChange={(e) => this.handleChange(e)}>
                <option value="">Move to...</option>
                {["currentlyReading", "wantToRead", "read", "none"].map(
                  (item) => {
                    return (
                      <option
                        value={item}
                        key={item}
                        className={
                          !!book.shelf
                            ? book.shelf === item
                              ? "active"
                              : ""
                            : ""
                        }
                      >
                        {correctShelfName(item)}
                      </option>
                    );
                  }
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {!!book.authors
              ? book.authors.map((author) => (
                  <span key={author}>{author} </span>
                ))
              : ""}
          </div>
        </div>
      </li>
    );
  }
}
BookItem.propTypes={
  book: PropTypes.object.isRequired,
  handleBookUpdate: PropTypes.func.isRequired
}