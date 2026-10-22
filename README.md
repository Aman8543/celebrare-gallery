# Celebrare Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS as part of the Celebrare Frontend Intern pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API
- Displays loading and error states
- Responsive photo grid
- Real-time search by author name
- Favourite photos managed using `useReducer`
- Favourites persisted using `localStorage`
- Custom `useFetchPhotos` hook
- Uses `useCallback` and `useMemo`

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Picsum Photos API

## Getting Started

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd celebrare-gallery
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## API

https://picsum.photos/v2/list?limit=30

## Author

Created for the Celebrare Frontend Intern assignment.
