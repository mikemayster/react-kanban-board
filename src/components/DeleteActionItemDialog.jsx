import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteActionItemDialog({ actionItem, onClose, droppableId, setColumns, columns }) {
    const [deleting, setDeleting] = useState(false);


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

                        const index = columns[droppableId].items.findIndex((key) => key.id === actionItem.id);
                        const column = columns[droppableId];
                        const copiedItems = [...column.items];
                        copiedItems.splice(index, 1);
                        setColumns({
                            ...columns,
                            [droppableId]: {
                                ...column,
                                items: copiedItems
                            }
                        })

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
