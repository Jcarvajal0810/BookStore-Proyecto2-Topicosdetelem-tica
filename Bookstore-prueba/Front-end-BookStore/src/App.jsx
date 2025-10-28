import { useState } from 'react';

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez" },
    { id: 2, title: "Don Quijote", author: "Miguel de Cervantes" },
    { id: 3, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">
          📚 BookStore App
        </h1>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Catálogo de Libros
        </h2>
        
        {/* Grid de libros */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {books.map(book => (
            <div 
              key={book.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600">
                por {book.author}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>© 2025 BookStore. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}