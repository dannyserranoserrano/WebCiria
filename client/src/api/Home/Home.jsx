import React from "react";
import './home.css'
import Header from '../../components/header/Header';
import TablaEvents from '../../components/tablaEvents/TablaEvents'
import Carousel from "../../components/carousel/Carousel";

const Home = () => {

    const role = localStorage.getItem("role")

    // ******INDEX UNLOGGED*****
    const Index = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container home">
                <div className="container eventsIndex w-100">
                    <TablaEvents />
                </div>
                <div className="container carruselIndex">
                    <Carousel />
                </div>
            </div>
        </div>
    )

    // *****INDEX USER*****
    const IndexUser = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container home">
                <div className="container eventsIndex w-100">
                    <TablaEvents />
                </div>
                <div className="container carruselIndex">
                    <Carousel />
                </div>
            </div>
        </div>
    )

    // *****INDEX ADMIN*****
    const IndexAdmin = () => (
        <div className='index'>
            <div className="header">
                <Header />
            </div>
            <div className="container home">
                <div className="container eventsIndex w-100">
                    <TablaEvents />
                </div>
                <div className="container carruselIndex">
                    <Carousel />
                </div>
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