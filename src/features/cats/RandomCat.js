import React from 'react';
import { useSearchRandomCat } from './redux/searchRandomCat';
// import PropTypes from 'prop-types';

export default function RandomCat() {
  const {
    randomCat,
    searchRandomCat,
    randomCatPending
  } = useSearchRandomCat();

  console.log(randomCat[0])

  return (
    <div className="cats-random-cat">
      Test d'utilisation d'API

      <button
        className="btn-fetch-reddit"
        disabled={randomCatPending}
        onClick={searchRandomCat}
      >
        {randomCatPending ? 'Fetching...' : 'Fetch reactjs topics'}
      </button>

        <ul className="examples-reddit-list">
          {randomCat.map(item => (
            <li key={item.data.id}>
              <a href={item.data.url}>{item.data.url}</a>
            </li>
          ))}
        </ul>

    </div>
  );
};

RandomCat.propTypes = {};
RandomCat.defaultProps = {};
