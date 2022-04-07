import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './tablaUsers.css'

const TablaUsers = () => {

    const [users, setUsers] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setUsers(response.data.users);
        }
        getUsers();
    }, []);


    return (
        <div className="tablaUsers container mt-4 mb-4">
            <div className=" headUsers table table-responsive mb-0">
                <div className='head2Users mt-2'>
                    <div><strong>Nombre</strong></div>
                    <div><strong>Email</strong></div>
                </div>
                <div>
                    {users.map(e => (
                        <div className="bodyUsers">
                            <Link key={e._id} to={`/users/${e._id}`} className="container linkUsers">
                                <div className='link2Users'>
                                    <div className='divUsers'>{e.name} {e.surname}</div>
                                    <div className='divMail'>{e.email}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TablaUsers;