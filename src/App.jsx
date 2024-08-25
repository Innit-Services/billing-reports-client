import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./shared/components/Layout";
import List from "./module/employee/components/List";
import NotFound from "./shared/components/NotFound";
import Dept from "./module/department/dept";
// import ViewEmployee from "./module/employee/components/ViewEmployee";
// import AddEmployee from "./module/employee/components/AddEmployee";
import LoginPage from "./shared/components/LoginPage";
// import AddDepartment from "./module/department/components/AddDepartment";
// import ViewDepartment from "./module/department/components/ViewDepartment";
// import AddClient from "./module/client/components/AddClient";
import ViewClient from "./module/client/components/ViewClient";
// import RegisterForms from "./shared/components/RegisterForms";
// import SignUpPage from "./shared/components/SignUpPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <>Default Landing Page</> },
      { path: "employees", element: <List /> },
      { path: "department", element: <Dept /> },
      { path: "viewclient", element: <ViewClient /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/signin",
    element: <LoginPage />
  },
];

function App() {
  const router = createBrowserRouter(routes, { basename: "" });
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
