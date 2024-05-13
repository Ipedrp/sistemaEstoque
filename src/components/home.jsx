import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home(){
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center body">
            <header className="text-center">
                <div className="container px-4 px-lg-5">
                    <h1 className="mb-1">Bem-vindo</h1>
                    <h3 className="mb-5"><em>Este é um pequeno sistema para controle de estoque</em></h3>
                    <p className="btn btn-outline-light"><Link to="./loginAdm"  className="linkEstilizado">Iniciar</Link></p>
                </div>
            </header>
        </div>
    )
}