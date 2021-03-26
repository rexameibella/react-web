import React, {useEffect, useState} from 'react';

import useStates from "../../scripts/states";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const theme = createMuiTheme({
	overrides: {
	}
});

const useStyles = makeStyles(theme => ({
}));


export const RemoteDataTextField = (props) => {
	const [state, actions] = useStates();

	const [text, setText] = useState(null);

	const classes = useStyles();

	useEffect(() => {
		if(!text) {
			getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-');
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			{props.spanTag ? <span title={'Click to Reload Value'} style={{cursor: 'pointer', textAlign: 'center', width: '100%', height: '100%'}} onClick={e => getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-')}>
				{text && props.prefix ? <span>{props.prefix}</span> : ''}
				{text}
				{text && props.suffix ? <span>{props.suffix}</span> : ''}
				{text ? '' : <CircularProgress style={{width: '12px', height: '12px'}} color="primary" />}
			</span> : <div title={'Click to Reload Value'} style={{cursor: 'pointer', textAlign: 'center', width: '100%', height: '100%'}} onClick={e => getTextData(actions, setText, props.path, props.nullText ? props.nullText : '-')}>
			{text && props.prefix ? <span>{props.prefix}</span> : ''}
			{text}
			{text && props.suffix ? <span>{props.suffix}</span> : ''}
			{text ? '' : <CircularProgress style={{width: '12px', height: '12px'}} color="primary" />}
		</div>}
		</ThemeProvider>
	);
};

function getTextData(actions, setText, path, nullText) {
	setText(null);
	actions.get(path, null).then(res => {
		setText(res.data.text ? res.data.text : nullText);
	}).catch(function (error) {
		console.error(error);

		setTimeout(() => {
			getTextData(actions, setText, path);
		}, 2000);
	});
}

export default RemoteDataTextField;
