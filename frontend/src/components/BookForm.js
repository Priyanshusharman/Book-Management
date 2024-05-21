// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, book }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setYearPublished(book.yearPublished);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, genre, yearPublished });
    setTitle('');
    setAuthor('');
    setGenre('');
    setYearPublished('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year Published"
        value={yearPublished}
        onChange={(e) => setYearPublished(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
