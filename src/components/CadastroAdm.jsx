import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import logo from '../assets/4.png'; 



import "./cadastroAdm.css"

export default function CadastroAdm(){
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    // const [erro, setErro] = useState(false)
    // const [sucesso, setSucesso] = useState(false)

  
    const handleRegisterAdm = async (event) =>{
        event.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, senha)
            const user = auth.currentUser;   
            console.log(user);
            if(user){
                await setDoc(doc(db, "Administradores", user.uid), {
                    nome: nome,
                    email: user.email
                })
            }
            // setSucesso(true);
            Swal.fire({
                icon: "success",
                title: "Cadastro concluído!",
                text: "Seu cadastro foi realizado!",
              });
            
            
        }catch(error) {
        //    setErro(true);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Não foi possivel realizar esse cadastro!",
          });
        };
        
        setEmail("");
        setNome("");
        setSenha("");
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
                            <form onSubmit={handleRegisterAdm}>
                                <div className="mb-3">
                                    <label className="form-label">Nome:</label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Seu nome"
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Seu email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha:</label>
                                    <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Sua senha"
                                    value={senha}
                                    onChange={(event) => setSenha(event.target.value)}
                                    required
                                    />
                                </div>
                                <button type="submit" className="btn w-100">Cadastrar</button>
                                <Link to={"/loginAdm"} className="linkEstilizado">Já possui uma conta ? Login</Link>
                                {/* {erro && <span className="text-center mb-4">Erro ao cadastrar administrador</span>} */}
                                {/* {sucesso && <Popup message="Administrador cadastrado com sucesso!" />} */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}