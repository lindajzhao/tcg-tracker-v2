import React from 'react';

const AttackDetails = ({ attack, i }) => {
  const { name, damage, text, cost, types } = attack;

  return (
    <div className="attackContainer" key={i}>
      <div
        className="detailsContainer"
      >
        <h3>{name}</h3>
        <h2 className="t__subheading">{damage}</h2>
      </div>
      <div className="detailsContainer t__primary">{text}</div>
      <div className="details">
        <h3 className="t__detailheading">Cost</h3>
        <div className="costContainer">
          {cost
            ? cost.map((cost, i) => (
              <div
                className="typeHolder"
                key={i}
              >
                <img
                  src={`../../../images/${cost}.png`}
                  alt={`an emblem of the type ${types}`}
                />
              </div>
            ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default AttackDetails;