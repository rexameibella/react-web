import React, {useEffect} from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";

import useStates from "../../scripts/states";
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

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


export const Panel = (props) => {
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
		actions.setState(panelHeight, undefined);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div ref={card} style={{position: 'relative'}}>
				<Card className={classes.card} style={{width: props.width ? props.width + 'px' : '50%', position: 'relative'}}>
					<CardContent style={{padding: '0px'}}>
						<div style={{padding: '7px 15px'}}>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								{props.title}
							</Typography>
						</div>
						<Divider/>
						<div style={{padding: '35px 25px 25px 25px'}}>
							{props.children}
						</div>
					</CardContent>
					<Divider style={{display: (props.withoutFooter ? 'none' : 'block')}}/>
					<CardActions style={{padding: '8px 12px', display: (props.withoutFooter ? 'none' : 'block')}}>
						<Grid
							justify="space-between"
							container
							spacing={4}>
							<Grid item>
								<Link to={props.backButtonLink} style={{textDecoration: 'none'}}>
									<Button size="small" variant="outlined" flex={'1'}><span style={{marginTop: '-3px', marginRight: '5px'}}>&laquo;</span> {props.backButtonText}</Button>
								</Link>
							</Grid>
						</Grid>
					</CardActions>
				</Card>
				<div style={{display: (props.isInitialization ? 'block' : 'none'), textAlign: 'center', backgroundColor: 'rgba(200, 200, 200, 0.25)', position: 'absolute', width: props.width ? props.width + 'px' : '50%', top: '0px', height: state[panelHeight]}}>
					<div style={{height: '20px', marginTop: state[panelHeight] ? ((state[panelHeight] / 2) - 17.5) : 15}}>
						<CircularProgress style={{width: '20px', height: '20px'}} color="primary" /><br/>
						<span style={{fontSize: '13px', color: '#444444'}}>Please wait as we load the data...</span>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Panel;
