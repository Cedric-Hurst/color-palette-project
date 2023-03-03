import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ValidatorForm} from 'react-material-ui-form-validator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import {withStyles} from 'react-jss';

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
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const styles = {
    drawer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerBtns: {
        width: '100%',
    },
    drawerBtn: {
        width: '50%',
    }
}

function NewPaletteForm(props) { 
    const { palettes, classes } = props;
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
    const handlePaletteSave = (emojiData) => { 
        const { savePalette } = props;
        const newPalette = {
            paletteName: newPaletteName,
            colors: colors,
            emoji: emojiData.emoji,
            id: newPaletteName.toLowerCase().replace(' ', '-')
        }
        console.log(emojiData)
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
            <PaletteFormNav
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handlePaletteSave={handlePaletteSave}
                newPaletteName={newPaletteName}
                handleTextChange={handleTextChange}
            />
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
                <div className={classes.drawer}>
                    <Typography variant='h4' gutterBottom>
                        Design Your Palette
                    </Typography>
                    <div className={classes.drawerBtns}>
                        <Stack direction="row">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={clearColors}
                                className={classes.drawerBtn}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addRandomColor}
                                className={classes.drawerBtn}
                                disabled={colors.length >= maxColors}
                            >
                                Random Color
                            </Button>
                        </Stack>
                    </div>
                    <ColorPickerForm
                        currentColor={currentColor}
                        handleColorChange={handleColorChange}
                        addNewColor={addNewColor}
                        newColorName={newColorName}
                        handleTextChange={handleTextChange}
                        isPaletteFull={isPaletteFull}
                    />  
                </div>    
            </Drawer>
            
                <Main open={open}>
                    <DrawerHeader />
                    <DraggableColorList colors={colors} handleDragEnd={handleDragEnd} deleteColorBox={deleteColorBox} />
                </Main>
        </Box>
    );
}

export default withStyles(styles)(NewPaletteForm)