
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./shared/components/Layout";
import ViewEmployee from "./module/employee/components/ViewEmployee";
import AddEmployee from "./module/employee/components/AddEmployee";
import NotFound from "./shared/components/NotFound";
import AddClient from "./module/client/components/AddClient";
import ViewClient from "./module/client/components/ViewClient";
import LoginPage from "./shared/components/LoginPage";
import SignUpPage from "./shared/components/SignUpPage";
import UpdateClient from "./module/client/components/UpdateClient";
import AddEmployeeStatus from "./module/employee/components/AddEmployeeStatus";
import ViewDepartment from "./module/department/components/ViewDepartment";
import ViewProfile from "./module/employee/components/ViewProfile";
import ViewPosition from "./module/position/components/ViewPosition";
import { ThemeProvider } from "./apis/ThemeContext.jsx";
import ViewEmployeeStatus from "./module/employee/components/ViewEmployeeStatus.jsx";
import ViewWages from "./module/employee/components/ViewWages.jsx";
import ViewEmployeePosition from "./module/employee/components/ViewEmployeePosition.jsx";

=======
import EmployeeDetails from "./module/employee/components/EmployeeDetails";
import ViewProfile from "./module/employee/components/ViewProfile";
import EmployeeStatus from "./module/employee/components/EmployeeStatus";
>>>>>>> Stashed changes

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <>Default Landing Page</> },
      { path: "/addemployee", element: <AddEmployee /> },
<<<<<<< Updated upstream
      { path: "viewemployee", element: <ViewEmployee /> },
      { path: "viewposition", element: <ViewPosition/>},
      { path: "/viewprofile/:id", element: <ViewProfile/>},
      { path: "/addemployeestatus", element:<AddEmployeeStatus/>},
      { path: "/viewemployeestatus/:id", element:<ViewEmployeeStatus/>},
      { path: "/viewemployeepositions/:id", element:<ViewEmployeePosition/>},
      { path: "/viewwages", element:<ViewWages/>},
      { path:"viewdepartment", element: <ViewDepartment/>},
      { path: "addclient", element:<AddClient/>},
      { path: "viewclient", element: <ViewClient /> },
      { path: "updateclient", element: <UpdateClient/>},   
      { path: "*", element: <NotFound /> },
  
     
     
    ],
  },
  {
    path: "/signin",
    element: <LoginPage />
  
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
 
];

function App() {
  const router = createBrowserRouter(routes, { basename: "" });
  return (
    <>
    {/* declarative route config will be moved to more programatic style, to achieve lazy loading/Code splitting */}

    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>
      
      </ThemeProvider>
      
      </>);
}
export default App;

