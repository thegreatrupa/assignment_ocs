// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Book model schema
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  genre: String,
  // ... other fields
});

// Retrieving all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving books from the database' });
  }
});

// Adding a new book
app.post('/api/books', async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    // Validation
    if (!title || !author || !genre) {
      return res.status(400).json({ error: 'Title, author, and genre are required' });
    }

    // Checking for duplicate entry
    const existing_Book = await Book.findOne({ title });
    if (existing_Book) {
      return res.status(400).json({ error: 'This book already exists in the library' });
    }

    // Inserting new book
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding a new book' });
  }
});

// Updating book details
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  try {
    // Validation
    if (!title && !author && !genre) {
      return res.status(400).json({ error: 'At least one field (title, author, genre) must be provided for update' });
    }

    // Checking if book exists
    const existing_Book = await Book.findById(id);
    if (!existing_Book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Updating book details
    if (title) existing_Book.title = title;
    if (author) existing_Book.author = author;
    if (genre) existing_Book.genre = genre;
    
    await existing_Book.save();
    res.json({ message: 'Book details updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating book details' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
