import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState(0);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    searchBook();
  }, [searchText]);

  const searchBook = async () => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchText
        )}`
      );
      setBooks(result.data.items || []);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div className="App">
      <label htmlFor="search-text">search:</label>
      <input id="search-text" type="text" onChange={handleSearchTextChange} />
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
