import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./UpdateActivity.css"


const UpdateActivity = () => {

    const [updateActivity, setUpdateActivity] = useState({
        name: "",
        pay: "",
    });

    const { activityId } = useParams()
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const navigate = useNavigate()


    const handleChange = (e) => {
        setUpdateActivity({
            ...updateActivity,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/updateActivity/${activityId}`,
                { ...UpdateActivity }, {
                headers: {
                    "Authorization": token
                }
            })

            setSuccessMessage(response.data.message)

            setTimeout(() => {
                navigate('/activities')
            }, 2000)

        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                window.location.href = "/activities/UpdateActivity"
            }, 2000)
        }
    };

    return (
        <div className='UpdateActivity'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="UpdateTitle text-center mt-3"><p>MODIFICAR ACTIVIDAD</p></div>
                <form onSubmit={handleSubmit} className="col-auto">
                    <div className="container">
                        <div className='container inputsUpdateActivity'>
                            <div className="UpdateName">
                                <label className="form-label ms-3">Nombre de la Actividad</label>
                                <input type="text" name="name" className="form-control" id="validationDefault01" onChange={handleChange}
                                    placeholder="Nombre de la actividad" required />
                            </div>
                            <div className='UpdatePay'>
                                <label className="form-label ms-5">De pago</label>
                                <select className="form-select" name="pay" onChange={handleChange} aria-label="Default select example">
                                    <option selected>Selecciona...</option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
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
                        <div className="container Updatebuttons">
                            <div className=" row justify-content-between">
                                <div className='col-auto'>
                                    <button className="btn btn-warning" type="submit"
                                        disabled={!UpdateActivity.name.length || !UpdateActivity.pay.length}
                                    >Modificar</button>
                                </div>
                                <div className='col-auto'>
                                    <Link className="btn btn-primary" type="button" to="/activities">Volver</Link>
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