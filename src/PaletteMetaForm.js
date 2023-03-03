import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function PaletteMetaForm(props) {
    const [open, setOpen] = React.useState(false);
    const { handlePaletteSave, newPaletteName, handleTextChange } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a Name for this Palette
          </DialogContentText>
        <ValidatorForm onSubmit={handlePaletteSave}>     
                <TextValidator
                    value={newPaletteName}
                    onChange={handleTextChange}
                    name='newPaletteName'
                    label='Palette Name'
                    variant='filled'
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter a Palette Name', 'Name already used']}
                />
                <Button variant="contained" color="primary" type="submit">Save Palette</Button>
        </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

