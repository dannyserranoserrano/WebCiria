import React from "react";
import { Link } from "react-router-dom"
import './activities.css'
import Header from '../../components/header/Header';
import TablaActivities from '../../components/tablaActivities/TablaActivities'


const Activities = () => {
    return (
        <div className="activities">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="activitiesTitle text-center"><h1>ACTIVIDADES</h1></div>
                <div className="activitiesTable">
                    <TablaActivities />
                </div>
                {/* *****Buttons***** */}
                <div className="container activitiesButtons">
                    <div className="row justify-content-between">
                        <div className="addActivities col-auto">
                            <Link className="btn btn-sm btn-success" type="button" to="/activities/addActivity">Añadir Actividad</Link>
                        </div>
                        <div className="volverActivities col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Activities;