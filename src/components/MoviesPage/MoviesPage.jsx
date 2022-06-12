import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filmQuery, setFilmQuery] = useState('');
  const [searchedFilms, setSearchedFilms] = useState([]);

  const searchQuery = new URLSearchParams(location.search).get('query');

  const handleChange = e => setFilmQuery(e.target.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    if (!filmQuery) return;
    navigate({ ...location, search: `query=${filmQuery}` });

    setFilmQuery('');
  };

  useEffect(() => {
    if (!searchQuery) return;
    moviesApi
      .searchMovies(searchQuery)
      .then(setSearchedFilms)
      .catch(console.log);
  }, [searchQuery]);

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <label>
          <input
            type="text"
            name="name"
            value={filmQuery}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>

      {searchedFilms && (
        <ul className={s.list}>
          {searchedFilms.map(({ id, title, poster_path }) => (
            <li key={id} className={s.item}>
              <Link to={`${id}`} state={{ from: location }} className={s.link}>
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

export default MoviesPage;
