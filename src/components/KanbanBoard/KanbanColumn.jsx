import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';
import TaskList from './TaskList';
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from "@material-ui/core/IconButton";
import ActionItemEditDialog from "../ActionItemEditDialog";
import Grid from "@material-ui/core/Grid";

const scrollDown = (id) => {
    const list = document.getElementsByClassName('task-container');
    for (let item of list) {
        if (item.getAttribute('data-rbd-droppable-id') == id) {
            item.scrollTop += 300;
        }
    }
}

const scrollUp = (id) => {
    const list = document.getElementsByClassName('task-container');
    for (let item of list) {
        if (item.getAttribute('data-rbd-droppable-id') == id) {
            item.scrollTop -= 300;
        }
    }
}

function KanbanColumn({ droppableId, column }) {

    const [isEditOpen, setEditOpen] = useState(false);
    const [itemPendingEdit, setItemPendingEdit] = useState(undefined);

    return (
        <>

            <ActionItemEditDialog
                actionItem={itemPendingEdit}
                open={isEditOpen}
                onClose={() => {
                    setEditOpen(false);
                }}
                droppableId={droppableId}
            />

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        align="center"
                        component="h1"
                        gutterBottom
                        noWrap
                        variant="h5"
                    >
                        {column.title}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button fullWidth onClick={() => {
                        setItemPendingEdit(undefined);
                        setEditOpen(true);
                    }}
                        variant="outlined">
                        <AddIcon /> Add Item
                    </Button>
                </Grid>
            </Grid>


            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <IconButton
                        size="small"
                        onClick={() => scrollUp(droppableId)}
                    >
                        <ExpandLessIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TaskList
                        droppableId={droppableId}
                        items={column.items}
                        setItemPendingEdit={setItemPendingEdit}
                        setEditOpen={setEditOpen}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <IconButton
                        size="small"
                        onClick={() => scrollDown(droppableId)}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
}

export default KanbanColumn;
