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
import EditIcon from '@mui/icons-material/Edit'; import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import DeleteActionItemDialog from "../DeleteActionItemDialog";
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const ownerInitials = owner => {
    return owner.split(" ")[0].substring(0, 1) + owner.split(" ")[1].substring(0, 1);
};

const status = {
    'notStarted': 'Not Started',
    'inProgress': 'In Progress',
    'late': 'Late',
    'complete': 'Complete'
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1.5),
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.common.white,
        userRelect: 'none',
        margin: theme.spacing(2),
        position: 'relative',
    },
    secondaryDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: '#7d7d7d',
    },
    wrapIcon: {
        alignItems: 'center',
        display: 'flex',
        gap: theme.spacing(2),
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        marginRight: theme.spacing(1),
    },
    dragging: {
        transform: 'rotate(-5deg)',
    },
}));

const TaskCard = ({ item, index, setItemPendingEdit, setEditOpen, droppableId, setColumns, columns }) => {

    const [itemPendigDelete, setItemPendingDelete] = useState(undefined);
    const classes = useStyles({ color: item.category_color });

    return (
        <>

            <DeleteActionItemDialog
                actionItem={itemPendigDelete}
                onClose={() => setItemPendingDelete(undefined)}
                droppableId={droppableId}
                setColumns={setColumns}
                columns={columns}
            />

            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => {
                    return (
                        <Box
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging ? `rotate(-5deg) ${provided.draggableProps.style.transform}` : '',
                            }}
                            className={classNames(classes.root, { [classes.dragging]: snapshot.isDragging })}
                        >

                            <Typography>{item.issue}</Typography>
                            <Typography variant="subtitle1">{status[item.status_stage]}</Typography>
                            <Box className={classes.secondaryDetails}>
                                <Typography variant="subtitle1" className={classes.wrapIcon}>
                                    <CalendarMonthIcon />
                                    <span>Due Date</span>
                                </Typography>
                                <div className={classes.wrapIcon}>
                                    <Typography variant="body1" color="black">
                                        {new Date(item.due_date).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </Typography>
                                    <div className={classes.dot} style={{ backgroundColor: item.category_color }} />
                                </div>
                            </Box>


                            <Box marginY={2}>
                                <Divider style={{ width: '100%' }} />
                            </Box>

                            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Avatar>{ownerInitials(item.owner)}</Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">{item.owner}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1} alignItems="flex-end">
                                        <Grid item>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        setItemPendingEdit(item);
                                                        setEditOpen(true);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="delete">
                                                <IconButton
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
