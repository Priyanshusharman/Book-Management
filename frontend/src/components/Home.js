import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = 'http://localhost:8000/books';
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get(`${API_URL}/?keyword=${keyword}&page=${currentPage}`);
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };
    fetchBooks();
  }, [keyword, currentPage]);

  const deleteBook = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setBooks(books.filter(book => book._id !== id));
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search books..." 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
      />
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            {user && (
              <>
                <button>Edit</button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
