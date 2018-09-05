import React from 'react';

const CardImage = props => (
  <div className="cardImage">
    <img src={props.imageUrl} alt={`a picture of ${props.name}`} />
  </div>
)

export default CardImage;