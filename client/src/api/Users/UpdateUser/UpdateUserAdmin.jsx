import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./updateUser.css"


const UpdateUser = () => {

    const [updateUser, setUpdateUser] = useState({
        name: "",
        surname: "",
        city: "",
        role: "",
    });

    const { userId } = useParams()
    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // *****FUNCION PARA CREAR LA TABLA CON LOS DATOS ANTIGUOS*****
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/findUser/${userId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);
            setUser(response.data.user)
        }
        getUser()
    }, [])


    // *****FUNCION ACTUALIZACION DE DATOS*****
    const handleChange = (e) => {
        setUpdateUser({
            ...updateUser,
            [e.target.name]: e.target.value,
        })
    };
    console.log(updateUser);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // *****Confirmación*****
        let option = window.confirm("Seguro que quieres modificar el Usuario???")
        if (option === true) {

            // *****Hacemos la llamada*****
            try {
                const response2 = await axios.put(
                    `http://localhost:5000/api/updateUser/${userId}`,
                    { ...updateUser }, {
                    headers: {
                        "Authorization": token
                    }
                })
                setSuccessMessage(response2.data.message)
                console.log(response2);

                setTimeout(() => {
                    navigate(`/users/${userId}`)
                }, 2000)

            } catch (error) {
                setErrorMessage(error.response2.data.message)
                setTimeout(() => {
                    window.location.href = `/users/updateUser/${userId}`
                }, 2000)
            }
        };
    };
    return (
        <div className='updateUser'>
            <div className="header">
                <Header />
            </div>
            <div className="container centerUpdateUserAdmin">
                <div className="updateTitleUser text-center mt-3"><p>MODIFICAR DATOS DEL USUARIO</p></div>

                {/* *****VISUALIZAMOS ANTES DE MODIFICAR***** */}
                <div className="container tablaUpdateUser">
                    <div className="headUpdateUser">
                        <div className="reqUpdateUser"><strong>Nombre:</strong> {user.name}</div>
                        <div className="reqUpdateUser"><strong>Apellido:</strong> {user.surname}</div>
                        <div className="reqUpdateUser"><strong>Ciudad:</strong> {user.city}</div>
                        <div className="reqUpdateUser"><strong>Role:</strong> {user.role}</div>
                    </div>
                </div>

                {/* *****FORMULARIO PARA MODIFICAR***** */}
                <form onSubmit={handleSubmit} className="col-auto">
                    <div className="">
                        <div className='container inputsUpdateUser w-100'>
                            <div className="updateUserName">
                                <label className="form-label">Nombre de Usuario</label>
                                <input type="text" name="name" value={updateUser.name} className="form-control" onChange={handleChange}
                                    placeholder={user.name} required />
                            </div>
                            <div className="updateUserSurname">
                                <label className="form-label">Apellido de Usuario</label>
                                <input type="text" name="surname" value={updateUser.surname} className="form-control" onChange={handleChange}
                                    placeholder={user.surname} required />
                            </div>
                            <div className='updateUserCity'>
                                <label className="form-label">Ciudad de Origen</label>
                                <input type="text" name="city" value={updateUser.city} className="form-control" onChange={handleChange}
                                    placeholder={user.city} required />
                            </div>
                            <div className='updatePayActivity'>
                                <label className="form-label">Role</label>
                                <select className="form-select" name="role" value={updateUser.role} onChange={handleChange} aria-label="Default select example">
                                    <option selected>Selecciona...</option>
                                    <option value="0">Usuario</option>
                                    <option value="1">Administrador</option>
                                </select>
                            </div>
                        </div>

                        {/* *****AVISOS DE ERRORES***** */}
                        <div className="message_ok shadow-lg p-1 m-3 bg-body rounded border" style={{ display: successMessage ? "block" : "none" }}>
                            <div>
                                {successMessage}
                            </div>
                        </div>
                        <div className="message_ok shadow-lg p-1 m-3 bg-body rounded border" style={{ display: errorMessage ? "block" : "none" }}>
                            <div>
                                {errorMessage}
                            </div>
                        </div>

                        {/* *****Buttons***** */}
                        <div className="container updateButtonsUserAdmin">
                            <div className=" row justify-content-between">
                                <div className='col-auto'>
                                    <Link className="btn btn-primary" type="button" to="/Users">Volver</Link>
                                </div>
                                <div className='col-auto'>
                                    <button className="btn btn-warning" type="submit"
                                        disabled={!updateUser.name.length || !updateUser.surname.length || !updateUser.city.length}
                                    >Modificar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </div >
    )
};


export default UpdateUser;