import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // NO longer nedded as Square will not keep track of game state
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     value: null,
  //   }
  // }


  render() {
     // By calling this.setState from onClick handler, this tells React to re-render that Square when <button> is clicked
      // When setState is called in component, React will automatically update child components
    return (
      <button 
      className="square" 
      onClick={()=> this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares})
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

  render() {
    const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
