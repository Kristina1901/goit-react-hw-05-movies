import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';

const HomePage = lazy(() =>
  import('./HomePage' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('./MovieDetailsPage' /* webpackChunkName: "movie-details-page" */),
);
const MoviesPage = lazy(() =>
  import('./MoviesPage' /* webpackChunkName: "movies-page" */),
);
const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews" */),
);

export const App = () => {
  return (
    <>
     <Navigation />

      <Suspense fallback={<div>Download...</div>}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviesPage />} />

          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
     
    </>
   
  );
};
