import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/TextField";
import random from "randomstring";

const theme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			input: {
				padding: '8px',
				fontSize: '13px'
			}
		},
	}
});

export const AppTextField = (props) => {
	const [state, actions] = useStates();

	const inputProps = {};

	inputProps.autoComplete = "off";

	if(props.maxLength) {
		inputProps.maxLength = props.maxLength;
	}

	let styles = {width: (props.width ? props.width : '300px'), marginBottom: '7px'};

	if(props.style) {
		styles = {...{width: (props.width ? props.width : '300px'), marginBottom: '7px'}, ...props.style};
	}

	return (
		<ThemeProvider theme={theme}>
			<TextField
				style={styles}
				variant="outlined"
				type={props.type ? props.type : 'text'}
				inputProps={inputProps}
				name={random.generate(12)}
				placeholder={props.placeHolder ? props.placeHolder : ''}
				value={state[props.dataName] ? state[props.dataName]: ''}
				onKeyDown={props.onKeyDown ? props.onKeyDown : e => {}}
			 	onChange={event => {
			 		if(props.maxLength) {
						if(event.target.value.length <= parseInt(props.maxLength)) {
							actions.setState(props.dataName, event.target.value);
						} else {
							actions.setState(props.dataName, event.target.value.slice(0, parseInt(props.maxLength)));
						}
					} else {
						actions.setState(props.dataName, event.target.value);
					}

					if(props.onChange) {
						props.onChange(event);
					}
				}} />
		</ThemeProvider>
	);
};

export default AppTextField;
