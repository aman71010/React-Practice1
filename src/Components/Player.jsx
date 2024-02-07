import { useState } from "react";

export default function Player({name, symbol, isActive, onPlayerNameChange}) {
  const [ playerName, setPlayerName ] = useState(name);
  const [ isEditing, setIsEditing ] = useState(false);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleClick() {
    if(isEditing){
      onPlayerNameChange(symbol, playerName);
    }
    setIsEditing(editing => !editing);
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        { !isEditing ? 
          <span className="player-name">{playerName}</span> : 
          <input type="text" onChange={handleChange} required value={playerName}/> 
        }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{ !isEditing ? 'Edit' : 'Save'}</button>
    </li>
  )
}