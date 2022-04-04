import React from "react";
import { Link } from "react-router-dom"
import './users.css'
import Header from '../../components/header/Header';
import TablaUsers from '../../components/tablaUsers/TablaUsers'


const Users = () => {
   
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
                    <div className="row justify-content-end">
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