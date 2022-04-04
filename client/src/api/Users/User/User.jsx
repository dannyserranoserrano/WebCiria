import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './user.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const User = () => {

    const [user, setUser] = useState({})
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem('token')

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(
                'http://localhost:5000/api/findUser', {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setUser(response.data.user)

        }
        getUser()
    }, [])

    // *****FUNCION PARA BORRAR*****
    const deleteUser = async (e) => {
        e.preventDefault();
        const response2 = await axios.delete(
            'http://localhost:5000/api/deleteUser', {
            headers: {
                "Authorization": token
            }
        })
        try {

            setSuccessMessage(response2.data.message)
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('name')

            setTimeout(() => {
                window.location.href = '/'
            }, 2000)

        } catch (error) {
            setErrorMessage(response2.data.error.message)
            setTimeout(() => {
                window.location.href = '/user'
            }, 2000)
        }
    };




    return (
        <div className="user">
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="userTitle text-center mt-3"><p>ESTOS SON TUS DATOS</p></div>
                <div className="container ">
                    <div className="container tablaUser">
                        <div className="tablaUser2">
                            <div className="headUser"><strong>Nombre</strong></div>
                            <div className="bodyUser"> {user.name}</div>
                            <div className="headUser"><strong>Apellido</strong></div>
                            <div className="bodyUser"> {user.surname}</div>
                            <div className="headUser"><strong>Ciudad</strong></div>
                            <div className="bodyUser"> {user.city}</div>
                            <div className="headUser"><strong>Email</strong></div>
                            <div className="bodyUser"> {user.email}</div>
                            <div className="headUser"><strong>Role</strong></div>
                            <div className="bodyUser"> {user.role}</div>
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
                    <div className="container userButtons mb">
                        <div className="row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                            
                                <button className="btn btn-danger" onClick={deleteUser}>Borrar </button>
                            
                        </div>
                        <div className="volverUsers col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}
export default User;