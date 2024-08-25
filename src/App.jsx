import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <>
    {/* declarative route config will be moved to more programatic style, to achieve lazy loading/Code splitting */}
      <BrowserRouter>
        <Routes>
          <Route path="/loginpage" element={<LoginPage/>}/>
          
          <Route path="/layout" element={<Layout/>}>
            <Route index element={<>Default Landing Page</>}></Route>
            <Route path="employees" element={<List/>}></Route>
            <Route path="department" element={<Dept/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
            {/* <Route path="adddepartment" element={<AddDepartment/>}></Route>
            <Route path="viewdepartment" element={<ViewDepartment/>}></Route> */}
            {/* <Route path="addclient" element={<AddClient/>}></Route> */}
            <Route path="viewclient" element={<ViewClient/>}></Route>
            {/* <Route path="addemployee" element={<AddEmployee/>}></Route>
            <Route path="viewemployee" element={<ViewEmployee/>}></Route>
            <Route path="register" element={<RegisterForms/>}></Route>  */}
           </Route>
          <Route path="signup" element={<SignUpPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
