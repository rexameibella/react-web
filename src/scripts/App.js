import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Snackbar from '@material-ui/core/Snackbar';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Cookies from 'universal-cookie';

import {
  ChevronLeft,
  ChevronRight,
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  OpenInNew
} from '@material-ui/icons';

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";


import classNames from 'classnames';
import AppIcon from '../assets/app_icon.png';

import { SidebarApp } from './components/SidebarApp';
import { ApplicationMenu } from './components/ApplicationMenu';

import useStates from './states';
import AppStyles from "./AppStyles";

import Cookie from 'universal-cookie';

import UtilsCookie from './utils/Cookie';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";

const theme = createMuiTheme({
  overrides: {
    MuiSnackbarContent: {
      root: {
        padding: '2px 12px !important',
        fontSize: '14px !important',
        minWidth: '288px !important'
      }
    },
    MuiMenuItem: {
      root: {
        paddingTop: '8px',
        paddingBottom: '8px'
      }
    }
  }
});

let openInStartSubMenusHasOpened = false;

const App = () => {
  const [state, actions] = useStates();
  const classes = AppStyles();

  const cookie = new Cookie();

  const handleProfileMenuOpen = event => actions.handleProfileMenuOpen(event.currentTarget, true);
  const handleApplicationsMenuOpen = event => actions.handleApplicationsMenuOpen(event.currentTarget, true);
  const handleMenuClose = () => actions.handleMenuClose();
  const handleMobileMenuOpen = event => actions.handleMobileMenuOpen(event.currentTarget);
  const handleMobileMenuClose = () => actions.handleMobileMenuClose();
  const handleDrawerOpen = () => actions.handleDrawerOpen();
  const handleDrawerClose = () => actions.handleDrawerClose();

  const handleSignOut = () => {
    actions.handleMenuClose();

    actions.openConfirmation('Attention', 'Are you sure to logout?', function () {
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

  const cookies = new Cookies();
  if(cookies.get('appNotification')) {
    cookies.remove('appNotification');
    
    actions.get('updateNotification').then(result => {
      let description = '';
      if(result.data.length !== 0){
        for(let i=0;i < result.data.length;i++){
          description += result.data.length<=1 ?'<b>'+result.data[i].title+'</b><br>':'<b>'+(i+1)+'. '+result.data[i].title+'</b><br>';
          description += result.data.length===i+1 ? result.data[i].content:result.data[i].content+"<br><br>";
        }
        actions.openNotif('App Update Notification', description);
      }
    });
  }

  const isProfileMenuOpen = Boolean(state.profileMenu);
  const isMobileMenuOpen = Boolean(state.mobileMoreAnchorEl);

  const renderMenu = (
    <Menu
      anchorEl={state.profileMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={state.isProfileMenuOpen}
      onClose={handleMenuClose}
      disableAutoFocusItem={true}
      style={{ width: 400 }}>
      <div style={{ padding: '10px 15px 15px 15px' }}>
        <Grid container spacing={1} style={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={12}>
            <img src={state.UserProfilePicture && state.UserProfilePicture.trim() !== '' ? state.UserProfilePicture : 'https://finfleet-erp.s3-ap-southeast-1.amazonaws.com/photo-default.png'} style={{ width: '80px', height: '80px', borderRadius: '40px', marginBottom: '15px' }} />
            <div style={{ marginLeft: '1px' }}>
              <span style={{ fontSize: '14px' }}><b>{state.UserFirstName && state.UserLastName ? state.UserFirstName + ' ' + state.UserLastName : state.UserFirstName ? state.UserFirstName : '-------'}</b></span><br />
              <span style={{ fontSize: '13px' }}>{state.UserEmail ? state.UserEmail : '-------'}</span><br />
              {state.UserParentHubID ? <span><span style={{ fontSize: '13px' }}><b>Parent Hub</b>: {state.UserParentName}</span><br /></span> : ''}
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <a href={process.env.ERP_DASHBOARD + 'profile'} target={'_blank'} style={{ textDecoration: 'none', color: '#222222' }}>
        <MenuItem onClick={handleMenuClose} style={{ fontSize: 14, minWidth: 275 }}>Profile <OpenInNew style={{ fontSize: 14, marginLeft: 3 }} /></MenuItem>
      </a>
      <a href={process.env.ERP_DASHBOARD + 'setting'} target={'_blank'} style={{ textDecoration: 'none', color: '#222222' }}>
        <MenuItem onClick={handleMenuClose} style={{ fontSize: 14, minWidth: 275 }}>Settings <OpenInNew style={{ fontSize: 14, marginLeft: 3 }} /></MenuItem>
      </a>
      <Divider />
      <MenuItem onClick={handleSignOut} style={{ fontSize: 14, minWidth: 275 }}>Sign Out</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={state.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  var timer = 0;
  var refreshTokenCode = null
	var refreshTokenInterval = null
	
  const refreshToken = () => {
    
    // if(timer == 0) {
		//
    //   timer = cookie.get("timer", {
    //     domain: process.env.HUB_SESSION_DOMAIN,
    //     path: '/'
    //   });
		//
    //   timer = !timer ? 0 : parseInt(timer);
		//
    // }
		//
    // timer += 1;
		//
    // if (refreshTokenCode && timer >= 300) {
    //
    //   timer = 0;
    //
    //   actions.post('refreshToken', { refreshTokenCode: refreshTokenCode }).then(result => {
		//
    //     if (result.data.token) {
    //
    //       cookie.set(process.env.HUB_SESSION_KEY, result.data.token, {
    //         domain: process.env.HUB_SESSION_DOMAIN,
    //         path: '/'
    //       });
    //     }
		//
    //   });
    // }
		//
    // cookie.set("timer", timer, {
    //   domain: process.env.HUB_SESSION_DOMAIN,
    //   path: '/'
    // });

		//console.log("Token refreshed " + new Date());
		actions.post('refreshToken', { refreshTokenCode: refreshTokenCode }).then(result => {

			if (result.data.token) {

				cookie.set(process.env.HUB_SESSION_KEY, result.data.token, {
					domain: process.env.HUB_SESSION_DOMAIN,
					path: '/'
				});
			}

		});
  };

  useEffect(() => {
    actions.get('order/hub/getPickupOrderReadyCount', 'pickupOrdersCount', 'count');
    actions.get('order/hub/getPickupOrderNotReadyCount', 'pickupNotReadyCount', 'count');
    actions.get('trip/getReadyToPickupCount', 'pickupTripsCount', 'count');

    actions.get('trip/getInboundTripsCount', 'inboundTripsCount', 'count');
    actions.get('trip/getInboundCount', 'inboundCount', 'count');
    actions.get('order/getOrderReceivedCount', 'groupingCount', 'count');
    actions.get('trip/getOutboundTripsCount', 'outboundTripsCount', 'count');
    //actions.get('trip/historyByHub/getCount', 'tripHistoriesCount', 'count');

    setTimeout(() => {
    	//console.log("App Loaded " + new Date());
      actions.setState('appIsLoaded', true);

			refreshTokenInterval = setInterval(refreshToken, 60000);
    }, 2000)

  }, []);

  if (!state.isProfileRequested) {
    actions.setState('isProfileRequested', true);

    actions.get('profile').then(result => {
      actions.setStateObject({
        UserEmail: result.data.Email,
        UserFirstName: result.data.FirstName,
        UserLastName: result.data.LastName,
        UserPhoneNumber: result.data.PhoneNumber,
        UserProfilePicture: result.data.ProfilePicture,
        UserRole: result.data.Role,
        UserUserID: result.data.UserID,
        UserName: result.data.Name,
        UserParentHubID: result.data.ParentHubID,
        UserParentName: result.data.ParentName
      });
//console.log("Disini");
			if (!refreshTokenCode) {
				//console.log("R Token: " + result.data.RefreshTokenCode);
				refreshTokenCode = result.data.RefreshTokenCode ? result.data.RefreshTokenCode : null;

				cookie.set("reToken", refreshTokenCode, {
					domain: process.env.MERCHANT_SESSION_DOMAIN,
					path: '/'
				});
			}
    });
  }

  if (state.openInStartSubMenus && !openInStartSubMenusHasOpened) {
    openInStartSubMenusHasOpened = true;

    actions.handleClick(state.openInStartSubMenus);
  }

  return (
    <Router onChange={() => {

    }}>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {!state.isPrintTemplate ?
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar className={classes.minHeight}>
                <IconButton onClick={state.drawerOpen ? handleDrawerClose : handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                  <MenuIcon style={{ fontSize: '1.5rem' }} />
                </IconButton>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap style={{ marginRight: 30 }}>
                  <strong style={{ marginRight: '5px' }}>FINFLEET</strong> Enterprise Resource Planning
            </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <a href={process.env.ERP_DASHBOARD + 'messages/inbox'} target={'_blank'} style={{ color: '#FFFFFF' }}>
                    <Tooltip title="Messages" aria-label="Messages">
                      <IconButton color="inherit" className={classes.iconBox} style={{ height: 40, marginTop: 2, paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10 }}>
                        <Badge badgeContent={4} color="secondary" invisible={true}>
                          <MailIcon style={{ fontSize: 18 }} />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </a>
                  <a href={process.env.ERP_DASHBOARD + 'notifications'} target={'_blank'} style={{ color: '#FFFFFF' }}>
                    <Tooltip title="Notifications" aria-label="Notifications">
                      <IconButton color="inherit" className={classes.iconBox} style={{ height: 40, marginTop: 2, paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10 }}>
                        <Badge badgeContent={17} color="secondary" invisible={true}>
                          <NotificationsIcon style={{ fontSize: 18 }} />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </a>
                  <Tooltip title="Reminder" aria-label="Reminder">
                    <a href={process.env.ERP_DASHBOARD + 'reminders'} target={'_blank'} style={{ color: '#FFFFFF' }}>
                      <IconButton color="inherit" className={classes.iconBox} style={{ height: 40, marginTop: 2, paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10 }}>
                        <Badge badgeContent={17} color="secondary" invisible={true}>
                          <AccessAlarmIcon style={{ fontSize: 18 }} />
                        </Badge>
                      </IconButton>
                    </a>
                  </Tooltip>
                  <Tooltip title="Open Other Applications" aria-label="Open Other Applications">
                    <IconButton onClick={handleApplicationsMenuOpen} color="inherit" className={classes.iconBox} style={{ height: 40, marginTop: 2, paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10 }}>
                      <Badge badgeContent={17} color="secondary" invisible={true}>
                        <MoreIcon style={{ fontSize: 18 }} />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Account & Settings" aria-label="Account & Settings">
                    <IconButton
                      aria-owns={isProfileMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      className={classes.iconBox}
                      style={{ paddingLeft: 6, paddingRight: 6, paddingTop: 6, height: 44 }}
                      color="inherit">
                      <AccountCircleIcon style={{ fontSize: 32 }} />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar> : null}
          {ApplicationMenu(Applications)}
          {renderMenu}
          {renderMobileMenu}
          {!state.isPrintTemplate ?
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: state.drawerOpen,
                [classes.drawerClose]: !state.drawerOpen,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: state.drawerOpen,
                  [classes.drawerClose]: !state.drawerOpen,
                }),
              }}
              open={state.drawerOpen} style={{ backgroundColor: '#FAFAFA', overflowY: 'hidden' }}>
              <div style={{ marginTop: 48 }}>
                <div style={{ minHeight: 49, backgroundColor: '#FAFAFA', padding: '8px 13px' }}>
                  <Link style={{ textDecoration: 'none' }} to="/">
                    <div>
                      <img src={AppIcon} style={{ width: 32, height: 32, float: 'left' }} />
                      <Typography style={{ fontSize: '18px', marginTop: '5px', marginLeft: '10px' }} className={state.drawerOpen ? classes.appNameOpen : classes.appNameClosed}>Hub Application</Typography>
                    </div>
                  </Link>
                </div>
                <Divider />
                <SidebarApp menus={Menus} classes={classes} />
              </div>
              <div className={classes.toolbar} style={{ minHeight: 25, zIndex: 5, backgroundColor: '#FAFAFA', paddingRight: 6 }}>
                <IconButton onClick={state.drawerOpen ? handleDrawerClose : handleDrawerOpen} style={{ padding: 10 }}>
                  {state.drawerOpen ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
              </div>
            </Drawer> : null}

          {/* <Route exact path="/grouping" component={Grouping} />
          <Route exact path="/performance" component={HubPerformance} />
          <Route exact path="/" component={PickupReady} />
          <Route exact path="/inbound" component={Inbound} />
          <Route exact path="/inboundTrips" component={InboundTrip} />
          <Route exact path="/inboundTrips/reAssign/:id" component={ReAssignInboundTrip} />
          <Route exact path="/outboundTrips" component={OutboundTrip} />
          <Route exact path="/outboundTrips/Assign/:id" component={AssignOutboundTrip} />
          <Route exact path="/pickupOrders/ready" component={PickupReady} />
          <Route exact path="/pickupTrips/ready" component={PickupTripsReady} />
          <Route exact path="/pickupTrips/ready/Assign/:id" component={AssignTripsReady} />
          <Route exact path="/pickupOrders/notReady" component={PickupNotReady} />
          <Route exact path="/tripHistories" component={TripHistory} />

          <Route exact path="/trip/:id" component={TripDetail} />
          <Route exact path="/order/:id" component={OrderDetail} />
          <Route exact path="/trip/:id/fillPickup" component={TripDetailAssignOrderFillPickup} />
          <Route exact path="/trip/:id/fillReceived" component={TripDetailAssignOrderFillReceived} />
          <Route exact path="/trip/:id/manifest" component={PrintManifest} />
          <Route exact path="/trip/:id/cover" component={PrintManifestCover} />
          <Route exact path="/trip/:id/labelsicepat" component={PrintLabelSiCepat} /> */}

          <Dialog
            open={state.alertOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{state.alertTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{state.alertMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={event => actions.closeAlert()} autoFocus>OK</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={state.notifOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{state.notifTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText style={{fontSize: 14}} id="alert-dialog-description"><div dangerouslySetInnerHTML={{ __html: state.notifMessage }} /></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={event => {
                  actions.closeNotif()
              }} autoFocus>OK</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={state.progressOpen}>
            <DialogTitle style={{ fontSize: '16px', padding: '10px 15px' }}>{state.progressTitle ? state.progressTitle : 'Processing Your Request'}</DialogTitle>
            <DialogContent style={{ textAlign: 'center', paddingBottom: '20px' }}>
              <CircularProgress style={{ width: '20px', height: '20px' }} />
            </DialogContent>
          </Dialog>
          <Dialog open={state.confirmationOpen}>
            <DialogTitle id="alert-dialog-title">{state.confirmationTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">{state.confirmationText}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={event => actions.closeConfirmation()}>
                Cancel
						</Button>
              <Button onClick={event => state.confirmationHandler()} color="primary" autoFocus>
                Ok
						</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={state.snackBarOpen}
            className="info"
            autoHideDuration={30000}
            onClose={e => actions.closeSnackBar()}
            message={<span style={{ fontSize: '14px' }} id="message-id">{state.snackBarContent}</span>}
            action={[
              <Button key="dismiss" color="secondary" size="small" onClick={e => actions.closeSnackBar()}>
                Dismiss
						</Button>
            ]} />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App
