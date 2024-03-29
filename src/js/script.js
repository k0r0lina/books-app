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
  
  
  const favoriteBooks = [];
  const filters = [];


  function initActions() {
    
    // Add click event listener to the .books-list
    booksList.addEventListener('dblclick', function(event) {

      // Check if the target element or its container has the class .book__image
      if (event.target.classList.contains('book__image') || event.target.offsetParent.classList.contains('book__image')) {
        
        // Prevent default behavior of double click
        event.preventDefault();

        // Get the id of the book from data-id attribute
        const bookId = parseInt(event.target.closest('.book__image').getAttribute('data-id'));
  
        // Toggle the 'favorite' class on double click
        event.target.closest('.book__image').classList.toggle('favorite');
  
        // Check if the book is already in favorites
        const index = favoriteBooks.indexOf(bookId);
  
        // If book is already in favorites, remove it; otherwise, add it
        if (index !== -1) {
          favoriteBooks.splice(index, 1);
        } else {
          favoriteBooks.push(bookId);
        }

        // Add event listener to the filters form
        const filtersForm = document.querySelector('.filters');
        filtersForm.addEventListener('click', function(event) {
        // Stop the propagation of the event to prevent it from being triggered multiple times
          event.stopPropagation();
          // Check if the clicked element is a checkbox in the filters form
          if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
            // Check if the checkbox is checked
            if (event.target.checked) {
              // If checked, add its value to the filters array
              const filterValue = event.target.value;
              if (!filters.includes(filterValue)) {
                filters.push(filterValue);
              }
            } else {
              // If unchecked, remove its value from the filters array
              const filterValue = event.target.value;
              const index = filters.indexOf(filterValue);
              if (index !== -1) {
                filters.splice(index, 1);
              }
            }
          }
          // Call filterBooks function after updating filters
          filterBooks();
        });
      }
    });
  }

  function filterBooks() {
    dataSource.books.forEach(book => {
      let shouldBeHidden = false;

      for(const filter of filters){
        if (filter === 'adults' && book.details.adults) {
          shouldBeHidden = true;
          break;
        } else if (filter === 'nonFiction' && book.details.nonFiction){
          shouldBeHidden = true;
          break;
        } else if (filter !== 'adults' && filter !== 'nonFiction') {
          shouldBeHidden = false;
          break;
        }
      }
      const bookImage = document.querySelector(`[data-id="${book.id}"]`);
      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    });
  }
}
