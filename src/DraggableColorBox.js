import { withStyles } from 'react-jss'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import styles from './styles/DraggableColorBoxStyles'
function DraggableColorBox(props) {
    const {color, classes, name} = props;
    return (
        <div style={{ backgroundColor: color }} className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <span><DeleteOutlinedIcon className={classes.deleteIcon} /></span>
            </div>
        </div>
    )
}
export default withStyles(styles)(DraggableColorBox)