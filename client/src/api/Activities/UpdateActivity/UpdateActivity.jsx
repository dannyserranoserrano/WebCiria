import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./updateActivity.css"


const UpdateActivity = () => {

    const [updateActivity, setUpdateActivity] = useState({
        name: "",
        pay: "",
    });

    const { activityId } = useParams()
    const [activity, setActivity] = useState({})
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    console.log(activityId);

    // *****FUNCION PARA CREAR LA TABLA CON LOS DATOS ANTIGUOS*****
    useEffect(() => {
        const getActivity = async () => {
            const response2 = await axios.get(`/api/findActivity/${activityId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response2);
            setActivity(response2.data.activity)
        }
        getActivity()
    }, [])

    // *****FUNCION ACTUALIZACION DE DATOS*****
    const handleChange = (e) => {
        setUpdateActivity({
            ...updateActivity,
            [e.target.name]: e.target.value,
        })
    };
    console.log(activityId);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // *****Confirmación*****
        let option = window.confirm("Seguro que quieres modificar la Actividad???")
        if (option === true) {

            // *****Hacemos la llamada*****

            try {
                const response = await axios.put(
                    `/api/updateActivity/${activityId}`,
                    { ...updateActivity }, {
                    headers: {
                        "Authorization": token
                    }
                })

                setSuccessMessage(response.data.message)
                console.log(response);

                setTimeout(() => {
                    navigate('/activities')
                }, 2000)

            } catch (error) {
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    window.location.href = `/activities/updateActivity/${activityId}`
                }, 2000)
            }
        };
    };

    return (
        <div className='updateActivity'>
            <div className="header">
                <Header />
            </div>
            <div className="container centerUpdateActivity">
                <div className="updateTitleActivity text-center"><p>MODIFICAR ACTIVIDAD</p></div>

                {/* *****VISUALIZAMOS ANTES DE MODIFICAR***** */}
                <div className="container tablaUpdateActivity">
                    <div className="headUpdateActivity">
                        <div ><strong>Actividad</strong> {activity.name}</div>
                        <div><strong>Pago</strong> {activity.pay}</div>
                    </div>
                </div>
                {/* *****FORMULARIO PARA MODIFICAR***** */}
                <form onSubmit={handleSubmit} className="col-auto">
                    <div className="container">
                        <div className='container inputsUpdateActivity'>
                            <div className="updateNameActivity">
                                <label className="form-label">Nombre de la Actividad</label>
                                <input type="text" name="name" value={updateActivity.name} className="form-control" id="validationDefault01" onChange={handleChange}
                                    placeholder={activity.name} required />
                            </div>
                            <div className='updatePayActivity'>
                                <label className="form-label">De pago</label>
                                <select className="form-select" name="pay" value={updateActivity.pay} onChange={handleChange} aria-label="Default select example">
                                    <option selected>Selecciona...</option>
                                    <option value="Pago">Pago</option>
                                    <option value="Gratis">Gratis</option>
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
                        <div className="container updateButtonsActivity">
                            <div className=" row justify-content-between">
                                <div className='col-auto'>
                                    <Link className="btn btn-primary" type="button" to="/activities">Volver</Link>
                                </div>
                                <div className='col-auto'>
                                    <button className="btn btn-warning" type="submit"
                                        disabled={!updateActivity.name.length || !updateActivity.pay.length}
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


export default UpdateActivity;