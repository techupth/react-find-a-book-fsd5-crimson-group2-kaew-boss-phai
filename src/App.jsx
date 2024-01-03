import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      searchBook(searchText);
    }
  }, [searchText]);

  const searchBook = async function (text) {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${text}`
      );
      setBooks(result.data.items);
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
        {books.map((book, index) => (
          <div key={index}>
            <li>{book.volumeInfo.title}</li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
