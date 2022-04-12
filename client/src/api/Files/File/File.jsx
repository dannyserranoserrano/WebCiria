import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import './file.css'
import Header from '../../../components/header/Header'
import axios from "axios";


const File = () => {
    const { fileId } = useParams();
    const [image, setImage] = useState({});
    const [file, setFile] = useState([]);
    const [event, setEvent] = useState([]);
    const [user, setUser] = useState([]);
    const role = localStorage.getItem("role")
    const token = localStorage.getItem('token')
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        const getFile = async () => {
            const response = await axios.get(`/api/findFiles/${fileId}`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response);



            setImage(response.data.file.image)
            setFile(response.data.file);
            setEvent(response.data.file.event);
            setUser(response.data.file.user);


        }
        getFile()
    }, [])

    // *****FUNCION PARA BORRAR*****
    const deleteFile = async (e) => {
        e.preventDefault();


        // *****Confirmación*****
        let option = window.confirm("Seguro que quieres eliminar el archivo???")
        if (option === true) {

            // *****Hacemos la llamada*****
            const response2 = await axios.delete(
                `/api/deleteFile/${fileId}`, {
                headers: {
                    "Authorization": token
                }
            })
            try {

                setSuccessMessage(response2.data.message)

                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)

            } catch (error) {
                setErrorMessage(error.response2.data.message)
                setTimeout(() => {
                    window.location.href = '/file'
                }, 2000)
            }
        };
    };
    // ******FILES UNLOGGED*****
    const imageUnlogged = () => (
        <div className="file">
            <div className="header">
                <Header />
            </div>
            <div className="container centerFile">
                <div className="fileUnloggTitle text-center"><p>No estás registrado o no estás Logueado</p></div>
                {/* *****Buttons***** */}
                <div className="container fileUnloggButtons mb-3">
                    <div className=" row justify-content-start">
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/files">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // ******FILES USER*****
    const imageUser = () => (
        <div className="file">
            <div className="header">
                <Header />
            </div>
            <div className="container centerFile">
                <div className="fileTitle text-center"><p>{file.fileName}</p></div>
                <div className="imgDiv row justify-content-center">
                    <img className="imgFile " src={image.url} alt={file.fileName} />
                </div>
                <div className="container fileTable w-100 table table-responsive">
                    <div className="headFile ">
                        <div className="reqfile"><strong>Nombre:</strong> {file.fileName}</div>
                        <div className="reqfile"><strong>Descripción:</strong> {file.description}</div>
                        <div className="reqfile"><strong>Fecha</strong> {new Date(file.date).toLocaleDateString("es")}</div>
                        <div className="reqfile"><strong>Evento:</strong> {event.name}</div>
                        <div className="reqfile"><strong>Usuario:</strong> {user.name} {user.surname}</div>
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container fileButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="btn-group col-auto ">
                            <Link className="btn btn-warning" type="button" key={file._id} to={`/files/updateFile/${fileId}`}>Modificar</Link>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/files">Volver</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // ******FILES ADMIN*****

    const imageAdmin = () => (
        <div className="file">
            <div className="header">
                <Header />
            </div>
            <div className="container centerFile">
                <div className="fileTitle text-center"><p>{file.fileName}</p></div>
                <div className="imgDiv row justify-content-center">
                    <img className="imgFile" src={image.url} alt={image.fileName} />
                </div>
                <div className="container fileTable w-100 table table-responsive">
                    <div className="headfile">
                        <div className="reqfile"><strong>Nombre:</strong> {file.fileName}</div>
                        <div className="reqfile"><strong>Descripción:</strong> {file.description}</div>
                        <div className="reqfile"><strong>Fecha</strong> {new Date(file.date).toLocaleDateString("es")}</div>
                        <div className="reqfile"><strong>Evento:</strong> {event.name}</div>
                        <div className="reqfile"><strong>Usuario:</strong> {user.name} {user.surname}</div>
                    </div>
                </div>

                {/* *****AVISOS DE ERRORES***** */}
                <div className="message_ok shadow-lg p-3 m-3 bg-body rounded border text-center" style={{ display: successMessage ? "block" : "none" }}>
                    <div>
                        {successMessage}
                    </div>
                </div>
                <div className="message_ok shadow-lg p-3 m-3 bg-body rounded border text-center" style={{ display: errorMessage ? "block" : "none" }}>
                    <div>
                        {errorMessage}
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container fileButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="col-auto">
                            <Link className="btn btn-primary" type="button" to="/files">Volver</Link>
                        </div>
                        <div className="btn-group col-auto ">
                            <Link className="btn btn-warning" type="button" key={file._id} to={`/files/updateFile/${fileId}`}>Modificar</Link>
                            <button className="btn btn-danger" onClick={deleteFile}>Borrar </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

    // *****Operacion ternaria multiple*****
    let galeria = role == 0 ? imageUser() : role == 1 ? imageAdmin() : imageUnlogged()
    return (
        <div>
            {galeria}
        </div>
    )
}

export default File;