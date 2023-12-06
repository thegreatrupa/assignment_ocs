# assignment_ocs

How to Run the Application:
Install dependencies: npm install
Start the server: npm start

Seeding the Database with Mock Data:
To seed the database, create a script or use endpoint to add mock book entries. 

Documentation for APIs:


GET /api/books

Retrieves a list of all books in the library.
Request: None
Response Format: JSON array of book objects.


POST /api/books

Adds a new book to the library.
Request Format: JSON object representing the new book.
Response: Success message or error details.


PUT /api/books/{id}

Updates details of a specific book.
Request Format: JSON object with updated book details.
Response: Success message or error details.
