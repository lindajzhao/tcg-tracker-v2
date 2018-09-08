import React from 'react';

const Emblem = ({ type }) => {
  const capitalType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="typeHolder">
      <img
        src={`../../../images/${capitalType}.png`}
        alt={`an emblem of the type ${capitalType}`}
        title={`${capitalType} Type Icon`}
      />
    </div>
  )
}

export default Emblem;
