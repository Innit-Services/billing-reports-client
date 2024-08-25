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
        <div className="table-container pt-2 ">
            <h3>Clients List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th id='headcolor'>ID</th>
                        <th id='headcolor'>NAME</th>
                        <th id='headcolor'>CONTACT PERSON</th>
                        <th id='headcolor'>CONTACT</th>
                        <th id='headcolor'>EMAIL</th>
                        <th id='headcolor'>ADDRESS</th>
                        <th id='headcolor'>START DATE</th>
                        <th id='headcolor'>END DATE</th>
                        <th id='headcolor'>COUNTRY</th>
                        <th id='headcolor'>ACTION</th>
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
                                <div className="dropdown">
                                    <span className="table-options" data-bs-toggle="dropdown" aria-expanded="false">⋮</span>
                                    <ul className="dropdown-menu">
                                        <a href="#" className="text-primary p-3" onClick={() => {}}>
                                            Edit
                                        </a>
                                        /
                                        <a href="#" className="text-danger p-3" onClick={() => deleteClient(c.client_id)}>
                                            Delete
                                        </a>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}
export default ViewClient;