import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

const MainPage = ({ books, onUpdateBook }) => {
  const currentReadingBooks = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  const readBooks = books.filter((book) => book.shelf === "read");

  return (
    <div>
      <div>
        <div className="header">
          <h1>My Reads</h1>
        </div>
        <Shelf
          title={"Currently Reading"}
          books={currentReadingBooks}
          onUpdateBook={onUpdateBook}
        ></Shelf>
        <Shelf
          title={"Want To Read"}
          books={wantToReadBooks}
          onUpdateBook={onUpdateBook}
        ></Shelf>
        <Shelf
          title={"Read"}
          books={readBooks}
          onUpdateBook={onUpdateBook}
        ></Shelf>
      </div>
      <Link to="/search" className="search-button">
        Search
      </Link>
    </div>
  );
};

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
};

export default MainPage;
