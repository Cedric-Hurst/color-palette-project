import { v4 as uuid } from 'uuid'
import { SortableContext, sortableKeyboardCoordinates, } from '@dnd-kit/sortable';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import DraggableColorBox from './DraggableColorBox';

export default function DraggableColorList(props) {
    const {colors, deleteColorBox, handleDragEnd} = props;
    const colorNames = colors.map(color => color.name);

    const sensors = useSensors(
        useSensor(MouseSensor, {
        activationConstraint: {
            distance: 15,
        },
        }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        activationConstraint: {
            distance: 15,
        },
        }),
        useSensor(TouchSensor, {
        activationConstraint: {
            distance: 15,
        },
        }),
    );
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={colorNames}>
                {colors.map(color =>
                    <DraggableColorBox
                        key={uuid()}
                        color={color.color}
                        name={color.name}
                        handleDelete={() => deleteColorBox(color.name)}
                    />
                )}
            </SortableContext>
        </DndContext>
    )
}