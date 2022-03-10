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


    useEffect(() => {
        const getFile = async () => {
            const response = await axios.get(`http://localhost:5000/api/findFiles/${fileId}`, {
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


    // ******FILES UNLOGGED*****
    const imageUnlogged = () => (
        <div className="file">
            <div className="header">
                <Header />
            </div>
            <div className="imageFile">
                <img className="imgFile " src={file.image.url} alt={file.fileName} />
            </div>
            <div className="container">
                <div className="fileTitle text-center"><p>IMAGEN</p></div>
                <div className="container tablafile">
                    <div className="headfile">
                        <div className="reqfile"><strong>Nombre:</strong></div>
                        <div className="resfile"> {file.fileName}</div>
                        <div className="reqfile"><strong>Descripción:</strong></div>
                        <div className="resfile"> {file.description}</div>
                        <div className="reqfile"><strong>Fecha</strong></div>
                        <div className="resfile"> {file.date}</div>
                        <div className="reqfile"><strong>Evento:</strong></div>
                        <div className="resfile"> {event.name}</div>
                        <div className="reqfile"><strong>Usuario:</strong></div>
                        <div className="resfile"> {user.name} {user.surname}</div>
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container fileButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                            <button className="btn btn-danger" type="submit" >Borrar
                            </button>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/files">Volver</Link>
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
            <div className="container">
                <div className="fileTitle text-center"><p>IMAGEN</p></div>
                <div className="container tablafile">
                    <div className="imageFile">
                        <img className="imgFile " src={file.image.url} alt={file.fileName} />
                    </div>
                    <div className="headfile">
                        <div className="reqfile"><strong>Nombre:</strong></div>
                        <div className="resfile"> {file.fileName}</div>
                        <div className="reqfile"><strong>Descripción:</strong></div>
                        <div className="resfile"> {file.description}</div>
                        <div className="reqfile"><strong>Fecha</strong></div>
                        <div className="resfile"> {file.date}</div>
                        <div className="reqfile"><strong>Evento:</strong></div>
                        <div className="resfile"> {event.name}</div>
                        <div className="reqfile"><strong>Usuario:</strong></div>
                        <div className="resfile"> {user.name} {user.surname}</div>
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container fileButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                            <button className="btn btn-danger" type="submit" >Borrar
                            </button>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/files">Volver</Link>
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
            <div className="container">
                <div className="fileTitle text-center"><p>{file.fileName}</p></div>
                <div className="imgDiv row justify-content-center">
                    <img className="imgFile" src={image.url} alt={image.fileName}/>
                </div>
                <div className="container tablafile">

                    <div className="headfile">
                        <div className="reqfile"><strong>Nombre:</strong></div>
                        <div className="resfile"> {file.fileName}</div>
                        <div className="reqfile"><strong>Descripción:</strong></div>
                        <div className="resfile"> {file.description}</div>
                        <div className="reqfile"><strong>Fecha</strong></div>
                        <div className="resfile"> {file.date}</div>
                        <div className="reqfile"><strong>Evento:</strong></div>
                        <div className="resfile"> {event.name}</div>
                        <div className="reqfile"><strong>Usuario:</strong></div>
                        <div className="resfile"> {user.name} {user.surname}</div>
                    </div>
                </div>

                {/* *****Buttons***** */}
                <div className="container fileButtons mb-3">
                    <div className=" row justify-content-between">
                        <div className="btn-group btn-group-sm col-auto ">
                            <button className="btn btn-warning" type="submit" >Modificar
                            </button>
                            <button className="btn btn-danger" type="submit" >Borrar
                            </button>
                        </div>

                        <div className="col-auto">
                            <Link className="btn btn-sm btn-primary" type="button" to="/files">Volver</Link>
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