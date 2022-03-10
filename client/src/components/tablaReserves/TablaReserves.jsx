import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import './tablaReserves.css'

const TablaReserves = () => {

    const [reserves, setReserves] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getReserves = async () => {
            const response = await axios.get("http://localhost:5000/api/reserves", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setReserves(response.data.reserves);
        }
        getReserves();
    }, []);


    return (
        <div className="container tablaReserves mt-4 mb-4">
            <table className="table table-sm table-striped table-hover">
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Participantes</th>
                    </tr>
                </thead>
                <tbody>
                    {reserves.map(e => (
                        <tr key={e._id}>
                            <td>{e.event.name} </td>
                            <td>{e.participating.name} {e.participating.surname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default TablaReserves;