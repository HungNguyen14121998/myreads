import { useState } from "react";
import * as BooksAPI from "../BookAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = ({ onUpdateBook }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const updateQuery = (query) => {
    setQuery(query.trim());

    if (query === "") return;

    const searchBooks = async () => {
      const res = await BooksAPI.search(query, 10);
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
