import React from "react";
import { Link } from "react-router-dom"
import './home.css'
import Header from '../../components/header/Header';
import TablaEvents from '../../components/tablaEvents/TablaEvents'
import Carousel from "../../components/carousel/Carousel";

const Home = () => {

    const role = localStorage.getItem("role")
    const name = localStorage.getItem("name")

    // ******INDEX UNLOGGED*****
    const Index = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="row justify-content-around mt-4 mb-4">
                    <Link className="btn btn-primary col-auto  mb-2" type="button" to="/login">Logueate</Link>
                    <Link className="btn btn-success col-auto  mb-2" type="button" to="/register">Registrate</Link>
                </div>
                <div className="title text-center mt-2"><h3>Bienvenid@ usuario!!!,<br />Registrate</h3></div>
                <TablaEvents />
                <Carousel />
            </div>
        </div>
    )

    // *****INDEX USER*****
    const IndexUser = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="title text-center mt-2"><h3>Bienvenid@ {name}!!!,<br />estas logueado</h3></div>
                <TablaEvents />
                <Carousel />
            </div>
        </div>
    )

    // *****INDEX ADMIN*****
    const IndexAdmin = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container">
                <div className="title text-center mt-2"><h3>Bienvenid@ {name}!!!,<br />eres Administrador</h3></div>
                <TablaEvents />
                <Carousel />
            </div>
        </div>
    )




    // *****Operacion ternaria multiple*****
    let home = role == 0 ? IndexUser() : role == 1 ? IndexAdmin() : Index()
    return (
        <div>
            {home}
        </div>
    )
}




export default Home