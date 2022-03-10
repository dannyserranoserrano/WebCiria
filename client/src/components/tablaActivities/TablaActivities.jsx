import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './tablaActivities.css'

const TablaActivities = () => {

    const [activities, setActivities] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getActivities = async () => {
            const response = await axios.get("http://localhost:5000/api/activities", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setActivities(response.data.activity);
        }
        getActivities();
    }, []);


    return (
        <div className="container tablaActivities">

            <div className="linkActivities">
                <div ><strong>Actividad</strong></div>
                <div><strong>Pago</strong></div>
            </div>

            {activities.map(e => (
                <div className="linkActivities2">
                    <Link key={e._id} to={`/activities/${e._id}`} className="tdClass"  >
                        <div className="tdClass">{e.name}</div>
                    </Link>
                    <Link key={e._id} to={`/activities/${e._id}`} className="tdClass">
                        <div className="tdClass">{e.pay}</div>
                    </Link>

                </div>
            ))}


        </div>

    )
}

export default TablaActivities;