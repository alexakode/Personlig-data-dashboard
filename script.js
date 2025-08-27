const data = {
  id: "1a2b3c",
  bookTitle: "Sult",
  author: "Knut Hamsun",
  genre: "Roman",
  pages: 250,
};

const { bookTitle, author, genre, pages } = data;
console.log(`${bookTitle} av ${author}, sjanger: ${genre}, sider: ${pages}`);
