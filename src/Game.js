import React from "react"
import Board from "./Board"

import GameInfo from "./GameInfo"

const BOARD_SIZE =9

class Game extends React.Component {
    constructor(){
        super()
        this.state = {
            activeState : Array(9).fill(false),
            activeQueue: [],
            molesHit:0,
            molesMissed:0,
            spawnTime:600,
            timers: Array(9).fill(null),
            maxMolesMissed:0,
        }
        this.raiseMole = this.raiseMole.bind(this)
        this.lowerMole = this.lowerMole.bind(this)
        this.lowerMoleClick = this.lowerMoleClick.bind(this)
        this.startGame = this.startGame.bind(this)
        this.stopGame = this.stopGame.bind(this)
        this.resetGame= this.resetGame.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        document.title ="Whack-a-Mole"
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    raiseMole(){    
        const upState = this.state.activeState.slice();
        if(upState.every((el)=>{ return el === true})){
            console.log("Board full returning")
            return
        }
        let rand= Math.floor(Math.random()*BOARD_SIZE)
        while(upState[rand]){
            rand= Math.floor(Math.random()*BOARD_SIZE)
        }
        var queue = this.state.activeQueue.slice()
        upState[rand]=true
        queue.push(rand) 
        console.log(queue)
        let timerID = setTimeout(()=>{
            this.lowerMole()
        },3000)
        let timerArr= this.state.timers.slice()
        timerArr[rand]=timerID
        this.setState({
            activeState:upState,
            activeQueue:queue,
            timers:timerArr
        })
    }

    lowerMole(){
        const downState = this.state.activeState.slice()
        let queue = this.state.activeQueue.slice()
        let i = queue.shift()
        downState[i]=false
        let missed = this.state.molesMissed +1 
        console.log(missed)
        console.log(this.state.maxMolesMissed)
        if(missed==this.state.maxMolesMissed){
            this.stopGame()
            return
        }
        this.setState({
            activeState:downState,
            activeQueue:queue,
            molesMissed:missed
        })
    }

    lowerMoleClick(i){
        const downState = this.state.activeState.slice()
        const timerArr = this.state.timers.slice()
        if(!downState[i]){
            return
        }
        downState[i]=false
        let queue = this.state.activeQueue.slice().filter((val)=>{
            return val!==i
        })
        clearTimeout(timerArr[i])
        timerArr[i]=null
        console.log(queue)
        let score = this.state.molesHit+1
        let newTime= this.state.spawnTime -1
        this.setState({
            activeState:downState,
            activeQueue:queue,
            molesHit:score,
            timers:timerArr,
            spawnTime:newTime,
        })
    }

    startGame(){
        this.interval = setInterval(()=>this.raiseMole(),this.state.spawnTime)
    }

    stopGame(){
        clearInterval(this.interval)
        this.resetGame()
    }

    resetGame(){
        console.log("called reset")
        this.state.timers.forEach(clearTimeout)
        this.setState({
            activeState:Array(9).fill(false),
            activeQueue:[],
            timers:Array(9).fill(null),
            molesHit:0,
            molesMissed:0
        })
    }

    handleChange(event){
        const maxMolesMissed = (event.target.validity.valid) ? event.target.value : this.state.maxMolesMissed
        this.setState({maxMolesMissed})
    }

    render() {
      return (
        <div>
            <div className="game">
                <div className="game-board">
                    <Board 
                        moleState={this.state.activeState} 
                        onClick={i=>this.lowerMoleClick(i)}
                        />
                </div>
                    <GameInfo 
                        molesHit={this.state.molesHit} 
                        molesMissed={this.state.molesMissed} 
                        maxMolesMissed={this.state.maxMolesMissed}
                        onChange={this.handleChange}
                    />
            </div>
            <div style={{display:"flex",flexDirection:"row"}}>
                <button 
                    style={{padding:"5px",margin:"10px"}}
                    onClick={this.startGame}>Start</button>
                <button 
                    style={{padding:"5px",margin:"10px"}}
                    onClick={this.stopGame}>Stop</button>
            </div>
            
        </div>
        
      );
    }
  }

export default Game