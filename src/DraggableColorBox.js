import { withStyles } from 'react-jss'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styles from './styles/DraggableColorBoxStyles'

function DraggableColorBox(props) {
    const { color, classes, name, handleDelete } = props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: name});
      const style = {
          transform: CSS.Translate.toString(transform),
          transition
    }
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={classes.container}
        >
            <div style={{ backgroundColor: color }} className={classes.root}>
                <div className={classes.boxContent}>
                    <span>{name}</span>
                    <span><DeleteOutlinedIcon className={classes.deleteIcon} onClick={handleDelete}/></span>
                </div>
            </div>
        </div>
    )
}
export default withStyles(styles)(DraggableColorBox)