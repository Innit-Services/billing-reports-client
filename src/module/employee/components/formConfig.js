export const formConfig = [
    {
        id: "employee_code",
        label: "Employee Code",
        type: "text",
        placeholder: "Enter Employee Code",
        pattern: "[A-Za-z\\s]+",
        title: "Code should only contain letters and spaces",
        required: true,
    },
    {
        id: "first_name",
        label: "First Name",
        type: "text",
        placeholder: "Enter First Name",
        required: true
    },
    {
        id: "middle_name",
        label: "Middle Name",
        type: "text",
        placeholder: "Enter Middle Name",
        pattern: "[A-Za-z\\s]+",
        title: "Name should only contain letters and spaces",
        required: true
    },
    {
        id: "last_name",
        label: "Last Name",
        type: "text",
        placeholder: "Enter Last Name",
        pattern: "[A-Za-z\\s]+",
        title: "Name should only contain letters and spaces",
        required: true
    },
    {
        id: "marital_status",
        label: "Select Marital Status",
        type: "select",
        options: [
            { value: "", label: "Select Status" },
            { value: "married", label: "Married" },
            { value: "unmarried", label: "Unmarried" }
        ],
        required: true
    },
    {
        id: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        required: true
    },
    {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
            { value: "", label: "Select Gender" },
            { value: "male", label: "Male" },
            { value: "female", label: "Female" }
        ],
        required: true
    },
    {
        id: "contact_number",
        label: "Contact Number",
        type: "tel",
        placeholder: "Enter Contact Number",
        pattern: "[0-9]{10}",
        title: "Contact number should be 10 digits",
        required: true
    },
    {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter Email",
        required: true
    },
    {
        id: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter Address",
        required: true
    },
    {
        id: "joining_date",
        label: "Joining Date",
        type: "date",
        required: true
    },
    {
        id: "department_id",
        label: "Select Department",
        type: "select",
        options: [], 
        required: true

    },
    {
        id: "designation_id",
        label: "Select Designation",
        type: "select",
        value: 'position_id',
        label: 'Select Designation',
        options: [], 
    },
    {
        id: "employee_emergency_contact",
        label: "Emergency Contact",
        type: "tel",
        placeholder: "Enter Emergency Contact",
        required: true
    }
];
