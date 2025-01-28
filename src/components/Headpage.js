import React from "react";
import "../styles/Headpage.css";
export default function Headpage() {
  return (
    <div className="Headpage">
      <div className="headepage-left">
        <h1>Todo Dia Uma Nova Receita</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quod, quas, quia, quibusdam quidem quae, quia.
        </p>
        <div className="headpage-buttons-area">
          <button>Receita Aleatoria</button>
          <button>Lorem Ipson</button>
        </div>
      </div>
      <div className="headepage-right">
        <img src="/sanduiche.png" alt="hamburger" />
      </div>
    </div>
  );
}
