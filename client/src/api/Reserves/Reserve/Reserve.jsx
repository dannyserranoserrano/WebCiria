import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './reserve.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const Reserve = () => {

    const [reserve, setReserve] = useState({})
    const [event, setEvent] = useState({})
    const [participating, setParticipating] = useState({})
    const token = localStorage.getItem('token')
    // const [successMessage, setSuccessMessage] = useState(null);
    // const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const getReserve = async () => {
            const response = await axios.get('/api/findReserve', {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setReserve(response.data.reserve);
            setEvent(response.data.reserve.event);
            setParticipating(response.data.reserve.participating);

        }
        getReserve()
    }, [])

    // // *****FUNCION PARA BORRAR*****
    // const deleteReserve = async (e) => {
    //     e.preventDefault();

    //     // *****Confirmación*****
    //     let option = window.confirm("Seguro que quieres eliminar esta Reserva???")
    //     if (option === true) {

    //         // *****Hacemos la llamada*****

    //         const response2 = await axios.delete(
    //             `/api/deleteReserve/${reserve_id}`, {
    //             headers: {
    //                 "Authorization": token
    //             }
    //         })
    //         try {

    //             setSuccessMessage(response2.data.message)

    //             setTimeout(() => {
    //                 window.location.href = '/'
    //             }, 2000)

    //         } catch (error) {
    //             setErrorMessage(response2.data.error.message)
    //             setTimeout(() => {
    //                 window.location.href = '/user'
    //             }, 2000)
    //         }
    //     };
    // };
    return (
        <div className=" reserve">
            <div className="header">
                <Header />
            </div>
            <div className="container centerReserve">
                <div className="reserveTitle text-center mt-3"><p>RESERVA</p></div>
                <div className="container tablaReserve table table-responsive">
                    <div className="headReserve">
                        <div ><strong>Evento</strong> {event.name}</div>
                        <div><strong>Participante</strong> {participating.name} {participating.surname}</div>
                    </div>
                </div>

                {/* *****AVISOS DE ERRORES***** */}
                {/* <div className="message_ok shadow-lg p-3 m-3 bg-body rounded border text-center" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_ok shadow-lg p-3 m-3 bg-body rounded border text-center" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div> */}

                {/* *****Buttons***** */}
                <div className="container reserveButtons mb-3">
                    <div className="volverReserve">
                        <Link className="btn btn-sm btn-primary" type="button" to="/reserves">Volver</Link>
                    </div>
                    <div className="btn-group btn-group-sm col-auto ">
                        <button className="btn btn-warning" type="submit" >Modificar
                        </button>
                        {/* <button className="btn btn-danger" onClick={deleteReserve}>Borrar </button> */}
                    </div>

                </div>

            </div>
        </div >
    )
}
export default Reserve;