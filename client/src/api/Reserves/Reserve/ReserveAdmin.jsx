import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import './reserve.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const ReserveAdmin = () => {

    const { reserveId } = useParams()
    const [event, setReserve] = useState({})
    const [participating, setParticipating] = useState({})
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const getReserve = async () => {
            const response = await axios.get(`http://localhost:5000/api/findReserve/${reserveId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setReserve(response.data.reserve.event);
            setParticipating(response.data.reserve.participating);

        }
        getReserve()
    }, [])

    // *****FUNCION PARA BORRAR*****
    const deleteReserve = async (e) => {
        e.preventDefault();

        // *****Confirmación*****
        let option = window.confirm("Seguro que quieres eliminar esta reserva???")
        if (option === true) {

            // *****Hacemos la llamada*****

            const response2 = await axios.delete(
                'http://localhost:5000/api/deleteReserve/:reserveId', {
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
                    window.location.href = `/reserve/${reserveId}`
                }, 2000)
            }
        };
    };
    return (
        <div className=" reserve">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="reserveTitle text-center mt-3"><p>RESERVAadmin</p></div>
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
        </div>
    )
}
export default ReserveAdmin;