import React from "react";
import { Link } from "react-router-dom"
import './reserves.css'
import Header from '../../components/header/Header';
import TablaReserves from '../../components/tablaReserves/TablaReserves'


const Reserves = () => {
    const handleModify = () => {
    }
    return (
        <div className="reserves">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="reservesTitle text-center"><h1>RESERVAS</h1></div>
                <div className="container reservesTable">
                    <TablaReserves />
                </div>
                {/* *****Buttons***** */}
                <div className="container reservesButtons">
                    <div className="row justify-content-end">
                        <div className="addReserves col-auto">
                            <Link className="btn btn-sm btn-primary " type="button" to="/">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reserves;