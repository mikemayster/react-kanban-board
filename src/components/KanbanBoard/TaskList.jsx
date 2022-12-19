import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";
import '../../css/task.css';
import React from "react";
import { Box } from '@material-ui/core';

function TaskList({ droppableId, items, setItemPendingEdit, setEditOpen }) {

    return (
        <>
            <Droppable
                droppableId={droppableId}
                key={droppableId}
            >
                {(provided, snapshot) => {
                    return (
                        <Box
                            className='task-container'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ background: snapshot.isDraggingOver ? 'lightblue' : '#f6f9fa' }}
                        >
                            {items.map((item, index) => {
                                return (
                                    <TaskCard
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        setItemPendingEdit={setItemPendingEdit}
                                        setEditOpen={setEditOpen}
                                        droppableId={droppableId}
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </Box>
                    )
                }}
            </Droppable>
        </>
    )
}

export default TaskList
