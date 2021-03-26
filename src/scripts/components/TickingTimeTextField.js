import React, {Component} from 'react';
import moment from 'moment';

class Interval extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: this.props.startTime,
		};
	}
	componentDidMount() {
		this.interval = setInterval(() => {
			if (this.props.down) {
				this.tickDown();
			} else {
				this.tickUp();
			}
		}, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	tickDown() {
		this.setState({
			time: this.state.time - 1000,
		});
	}
	tickUp() {
		this.setState({
			time: this.state.time + 1000,
		});
	}
	render() {
		let time = this.state.time;
		if (time < 0) {
			time *= -1;
		}
		return (
			<span>{formatDateHourOnly(time)}</span>
		);
	}
}

export function formatDate(datetime) {
	return moment(new Date(datetime)).format('DD MMM YYYY HH:mm:ss')
}

export function formatDateHourOnly (datetime) {
	return moment.utc(new Date(datetime)).format('HH:mm:ss');
}

export function formatDateHourOnlyLocal (datetime) {
	return moment.utc(new Date(datetime)).format('HH:mm:ss');
}
export function formatDateHourOnlyMoment (momentDate) {
	return momentDate.format('HH:mm:ss');
}