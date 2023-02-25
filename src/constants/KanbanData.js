export const columnsFromBackend = {
    'toDo': {
        title: "To-do",
        items: [
            {
                id: 1,
                category_color: 'red',
                category_name: 'test',
                issue: 'Accrual error',
                process_stage: 'toDo',
                status_stage: 'notStarted',
                priority: 'high',
                start_date: new Date(),
                due_date: new Date(),
                owner: 'Mihai Maier',
                open: true
            }
        ],
    },
    'doing': {
        title: "Doing",
        items: [],
    },
    'done': {
        title: "Done",
        items: [],
    }
}
