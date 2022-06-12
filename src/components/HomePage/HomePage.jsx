import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();
  const [films, setFilms] = useState(null);

  useEffect(() => {
    moviesApi.getTrendingMovies().then(setFilms);
  }, []);

  return (
    <>
      <h1 className={s.heading}>Trending today</h1>

      {films && (
        <ul className={s.list}>
          {films.map(({ id, title, poster_path }) => (
            <li key={id} className={s.item}>
              <Link
                to={`movies/${id}`}
                state={{ from: location }}
                className={s.link}
              >
                <div className={s.img}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    alt={title}
                  />
                </div>
                <h2>{title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HomePage;
