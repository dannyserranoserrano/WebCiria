import React from "react";
import { Link } from "react-router-dom"
import './users.css'
import Header from '../../components/header/Header';
import TablaUsers from '../../components/tablaUsers/TablaUsers'


const Users = () => {
    const handleModify = () => {
    }
    return (
        <div className="users">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="usersTitle text-center"><h1>USUARIOS</h1></div>
                <div className="container usersTable">
                    <TablaUsers />
                </div>
                {/* *****Buttons***** */}
                <div className="container usersButtons">
                    <div className="row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto">
                            <button className="btn btn-success" type="submit" onChange={handleModify}>Ver
                            </button>
                            <button className="btn btn-warning" type="submit" onChange={handleModify}>Modificar
                            </button>
                            <button className="btn btn-danger" type="submit" onChange={handleModify}>Borrar
                            </button>
                        </div>
                        <div className="volverUser col-auto">
                            <Link className="btn btn-sm btn-primary " type="button" to="/">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Users;