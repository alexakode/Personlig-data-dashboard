/* User data assignment: personlig datadashboard
Bygg en applikasjon som håndterer og manipulerer brukerdata ved hjelp av localStorage. Skal kunne lagre, filtrere, sortere og analysere data på en effektiv måte.
Lag et personlig datadashboard hvor brukeren kan lagre og organisere informasjon relatert til en bestemt hobby, prosjekt eller personlig interesse. Eksempler:
* Treningsplanlegger/-logg
* boklesing: holde oversikt over leste bøker, favorittsjangre og anbefalinger
film- eller serieliste: logge filmer og serier som er sett, og gi vurdering
* oppskirftarkiv: en matlagingsapp der brukeren kan lagre og organisere oppskrifter etter kategori og ingredienser
* kunstportefølje: en digital oversikt over tegninger, malerier eller digitale verk.

Du skal bruke metoder som map(), filter(), sort() og reduce() for å manipulere og presentere dataene på en brukervennlig måte. I tillegg anbefales det å bruke destructuring for å hente ut relevante verdier fra objekt og arrays på en effektiv måte.

== Krav til funksjonalitet: ==
1. Legge til data:
- Brukeren skal kunne legge inn nye dataelement med relevant informasjon
- data lagres i localStorage

2. Oppdatering og markering:
- brukeren skal kunne oppdatere eller endre et eksisterende dataelement
- eventuelt markere element som favoritt, anbefalt eller en annen passende status.

3. Sletting av data:
- brukeren skal kunne slette et enkelt dataelement eller alle elementer

4. Filtrering og sortering:
- bruk filter() for å la brukeren filtrere element basert på spesifikke kriterier
- bruk sort() for å gi brukeren mulighet til å sortere data, f.eks. alfabetisk, etter dato eller annen relevant kategori

5. Statistikk og analyse (bonusoppgave)
* bruk reduce() for å generere en oppsummering av dataene, f.eks. total tid brukt på trening eller antall bøker lest per sjanger

6. Bruk av destructuring:
* bruk destructuring for å hente ut data fra objekt og arrays. 
* eksempel:
*/
const data = {
  id: "1a2b3c",
  bookTitle: "Sult",
  author: "Knut Hamsun",
  genre: "Roman",
  pages: 250,
};

const { bookTitle, author, genre, pages } = data;
console.log(`${bookTitle} av ${author}, sjanger: ${genre}, sider: ${pages}`);

/*
==Tekniske krav==
* Bruk localStorage til å lagre.
* Bruk map(), filter(), sort(), reduce() til å manipulere dataene.
* Bruk destructuring for enklere datahåndtering.
* Bruk event listeners for å håndtere input.
* Lag en enkel, men intuitiv UI der data kan legges til, vises, filtreres og slettes.
*/
function saveBook(book) {
  // hent bøker fra localstorage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  //   legg til ny bok
  books.push(book);
  //   lagre tilbake
  localStorage.setItem("books", JSON.stringify(books));
  return books;
}
function displayBooks() {
  let books = JSON.parse(localStorage.getItem("books")) || [];

  const genreFilter = document
    .querySelector("#genreFilter")
    .value.trim()
    .toLowerCase();
  if (genreFilter) {
    books = books.filter((book) =>
      book.genre.toLowerCase().includes(genreFilter)
    );
  }
  const statusFilter = document.querySelector("#status").value;
  if (statusFilter) {
    books = books.filter((book) => book.status === statusFilter);
  }
  const sortOption = document.querySelector("#sortOption").value;
  switch (sortOption) {
    case "title":
      books.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "author":
      books.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case "year":
      books.sort((a, b) => a.year - b.year);
      break;
  }

  const list = document.querySelector("#book-list");
  list.innerHTML = "";
  books.forEach((book) => {
    const item = document.createElement("li");
    const statusText = book.status === "read" ? " har lest" : " vil lese";
    item.textContent = `${book.title} av ${book.author} er en ${book.genre}bok utgitt i ${book.year} som jeg ${statusText}.`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Slett";
    deleteButton.addEventListener("click", () => {
      deleteBook(book.id);
    });
    list.appendChild(deleteButton);
    list.appendChild(item);
  });
}
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const book = Object.fromEntries(formData);
  book.id = Date.now().toString();
  saveBook(book);
  displayBooks();
});
function deleteBook(bookId) {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const updatedBooks = books.filter((book) => book.id !== bookId);
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  displayBooks();
}
document.querySelector("#delete-book").addEventListener("click", () => {
  const bookId = document.querySelector("#book-id").value;
  deleteBook(bookId);
});
document.querySelector("#genreFilter").addEventListener("input", displayBooks);
document.querySelector("#sortOption").addEventListener("change", displayBooks);
