import React, {useEffect} from "react";

import {Link} from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

import TextField from '../components/inputs/TextField';

import {
  ExpandLess,
  ExpandMore
} from '@material-ui/icons';

import {iconFactory} from '../utils/IconFactory';
import useStates from "../states";
import UtilsCookie from "../utils/Cookie";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const SidebarApp = (props) => {
  const [state, actions] = useStates();

	useEffect(() => {
		actions.setState("sidebarAppMenus", props.menus);
	}, []);

  let sideBarMenuEntries = [];

  const searchMenus = (event) => {
  	if(event.target.value && event.target.value !== '') {
			let filteredMenus = [];

			for(let i = 0; i < props.menus.length; i++) {
				const menu = props.menus[i];

				const resultedMenu = {
					name: menu.name,
					icon: menu.icon,
				};

				if(menu.link) {
					resultedMenu.link = menu.link;
				}

				if(menu.subMenus) {
					for(let j = 0; j < menu.subMenus.length; j++) {
						const subMenu = menu.subMenus[j];

						if(subMenu && subMenu.name.toLowerCase().includes(event.target.value.toLowerCase())) {
							if(!resultedMenu.subMenus) {
								resultedMenu.subMenus = [];
							}

							resultedMenu.subMenus[j] = {
								name: subMenu.name,
								icon: subMenu.icon,
								link: subMenu.link,
							};
						}
					}

					if(resultedMenu.subMenus && resultedMenu.subMenus.length > 0) {
						filteredMenus[i] = resultedMenu;
					} else if(menu.name.toLowerCase().includes(event.target.value.toLowerCase())) {
						for(let j = 0; j < menu.subMenus.length; j++) {
							const subMenu = menu.subMenus[j];

							if(!resultedMenu.subMenus) {
								resultedMenu.subMenus = [];
							}

							resultedMenu.subMenus[j] = {
								name: subMenu.name,
								icon: subMenu.icon,
								link: subMenu.link,
							};
						}

						filteredMenus[i] = resultedMenu;
					}
				} else {
					if(menu.name.toLowerCase().includes(event.target.value.toLowerCase())) {
						filteredMenus[i] = menu;
					}
				}
			}

			actions.setState("sidebarAppMenus", filteredMenus);
		} else {
			actions.setState("sidebarAppMenus", props.menus);
		}
	};

  if(state.sidebarAppMenus) {
		let subMenuIndex = 0;
		for (const [index, value] of state.sidebarAppMenus.entries()) {
			if(value && value.subMenus) {
				const sideBarSubMenuEntries = [];

				for (const [subMenuIndex, valueSubMenus] of value.subMenus.entries()) {
					if(valueSubMenus) {
						sideBarSubMenuEntries.push(<Link title={valueSubMenus.name + (valueSubMenus.counterData && state[valueSubMenus.counterData.data] ? ' (' + state[valueSubMenus.counterData.data] + ')' : '')} onClick={() => actions.handleDrawerMenuClick()} key={"subMenu" + index + "_" + subMenuIndex} style={{textDecoration: 'none', color: '#333'}} to={valueSubMenus.link}>
							<ListItem style={{paddingLeft: state.drawerOpen ? '51px' : '16px', paddingTop: state.drawerOpen ? '8px' : '0px', paddingBottom: state.drawerOpen ? '8px' : '0px'}} button className={props.classes.nested}>
								{!state.drawerOpen && <ListItemIcon style={{minWidth: '35px'}}>
									{iconFactory(valueSubMenus.icon, 20)}
								</ListItemIcon>}
								<ListItemText style={{height: !state.drawerOpen ? 35 : 'inherit', paddingLeft: 5}} classes={{primary:props.classes.listItemText}} inset primary={valueSubMenus.name} />
								{!valueSubMenus.counterData ? '' : (state.appIsLoaded || (valueSubMenus.counterData && state[valueSubMenus.counterData.data] !== null) ? '' : <CircularProgress style={{width: '12px', height: '12px'}} />)}
								{valueSubMenus.counterData && state[valueSubMenus.counterData.data] !== null ? <span style={{backgroundColor: (valueSubMenus.counterData.backgroundColor ? valueSubMenus.counterData.backgroundColor : '#2196f3'), color: (valueSubMenus.counterData.textColor ? valueSubMenus.counterData.textColor : 'white'), padding: '5px', borderRadius: '5px', fontSize: '12px'}}>{state[valueSubMenus.counterData.data]}</span> : (valueSubMenus.counterData && state[valueSubMenus.counterData.data] === null && state.appIsLoaded ? <span style={{backgroundColor: (valueSubMenus.counterData.backgroundColor ? valueSubMenus.counterData.backgroundColor : '#2196f3'), color: (valueSubMenus.counterData.textColor ? valueSubMenus.counterData.textColor : 'white'), padding: '5px', borderRadius: '5px', fontSize: '12px', marginLeft: '5px'}}>...</span> : '')}
							</ListItem>
						</Link>);
					}
				}

				const subMenuName = 'subMenu' + subMenuIndex;
				sideBarMenuEntries.push(<div key={"menu" + index}>
					<ListItem style={{paddingTop: state.drawerOpen ? '8px' : '0px', paddingBottom: state.drawerOpen ? '8px' : '0px'}} title={value.name} button onClick={() => actions.handleClick(subMenuName)}>
						<ListItemIcon style={{minWidth: '35px'}}>
							{iconFactory(value.icon, 20)}
						</ListItemIcon>
						<ListItemText style={{paddingLeft: 5}} classes={{primary:props.classes.listItemText}} inset primary={value.name} />
						{state[subMenuName] ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={(state.appSearchMenus && state.appSearchMenus !== '') || state[subMenuName]} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{sideBarSubMenuEntries}
						</List>
					</Collapse>
				</div>);

				if(!state.openInStartSubMenus) {
					actions.setState('openInStartSubMenus', subMenuName);
				}

				subMenuIndex++;
			} else {
				if(value) {
					sideBarMenuEntries.push(<Link title={value.name + (value.counterData && state[value.counterData.data] ? ' (' + state[value.counterData.data] + ')' : '')} onClick={() => actions.handleDrawerMenuClick()} key={"menu" + index} style={{textDecoration: 'none', color: '#333'}} to={value.link}>
						<ListItem style={{paddingTop: state.drawerOpen ? '8px' : '8px', paddingBottom: state.drawerOpen ? '8px' : '8px'}} button>
							<ListItemIcon style={{minWidth: '35px'}}>
								{iconFactory(value.icon, 20)}
							</ListItemIcon>
							<ListItemText style={{paddingLeft: 5, height: !state.drawerOpen ? 25 : 'inherit'}} classes={{primary:props.classes.listItemText}} primary={value.name} />
							{!value.counterData ? '' : (state.appIsLoaded || (value.counterData && state[value.counterData.data] !== null) ? '' : <CircularProgress style={{width: '12px', height: '12px'}} />)}
							{value.counterData && state[value.counterData.data] !== null ? <span style={{backgroundColor: (value.counterData.backgroundColor ? valueSubMenus.counterData.backgroundColor : '#2196f3'), color: (value.counterData.textColor ? valueSubMenus.counterData.textColor : 'white'), padding: '5px', borderRadius: '5px', fontSize: '12px'}}>{state[value.counterData.data]}</span> : (value.counterData && state[value.counterData.data] === null && state.appIsLoaded ? <span style={{backgroundColor: (value.counterData.backgroundColor ? valueSubMenus.counterData.backgroundColor : '#2196f3'), color: (value.counterData.textColor ? valueSubMenus.counterData.textColor : 'white'), padding: '5px', borderRadius: '5px', fontSize: '12px', marginLeft: '5px'}}>...</span> : '')}
						</ListItem>
					</Link>);
				}
			}
		}
	}

	const handleSignOut = () => {
		actions.handleMenuClose();

		actions.openConfirmation('Attention', 'Are you sure to logout?', function() {
			actions.closeConfirmation();

			actions.openProgress('Logging you out...');

			actions.get('auth/signOut', 'signOutApp').then(data => {
				actions.closeProgress();

				UtilsCookie.deleteCookie("timer");
        		UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			}).catch(function (error) {
				actions.closeProgress();

				UtilsCookie.deleteCookie("timer");
        		UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			});
		});
	};

  return (<div style={{textAlign: 'center', backgroundColor: 'rgb(250, 250, 250)'}}>
			<TextField style={{display: (state.drawerOpen ? '' : 'none'), margin: '15px 10px 0px 10px', width: '230px'}} dataName='appSearchMenus' variant="outlined" placeHolder="Search Menu..." onChange={searchMenus} />
			<List className={props.classes.list} style={{height: ((state.drawerOpen ? window.innerHeight - 205 : window.innerHeight - 159) + (state.drawerOpen ? 0 : 10)) + 'px', marginTop: state.drawerOpen ? '10px' : '0px', paddingTop: 0, marginBottom: 48, overflowY: 'auto', overflowX: 'hidden'}}>
				{sideBarMenuEntries}
				<ListItem style={{paddingTop: state.drawerOpen ? '8px' : '8px', paddingBottom: state.drawerOpen ? '8px' : '8px'}} title='Logout' button onClick={e => handleSignOut()}>
					<ListItemIcon style={{minWidth: '35px'}}>
						{iconFactory('ExitToApp', 20)}
					</ListItemIcon>
					<ListItemText style={{paddingLeft: 5, height: !state.drawerOpen ? 25 : 'inherit'}} classes={{primary:props.classes.listItemText}} primary={'Logout'} />
			</ListItem>
    </List></div>);
};
