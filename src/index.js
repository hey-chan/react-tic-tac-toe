import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// CHANGING from class components to function components
// A much easier process than class components
// Also less tedious

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // NO LONGER NEEDED due to history state
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //     // Each time a player moves, xIsNext (boolean) will be flipped to determine which player goes next and the game's state will be saved

  //   }
  // }

  

  renderSquare(i) {
    // We need to change what happens when square is clicked
    // And also create a way for Square to update Board state
    // To do so; we'll pass a function from Board to Square
    // Square will call that function when square is clicked
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} // We will need to define handleClick or app will crash
      />
    );
  }

  // Will display text indicating player's turn
  render() {

    // NOT NEEDED AS THIS IS NOW RENDERED FROM GAME COMPONENT
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = `Winner: ${winner}`;
    // } else {
    //   status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    // }

    return (
      <div>
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
  // CREATING history log of moves. First step: create history state in top level Game component
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  // At this point, Board component only needs renderSquare and render methods
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // THIS WILL update the stepNUmber
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }


  render() {
    // Updates Game component render function to use most recent history to determine and display game status
    const history = this.state.history;
    // Rendering currently selected move according to stepNumber
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // mapping over history
    // ITERATING over history array:
    //  step variable: current history element value
    //  move variable: current history index
    //  step will not be assigned to anything
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    // As Game component now renders game status, we can remove corresponding code from Board render

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
// Determining winner based on possition
// Returns 'x', 'o' or null as appropriate
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


