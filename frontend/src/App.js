// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Modal from './components/Modal';
import { getBooks, addBook, updateBook, deleteBook } from './services/bookService';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [keyword, currentPage]);

  const fetchBooks = async () => {
    const { data } = await getBooks(keyword, currentPage);
    setBooks(data.books);
    setTotalPages(data.bookCount/15+1);
  };

  const handleAddBook = async (book) => {
    if (currentBook) {
      await updateBook(currentBook._id, book);
    } else {
      await addBook(book);
    }
    fetchBooks();
    setCurrentBook(null);
    setModalOpen(false);
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setModalOpen(true);
  };

  const handleDeleteBook = async (id) => {
    try{
      await deleteBook(id);
      fetchBooks();
    }
    catch{
      alert('you not permision')
    }
    
  };

  const openModal = (book = null) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentBook(book);
    setModalOpen(true);
  };

  return (
    <div className="App">
      <Navbar keyword={keyword} setKeyword={setKeyword} onAddBook={openModal} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <div className="container">
            <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} user={user} />
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)}>
                  Page no.{index + 1} 
                </button>
              ))}
            </div>
            {user && (
              <button className="add-button" onClick={() => openModal()}>Add Book</button>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <BookForm onSubmit={handleAddBook} book={currentBook} />
            </Modal>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default App;
