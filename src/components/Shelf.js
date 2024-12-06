import Book from "./Book";

const Shelf = ({ title, books, onUpdateBook }) => {
  return (
    <div>
      <h2>{title}</h2>
      <hr></hr>
      <div className="list-books">
        {books.map((book) => {
          return <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />;
        })}
      </div>
    </div>
  );
};

export default Shelf;
