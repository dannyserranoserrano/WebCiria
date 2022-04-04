import React, { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom"
import './event.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const Event = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState([]);
    const [participating, setParticipating] = useState([]);
    const [activity, setActivity] = useState({});
    const token = localStorage.getItem('token');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const role = localStorage.getItem("role")

    useEffect(() => {
        const getEvent = async () => {
            const response = await axios.get(`http://localhost:5000/api/findEvent/${eventId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setEvent(response.data.event)
            setParticipating(response.data.event.participating)
            setActivity(response.data.event.activity)
        }
        getEvent()
    }, [])

// *****FUNCION PARA RESERVA*****
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response2 = await axios.post(
                `http://localhost:5000/api/newReserve/${eventId}`,
                {}, {
                headers: {
                    "Authorization": token
                }
            })
            setSuccessMessage(response2.data.message)

            setTimeout(() => {
                window.location.href = `/events/${eventId}`
            }, 2000)

        } catch (error) {
            setErrorMessage(error.response2.data.message)
            setTimeout(() => {
                window.location.href = '/events'
            }, 2000)
        }
    };

     // *****FUNCION PARA BORRAR*****
     const deleteEvent = async (e) => {
        e.preventDefault();
        const response2 = await axios.delete(
            `http://localhost:5000/api/deleteEvent/${eventId}`, {
            headers: {
                "Authorization": token
            }
        })
        try {

            setSuccessMessage(response2.data.message)

            setTimeout(() => {
                window.location.href = '/'
            }, 10000)

        } catch (error) {
            setErrorMessage(response2.data.error.message)
            setTimeout(() => {
                window.location.href = '/event'
            }, 10000)
        }
    };
    
    // ******EVENTS UNLOGGED*****

    const Eventos = () => (
        <div className="event">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="eventTitle text-center"><p>EVENTO</p></div>
                <div className="container tablaEvent">
                    <div className="headEvent">
                        <div className="reqEvent"><strong>Evento:</strong></div>
                        <div className="resEvent"> {event.name}</div>
                        <div className="reqEvent"><strong>Actividad:</strong></div>
                        <div className="resEvent"> {activity.name}</div>
                        <div className="reqEvent"><strong>Descripción:</strong></div>
                        <div className="resEvent"> {event.description}</div>
                        <div className="reqEvent"><strong>Fecha de Actividad:</strong></div>
                        <div className="resEvent"> {event.dateActivity}</div>
                    </div>
                </div>

                {/* *****AVISOS DE ERRORES***** */}
                <div className="message_ok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_nok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div>

                {/* *****Buttons***** */}

                <div className="container eventButtons mb-3">

                    <div className=" row justify-content-between">
                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/events">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    // ******EVENTS LOGGED*****
    const EventosUser = () => (
        <div className="event">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="eventTitle text-center"><p>EVENTO</p></div>
                <div className="container tablaEvent">
                    <div className="headEvent">
                        <div className="reqEvent"><strong>Evento:</strong></div>
                        <div className="resEvent"> {event.name}</div>
                        <div className="reqEvent"><strong>Actividad:</strong></div>
                        <div className="resEvent"> {activity.name}</div>
                        <div className="reqEvent"><strong>Descripción:</strong></div>
                        <div className="resEvent"> {event.description}</div>
                        <div className="reqEvent"><strong>Precio:</strong></div>
                        <div className="resEvent"> {event.price}€</div>
                        <div className="reqEvent"><strong>Fecha de Actividad:</strong></div>
                        <div className="resEvent"> {event.dateActivity}</div>
                        <div className="reqEvent"><strong>Participantes:</strong></div>
                        {participating.map(e => (
                            <div>
                                <li className="resEvent">{e.name} {e.surname}</li>
                            </div>
                        ))}
                    </div>
                </div>

                {/* *****AVISOS DE ERRORES***** */}
                <div className="message_ok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_nok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="row justify-content-center m-4">
                    <div className="col-auto">
                        <form onSubmit={handleSubmit}>
                            <button className="btn btn-success" type="submit" >Inscribirme </button>
                        </form>
                    </div>
                </div>
                <div className="container eventButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/events">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // ******EVENTS ADMIN*****

    const EventosAdmin = () => (
        <div className="event">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="eventTitle text-center"><p>EVENTO</p></div>
                <div className="container tablaEvent">
                    <div className="headEvent">
                        <div className="reqEvent"><strong>Evento:</strong></div>
                        <div className="resEvent"> {event.name}</div>
                        <div className="reqEvent"><strong>Actividad:</strong></div>
                        <div className="resEvent"> {activity.name}</div>
                        <div className="reqEvent"><strong>Descripción:</strong></div>
                        <div className="resEvent"> {event.description}</div>
                        <div className="reqEvent"><strong>Precio:</strong></div>
                        <div className="resEvent"> {event.price}€</div>
                        <div className="reqEvent"><strong>Fecha de Actividad:</strong></div>
                        <div className="resEvent"> {event.dateActivity}</div>
                        <div className="reqEvent"><strong>Participantes:</strong></div>
                        {participating.map(e => (
                            <div className="m-0">
                                <li className="resEvent">{e.name} {e.surname}</li>
                            </div>
                        ))}
                    </div>
                </div>

                {/* *****AVISOS DE ERRORES***** */}
                <div className="message_ok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_nok shadow-lg p-1 m-3 bg-body rounded border text-center" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="row justify-content-center m-4">
                    <div className="col-auto">
                        <form onSubmit={handleSubmit}>
                            <button className="btn btn-success" type="submit" >Inscribirme </button>
                        </form>
                    </div>
                </div>
                <div className="container eventButtons mb-3">

                    <div className=" row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                            <button className="btn btn-danger" onClick={deleteEvent}>Borrar </button>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/events">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // *****Operacion ternaria multiple*****
    let eventos = role == 0 ? EventosUser() : role == 1 ? EventosAdmin() : Eventos()
    return (
        <div>
            {eventos}
        </div>
    )
}

export default Event;