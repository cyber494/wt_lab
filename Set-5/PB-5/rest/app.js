const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
// MongoDB connection
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

// Define a schema
const bookSchema = new Schema({
  _id:String,
  title: String,
  published: Number,
  rating:Number,
  pages:Number
});

// Create a model
const Book = mongoose.model('books', bookSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// API endpoints
app.post('/books', async (req, res) => {
  // Create a new book
  const { _id, title, published, rating, pages } = req.body;
  console.log(title);
  
  const book = new Book({
    _id,
    title,
    published,
    rating,
    pages,
  });

  try {
    const result = await book.save();
    res.status(201).send({ message: 'Book inserted successfully', book: result });
  } catch (error) {
    res.status(500).send({ error: 'Failed to insert book', details: error.message });
  }
});

app.get('/books', async (req, res) => {
  // Read all books
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

app.get('/books/:id',async (req, res) => {
  // Read a book by ID

  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch book', details: error.message });
  }
});

app.put('/books/:id',async (req,res) => {
  // Update a book
  const bookId = req.params.id;
  const updates = req.body; // Expect updated fields in the request body

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates follow schema validation
    });

    if (!updatedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update book', details: error.message });
  }
});

app.delete('/books/:id',async(req,res) => {
  // Delete a book

  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res.status(200).send({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete book', details: error.message });
  }
});

app.listen(port,() => {
  console.log(`Server listening on port ${port}`);
});


//Step 5: Implement error handling and validation checks

//- Use try-catch blocks to catch and handle errors that may occur during API requests.
//- Implement validation checks to ensure that the data sent in the request body is valid and consistent with the expected format.

//Here's an updated code snippet that includes error handling and validation checks:

//const express = require('express');
//const app = express();
//const port = 3000;

app.use(express.json());
