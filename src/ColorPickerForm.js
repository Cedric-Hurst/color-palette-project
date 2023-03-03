import * as React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function ColorPickerForm(props) {
    const {currentColor, handleColorChange, addNewColor, newColorName, handleTextChange, isPaletteFull  } = props;
    return (
        <div>
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
        </div>
    )
}