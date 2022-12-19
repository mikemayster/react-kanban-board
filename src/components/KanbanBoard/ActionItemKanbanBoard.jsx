import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { columnsFromBackend } from "../../constants/KanbanData"
import KanbanColumn from "./KanbanColumn";
import { Grid } from '@material-ui/core';


const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })

    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}

function ActionItemKanbanBoard() {

    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <>
            <Grid container spacing={2}>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <Grid item xs={4}>
                                <KanbanColumn
                                    key={id}
                                    droppableId={id}
                                    column={column}
                                />
                            </Grid>
                        )
                    })}
                </DragDropContext>

            </Grid>
        </>
    );
}

export default ActionItemKanbanBoard;
