import { useState } from "react";
import * as BookAPI from "../BookAPI";

const Book = ({ book, onUpdateBook }) => {
  const [shelf, setShelf] = useState(book.shelf != null ? book.shelf : "None");

  const authors = book.authors != null ? book.authors.join(", ") : "";

  const onChangeShelf = (value) => {
    setShelf(value);

    const updateShelf = async () => {
      const res = await BookAPI.update(book.id, value);
    };
    updateShelf();

    const newBook = book;
    newBook.shelf = value;
    onUpdateBook(newBook);
  };

  return (
    <div className="book-card">
      <img src={`${book.imageLinks.thumbnail}`} width={140} height={180} />
      <br></br>
      <b>{book.title}</b>
      <br></br>
      <label>{authors}</label>
      <br></br>
      <select
        defaultValue={shelf}
        onChange={(event) => onChangeShelf(event.target.value)}
      >
        <option disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="None">None</option>
      </select>
    </div>
  );
};

export default Book;
