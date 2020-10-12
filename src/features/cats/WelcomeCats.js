import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function WelcomeCats() {
  return (
    <div className="cats-welcome-cats">
      Component content: cats/WelcomeCats
      <h1>Yes</h1>
      <Link to="cats/randomCat">Afficher un chat random</Link>
      <p>
        <img src={require('../../images/scottish.jpg')} alt="chot" />
      </p>
    </div>
  );
};

WelcomeCats.propTypes = {};
WelcomeCats.defaultProps = {};
