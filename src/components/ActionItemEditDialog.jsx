import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import moment from 'moment';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { dateFormat } from '../constants/date';
import '../css/task.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const process = [
    { id: 1, name: "To Do", value: "toDo" },
    { id: 2, name: "Doing", value: "doing" },
    { id: 3, name: "Done", value: "done" }
];

const state = [
    { id: 1, name: "Not Started", value: "notStarted" },
    { id: 2, name: "In progress", value: "inProgress" },
    { id: 3, name: "Late", value: "late" },
    { id: 4, name: "Complete", value: "complete" }
];

const level = [
    { id: 1, name: "URGENT", value: "urgent" },
    { id: 2, name: "HIGH", value: "high" },
    { id: 3, name: "MEDIUM", value: "medium" },
    { id: 4, name: "LOW", value: "low" }
];

function ActionItemEditDialog({ actionItem, onClose, open, droppableId, setColumns, columns }) {

    const [data, setData] = useState(
        {
            downtime_id: null,
            issue: '',
            description: '',
            priority: '',
            status_stage: '',
            process_stage: droppableId,
            category_name: '',
            start_date: moment().toDate(),
            due_date: moment().toDate(),
            open: true,
        });

    React.useEffect(() => {
        setData(
            actionItem
                ? {
                    id: actionItem.id ?? null,
                    issue: actionItem.issue ?? '',
                    description: actionItem.description ?? '',
                    priority: actionItem.priority ?? '',
                    process_stage: actionItem.process_stage ?? 'toDo',
                    status_stage: actionItem.status_stage ?? '',
                    category_name: actionItem.category_name ?? '',
                    due_date: new Date(actionItem.due_date) ?? moment().toDate(),
                    start_date: new Date(actionItem.start_date) ?? moment().toDate(),
                    open: Boolean(actionItem.open),
                }
                : {
                    id: null,
                    issue: '',
                    description: '',
                    priority: '',
                    status_stage: '',
                    process_stage: droppableId,
                    category_name: '',
                    start_date: moment().toDate(),
                    due_date: moment().toDate(),
                    open: true,
                }
        );
    }, [actionItem]);

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog disableEnforceFocus open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'}>
            <DialogTitle>Task</DialogTitle>
            <DialogContent>
                <form
                    id="action-item-form"
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault();
                        const stage = data.process_stage;
                        const column = columns[stage];
                        const copiedItems = [...column.items];
                        if (actionItem) {
                            const newData = {
                                id: data.id,
                                category_color: 'red',
                                category_name: data.category_name,
                                issue: data.issue,
                                process_stage: data.process_stage,
                                status_stage: data.status_stage,
                                priority: data.priority,
                                start_date: data.start_date,
                                due_date: data.due_date,
                                owner: 'Mario Rossi'
                            };

                            const index = copiedItems.findIndex((item) => item.id === data.id);
                            copiedItems[index] = newData;

                        } else {
                            const newData = {
                                id: parseInt(data.id) + 1,
                                category_color: 'red',
                                category_name: data.category_name,
                                issue: data.issue,
                                process_stage: data.process_stage,
                                status_stage: data.status_stage,
                                priority: data.priority,
                                start_date: data.start_date,
                                due_date: data.due_date,
                                owner: 'Mario Rossi'
                            };

                            copiedItems.push(newData);
                        }

                        setColumns({
                            ...columns,
                            [stage]: {
                                ...column,
                                items: copiedItems
                            }
                        })

                        handleClose();
                    }}
                >
                    <Grid container spacing={2}>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={data.issue}
                                onChange={(e) => setData({ ...data, ['issue']: e.target.value })}
                                label={'Task Name'}
                                variant="outlined"
                            />

                        </Grid>
                        <Grid item xs={6} >
                            <TextField
                                fullWidth
                                margin="normal"
                                value={data.category_name}
                                onChange={(e) => setData({ ...data, ['category_name']: e.target.value })}
                                label={'Category'}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin={'normal'} variant="outlined">
                                <InputLabel id={'process_stage-label'}>Process Stage</InputLabel>
                                <Select
                                    id={'select-process_stage'}
                                    labelId={'process_stage-label'}
                                    label={'Process Stage'}
                                    variant="outlined"
                                    value={data.process_stage}
                                    onChange={(e) => setData({ ...data, ['process_stage']: e.target.value })}
                                >
                                    {process.map((proc) => (
                                        <MenuItem value={proc.value} key={proc.id}>
                                            {proc.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin={'normal'} variant="outlined">
                                <InputLabel id={'status_stage-label'}>Status</InputLabel>
                                <Select
                                    id={'select-status_stage'}
                                    labelId={'status_stage-label'}
                                    label={'Status'}
                                    variant="outlined"
                                    value={data.status_stage}
                                    onChange={(e) => setData({ ...data, ['status_stage']: e.target.value })}
                                >
                                    {state.map((stage) => (
                                        <MenuItem value={stage.value} key={stage.id}>
                                            {stage.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth margin={'normal'} variant="outlined">
                                <InputLabel id={'priority-label'}>Priority</InputLabel>
                                <Select
                                    id={'select-priority'}
                                    labelId={'priority-label'}
                                    label={'Priority'}
                                    variant="outlined"
                                    value={data.priority}
                                    onChange={(e) => setData({ ...data, ['priority']: e.target.value })}
                                >
                                    {level.map((lvl) => (
                                        <MenuItem value={lvl.value} key={lvl.id}>
                                            {lvl.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4} style={{ paddingTop: '4%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth
                                    margin="normal"
                                    label={'Start Date'}
                                    value={data.start_date}
                                    onChange={(date) => setData({ ...data, ['start_date']: date.toDate() })}
                                    format={dateFormat}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4} style={{ paddingTop: '4%' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth
                                    margin="normal"
                                    label={'Due Date'}
                                    value={data.due_date}
                                    onChange={(date) => setData({ ...data, ['due_date']: date.toDate() })}
                                    format={dateFormat}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                minRows={5}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={data.description}
                                onChange={(e) => setData({ ...data, ['description']: e.target.value })}
                                label={'Description'}
                            />

                        </Grid>
                    </Grid>

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button variant="contained" color="primary" type="submit" form="action-item-form">
                    save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ActionItemEditDialog;
