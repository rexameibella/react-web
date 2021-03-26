import {makeStyles} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";

const drawerWidth = 250;

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#FFFFFF'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#1a73e8'
  },
  minHeight: {
    minHeight: 48,
    paddingRight: 10
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -15,
    marginRight: 20,
    padding: 8,
    backgroundColor: fade(theme.palette.common.white, 0),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontSize: 16
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconBox: {
    backgroundColor: fade(theme.palette.common.white, 0),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    }
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
		overflowY: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '3px 0px 8px rgba(0,0,0,0.10)',
    marginTop:48,
  },
  listItemText:{
    fontSize:13
  },
  listItemIcon:{
    fontSize:20,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '3px 8px',
    position: 'absolute',
    bottom: 0,
    boxShadow: '0px 0px 5px rgba(0,0,0,0.40)',
    width: '100%',
    minHeight:35,
    //overflowY: 'scroll',
    ...theme.mixins.toolbar,
  },
  appNameOpen: {
    marginTop: 3,
    float: 'left',
    marginLeft: 20,
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'inline'
  },
  appNameClosed: {
    display: 'none'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
