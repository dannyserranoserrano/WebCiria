import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
        <div className="tablaReserves col auto mt-4 mb-4">
            <div className="container headUsers table table-responsive mb-0">
                <div className='head2Reserves mt-2'>
                    <div><strong>Evento</strong></div>
                    <div><strong>Participantes</strong></div>
                </div>
                <div>
                    <div className="container">
                        {reserves.map(e => (
                            <Link key={e._id} to={`/reserves/${e._id}`} className="container linkReserves">
                                <div className='link2Reserves m-0'>
                                    <div className='divReserves'>{e.event.name} </div>
                                    <div className='divPartic'>{e.participating.name} {e.participating.surname}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TablaReserves;