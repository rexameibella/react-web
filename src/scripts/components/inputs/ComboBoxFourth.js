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
				padding: '7px 8px '
			}
		},
		MuiSelect: {
			selectMenu: {
				fontSize: '13px'
			}
		}
	}
});

let inProgress = false;
let isInitial = true;
let lastParentValue = undefined;

export const ComboBoxSecondary = (props) => {
	const [state, actions] = useStates();

	useEffect(() => {
		isInitial = true;
		lastParentValue = undefined;

		if(props.defaultValue) {
			actions.setState(props.dataName + 'SelectedValue', props.defaultValue);
		}

		actions.setState(state[props.parentDataName + 'SelectedValue'], undefined);
	}, []);

	if(state[props.parentDataName + 'SelectedValue'] !== undefined && !inProgress) {
		if(lastParentValue !== state[props.parentDataName + 'SelectedValue']) {
			lastParentValue = state[props.parentDataName + 'SelectedValue'];

			inProgress = true;

			isInitial = false;

			actions.get(props.dataUrl + '?' + 'parentId' + '=' + state[props.parentDataName + 'SelectedValue'], props.dataName).then(data => {
				inProgress = false;

				for(let i = 0; i < state[props.dataName].length; i++) {
					if(state[props.dataName][i].value === state[props.dataName + 'SelectedValue']) {
						actions.setState(props.dataName + 'SelectedValue', '############');

						break;
					}
				}
			});
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<div style={{marginBottom: '38px'}}>
				<TextField
					select
					disabled={!state[props.dataName]}
					value={state[props.dataName + 'SelectedValue'] ? state[props.dataName + 'SelectedValue'] : props.defaultValue}
					style={{margin: '0px 0px 5px 0px', fontSize: '14px', width: props.width ? props.width : '200px', position: 'absolute'}}
					margin="normal"
					variant="outlined"
					onChange={(event) => {
						actions.setState(props.dataName + 'SelectedLabel', event.nativeEvent.target.innerText);
						actions.handleInputChange(props.dataName + 'SelectedValue', event);
					}}>
					<MenuItem key={props.dataName + 'Empty'} value={'############'}>
						<b>Empty</b>
					</MenuItem>
					{state[props.dataName] && state[props.dataName].length > 0 ? state[props.dataName].map(option => (
						<MenuItem key={props.dataValue ? option[props.dataValue] : option.value} value={props.dataValue ? option[props.dataValue] : option.value}>
							{props.dataLabel ? option[props.dataLabel] : option.label}
						</MenuItem>
					)) : null}
				</TextField>
				<CircularProgress style={{width: '15px', height: '15px', position: 'absolute', marginTop: '14px', marginLeft: '8px', display: (isInitial || state[props.dataName] ? 'none' : 'block')}} />
			</div>
		</ThemeProvider>
	);
};

export default ComboBoxSecondary;
