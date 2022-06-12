import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import s from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesApi.getMovieCredits(movieId).then(setActors).catch(console.log);
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul className={s.list}>
          {actors
            .filter((actor, index) => index < 10 && actor.profile_path)
            .map(({ id, name, profile_path, character }) => (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${profile_path}`}
                  alt={name}
                  width={200}
                />
                <h3>{name}</h3>
                <p>Character: {character}</p>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
