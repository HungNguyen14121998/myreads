import { useEffect, useState } from "react";
import * as BooksAPI from "../BookAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = ({ onUpdateBook }) => {
  const [query, setQuery] = useState("");
  const [deboucedValue, setDeboucedValue] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const delayInputTimeout = setTimeout(() => {
      setDeboucedValue(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeout);
  }, [query, 1000]);

  const updateQuery = (query) => {
    setQuery(query);

    if (query === "") return;

    const searchBooks = async () => {
      const res = await BooksAPI.search(query, 10);

      // handle case invalid search
      if (res?.error) {
        setBooks([]);
        return;
      }

      const oldBooks = JSON.parse(localStorage.getItem("books"));

      // handle shelf same with main page
      res.forEach((b) => {
        oldBooks.forEach((oldBook) => {
          if (b.id === oldBook.id) {
            let index = res.indexOf(b);
            res[index] = oldBook;
          }
        });
      });
      setBooks(res);
    };

    searchBooks();
  };

  return (
    <div>
      <Link to="/">Close</Link>
      <input
        className="search-books"
        type="text"
        placeholder="Search Books"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
      <hr></hr>
      <div className="list-books">
        {query !== "" &&
          books.map((book) => {
            return (
              <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;
