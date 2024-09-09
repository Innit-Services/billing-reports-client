import React from "react";
import { useEffect, useState } from "react";
import ClientService from "../service/ClientService";

const ViewClient = () => {

    const [clientList, setClientList] = useState([]);

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

    return (<>
        <div className="container">
            <div className="table-container mx-auto rounded" style={{ width: "1150px" }}>

                <table className="table table-bordered table-hover" style={{ fontSize: "14px", borderCollapse: "collapse" }}>
                    <thead className="table-secondary">
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>CONTACT PERSON</th>
                            <th>CONTACT</th>
                            <th>EMAIL</th>
                            <th>ADDRESS</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>COUNTRY</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientList.map((c, index) => (
                            <tr key={c.client_id}>
                                <td>{index + 1}</td>
                                <td>{c.client_name}</td>
                                <td>{c.contact_person}</td>
                                <td>{c.contact_number}</td>
                                <td>{c.email}</td>
                                <td>{c.address}</td>
                                <td>{c.contract_start_date}</td>
                                <td>{c.contract_end_date}</td>
                                <td>{c.country}</td>
                                <td>
                                    <button
                                        className="btn btn-link p-0 me-1 ms-2 border-0"
                                        onClick={() => deleteClient(c.client_id)}
                                        style={{ fontSize: "14px", background: "transparent" }}
                                    >
                                        <i className='bx bx-trash border-0'></i>
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}
export default ViewClient;