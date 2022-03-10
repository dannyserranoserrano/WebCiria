import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import './activity.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const Activity = () => {
    const {activityId} = useParams()
    const [activity, setActivity] = useState({})
    const token = localStorage.getItem('token')

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
                {/* *****Buttons***** */}
                <div className="container activityButtons mb-3">
                    <div className="btn-group btn-group-sm col-auto ">
                        <button className="btn btn-warning" type="submit" >Modificar
                        </button>
                        <button className="btn btn-danger" type="submit" >Borrar
                        </button>
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