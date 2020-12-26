import React,{useState,Suspense} from 'react'
import PropTypes from 'prop-types';
import{
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import {
    Home,
    PeopleAlt,
    EventNoteSharp,
    AccountCircle
} from '@material-ui/icons'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import logo from '../images/logo.png'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: 'auto',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logoRoot:{
    display: 'flex',
    justifyContent:'center',
    padding: theme.spacing(1)
  },
  logo:{
    width: theme.spacing(15),
    height:theme.spacing(6),
  },
  toolbarRight:{
    marginLeft:'auto'
  }
}));

const EmploymentComponent = React.lazy(()=> import('../view/employment'))

const DefaultContainer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loader = () => <div className="loader">Loading...</div>


  const drawer = (
    <div>
      <div className={classes.logoRoot}>
        <img alt="dodon" src={logo} className={classes.logo} />
      </div>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon>
                <Home />
            </ListItemIcon>
            <ListItemText  primary="Beranda" />
          </ListItem>
          <ListItem button selected={true}>
            <ListItemIcon>
                <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary="Personel List" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
                <EventNoteSharp />
            </ListItemIcon>
            <ListItemText primary="Daily Attendance" />
          </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={`color-appbar ${classes.appBar}`}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon className="color-primary" />
            </IconButton>
            <Hidden smUp implementation="css">
              <img alt="dodon" src={logo} className={classes.logo} />
            </Hidden>
              <div className={classes.toolbarRight}>
                <Hidden xsDown implementation="css">
                    <Typography variant="inherit" className="color-title cardTitle">Hallo, </Typography>
                    <Typography variant="inherit" className="color-primary cardTitle">Gadjian User</Typography>
                </Hidden>
              </div>
              <IconButton aria-label="menu appbar">
                <AccountCircle />
              </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
              <Suspense fallback={loader()}>
                <EmploymentComponent />
              </Suspense>
        </main>
      </div>
    )
}

DefaultContainer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
  

export default DefaultContainer