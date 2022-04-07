import React from "react";
import { Link } from "react-router-dom"
import './events.css'
import Header from '../../components/header/Header';
import TablaEvents from '../../components/tablaEvents/TablaEvents'


const Events = () => {

    return (
        <div className="events">
            <div className="header">
                <Header />
            </div>
            <div className="container centerEvents">
                <div className="eventsTitle text-center"><p>EVENTOS</p></div>
                <div className="container eventsTable">
                    <TablaEvents />
                </div>
                {/* *****Buttons***** */}
                <div className="container eventsButtons">
                    <div className="row justify-content-between">
                        <div className="volverEvents col-auto">
                            <Link className="btn btn-primary " type="button" to="/">Volver</Link>
                        </div>
                        <div className="addEvents col-auto">
                            <Link className="btn btn-success" type="button" to="/events/addEvent">Añadir Evento</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Events;