import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/TextField";

const theme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			input: {
				padding: '7px 8px',
				fontSize: '13px'
			},
			multiline: {
				padding: '7px 10px'
			}
		}
	}
});

export const TextArea = (props) => {
	const [state, actions] = useStates();

	const inputProps = {};

	inputProps.autoComplete = "off";

	if(props.maxLength) {
		inputProps.maxLength = props.maxLength;
	}

	if(props.disabled) {
		inputProps.disabled = props.disabled;
	}

	let styles = {width: (props.width ? props.width : '300px'), marginBottom: '7px'};

	if(props.style) {
		styles = {...{width: (props.width ? props.width : '300px'), marginBottom: '7px'}, ...props.style};
	}

	return (
		<ThemeProvider theme={theme}>
			<TextField
				rows={props.rows ? props.rows : 5}
				style={styles}
				variant="outlined"
				inputProps={inputProps}
				multiline={true}
				placeholder={props.placeHolder ? props.placeHolder : ''}
				value={state[props.dataName] ? state[props.dataName]: ''}
				onKeyDown={(e) => {
					if(props.onKeyDown){
						props.onKeyDown(e)
					}
				}}
				onChange={event => {
					actions.setState(props.dataName, event.target.value);
				}}/>
		</ThemeProvider>
	);
};

export default TextArea;
