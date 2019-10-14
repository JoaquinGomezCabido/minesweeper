import React from "react";
import Board from "./Board";

class Game extends React.Component {
	state = {
		playing: false,
	};

	startGame = () => {
		this.setState({ playing: true });
	};

	finishGame = () => {
		this.setState({ playing: false });
	};

	render() {
		return (
			<div className="game">
				{this.state.playing ? (
					<Board finishGame={this.finishGame} />
				) : (
					<button onClick={this.startGame}>Start Game</button>
				)}
			</div>
		);
	}
}

export default Game;
