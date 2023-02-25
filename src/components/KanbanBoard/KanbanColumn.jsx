import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';
import TaskList from './TaskList';
import React, { useState } from "react";
import ActionItemEditDialog from "../ActionItemEditDialog";
import Grid from "@material-ui/core/Grid";
import { Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#FAFBFE',
        padding: theme.spacing(1.5),
        border: '1px solid #F4F4F4',
    },
    title: {
        color: '#9499A6',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: theme.spacing(2),
    },
}));

function KanbanColumn({ droppableId, column, setColumns, columns }) {

    const [isEditOpen, setEditOpen] = useState(false);
    const [itemPendingEdit, setItemPendingEdit] = useState(undefined);
    const classes = useStyles();

    return (
        <>

            <ActionItemEditDialog
                actionItem={itemPendingEdit}
                open={isEditOpen}
                onClose={() => {
                    setEditOpen(false);
                }}
                droppableId={droppableId}
                setColumns={setColumns}
                columns={columns}
            />

            <Grid className={classes.container}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography align="center" component="h2" gutterBottom noWrap variant="body2" className={classes.title}>
                            {column.title}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            fullWidth
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setItemPendingEdit(undefined);
                                setEditOpen(true);
                            }}
                            variant="text"
                            color="primary"
                        >
                            Add Item
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{ marginBottom: 16 }} />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TaskList
                            droppableId={droppableId}
                            items={column.items}
                            setItemPendingEdit={setItemPendingEdit}
                            setEditOpen={setEditOpen}
                            setColumns={setColumns}
                            columns={columns}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default KanbanColumn;
