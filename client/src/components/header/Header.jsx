import React from "react";
import './Header.css';
import { Link } from "react-router-dom";


const Header = () => {



    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")
 

    // *****NAVBAR UNLOGGIN*****
    const NavBar = () => (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <div className="container-fluid">
                    <img src="../../images/logo.png" alt="" width="130" height="50" className="d-inline-block align-text-top" />
                    <div className="col-auto"><Link className="navbar-brand fs-2 col-auto" to="/">Bienvenidos a CIRIA</Link>
                        <p className="p navbar-brand h6 text-center w-25">Hola Usuario<br />No estas registrado</p>
                    </div><button className="navbar-toggler px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse menu col-3" id="navbarNavDropdown">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/files">Galería</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );

    // *****NAVBAR USER*****

    const NavBarUser = () => (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
                <div className="container-fluid">
                    <img src="../../images/logo.png" alt="" width="130" height="50" className="d-inline-block align-text-top" />
                    <div className="col-auto">
                        <Link className="navbar-brand  fs-2 col-auto" to="/">Bienvenidos a CIRIA</Link>
                        <p className="p navbar-brand h6 text-center w-25">Hola {name},<br />estás Logueado</p>
                    </div>
                    <button className="navbar-toggler px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse menu col-3" id="navbarNavDropdown">
                        <ul className="navbar-nav ">
                            <li className="nav-item dropdown">
                                <button className="btn btn-sm btn-outline-primary dropdown-toggle mt-1" id="dropdownMenuLink" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuario
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link className="dropdown-item btn-sm" to="/user">Datos Personales</Link></li>
                                    <li><Link className="dropdown-item btn-sm" to="/reserves/:reserveId">Inscripciones</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/files">Galería</Link>
                            </li>
                            {/* *****LOGGED***** */}
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/events">Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" type="submit"  to="/logout">Cerrar Sesion</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );

    // *****NAVBAR ADMIN*****

    const NavBarAdmin = () => (
        <div className="header">
            <nav className="navbar navbar-expand-xl navbar-light bg-light px-3">
            <div className="container-fluid">
                    <img src="../../images/logo.png" alt="" width="130" height="50" className="d-inline-block align-text-top" />
                    <div className="col-auto">
                        <Link className="navbar-brand  fs-2 col-auto" to="/">Bienvenidos a CIRIA</Link>
                        <p className="p navbar-brand h6 text-center w-25">Hola {name},<br />eres Administrador</p>
                    </div>
                    <button className="navbar-toggler px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse menu col-3" id="navbarNavDropdown">
                        <ul className="navbar-nav ">
                            <li className="nav-item dropdown">
                                <button className="btn btn-sm btn-outline-primary dropdown-toggle mt-1" id="dropdownMenuLink" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Administrador
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link className="dropdown-item btn-sm " to="/user">Datos Personales</Link></li>
                                    <li><Link className="dropdown-item btn-sm " to="/reserves/:reserveId">Inscripciones</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/files">Galería</Link>
                            </li>
                            {/* *****ADMINISTRATOR***** */}
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/events">Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/activities">Actividades</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/users">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/reserves">Reservas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" type="button" to="/logout">Cerrar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div>
    );

    // *****Operacion ternaria multiple*****
    let nav = role == 0 ? NavBarUser() : role == 1 ? NavBarAdmin() : NavBar()
    return (
        <div>
            {nav}
        </div>
    )
}

export default Header;