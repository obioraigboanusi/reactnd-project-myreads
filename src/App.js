import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import * as BooksApi from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleBookUpdate = this.handleBookUpdate.bind(this);
  }
  state = {
    books: [],
    shelves: [],
  };

  componentDidMount() {
    BooksApi.getAll().then((res) => {
      this.setState({ books: res });
      res.map((book) => {
        if (!this.state.shelves.includes(book.shelf)) {
          this.setState((prevState) => ({
            shelves: [...prevState.shelves, book.shelf],
          }));
        }
      });
    });
  }
  handleBookUpdate(book, shelf) {
    try {
      BooksApi.update(book, shelf).then((res) => {
        let updatedBook = book;
        updatedBook.shelf = shelf;
        this.setState((prevState) => ({
          books: [
            ...prevState.books.filter((item) => item.id !== updatedBook.id),
            updatedBook,
          ],
        }));
      });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const { books, shelves } = this.state;

    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => (
              <HomeScreen
                books={books}
                shelves={shelves}
                handleBookUpdate={this.handleBookUpdate}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchScreen
                books={books}
                handleBookUpdate={this.handleBookUpdate}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp;
