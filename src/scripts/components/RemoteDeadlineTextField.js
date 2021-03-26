import React, {useEffect, useState} from 'react';

import useStates from "../../scripts/states";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import moment from "moment";
import {formatDate} from "./TableApp";
import Countdown from "react-cntdwn";

const theme = createMuiTheme({
	overrides: {
	}
});

const useStyles = makeStyles(theme => ({
	countDownTimer: {
		width: 'auto',
		float: 'left'
	}
}));


export const RemoteDataTextField = (props) => {
	const [state, actions] = useStates();

	const [text, setText] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		if(!text) {
			getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-', props.inline, props, classes);
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{props.spanTag ? <span title={'Click to Reload Value'} style={{cursor: 'pointer', textAlign: 'center', width: '100%', height: '100%'}} onClick={e => getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-', props.inline, props)}>
				{text && props.prefix ? <span>{props.prefix}</span> : ''}
				{text}
				{text && props.suffix ? <span>{props.suffix}</span> : ''}
				{text ? '' : <CircularProgress style={{width: '12px', height: '12px'}} color="primary" />}
			</span> : <div title={'Click to Reload Value'} style={{cursor: 'pointer', textAlign: 'center', width: '100%', height: '100%'}} onClick={e => getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-', props.inline, props)}>
			{text && props.prefix ? <span>{props.prefix}</span> : ''}
			{text}
			{text && props.suffix ? <span>{props.suffix}</span> : ''}
			{text ? '' : <CircularProgress style={{width: '12px', height: '12px'}} color="primary" />}
		</div>}
		</ThemeProvider>
	);
};

function getTextData(actions, setText, path, nullText, inline, props, classes) {
	setText(null);
	actions.get(path, null).then(res => {
		let result = null;

		const format = {
			hour: 'hh',
			minute: 'mm',
			second: 'ss',
		};

		let duration = moment.duration(moment(res.data.text).diff(moment(new Date())));

		if(res.data.text) {
			if (duration._milliseconds > 86400000) {
				result = (
					<span style={{ color: 'black' }}>
							<span>
								{duration.humanize()}{inline ? ' ' : <br/>}remaining
							</span>
						</span>
				);
			} else if (duration._milliseconds < 0) {
				result = (props.spanTag ?
						<span style={{textAlign: 'center'}}>
							<span style={{ color: 'red' }}>
								Passed
							</span>{inline ? ' ' : <br/>}
							(<span style={{color: '#999'}}>
								{formatDate(res.data.text)}
							</span>)
				</span> : <div style={{textAlign: 'center', paddingLeft: '5px', padingRight: '5px'}}>
							<span style={{ color: 'red' }}>
								Passed
							</span>{inline ? ' ' : <br/>}
							<span style={{color: '#999'}}>
								{formatDate(res.data.text)}
							</span>
						</div>
				);
			} else if(res.data.text === '---') {
				result = (<span>
					{res.data.text}
					</span>);
			} else {
				const normalDeadline = (duration._milliseconds > 10800000) && (duration._milliseconds < 86400000);
				result = (
					<span style={{ color: normalDeadline ? 'black' : 'red' }}>
					<div>
						<div style={{width: 'auto', float: 'left'}}>
							<Countdown
								targetDate={new Date(res.data.text)}
								startDelay={500}
								interval={1000}
								format={format}
								timeSeparator={':'}
								classes={classes.countDownTimer}
								leadingZero />
						</div>
						<div style={{float: 'left', marginLeft: '5px'}}>remaining ({res.data.text ? moment(res.data.text).format("DD MMM YYYY HH:mm") : res.data.text})</div>
					</div>
				</span>
				);
			}
		} else {
			result = (
				<span>Deadline not found</span>
			);
		}

		setText(result ? result : nullText);
	}).catch(function (error) {
		console.error(error);

		setTimeout(() => {
			getTextData(actions, setText, path, inline, props);
		}, 2000);
	});
}

export default RemoteDataTextField;
