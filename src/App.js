import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage";
import * as BooksAPI from "./BookAPI";
import SearchPage from "./components/SearchPage";

function App() {
  const [books, setBooks] = useState([]);

  const updateBooksShelf = (book) => {
    let bookInMainPage = books.find((b) => b.id === book.id);
    if (bookInMainPage != null) {
      // 1. case in main page
      let newBooks = books.filter((b) => b.id !== book.id);
      newBooks.push(book);
      setBooks(newBooks);
      localStorage.setItem("books", JSON.stringify(books));
    } else {
      // 2. case in search page
      setBooks([...books, book]);
      localStorage.setItem("books", JSON.stringify([...books, book]));
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("books"));

    if (data) {
      setBooks(data);
    } else {
      const getBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks(res);
        localStorage.setItem("books", JSON.stringify(res));
      };

      getBooks();
    }
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MainPage books={books} onUpdateBook={updateBooksShelf}></MainPage>
        }
      />
      <Route
        path="/search"
        element={<SearchPage onUpdateBook={updateBooksShelf}></SearchPage>}
      />
    </Routes>
  );
}

export default App;
