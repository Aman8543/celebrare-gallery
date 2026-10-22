
function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={isFavourite}
          className={`shrink-0 rounded-full p-2 text-2xl ${
            isFavourite
              ? 'text-red-500'
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
