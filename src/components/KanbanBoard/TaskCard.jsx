import React, { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import Divider from "@material-ui/core/Divider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Typography, Box } from '@mui/material';
import Avatar from "@material-ui/core/Avatar";
import '../../css/task.css';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import DeleteActionItemDialog from "../DeleteActionItemDialog";

const ownerInitials = owner => {
    return owner.split(" ")[0].substring(0, 1) + owner.split(" ")[1].substring(0, 1);
};

const status = {
    'notStarted': 'Not Started',
    'inProgress': 'In Progress',
    'late': 'Late',
    'complete': 'Complete'
}

const TaskCard = ({ item, index, setItemPendingEdit, setEditOpen, droppableId }) => {

    const [itemPendigDelete, setItemPendingDelete] = useState(undefined);

    return (
        <>

            <DeleteActionItemDialog
                actionItem={itemPendigDelete}
                onClose={() => setItemPendingDelete(undefined)}
                droppableId={droppableId}
            />

            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => {
                    return (
                        <Box
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                                backgroundColor: snapshot.isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white',
                                ...provided.draggableProps.style
                            }}
                            className='draggableBox'
                        >

                            <Box className='block2' style={{ backgroundColor: item.category_color }} />

                            <Typography variant="h5">{item.issue}</Typography>
                            <Typography variant="subtitle1">{status[item.status_stage]}</Typography>
                            <Box className='secondaryDetails'>
                                <Typography variant="subtitle1" className='wrapIcon'>
                                    <CalendarMonthIcon />
                                    <span>
                                        {new Date(item.due_date).toLocaleDateString("en-us", {
                                            month: "short",
                                            day: "2-digit",
                                        })}
                                    </span>
                                </Typography>
                            </Box>

                            <Divider style={{ width: '100%' }} />

                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle1" className='wrapIcon'>
                                        <Avatar>{ownerInitials(item.owner)}</Avatar>
                                        <p style={{ padding: '10px' }}>{item.owner}</p>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="flex-end"
                                >
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            size="small"
                                            onClick={() => {
                                                setItemPendingEdit(item);
                                                setEditOpen(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="delete">
                                        <IconButton
                                            color="secondary"
                                            size="small"
                                            onClick={() => {
                                                setItemPendingDelete(item);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                }}
            </Draggable>

        </>
    )
}

export default TaskCard
