import employees from "../data";

function List() {
  return (
    <>
      <h2>Employee Listsing</h2>
      {employees.map(employee=><h5 key={employee.id}>{employee.name}</h5> )}
    </>
  );
}

export default List;