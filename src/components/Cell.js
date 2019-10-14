import React from "react";

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			flagged: false,
		};
	}

	handleClick = () => {
		if (this.state.clicked && !this.state.flagged) {
			return;
		} else if (this.props.flagging) {
			this.setState({ clicked: !this.state.clicked });
			this.setState({ flagged: !this.state.flagged });
		} else if (this.state.clicked === false) {
			this.setState({ clicked: true });
			if (this.props.isBomb) {
				this.props.endGame();
			} else if (!this.state.flagged) {
				this.props.updateScore();
			}
			this.props.victory();
		}
	};

	showCell = () => {
		if (this.state.clicked) {
			if (this.props.isBomb) {
				return "💥";
			} else {
				return this.props.calculateSurroundings(this.props.row, this.props.col);
			}
		}
	};

	render() {
		return (
			<div
				className={`cell ${this.state.clicked ? "inactive" : "active"}`}
				onClick={this.handleClick}
			>
				<div className={`text value-${this.showCell()}`}>
					{this.state.flagged ? "🌝" : this.showCell()}
				</div>
			</div>
		);
	}
}

export default Cell;
