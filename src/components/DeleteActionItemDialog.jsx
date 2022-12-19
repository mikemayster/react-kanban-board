import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { columnsFromBackend } from "../constants/KanbanData"

function DeleteActionItemDialog({ actionItem, onClose, droppableId }) {
    const [deleting, setDeleting] = useState(false);
    const [columns, setColumns] = useState(columnsFromBackend);


    return (
        <Dialog
            open={Boolean(actionItem)}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Delete Action Item {actionItem?.id}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this Action Item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>cancel</Button>
                <Button
                    onClick={async () => {
                        setDeleting(true);
                        const array = columns[droppableId].items;
                        const index = array.findIndex(key => key.id === actionItem.id);
                        array.splice(index, 1)
                        setDeleting(false);
                        onClose();
                    }}
                    disabled={deleting}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteActionItemDialog;
