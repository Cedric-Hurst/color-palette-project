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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableColorList from './DraggableColorList';
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
    const { palettes } = props;
    const maxColors = 20;
    const [open, setOpen] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState('teal');
    const [colors, setColors] = React.useState(palettes[0].colors);
    const [newColorName, setNewColorName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');
    const navigate = useNavigate();
    const isPaletteFull = colors.length >= maxColors;
    useEffect(() => { 
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            return colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        })
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
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
            name: newColorName
        }
        setColors([...colors, newColor])
        setNewColorName('')
    }
    const clearColors = () => {
        setColors([]);
    }
    const addRandomColor = () => { 
        const palette = Math.floor(Math.random() * palettes.length);
        const color = Math.floor(Math.random() * palettes[palette].colors.length);
        const newColor = palettes[palette].colors[color];
        if (colors.every(
            ({ name }) => name.toLowerCase() !== newColor.name.toLowerCase() //check for dupes
        )) {
            setColors([...colors, newColor])
        } else {
            addRandomColor();
        }
    }
    const deleteColorBox = (colorName) => {
        const newColors = colors.filter(color => color.name !== colorName);
        setColors([...newColors])
    }
    const handleTextChange = (e) => {
        e.target.name === 'newColorName' && setNewColorName(e.target.value);
        e.target.name === 'newPaletteName' && setNewPaletteName(e.target.value);
    }
    const handlePaletteSave = () => { 
        const { savePalette } = props;
        const newPalette = {
            paletteName: newPaletteName,
            colors: colors,
            emoji: '🧨',
            id: newPaletteName.toLowerCase().replace(' ', '-')
        }
        savePalette(newPalette);
        navigate('/');
    }
    const handleDragEnd = (e) => { 
        const { active, over } = e;
        if (active.id !== over.id) {
            const activeIndex = colors.map(color => color.name).indexOf(active.id);
            const overIndex = colors.map(color => color.name).indexOf(over.id);
            setColors((colors) => {
                return arrayMove(colors, activeIndex, overIndex);
            })
        }
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
                <Button variant="contained" color="secondary" onClick={()=> navigate('/')}>Go Back</Button>
                  <ValidatorForm onSubmit={handlePaletteSave}>
                    <Stack direction="row">
                        <TextValidator
                            value={newPaletteName}
                            onChange={handleTextChange}
                            name='newPaletteName'
                            label='Palette Name'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter a Palette Name', 'Name already used']}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </Stack>
                </ValidatorForm>
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
                <Button variant="contained" color="secondary" onClick={clearColors}>Clear Palette</Button>
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={addRandomColor}
                      disabled={colors.length >= maxColors}
                  >
                      Random Color
                  </Button>
            </Stack>
              <ChromePicker color={currentColor} onChangeComplete={handleColorChange} />
              <ValidatorForm onSubmit={addNewColor}>
                  <TextValidator
                      value={newColorName}
                      onChange={handleTextChange}
                      name='newColorName'
                      validators={['required', 'isColorNameUnique', 'isColorUnique']}
                      errorMessages={['Enter a Color Name', 'Name must be unique!', 'Color must be unique!']}
                  />
                  <Button
                    style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }}
                    variant="contained"
                    type='submit'
                    disabled={isPaletteFull}
                  >
                      {isPaletteFull? 'Palette Full' : 'Add Color'}
                </Button>
              </ValidatorForm>
              
          </Drawer>
          
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList colors={colors} handleDragEnd={handleDragEnd} deleteColorBox={deleteColorBox} />
            </Main>
    </Box>
  );
}
