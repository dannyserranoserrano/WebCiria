import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from '../../../components/header/Header';
import "./addFile.css"


const AddFile = () => {

    const [addFile, setAddFile] = useState({
        fileName: "",
        description: "",
        date: "",
        event: "",
        image: "",
    });

    const [events, setEvents] = useState([])
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const getEvents = async () => {
            const response2 = await axios.get("/api/events", {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response2.data);
            setEvents(response2.data.events);
        }
        getEvents();
    }, []);

    const handleChange = (e) => {
        setAddFile({
            ...addFile,
            [e.target.name]: e.target.value,
        })
        console.log(addFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(e.target);


        try {

            const response = await axios.post(
                '/api/newFile', form,
                { ...addFile }, {
                headers: {
                    "Authorization": token,
                    'content-type': 'text/json'
                }
            })

            setSuccessMessage(response.data.message)
            setTimeout(() => {
                navigate('/files')
            }, 2000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                window.location.href = "/files/addFile"
            }, 2000)
        }
    };

    return (
        <div className='addFile'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="addFileTitle text-center"><p>AÑADIR IMAGEN</p></div>

                <form onSubmit={handleSubmit} className="col-auto">
                    <div className='container inputAddFile'>

                        <div className="addFileName">
                            <label className="form-label ms-3">Nombre de la Imágen</label>
                            <input type="text" name="fileName" className="form-control" id="validationDefault01" onChange={handleChange}
                                placeholder="Introduce un Nombre" required />
                        </div>

                        <div className="AddFileDescription">
                            <label className="form-label ms-3">Descripción de la Imágen</label>
                            <input type="text" name="description" className="form-control" id="validationDefault01" onChange={handleChange}
                                placeholder="Introduce una Descripción" required />
                        </div>

                        <div className='addFileActivity'>
                            <label className="form-label ms-4">Evento Relacionado</label>
                            <select className="form-select" name="event" onChange={handleChange} aria-label="Default select example">
                                <option selected>Selecciona...</option>
                                {events.map(e => (
                                    <option key={e._id} value={e._id}>{e.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='addFileDate'>
                            <label className="form-label ms-5">Fecha de la imágen</label>
                            <input type="date" className="form-control" name="date" onChange={handleChange} />
                        </div>

                        <div className='addFileImage'>
                            <label className="form-label ms-5">Añadir Imágen</label>
                            <input type="file" className="form-control" name="image" onChange={handleChange} />
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
                    <div className="container addFileButtons">
                        <div className=" row justify-content-between">
                            <div className="col-auto">
                                <button className="btn btn-success" type="submit"
                                    disabled={!addFile.fileName.length || !addFile.description.length || !addFile.date.length ||
                                        !addFile.event.length}
                                >Añadir</button>
                            </div>
                            <div className="col-auto">
                                <Link className="btn btn-primary" type="button" to="/files">Volver</Link>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </div >
    )
};


export default AddFile;