import React  from "react"

function Square(props) {
    return (
    <button className="square" onClick={props.onClick}>
        {props.moleState ? <img src="https://static.pokemonpets.com/images/monsters-images-300-300/50-Diglett.png" /> : null}
    </button>
    );
  }

export default Square