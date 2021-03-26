import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
	overrides: {
		MuiMenuItem: {
			root: {
				minHeight: '25px',
				fontSize: '13px'
			}
		},
		MuiOutlinedInput: {
			input: {
				padding: '7px 8px'
			}
		},
		MuiSelect: {
			selectMenu: {
				fontSize: '13px'
			}
		}
	}
});

export const ComboBox = (props) => {
	const [state, actions] = useStates();

	const options = props.preData ? props.preData : null;

	useEffect(() => {
		actions.setState(props.dataName, options);

		if(props.defaultValue) {
			actions.setState(props.dataName + 'SelectedValue', props.defaultValue);
		}
		if(props.dataUrl){
			actions.get(props.dataUrl, props.dataName);
		}
	}, []);
	console.log(props.style)
	return (
		<ThemeProvider theme={theme}>
			<div style={{marginBottom: '38px'}}>
				<TextField
					select
					disabled={!state[props.dataName]}
					value={state[props.dataName + 'SelectedValue'] ? state[props.dataName + 'SelectedValue'] : props.defaultValue}
					style={props.style ? props.style : {margin: '0px 0px 5px 0px', fontSize: '14px', width: props.width ? props.width : '200px', position: 'absolute'} }
					margin="normal"
					variant="outlined"
					onChange={(event) => {
						actions.setState(props.dataName + 'SelectedLabel', event.nativeEvent.target.innerText);
						actions.handleInputChange(props.dataName + 'SelectedValue', event);
						if(props.onChange){
							props.onChange();
						}
					}}>
					<MenuItem key={props.dataName + 'Empty'} value={'############'}>
						<b>{props.emptyLabel ? props.emptyLabel : 'Empty'}</b>
					</MenuItem>
					{state[props.dataName] && state[props.dataName].length > 0 ? state[props.dataName].map(option => (
						<MenuItem key={props.dataValue ? option[props.dataValue] : option.value} value={props.dataValue ? option[props.dataValue] : option.value}>
							{props.dataLabel ? option[props.dataLabel] : option.label}
						</MenuItem>
					)) : null}
				</TextField>
				<CircularProgress style={{width: '15px', height: '15px', position: 'absolute', marginTop: '10px', marginLeft: '8px', display: (state[props.dataName] ? 'none' : 'block')}} />
			</div>
		</ThemeProvider>
	);
};

export default ComboBox;
