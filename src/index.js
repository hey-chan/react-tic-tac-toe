import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// CHANGING from class components to function components
// A much easier process than class components
// Also less tedious

function Square(props){
  return (
    <button 
    className="square"
    onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      // Each time a player moves, xIsNext (boolean) will be flipped to determine which player goes next and the game's state will be saved
    
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();

    // We can change Board handleClick function to return early by ignoring a click if someone has won a game or Square is already filled
    if (calculateWinner(squares) || squares[i]){
      return;
    }


    // Changes from X and O from each click
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
    // AS square is no longer maintaining state, the Square components receive value from Board components and inform them when they're clicked
    // Ie. these are now controlled components, as Board now has full control over them
  }


  renderSquare(i) {
    // We need to change what happens when square is clicked
    // And also create a way for Square to update Board state
    // To do so; we'll pass a function from Board to Square
    // Square will call that function when square is clicked
    return <Square 
    value={this.state.squares[i]}
    onClick={() => this.handleClick(i)} // We will need to define handleClick or app will crash
    />;
  }

  // Will display text indicating player's turn
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = 'Next player' + (this.state.xIsNext ? 'X' : 'O')
    }
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// Determining winner based on possition
// Returns 'x', 'o' or null as appropriate
function calculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i=0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares [a] === squares[c]){
      return squares [a]
    }
  }
  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
