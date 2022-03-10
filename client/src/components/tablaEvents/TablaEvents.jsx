import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './tablaEvents.css'

const TablaEvents = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            const response = await axios.get("http://localhost:5000/api/events", {

            })
            console.log(response);
            setEvents(response.data.events);
        }
        getEvents();
    }, []);


    return (
        <div className="tablaEvents mt-4 mb-4">
            <div className="container headEvents table table-responsive mb-0">
                <div className="head2Events m-2">
                    <div><strong>Evento</strong></div>
                    <div><strong>Fecha</strong></div>
                </div>
            </div>
            <div>
                {events.map(e => (
                    <div className="bodyEvents">
                        <Link key={e._id} to={`/events/${e._id}`} className="container linkEvents">
                            <div className='link2Events'>
                                <div className='divEvents'>{e.name}</div>
                                <div className='divDateAct'>{e.dateActivity}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TablaEvents;