import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeSubmenu = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getTabClassName = (path) => {
    return location.pathname === path
      ? "border border-blue-500 bg-blue-400 text-white px-3 py-2 rounded"
      : "hover:bg-blue-100 px-3 py-2 rounded";
  };

  return (
    <ul className="flex justify-start p-2 space-x-3 my-2">
      <li>
        <a
          className={getTabClassName(`/viewprofile/${id}`)} 
          onClick={() => handleNavigate(`/viewprofile/${id}`)} 
        >
          Profile
        </a>
      </li>
      <li>
        <a
          className={getTabClassName(`/viewemployeestatus/${id}`)}
          onClick={() => handleNavigate(`/viewemployeestatus/${id}`)}
        >
          Status
        </a>
      </li>
      <li>
        <a
          className={getTabClassName(`/department/${id}`)}
          onClick={() => handleNavigate(`/department/${id}`)}
        >
          Department
        </a>
      </li>
      <li>
        <a
          className={getTabClassName(`/viewemployeepositions/${id}`)}
          onClick={() => handleNavigate(`/viewemployeepositions/${id}`)}
        >
          Position
        </a>
      </li>
      <li>
        <a
  
          className={getTabClassName(`/viewwages`)}
          onClick={() => handleNavigate(`/viewwages`)}
        >
          Wages
        </a>
      </li>
    </ul>
  );
};

export default EmployeeSubmenu;
