import React, {useEffect} from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import useStates from "../../scripts/states";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Paper from "@material-ui/core/Paper/Paper";

const theme = createMuiTheme({
	overrides: {
		MuiOutlinedInput: {
			input: {
				padding: '7px',
				fontSize: '13px'
			},
			multiline: {
				padding: '5px',
				fontSize: '13px'
			}
		},
		MuiMenuItem: {
			root: {
				minHeight: '25px',
				fontSize: '13px'
			}
		}
	}
});

const useStyles = makeStyles(theme => ({
	card: {
		marginTop: '15px',
		boxShadow: '-1px 0px 2px 0px rgba(0,0,0,0.2), 2px 1px 3px 0px rgba(0,0,0,0.14), 1px 2px 1px -1px rgba(0,0,0,0.12)'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 15,
		marginBottom: '0px',
		color: 'rgba(0,0,0,0.87)'
	},
	pos: {
		marginBottom: 12,
	},
}));


export const MetricPanel = (props) => {
	const [state, actions] = useStates();

	const classes = useStyles();

	const panelHeight = (props.panelIdentity ? props.panelIdentity : '') + 'PanelHeight';

	let card = element => {
		if(element) {
			if(!state[panelHeight]) {
				actions.setState(panelHeight, element.getBoundingClientRect().height);
			}
		}
	};

	useEffect(() => {
		actions.setState({
			panelHeight: undefined
		});
	}, []);

	const styles = {...{position: 'relative', width: '100%'}, ...props.style};

	return (
		<ThemeProvider theme={theme}>
			<div ref={card} style={styles}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<div style={{padding: '10px', fontSize: '15px'}}>
							{props.title}
							{props.toolbar}
						</div>
						<Divider/>
						<div style={{padding: '10px', fontSize: '14px'}}>
							{props.children}
						</div>
					</Paper>
				</Grid>
				<div style={{display: (props.isInitialization ? 'block' : 'none'), textAlign: 'center', backgroundColor: 'rgba(200, 200, 200, 0.25)', position: 'absolute', width: '100%', top: '0px', height: state[panelHeight]}}>
					<div style={{height: '20px', marginTop: state[panelHeight] ? ((state[panelHeight] / 2) - 17.5) : 15}}>
						<CircularProgress style={{width: '20px', height: '20px'}} color="primary" /><br/>
						<span style={{fontSize: '13px', color: '#444444'}}>Please wait as we load the data...</span>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default MetricPanel;
