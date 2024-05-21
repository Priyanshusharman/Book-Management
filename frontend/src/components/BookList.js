// src/components/BookList.js
import React from 'react';

const BookList = ({ books, onEdit, onDelete,user }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book._id} className="book-item size">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Year Published: {book.yearPublished}</p>
         {user && <button onClick={() => onEdit(book)}>Edit</button>}
          {user && <button onClick={() => onDelete(book._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
};

export default BookList;
