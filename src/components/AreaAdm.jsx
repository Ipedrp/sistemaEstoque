import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from '../assets/4.png'; 

import "./areaAdm.css";

export default function AreaAdm(){

    const [infoPessoal, setInfoPessoal] = useState(null);

    const fetchUserData = async () =>{
        auth.onAuthStateChanged( async (user) => {
            console.log(user);
            const docRef = doc(db, "Administradores", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists){
                setInfoPessoal(docSnap.data());
                console.log(docSnap.data());
            }else{
                console.log("Administrador não logado!")
            }
        });
    }

    useEffect(() =>{
        fetchUserData();
    }, []);

    async function HandleDeslogar(){
        try {
            await auth.signOut();
            window.location.href = "./loginAdm";
            console.log("Adminitrador deslogado!");
        } catch (error) {
            console.log("Erro ao deslogar: ", error.message);
        }
    }

    return(
        <div>

            {infoPessoal ? ( 
            
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ width: '100%' }}>
                    <path fill="#0056b3" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,277.3C384,288,480,288,576,261.3C672,235,768,181,864,149.3C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                <nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: 'transparent' }}>
                    <div className="container-fluid">
                            <a className="navbar-brand">Olá, {infoPessoal.nome}</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Olá, {infoPessoal.nome}</h5>
                                <button onClick={HandleDeslogar}  className="btn-sair">sair</button>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card border-dark mb-3" >
                                <div className="card-header text-center">Cadastro de produto</div>
                                <div className="card-body text-dark text-center">
                                    <p className="card-text">Aqui você conseguirá cadastrar seus produtos</p>
                                    <button type="button" className="btn-cadastrar-adm"><Link to={"/cp"} className="linkEstilizado">Entrar</Link></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-dark mb-3" >
                                <div className="card-header text-center">Visualizar produtos</div>
                                <div className="card-body text-dark text-center">
                                    <p className="card-text">Aqui você conseguirá visualizar seus produtos</p>
                                    <button type="button" className="btn-visualizar-adm"><Link to={"/vp"} className="linkEstilizado">Entrar</Link></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-dark mb-3" >
                                <div className="card-header text-center">Visualizar vendas</div>
                                <div className="card-body text-dark text-center">
                                    <p className="card-text">Aqui você conseguirá visualizar suas vendas</p>
                                    <button type="button" className="btn-vender-adm"><Link to={"/vvp"} className="linkEstilizado">Entrar</Link></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card border-dark mb-3" >
                                <div className="card-header text-center">Adicionar evento no calendario</div>
                                <div className="card-body text-dark text-center">
                                    <p className="card-text">Aqui você conseguirá adicionar evento no calendario</p>
                                    <button type="button" className="btn-calendario-adm"><Link to={"/calendario"} className="linkEstilizado">Entrar</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0056b3" fill-opacity="1" d="M0,224L48,224C96,224,192,224,288,234.7C384,245,480,267,576,282.7C672,299,768,309,864,288C960,267,1056,213,1152,181.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <footer className="footer">
                <div className="container text-center">
                    <img src={logo} alt="Logo" className="logo2-img" />
                </div>
            </footer>
                
            </div>
            
            
        
            ) :( 
                <p>Carregando....</p>
            )}
        </div>
       
    );
}



            
