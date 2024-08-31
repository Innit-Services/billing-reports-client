export const formConfig = [
    {
        name: "department_name",
        label: "Department Name",
        type: "text",
        placeholder: "Enter Department Name",
        pattern: "[A-Za-z\\s]+",
        title: "Name should only contain letters and spaces",
        required: true
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Enter Description",
        required: true
    },
    {
        name: "createdAt",
        label: "Created At",
        type: "text",
        placeholder: "Created at...",
        required: true
    },
    {
        name: "updatedAt",
        label: "Updated At",
        type: "text",
        placeholder: "Updated at...",
        required: true
    }
];
