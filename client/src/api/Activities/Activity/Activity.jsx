import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import './activity.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const Activity = () => {
    const { activityId } = useParams()
    const [activity, setActivity] = useState({})
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const getActivity = async () => {
            const response = await axios.get(`http://localhost:5000/api/findActivity/${activityId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setActivity(response.data.activity)

        }
        getActivity()
    }, [])

    // *****FUNCION PARA BORRAR*****
    const deleteActivity = async (e) => {
        e.preventDefault();
        const response2 = await axios.delete(
            `http://localhost:5000/api/deleteActivity/${activityId}`, {
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
                window.location.href = '/activity'
            }, 10000)
        }
    };


    return (
        <div className=" activity">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="activityTitle text-center mt-3"><p>ACTIVIDAD</p></div>
                <div className="container tablaActivity">
                    <div className="headActivity">
                        <div ><strong>Actividad</strong></div>
                        <div><strong>Pago</strong></div>
                    </div>
                    <div className="bodyActivity">
                        <div> {activity.name}</div>
                        <div> {activity.pay}</div>
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
                <div className="container activityButtons mb-3">
                    <div className="btn-group btn-group-sm col-auto ">
                        <button className="btn btn-warning" type="submit" >Modificar
                        </button>
                        <button className="btn btn-danger" onClick={deleteActivity}>Borrar </button>
                    </div>
                    <div className="volverActivities">
                        <Link className="btn btn-sm btn-primary" type="button" to="/activities">Volver</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Activity;