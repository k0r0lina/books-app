{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      images: '.book__image',
      filters: '.filters',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.bookTemplate).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.bookContainer = document.querySelector(
        select.containerOf.bookList
      );
    }

    render() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        /* generate HTML based on template */
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });

        /* create element using utils.createElementFromHTML */
        const BookElement = utils.createDOMFromHTML(generatedHTML);

        /* find book container */
        const bookContainer = document.querySelector(
          select.containerOf.bookList
        );

        /* add book to container */
        bookContainer.appendChild(BookElement);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.bookContainer.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();

          const image = event.target.offsetParent;
          const bookId = image.getAttribute('data-id');
          console.log('bookId', bookId);

          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfBook, 1);
            image.classList.remove('favorite');
          }

          console.log('favoriteBooks', thisBooksList.favoriteBooks);
        }
      );

      const booksFilter = document.querySelector(select.containerOf.filters);
      console.log('booksFilter', booksFilter);

      booksFilter.addEventListener('click', function (callback) {
        const clickedElement = callback.target;

        if (clickedElement.tagName == 'INPUT' &&clickedElement.type == 'checkbox' &&clickedElement.name == 'filter') {
          console.log('clickedElement', clickedElement);

          if (clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooksList.filters.indexOf(
              clickedElement.value
            );
            thisBooksList.filters.splice(indexOfValue, 1);
          }
        }

        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of thisBooksList.data) {
        let shouldBeHidden = false;
        const filterOfHiddenBooks = document.querySelector(
          select.containerOf.images + '[data-id = "' + book.id + '"]'
        );

        for (const filter of thisBooksList.filters) {
          if (filter === 'adults' && book.details.adults) {
            shouldBeHidden = true;
            break;
          } else if (filter === 'nonFiction' && book.details.nonFiction) {
            shouldBeHidden = true;
            break;
          } else if (filter !== 'adults' && filter !== 'nonFiction') {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden) {
          filterOfHiddenBooks.classList.add('hidden');
        } else {
          filterOfHiddenBooks.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }
  }

  new BooksList();
}