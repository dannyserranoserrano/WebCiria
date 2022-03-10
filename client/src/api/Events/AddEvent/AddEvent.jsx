import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./addEvent.css"


const AddEvent = () => {

    const [addEvent, setAddEvent] = useState({
        activityId: "",
        name: "",
        description: "",
        price: "",
        dateActivity: "",
    });

    const [activity, setActivity] = useState([])
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const getActivity = async () => {
            const response2 = await axios.get("http://localhost:5000/api/activities", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response2.data);
            setActivity(response2.data.activity);
        }
        getActivity();
    }, []);

    // const ActivityPay = () => {

    //     const [activityPay, setActivityPay] = useState([])
    //     activity.map((f) => {
    //         return f.pay
    //     })
    //     console.log(activityPay);
    // }
    // ActivityPay();
    


const handleChange = (e) => {
    setAddEvent({
        ...addEvent,
        [e.target.name]: e.target.value,
    })
    console.log(addEvent);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await axios.post(
            'http://localhost:5000/api/newEvent',
            { ...addEvent }, {
            headers: {
                "Authorization": token
            }
        })

        setSuccessMessage(response.data.message)

        setTimeout(() => {
            navigate('/events')
        }, 2000)

    } catch (error) {
        setErrorMessage(error.response.data.message)
        setTimeout(() => {
            window.location.href = "/events/addEvent"
        }, 2000)
    }
};

return (
    <div className='addEvent'>
        <div className="header">
            <Header />
        </div>
        <div className="container">
            <div className="addEventTitle text-center"><p>AÑADIR EVENTO</p></div>
            <form onSubmit={handleSubmit} className="col-auto">
                <div className='container inputsAddEvent'>
                    <div className="addEventName">
                        <label className="form-label ms-3">Nombre del Evento</label>
                        <input type="text" name="name" className="form-control" id="validationDefault01" onChange={handleChange}
                            placeholder="Nombre del Evento" required />
                    </div>
                    <div className="addEventDescription">
                        <label className="form-label ms-3">Descripción del Evento</label>
                        <input type="text" name="description" className="form-control" id="validationDefault01" onChange={handleChange}
                            placeholder="Descripción del Evento" required />
                    </div>

                    <div className='addEventActivity'>
                        <label className="form-label ms-4">Tipo de Actividad</label>

                        <select className="form-select" name="activityId" onChange={handleChange} aria-label="Default select example">
                            <option selected>Selecciona...</option>
                            {activity.map(e => (
                                <option key={e._id} value={e._id}>{e.activity}</option>

                            ))}
                        </select>
                    </div>

                    <div className='addEventPrice'>
                        <label className="form-label ms-4">Precio del Evento</label>
                        <div className=" input-group mb-3">
                            <span className="input-group-text">€</span>
                            <input type="text" className="form-control" name="price" onChange={handleChange} aria-label="Amount (to the nearest euro)" />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    <div className='addEventDate'>
                        <label className="form-label ms-5">Fecha del Evento</label>
                        <input type="datetime-local" className="form-control" name="dateActivity" onChange={handleChange} />
                    </div>
                </div>
                {/* *****AVISOS DE ERRORES***** */}
                <div className="message_ok shadow-lg p-1 bg-body rounded border" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_nok shadow-lg p-1 bg-body rounded border" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container AddEventButtons">
                    <div className=" row justify-content-between">
                        <div className="col-auto">
                            <button className="btn btn-success" type="submit"
                                disabled={!addEvent.name.length || !addEvent.description.length || !addEvent.activityId.length ||
                                    !addEvent.price.length || !addEvent.dateActivity.length}
                            >Añadir</button>
                        </div>
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/events">Volver</Link>
                        </div>
                    </div>
                </div>
            </form >
        </div>
    </div >
)
};


export default AddEvent;