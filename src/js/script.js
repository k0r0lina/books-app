{
  'use strict';
  
  // RENDERING BOOK ELEMENTS //
  
  // Prepare references to the template and the .books-list
  const template = document.getElementById('template-book').innerHTML;
  const booksList = document.querySelector('.books-list');
  
  // Add the render function
  function render() {
    // Iterate through each book in dataSource.books
    dataSource.books.forEach(book => {
      // Generate HTML code based on the template and data of the specific book
      const generatedHTML = Handlebars.compile(template)(book);
  
      // Generate a DOM element based on the generated HTML code
      const bookElement = utils.createDOMFromHTML(generatedHTML);
  
      // Append the generated DOM element as a new child to the .books-list
      booksList.appendChild(bookElement);
    });
  }
  
  
  // CALL FUNCTIONS //
  render();
  initActions();
  

  // ADD TO FAVORITES FUNCTION //
  
  const favoriteBooks = [];
  
  function initActions() {
    // Select all book images
    const bookImages = document.querySelectorAll('.book__image');
  
    bookImages.forEach(bookImage => {
      // Add double click event listener to each book image
      bookImage.addEventListener('dblclick', function(event) {
        // Prevent default behavior of double click (like selecting text)
        event.preventDefault();
  
        // Get the id of the book from data-id attribute
        const bookId = parseInt(event.target.getAttribute('data-id'));
  
        // Toggle the 'favorite' class on double click
        this.classList.toggle('favorite');
  
        // Check if the book is already in favorites
        const index = favoriteBooks.indexOf(bookId);
  
        // If book is already in favorites, remove it; otherwise, add it
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
        } else {
          favoriteBooks.push(bookId);
        }
  
      });
    });
  }}