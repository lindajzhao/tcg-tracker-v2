import React from 'react';

const Emblem = (props) => {
  // const capitalType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="typeHolder">
      <label htmlFor={`${props.type}`}>
        <img 
          src={`../../../images/${props.type}.png`}
          alt={`an emblem of the type ${props.type}`}
          title={`${props.type} Type Icon`}
        />
      </label>
      <input className="hide" onChange={props.filter} type="radio" value={`${props.type}`} id={`${props.type}`} name="type" />
    </div>
  )
}

export default Emblem;
