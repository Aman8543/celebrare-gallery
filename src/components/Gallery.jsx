
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  loadFavourites,
} from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';

function Gallery() {
  // Get photos and API status from our custom hook.
  const { photos, loading, error } = useFetchPhotos();

  // Store the text entered in the search box.
  const [searchTerm, setSearchTerm] = useState('');

  // Manage favourite photo IDs using useReducer.
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavourites
  );

  // Save favourites whenever the array changes.
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Handle search input changes.
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Filter already-fetched photos by author name.
  const filteredPhotos = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search)
    );
  }, [photos, searchTerm]);

  // Tell the reducer which photo to toggle.
  function toggleFavourite(photoId) {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      payload: photoId,
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Photo Gallery
          </h1>

          <p className="mt-2 text-gray-600">
            Explore photos and save your favourites.
          </p>
        </header>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by author name..."
          aria-label="Search photos by author"
          className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {loading && (
          <div className="flex flex-col items-center py-16">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
              role="status"
              aria-label="Loading photos"
            />
            <p className="mt-4 text-gray-600">Loading photos...</p>
          </div>
        )}

        {!loading && error && (
          <p role="alert" className="py-10 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-10 text-center text-gray-600">
            No photos found. Try another author name.
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Gallery;
