import React from 'react';

import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import '../App.sass';
import {iconFactory} from "../utils/IconFactory";
import Button from '@material-ui/core/Button';
import PopupState, {bindPopper, bindToggle} from "material-ui-popup-state";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import useStates from "../states";
import {Link} from "react-router-dom";

const styles = theme => ({});

export const Page = (props) => {
  const [state, actions] = useStates();

	let styles = {};

	if(props.style) {
		styles = {...{}, ...props.style};
	}

  return (
    <main className="pageContainer" style={{backgroundColor: '#ffffff'}}>
      <div className="pageTitleBar">
        <div className="pageTitleSection">
          <Grid container direction="row" alignItems="center">
            <Grid item style={{paddingRight: '10px'}}>
              {iconFactory('Bookmarks', 20, '#444444')}
            </Grid>
            <Grid item>
              <Typography className="pageTitle" style={{marginRight: '15px'}}>{props.title}</Typography>
            </Grid>
						{props.actions && props.actions.map((action) => (
							action.type === 'ComboMenu' ?
								<Grid key={action.name} item>
									<PopupState variant="popper" popupId="demo-popup-popper">
										{popupState => (<div>
											<Button style={{fontWeight: 'bold', color: '#3367d6', marginRight: '5px', fontSize: '0.75rem'}} {...bindToggle(popupState)}>
												{action.icon ? iconFactory(action.icon, '1.35rem', '#3367d6', {marginRight: '7px'}) : ''} {action.name}
												<ArrowDropDownIcon viewBox={'0 0 16 16'} style={{fontSize: '1.35rem', marginRight: '6px', marginTop: '-12px'}} />
											</Button>
											<Popper {...bindPopper(popupState)} transition placement={'bottom'}>
												{({TransitionProps, placement}) => (
													<Grow {...TransitionProps} style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
														<Paper>
															<MenuList style={{paddingTop: '1px', paddingBottom: '1px'}}>
																{action.actions.map((subAction) => (
																	subAction.link ? <Link style={{textDecoration: 'none', color: '#333'}} to={subAction.link}>
																			<MenuItem key={'SubMenu' + Math.random()} style={{minWidth: '150px', fontSize: '0.8rem', padding: '5px 15px', minHeight: '20px'}}>
																				{subAction.name}
																			</MenuItem></Link> :
																		<MenuItem key={'SubMenu' + Math.random()} onClick={(event) => subAction.handler(state[props.dataName + 'Selected'], event)} style={{minWidth: '150px', fontSize: '0.8rem', padding: '5px 15px', minHeight: '20px'}}>
																			{subAction.name}
																		</MenuItem>
																))}
															</MenuList>
														</Paper>
													</Grow>
												)}
											</Popper>
										</div>)}
									</PopupState>
								</Grid> :
								<Grid key={action.name} item>
									{action.link ?
										<Link style={{textDecoration: 'none', color: '#333', pointerEvents: 'visible'}} to={action.link}>
											<Button size="small" color="primary" style={{fontWeight: 'bold', color: '#3367d6', marginRight: '5px', fontSize: '0.75rem'}}>
												{action.icon ? iconFactory(action.icon, '1.35rem', '#3367d6', {marginRight: '7px'}) : ''} {action.name}
											</Button>
										</Link> : <Button onClick={(event) => action.handler(state[props.dataName + 'Selected'], event)} size="small" color="primary" style={{fontWeight: 'bold', color: '#3367d6', marginRight: '5px', fontSize: '0.75rem'}}>
											{action.icon ? iconFactory(action.icon, '1.35rem', '#3367d6', {marginRight: '7px'}) : ''} {action.name}
										</Button>}
								</Grid>
						))}
          </Grid>
        </div>
        <Divider />
      </div>
      <div>
        <div className="pageContent">
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default Page;
