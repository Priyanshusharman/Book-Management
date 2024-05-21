// src/components/BookItem.js
import React from 'react';

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Year Published: {book.yearPublished}</p>
      <button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book._id)}>Delete</button>
    </div>
  );
};

export default BookItem;
