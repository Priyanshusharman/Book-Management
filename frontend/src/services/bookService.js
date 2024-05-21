import axios from 'axios';

const apiUrl = 'http://localhost:8000/books/'; // Confirm this base URL is correct
const API_URL = `${apiUrl}`; // Adjusted for potential redundancy

export const getBooks = async (keyword, page) => {
  try {
    return await axios.get(`${API_URL}?keyword=${keyword}&page=${page}`);
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error; // Re-throw error to handle it in calling function
  }
};

export const addBook = async (book) => {
  try {
    return await axios.post(API_URL, book,{withCredentials: true});
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBook = async (id, book, ) => {
  try {
    return await axios.put(`${API_URL}/${id}`, book,{withCredentials: true});
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(`${API_URL}${id}`,{withCredentials: true});
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
