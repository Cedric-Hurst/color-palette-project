import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import EmojiPicker from 'emoji-picker-react';

export default function PaletteMetaForm(props) {
    const [stage, setStage] = React.useState('');
    const { handlePaletteSave, newPaletteName, handleTextChange } = props;

    const handleClickOpen = () => {
        setStage('form');
    };
    const handleClose = () => {
        setStage('');
    };
    const handleSubmit = () => { 
        setStage('emoji');
    }
    return (
        <div>
            <Dialog open={stage === 'emoji'}>
                <EmojiPicker onEmojiClick={handlePaletteSave} emojiStyle='native' emojiVersion='5.0'/>
            </Dialog>
            <Button variant="contained" onClick={handleClickOpen}>
                Save Palette
            </Button>
            <Dialog open={stage === 'form'} onClose={handleClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={handleSubmit}> 
                    <DialogContent>
                        <DialogContentText>
                            Please choose a name for your new Palette. Make Sure it is unique.
                        </DialogContentText>
                        <TextValidator
                            value={newPaletteName}
                            onChange={handleTextChange}
                            name='newPaletteName'
                            label='Palette Name'
                            variant='standard'
                            fullWidth
                            margin='normal'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter a Palette Name', 'Name already used']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}

