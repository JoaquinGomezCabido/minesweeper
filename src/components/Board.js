import React from "react";
import "./Components.css";
import Cell from "./Cell";

class Board extends React.Component {
	state = {
		cells: [],
		score: 0,
		isAlive: true,
		flag: false,
	};

	componentDidMount() {
		let newCells = [];

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let cell = {
					row: i,
					col: j,
					isBomb: Math.floor(Math.random() * 10) < 2,
				};
				newCells.push(cell);
			}
		}

		this.setState({ cells: newCells });
	}

	updateScore = () => {
		let score = this.state.score;
		this.setState({ score: ++score });
	};

	endGame = () => {
		this.setState({ isAlive: false });
		alert(`BOOM!💥\nYour Score was ${this.state.score}`);
		this.props.finishGame();
	};

	victory = () => {
		let bombs = this.state.cells.reduce((acc, curr) => {
			return acc + (curr.isBomb ? 1 : 0);
		}, 0);

		if (this.state.score === 100 - bombs) {
			alert(`You WON!🏆\nYour Score was ${this.state.score}`);
			this.props.finishGame();
		}
		console.log(bombs);
	};

	calculateSurroundings = (row, col) => {
		let cell1 = 0;
		let cell2 = 0;
		let cell3 = 0;
		let cell4 = 0;
		let cell5 = 0;
		let cell6 = 0;
		let cell7 = 0;
		let cell8 = 0;

		if (row !== 0) {
			cell1 = !!this.state.cells.find(
				cell => cell.row === row - 1 && cell.col === col,
			).isBomb
				? 1
				: 0;

			if (col !== 9) {
				cell2 = !!this.state.cells.find(
					cell => cell.row === row - 1 && cell.col === col + 1,
				).isBomb
					? 1
					: 0;
			}
		}

		if (col !== 9) {
			cell3 = !!this.state.cells.find(
				cell => cell.row === row && cell.col === col + 1,
			).isBomb
				? 1
				: 0;

			if (row !== 9) {
				cell4 = !!this.state.cells.find(
					cell => cell.row === row + 1 && cell.col === col + 1,
				).isBomb
					? 1
					: 0;
			}
		}

		if (row !== 9) {
			cell5 = !!this.state.cells.find(
				cell => cell.row === row + 1 && cell.col === col,
			).isBomb
				? 1
				: 0;
			if (col !== 0) {
				cell6 = !!this.state.cells.find(
					cell => cell.row === row + 1 && cell.col === col - 1,
				).isBomb
					? 1
					: 0;
			}
		}

		if (col !== 0) {
			cell7 = !!this.state.cells.find(
				cell => cell.row === row && cell.col === col - 1,
			).isBomb
				? 1
				: 0;

			if (row !== 0) {
				cell8 = !!this.state.cells.find(
					cell => cell.row === row - 1 && cell.col === col - 1,
				).isBomb
					? 1
					: 0;
			}
		}

		return cell1 + cell2 + cell3 + cell4 + cell5 + cell6 + cell7 + cell8;
	};

	putFlag = () => {
		this.setState({ flag: !this.state.flag });
	};

	render() {
		return (
			<>
				<button onClick={this.putFlag}>{this.state.flag ? "🌚" : "🌝"}</button>
				<h3>{`Score: ${this.state.score}`}</h3>
				<div className="board">
					{this.state.cells.map(cell => (
						<Cell
							{...cell}
							updateScore={this.updateScore}
							endGame={this.endGame}
							calculateSurroundings={this.calculateSurroundings}
							victory={this.victory}
							flagging={this.state.flag}
							isAlive={this.state.isAlive}
							key={`${cell.col}-${cell.row}`}
						/>
					))}
				</div>
			</>
		);
	}
}

export default Board;
