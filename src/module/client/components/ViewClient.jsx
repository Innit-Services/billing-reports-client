import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ClientService from '../../client/service/ClientService';
// import { useNavigate } from "react-router-dom";
// import Add from "./Add";
import AddClient from "./AddClient";
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";
import Pagination from "../../../shared/components/Pagination";
import Tooltip from '@mui/material/Tooltip';
import UpdateClient from './UpdateClient';



const ViewClient = () => {
    
    // const navigate = useNavigate();
    const [clientList, setClientList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(5);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const[selectedClient, setSelectedClient] = useState(null);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    

    const handleUpdateClient = (client)=>{
        setSelectedClient(client);
        setIsUpdateFormOpen(true);
    }

    const closeUpdateForm = () => setIsUpdateFormOpen(false);


    useEffect(() => {
        init();
    }, []);

    const init = () => {
        ClientService.getAllClients()
            .then((res) => {
                // console.log(res.data);
                setClientList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteClient = (client_id) => {
        ClientService.delClient(client_id)
            .then((res) => {
                // setMsg("Client deleted successfully.");
                init();
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const handleSearchChange = (c) => {
        setSearchQuery(c.target.value);
    };

    const onSort = (c) => {
        setSortField(c.sortField);
        setSortOrder(c.sortOrder);
    };

    const sortedClients = [...clientList].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField];
        const valueB = b[sortField];
        let result = 0;

        if (valueA < valueB) result = -1;
        if (valueA > valueB) result = 1;
        return result * (sortOrder || 1);
    });


     const filteredClients = sortedClients.filter((client) => {
           return (
            client.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.contact_number.includes(searchQuery) ||
            client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            client.address.toLowerCase().includes(searchQuery.toLowerCase())
          );
     });

    const firstRecordIndex = (currentPage - 1) * clientsPerPage;
    const paginatedClients = filteredClients.slice(firstRecordIndex, firstRecordIndex + clientsPerPage);

    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleDepartmentUpdateSuccess = (updatedDepartment) => {
        console.log("Department updated:", updatedDepartment);
        init(); 
        closeUpdateForm(); 
    };

    return (
        <div className="flex h-screen w-full mx-auto ">
            <div className="relative w-full mx-auto ">
                <div className="bg-white border border-gray-100 rounded-t-lg   relative w-full h-[90vh]">
                    {/* added bg-custom-dark-blue class to give 2c3e50 color to content header,this class is from tailwind config */}
                    <div className="flex justify-between border border-custom-dark-blue  rounded-t-lg text-white items-center  bg-custom-dark-blue" >
                        <h2 className="flex-grow p-2 fs-5 font-bold ">Clients</h2>
                        <div className="flex mt-2">
                            <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                            {/* <Add onAddClick={() => { }} /> */}
                           

                            <Tooltip title="Add Client">
                                <button
                                    type="button"
                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
                                    onClick={openForm}
                                >
                                    <i className="bx bx-plus fs-5 text-md"></i>
                                </button>
                            </Tooltip>
                            {isFormOpen && <AddClient onClose={closeForm} />}

                            <Filter onFilterClick={() => { }} />
                        </div>
                    </div>

                    <DataTable
                        value={paginatedClients}
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        className="border-gray-500"
                        rowClassName=" border border-gray-600 hover-row cursor-pointer "
                        onRowClick={(c) => handleUpdateClient(c.data)}
                    >
                        <Column field="client_id" header="ID" sortable headerClassName="p-2 ps-3" className="py-2 px-3 " />
                        <Column field="client_name" header="CLIENT NAME" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="contact_person" header="CPERSON" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="contact_number" header="CONTACT" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="email" header="EMAIL ID" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="address" header="ADDRESS" sortable headerClassName="p-2" className="py-2 px-2" />
                        {/* <Column field="contract_start_date" header="START DATE" sortable headerClassName="p-2" className="py-2 px-2" /> */}
                        {/* <Column field="contract_end_date" header="END DATE" sortable headerClassName="p-2" className="py-2 px-2" /> */}
                        <Column field="country" header="COUNTRY" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column
                            header="ACTION"
                            body={(c) => (
                                <button
                                    className="p-0 me-1 ms-2 border-0 bg-transparent rounded"
                                    onClick={() => deleteClient(c.client_id)}
                                >
                                    <i className="bx bxs-trash text-blue-700"></i>
                                </button>
                            )}
                            className="py-2 px-2"
                        />
                    </DataTable>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                    />
                </div>
            </div>
            {isUpdateFormOpen && (
                <UpdateClient 
                    client={selectedClient} 
                    onClose={closeUpdateForm} 
                    onUpdateSuccess={handleDepartmentUpdateSuccess} 
                />
            )}
        </div>
    );
};

export default ViewClient;