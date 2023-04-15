import React from "react";

function StatsCard({ img, item, cijena }) {
  return (
    <div className="statsCard">
      <img src={require(`./slike/${img}`)} alt="" className="statsCardImg" />

      <h3>{item}</h3>
      <p>{cijena}</p>
    </div>
  );
}

export default StatsCard;
