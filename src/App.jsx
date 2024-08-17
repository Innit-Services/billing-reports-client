import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./shared/components/Layout";
import List from "./module/employee/components/List";
import NotFound from "./shared/components/NotFound";
import Dept from "./module/department/dept";

function App() {
  return (
    <>
    {/* declarative route config will be moved to more programatic style, to achieve lazy loading/Code splitting */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<>Default Landing Page</>}></Route>
            <Route path="employees" element={<List/>}></Route>
            <Route path="department" element={<Dept/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
