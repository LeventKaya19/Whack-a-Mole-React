import React from "react"

function GameInfo(props){
    return(
        <div className="game-info">
            <div>
                <ul>
                    <li>Moles whacked: {props.molesHit}</li>
                    <li>Moles missed: {props.molesMissed}</li>
                    <li>
                        <label>Times to miss:
                            <input
                                type="text"
                                pattern="[0-9]*"
                                style={{width:"50px"}}
                                value={props.maxMolesMissed}
                                onChange={props.onChange}
                            />
                        </label>
                    </li>
                    <li><p>{props.maxMolesMissed}</p></li>
                </ul>
            </div>
        </div>
    )
}

export default GameInfo