import { useState, useEffect } from 'react';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4500/catalog';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center">
          📚 Libreria Telematica
        </h1>
      </header>

      <main className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Catálogo de Libros
          </h2>
          <button
            onClick={fetchBooks}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            🔄 Recargar
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Cargando libros...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
            <h3 className="font-bold mb-2">Error al cargar los libros</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map(book => (
              <div 
                key={book._id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {book.image && (
                  <img 
                    src={book.image} 
                    alt={book.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {book.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  por {book.author}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {book.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${book.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {book.countInStock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No hay libros en el catálogo</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>© 2025 BookStore. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}