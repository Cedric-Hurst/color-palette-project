import * as React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {withStyles} from 'react-jss';
import styles from './styles/ColorPickerFormStyles'

function ColorPickerForm(props) {
    const {
        currentColor,
        handleColorChange,
        addNewColor,
        newColorName,
        handleTextChange,
        isPaletteFull,
        classes
    } = props;
    
    return (
        <div>
            <ChromePicker color={currentColor} onChangeComplete={handleColorChange} className={classes.colorPicker} />
            <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                <TextValidator
                    value={newColorName}
                    className={classes.colorInput}
                    onChange={handleTextChange}
                    label='Name Color'
                    name='newColorName'
                    variant='filled'
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a Color Name', 'Name must be unique!', 'Color must be unique!']}
                />
                <Button
                    style={{ backgroundColor: isPaletteFull ? 'grey' : currentColor }}
                    variant="contained"
                    type='submit'
                    disabled={isPaletteFull}
                    className={classes.addColor}
                >
                    {isPaletteFull? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}
export default withStyles(styles)(ColorPickerForm)