import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './tablaUsers.css'

const TablaUsers = () => {

    const [users, setUsers] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("/api/users", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setUsers(response.data.users);
        }
        getUsers();
    }, [token]);


    return (
        <div className="container tablaUsers container col auto mt-4 mb-4">
            <div className=" headUsers table table-responsive mb-0">
                <div className='head2Users mt-2'>
                    <div><strong>Nombre</strong></div>
                    <div><strong>Email</strong></div>
                </div>
                <div>
                    <div className="container">
                        {users.map(e => (
                            <Link key={e._id} to={`/users/${e._id}`} className="container linkUsers">
                                <div className='link2Users m-0'>
                                    <div className='divUsers'>{e.name} {e.surname}</div>
                                    <div className='divMail'>{e.email}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TablaUsers;