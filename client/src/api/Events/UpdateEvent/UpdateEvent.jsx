import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./updateEvent.css"


const UpdateEvent = () => {

    const role = localStorage.getItem("role")

    const [updateEvent, setUpdateEvent] = useState({
        activityId: "",
        name: "",
        description: "",
        price: "",
        dateActivity: "",
    });

    const { eventId } = useParams();
    const [user, setUser] = useState({})
    const [event, setEvent] = useState({});
    const [activity, setActivity] = useState({})
    const [activities, setActivities] = useState([]);
    const token = localStorage.getItem('token');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();


    // *****FUNCION PARA CREAR LA TABLA CON LOS DATOS ANTIGUOS*****
    useEffect(() => {
        const getEvent = async () => {
            const response = await axios.get(`http://localhost:5000/api/findEvent/${eventId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response.data.event.userCreate);
            setEvent(response.data.event)
            setActivity(response.data.event.activity)

        }
        getEvent()
    }, [])

    useEffect(() => {
        const getUser = async () => {
            const response3 = await axios.get('http://localhost:5000/api/findUser', {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response3);
            setUser(response3.data.user)
        }
        getUser();
    }, [])

    // ******BUSQUEDA DE ACTIVIDADES*****    
    useEffect(() => {
        const getActivities = async () => {
            const response2 = await axios.get("http://localhost:5000/api/activities", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response2.data.activity);
            setActivities(response2.data.activity);
        }
        getActivities();
    }, []);

    if ((event.userCreate == user._id) ||  (role == 1)) {

        // *****FUNCION ACTUALIZACION DE DATOS*****
        const handleChange = (e) => {
            setUpdateEvent({
                ...updateEvent,
                [e.target.name]: e.target.value,
            })
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            // *****Confirmación*****
            let option = window.confirm("Seguro que quieres modificar el Evento???")
            if (option === true) {

                // *****Hacemos la llamada*****

                const response = await axios.put(
                    `http://localhost:5000/api/updateEvent/${eventId}`,
                    { ...updateEvent }, {
                    headers: {
                        "Authorization": token
                    }
                })

                try {
                    setSuccessMessage(response.data.message)
                    console.log(response);

                    setTimeout(() => {
                        navigate('/events')
                    }, 2000)

                } catch (error) {
                    setErrorMessage(error.response.data.message)
                    setTimeout(() => {
                        window.location.href = `/events/updateEvent/${eventId}`
                    }, 2000)
                }
            };
        };
        return (
            <div className='updateEvent'>
                <div className="header">
                    <Header />
                </div>
                <div className="container centerUpdateEvent">
                    <div className="updateTitleEvent text-center mt-3"><p>MODIFICAR EVENTO</p></div>

                    {/* *****VISUALIZAMOS ANTES DE MODIFICAR***** */}
                    <div className="container tablaUpdateEvent table table-responsive">
                        <div className="headUpdateEvent">
                            <div className="reqUpdateEvent"><strong>Evento:</strong> {event.name}</div>
                            <div className="reqUpdateEvent"><strong>Descripción:</strong> {event.description}</div>
                            <div className="reqUpdateEvent"><strong>Actividad:</strong> {activity.name} ({activity.pay})</div>
                            <div className="reqUpdateEvent"><strong>Precio:</strong> {event.price}€</div>
                            <div className="reqUpdateEvent"><strong>Fecha del Evento:</strong> {new Date(event.dateActivity).toLocaleString('es')}</div>
                        </div>
                    </div>
                    {/* *****FORMULARIO PARA MODIFICAR***** */}
                    <form onSubmit={handleSubmit} className="col-auto">
                        <div className="container">
                            <div className='container inputsUpdateEvent'>
                                <div className="updateEventName">
                                    <label className="form-label">Nombre del Evento</label>
                                    <input type="text" name="name" className="form-control" id="validationDefault01" onChange={handleChange}
                                        placeholder={event.name} required />
                                </div>
                                <div className="updateEventDescription">
                                    <label className="form-label">Descripción del Evento</label>
                                    <input type="text" name="description" className="form-control" id="validationDefault01" onChange={handleChange}
                                        placeholder={event.description} required />
                                </div>
                                <div className='updateEventActivity'>
                                    <label className="form-label">Tipo de Actividad</label>
                                    <select className="form-select" name="activityId" onChange={handleChange} aria-label="Default select example" required>
                                        <option selected>Selecciona...</option>
                                        {activities.map(e => (
                                            <option key={e._id}>{e.name} ({e.pay})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='updateEventPrice'>
                                    <label className="form-label">Precio del Evento</label>
                                    <div className=" input-group">
                                        <input type="text" className="form-control" name="price" onChange={handleChange} placeholder={event.price} aria-label="Amount (to the nearest euro)" required />
                                        <span className="input-group-text">€</span>
                                    </div>
                                </div>
                                <div className='updateEventDate'>
                                    <label className="form-label">Fecha del Evento</label>
                                    <input type="datetime-local" className="form-control" name="dateActivity" onChange={handleChange} placeholder={event.dateActivity} required />
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
                            <div className="container updateButtonsEvent">
                                <div className=" row justify-content-between">
                                    <div className='col-auto'>
                                        <Link className="btn btn-primary" type="button" to="/events">Volver</Link>
                                    </div>
                                    <div className='col-auto'>
                                        <button className="btn btn-warning" type="submit"
                                            disabled={!updateEvent.name.length || !updateEvent.description.length || !updateEvent.activityId.length ||
                                                !updateEvent.price.length || !updateEvent.dateActivity.length}
                                        >Modificar</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form >
                </div>
            </div >
        )
    } else {
        return (

            <div className='dontM'>
            <div className="header">
                <Header />
            </div>
            <div className="container bodyDontM">
                <div className='centerDontM'>
                    <div className="dontMTitle text-center"><p>No eres el creador de este evento</p></div>
                    <div className='row justify-content-center'><img src="../../images/logo.png" alt="Castillo" className="logoLogout col-auto" /></div>
                </div>
                {/* *****Buttons***** */}
                <div className="container buttonsDontM">
                    <div className=' row justify-content-between'>
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/events">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        )
    }
};


export default UpdateEvent;