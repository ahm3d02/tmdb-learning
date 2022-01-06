import React from 'react';
import PropTypes from 'prop-types';

// Styles
import { Wrapper, Image } from './Actor.styles';

const Actor = ({ name, charcter, imageUrl }) => (
  <Wrapper>
    <Image src={imageUrl} alt='actor-thumb' />
    <h3>{name}</h3>
    <p>{charcter}</p>
  </Wrapper>
);

Actor.propTypes = {
  name: PropTypes.string,
  charcter: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default Actor;
