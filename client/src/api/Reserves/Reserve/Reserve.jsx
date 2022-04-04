import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './reserve.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const Reserve = () => {

    const [reserve_id,setReserve_id] = useState({})
    const [event, setEvent] = useState({})
    const [participating, setParticipating] = useState({})
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const getReserve = async () => {
            const response = await axios.get("http://localhost:5000/api/findReserve", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setReserve_id(response.data.reserve._id);
            setEvent(response.data.reserve.event);
            setParticipating(response.data.reserve.participating);

        }
        getReserve()
    }, [])

// *****FUNCION PARA BORRAR*****
const deleteReserve = async (e) => {
    e.preventDefault();
    const response2 = await axios.delete(
        `http://localhost:5000/api/deleteReserve/${reserve_id}`, {
        headers: {
            "Authorization": token
        }
    })
    try {

        setSuccessMessage(response2.data.message)

        setTimeout(() => {
            window.location.href = '/'
        }, 2000)

    } catch (error) {
        setErrorMessage(response2.data.error.message)
        setTimeout(() => {
            window.location.href = '/user'
        }, 2000)
    }
};

    return (
        <div className=" reserve">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="reserveTitle text-center mt-3"><p>RESERVA</p></div>
                <div className="container tablaReserve">
                    <div className="headReserve">
                        <div ><strong>Evento</strong></div>
                        <div><strong>Participante</strong></div>
                    </div>
                    <div className="bodyReserve">
                        <div> {event.name}</div>
                        <div> {participating.name} {participating.surname}</div>
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
                <div className="container reserveButtons mb-3">
                    <div className="btn-group btn-group-sm col-auto ">
                        <button className="btn btn-warning" type="submit" >Modificar
                        </button>
                        <button className="btn btn-danger" onClick={deleteReserve}>Borrar </button>
                </div>
                <div className="volverReserve">
                    <Link className="btn btn-sm btn-primary" type="button" to="/reserves">Volver</Link>
                </div>
            </div>

        </div>
        </div >
    )
}
export default Reserve;