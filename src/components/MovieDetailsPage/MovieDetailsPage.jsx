import { useState, useEffect, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    moviesApi.getMovieDetails(movieId).then(setFilm).catch(console.log);
  }, [movieId]);

  const onGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  return (
    <>
      <button type="button" onClick={onGoBack} className={s.btn}>
        Go back
      </button>
      {film && (
        <div className={s.card}>
          <div className={s.poster}>
            <img
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
              alt={film.title}
            />
          </div>

          <div>
            <h2>{`${film.title} (${film.release_date.slice(0, 4)})`}</h2>
            <p>User score: {film.vote_average * 10}%</p>

            <h3>Overview</h3>
            <p>{film.overview}</p>

            <h3>Genres</h3>
            <p>{film.genres.map(({ name }) => name).join(' ')}</p>
          </div>
        </div>
      )}

      <hr />

      <h4>Additional information</h4>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to={`/movies/${movieId}/cast`}
            state={{ from: location?.state?.from }}
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            state={{ from: location?.state?.from }}
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <hr />

      <Suspense fallback={<div>Download...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
