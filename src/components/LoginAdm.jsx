import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";
import Popup from "./Popup";
import logo from '../assets/4.png'; 


import "./loginAdm.css"

export default function LoginAdm(){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // const [erro, setErro] = useState(false)
    // const [sucesso, setSucesso] = useState(false)

    const handleLoginAdm = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            // setSucesso(true);
            Swal.fire({
                title: "Você possui uma conta nesse sistema!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Entrar"
              }).then((result) => { 
                if (result.isConfirmed) {
                    window.location.href = "/areaAdm";

                }
              });
            
            // window.location.href = "/areaAdm";
        } catch (error) {
            // setErro(true)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Seu e-mail ou senha não estão cadastrados!",
              });
        }
    }

    return(
        <div>
            <div className="container mt-5 mb-5  ">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-8 col-md-6">
                        <div className="login-container mb-5 p-4 rounded shadow">
                            <div className="text-center mb-4">
                                <a className="navbar-brand2 navbar-brand-custom">
                                    <img src={logo} alt="Logo" className="logo2-img" />
                                </a>
                            </div>
                            <form onSubmit={handleLoginAdm}>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Seu email"
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha:</label>
                                    <input
                                    type="password"
                                    className="form-control"
                                    value={senha}
                                    onChange={(event) => setSenha(event.target.value)}
                                    placeholder="Sua senha"
                                    required
                                    />
                                </div>
                                <button type="submit" className="btn w-100">Entrar</button>
                                <Link to={"/cadastroAdm"} className="linkEstilizado">Não possui uma conta ? Criar conta</Link>
                                {/* {erro ? <span className="text-center mb-4">Erro</span> : null} */}
                                {/* {sucesso && <Popup message="Administrador logado com sucesso!" />} */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}