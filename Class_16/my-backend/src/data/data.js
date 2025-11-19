// ====================================================================
// NOTE: This Books class and in-memory data are NO LONGER USED
// We have migrated to using Mongoose models for database persistence
// This code is kept here for reference only
// ====================================================================

// class Books{
//     #id
//     #title
//     #author
//     #year

//   constructor(id, title, author, year){
//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.year = year;
//   }

//   get(){
//     return {
//       id: this.id,
//       title: this.title,
//       author: this.author,
//       year: this.year,
//     }
//   }
//   set(title, author, year){
//     this.title = title
//     this.author = author
//     this.year = year
//   }
// }

// const Book1 = new Books( 1,"48 laws of Power","Jimmy", 2010);
// const Book2 = new Books( 2,"Harry Potter", "JK Rowling",  2000);
// const Book3 = new Books( 3,"Hehe", "Hululu", 2025);
// const Book4 = new Books( 4,"1984", "George Orwell", 1949);
// const Book5 = new Books( 5,"To Kill a Mockingbird", "Harper Lee", 1960);

// // In-memory data store
// let books = [ Book1, Book2, Book3, Book4, Book5];

// export {
//     books
// }