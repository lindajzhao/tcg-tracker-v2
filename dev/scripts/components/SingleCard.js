import React from 'react';
import CardImage from './CardImage';

const SingleCard = props => (
  <div className="SingleCard">
    <h3>{props.data.name}</h3>
    <CardImage
      imageUrl={props.data.imageUrl}
      name={props.data.name}
    />
  </div>
);

export default SingleCard;
