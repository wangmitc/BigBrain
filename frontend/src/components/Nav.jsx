// Sourced from https://mui.com/material-ui/react-app-bar/#responsive-app-bar-with-drawer
import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';
import { useNavigate } from 'react-router-dom';
import CreateNewGameModal from './CreateGame';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  color: 'white',
});

const StyledBoxDrawer = styled(Box)({
  textAlign: 'center'
})

const StyledBoxMain = styled(Box)({
  p: 3
});

const StyledButton = styled(Button)({
  color: '#fff'
})

const StyledTypographyBigBrain = styled(Typography)({
  fontWeight: 560,
  flexGrow: 1,
  display: {
    xs: 'none',
    sm: 'block'
  },
  '&:hover': {
    cursor: 'pointer',
  }
});

const StyledTypography = styled(Typography)({
  fontWeight: 560,
  my: 2,
  paddingTop: '10px',
  paddingBottom: '10px',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  color: '#ffffff',
  '&:hover': {
    cursor: 'pointer',
  }
});

const StyledListItemButton = styled(ListItemButton)({
  textAlign: 'center',
  color: '#f7595a',
  '&:hover': {
    background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
    color: '#ffffff'
  }
});

const StyledBox = styled(Box)({
  display: 'flex'
});

function DrawerAppBar (props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openCreateGame, setOpenCreateGame] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <StyledBoxDrawer onClick={handleDrawerToggle}>
      <StyledTypography
      variant="h6"
      aria-label="bigbrain"
      id="navlistLogoBtn"
      onClick={() => navigate('/dashboard')}>
        BigBrain
      </StyledTypography>
      <Divider />
      <List>
          <ListItem disablePadding>
            <StyledListItemButton
            startIcon={<DashboardIcon />}
            aria-label="dashboard"
            id="navlistDashboardBtn"
            onClick={() => navigate('/dashboard')}>
              <ListItemText
              primary='Dashboard'/>
            </StyledListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <StyledListItemButton
            aria-label="create game"
            id="navlistCreateGameBtn"
            startIcon={<AddIcon />}
            onClick={ () => { setOpenCreateGame(true); props.onCreate(true); }}>
              <ListItemText primary='Create game' />
            </StyledListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <StyledListItemButton
            startIcon={<LogoutIcon />}
            id="navlistLogoutBtn"
            onClick={() => {
              Logout();
              navigate('/');
            }}>
              <ListItemText primary='Sign out' />
            </StyledListItemButton>
          </ListItem>
      </List>
    </StyledBoxDrawer>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <StyledBox>
      <CssBaseline />
      <StyledAppBar component="nav">
        <Toolbar>
          <IconButton
            id="openNavDrawerBtn"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <StyledTypographyBigBrain
            variant="h6"
            component="div"
            aria-label="menu"
            id="navLogoBtn"
            onClick={() => navigate('/dashboard')}
          >
            BigBrain
          </StyledTypographyBigBrain>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <StyledButton
              aria-label="dashboard"
              id="navDeshboardBtn"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}>
                Dashboard
              </StyledButton>
              <StyledButton
              aria-label="create game"
              startIcon={<AddIcon />}
              id="navCreateGameBtn"
              onClick={ () => { setOpenCreateGame(true); props.onCreate(true); }}>
                Create game
              </StyledButton>
              <StyledButton
              aria-label="logout"
              id="navLogoutBtn"
              startIcon={<LogoutIcon />}
              onClick={() => {
                Logout();
                navigate('/');
              }}>
                Sign Out
              </StyledButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box component="nav">
        <Drawer
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <StyledBoxMain component="main">
        <Toolbar />
      </StyledBoxMain>
    </StyledBox>
    <CreateNewGameModal open={openCreateGame} onClose={() => { setOpenCreateGame(false); props.onCreate(false); }}></CreateNewGameModal>
    </>
  );
}

export default DrawerAppBar;
