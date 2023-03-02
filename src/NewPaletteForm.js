import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DraggableColorBox from './DraggableColorBox';
import { v4 as uuid } from 'uuid'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) { 
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState('teal');
    const [colors, setColors] = React.useState([{color: 'blue', name: 'blue'}]);
    const [newName, setNewName] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        })
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return colors.every(
                ({color}) => color !== currentColor
            )
        })
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleColorChange = (newColor) => {
        setCurrentColor(newColor.hex);
    };
    const addNewColor = () => { 
        const newColor = {
            color: currentColor,
            name: newName
        }
        setColors([...colors, newColor])
        setNewName('')
    }
    const handleTextChange = (e) => {
        setNewName(e.target.value);
    }
    const handlePaletteSave = () => { 
        let newPaletteName =  'new Test Palette'
        const { savePalette } = props;
        const newPalette = {
            paletteName: newPaletteName,
            colors: colors,
            emoji: '🧨',
            id: newPaletteName.toLowerCase.replace(' ', '-')
        }
        savePalette(newPalette);
        navigate('/');
    }

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="default">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Create New Color Palette
                </Typography>
                <Button variant="contained" color="secondary">Go Back</Button>
                <Button variant="contained" color="primary" onClick={handlePaletteSave}>Save Palette</Button>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>
            <Divider />
            <Typography variant='h4'>
                Design Your Palette
              </Typography>
            <Stack direction="row">
                <Button variant="contained" color="secondary">Clear Palette</Button>
                <Button variant="contained" color="primary">Random Color</Button>
            </Stack>
              <ChromePicker color={currentColor} onChangeComplete={handleColorChange} />
              <ValidatorForm onSubmit={addNewColor}>
                  <TextValidator
                      value={newName}
                      onChange={handleTextChange}
                      validators={['required', 'isColorNameUnique', 'isColorUnique']}
                      errorMessages={['Enter a Color Name', 'Name must be unique!', 'Color must be unique!']}
                  />
                  <Button
                    style={{ backgroundColor: currentColor }}
                    variant="contained"
                    type='submit'
                >
                    Add Color
                </Button>
              </ValidatorForm>
              
        </Drawer>
        <Main open={open}>
            <DrawerHeader />
              {colors.map(color => <DraggableColorBox key={uuid()} color={color.color} name={color.name} />)}
        </Main>
    </Box>
  );
}
