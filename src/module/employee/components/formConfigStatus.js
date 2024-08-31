export const formConfigStatus = [
    {
        id: "client_id",
        label: "Client Name",
        type: "select",
        options: [], 
        required: true
    },
    {
        id: "status",
        label: "Employee Status",
        type: "select",
        options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" }
        ],
        required: true
    },
    {
        id: "effective_date",
        label: "Effective Date",
        type: "date",
        required: true
    },
    {
        id: "end_date",
        label: "End Date",
        type: "date",
        required: true
    },
    {
        id: "updated_by",
        label: "Updated By",
        type: "text",
        pattern: "[A-Za-z\\s]+",
        title: "Name should only contain letters and spaces",
        required: true
    },
    {
        id: "updated_on",
        label: "Updated On",
        type: "date",
        required: true
    },
    {
        id: "home_non_home_client",
        label: "Select Type",
        type: "select",
        options: [
            { value: "home", label: "Home" },
            { value: "non-home", label: "Non-Home" }
        ],
        required: true
    },
    {
        id: "person_id",
        label: "Person ID",
        type: "text",
        placeholder: "Enter Person ID",
        required: true
    }
];
