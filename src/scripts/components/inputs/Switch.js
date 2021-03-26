import React, {useEffect} from 'react';

import useStates from "../../../scripts/states";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import Switch from '@material-ui/core/Switch';
import Grid from "@material-ui/core/Grid/Grid";

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

const AntSwitch = withStyles(theme => ({
	root: {
		width: 35,
		height: 20,
		padding: '2px 0px 2px 0px',
		display: 'flex',
		marginBottom: '7px'
	},
	switchBase: {
		padding: '3px 2px',
		color: theme.palette.grey[500],
		'&$checked': {
			transform: 'translateX(12px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,
			},
		},
	},
	thumb: {
		width: 18,
		height: 16,
		boxShadow: 'none',
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 20 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white,
	},
	checked: {},
}))(Switch);

export const SwitchApp = (props) => {
	const [state, actions] = useStates();

	const handleChange = name => event => {
		actions.setState(name, event.target.checked);
	};

	if(props.defaultValue && state[props.dataName] === undefined) {
		actions.setState(props.dataName, props.defaultValue);
	}

	return (
		<ThemeProvider theme={theme}>
			<AntSwitch
				checked={props.defaultValue && state[props.dataName] === undefined ? props.defaultValue : state[props.dataName]}
				value={props.dataName}
				onChange={handleChange(props.dataName)} />
		</ThemeProvider>
	);
};

export default SwitchApp;
