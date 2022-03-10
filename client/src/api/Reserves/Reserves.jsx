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
                <div className="container reservesButtons mb-3">
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-success" type="submit" onChange={handleModify}>Ver
                        </button>
                        <button className="btn btn-warning" type="submit" onChange={handleModify}>Modificar
                        </button>
                        <button className="btn btn-danger" type="submit" onChange={handleModify}>Borrar
                        </button>
                    </div>
                    <div className="">
                        <Link className="btn btn-sm btn-primary " type="button" to="/">Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reserves;