const greeting = document.querySelector(".greeting");
const hour = new Date().getHours();
const addBookBtn = document.querySelector(".book-btn");
const bookContainer = document.querySelector(".book-container");
const bookInformation = document.querySelector(".book-information");
const addBtn = document.querySelector(".button");
const bookCards = document.querySelector(".main-card");
const bookName = document.querySelector(".book-name");
const authorName = document.querySelector(".author-name");
const pagesRead = document.querySelector(".pages-read");
const books = document.querySelector(".books");
const author = document.querySelector(".authors");
const pages = document.querySelector(".number-of-pages");

bookCards.style.display = "none";

if (hour < 12) {
  greeting.innerHTML = "Good Morning!!";
} else if (hour < 17) {
  greeting.innerHTML = "Good Afternoon!!!";
} else {
  greeting.innerHTML = "Good Night!!";
}

let booksArray = JSON.parse(localStorage.getItem("books")) || [];

window.onload = () => {
  if (booksArray.length > 0) {
    bookCards.style.display = "flex";
  }
  booksArray.forEach((book) => createCard(book));
};

addBookBtn.addEventListener("click", () => {
  bookContainer.style.display = "none";
  bookInformation.style.display = "block";
});

addBtn.addEventListener("click", () => {
  bookContainer.style.display = "block";
  bookInformation.style.display = "none";
  bookCards.style.display = "block";
  bookCards.style.flexWrap = "wrap";
  bookCards.style.display = "flex";

  const newBook = {
    name: bookName.value,
    author: authorName.value,
    pages: pagesRead.value,
    isRead: false,
  };

  booksArray.push(newBook);

  localStorage.setItem("books", JSON.stringify(booksArray));

  bookName.value = "";
  authorName.value = "";
  pagesRead.value = "";

  createCard(newBook);
});

function createCard(book) {
  const card = document.createElement("div");
  card.className = "book-cards";
  card.innerHTML = `<div class="info" id="book">Book Name: <span class="books">${
    book.name
  }</span></div>

  <div class="info" id="author">Author Name: <span class="authors">${
    book.author
  }</span></div>

  <div class="info" id="pages">Pages Read: <span class="number-of-pages">${
    book.pages
  }</span></div>

  <div class="update">
    <button class="butt read-btn">${book.isRead ? "Unread" : "Read"}</button>
    <button class="butt delete-btn">Delete</button>
  </div>`;

  bookCards.appendChild(card);

  const readBtn = card.querySelector(".read-btn");
  const deleteBtn = card.querySelector(".delete-btn");

  if (book.isRead) {
    card.style.backgroundColor = "rgb(49, 63, 23";
    card.style.color = "white";
  }

  readBtn.addEventListener("click", () => {
    book.isRead = !book.isRead;
    console.log("button is clicked ");

    if (book.isRead) {
      readBtn.textContent = "Unread";
      card.style.background = "rgb(49, 63, 23)";
      card.style.color = "white";
    } else {
      readBtn.textContent = "Read";
      card.style.backgroundColor = "";
      card.style.color = "";
    }

    localStorage.setItem("books", JSON.stringify(booksArray));
  });

  deleteBtn.addEventListener("click", () => {
    card.remove();
    booksArray = booksArray.filter(
      (b) =>
        !(
          b.name === book.name &&
          b.author === book.author &&
          b.pages === book.pages
        )
    );

    localStorage.setItem("books", JSON.stringify(booksArray));
  });

  return card;
}
