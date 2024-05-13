import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { addDoc, collection} from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import logo from '../assets/4.png'; 



export function Calendario(){

    const [texto, setTexto] = useState("");
    const [data, setData] = useState("");
    const [eventos, setEventos] = useState([]);

    const calendarioCollectionRef = collection(db, "calendario"); 



    useEffect(() => {
        const getEventos = async () => {
            try {
                const querySnapshot = await getDocs(calendarioCollectionRef);
                const eventosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Converta o Timestamp para um objeto Date
                    data: doc.data().data.toDate()
                }));
                setEventos(eventosData);
            } catch (error) {
                console.error("Erro ao obter eventos:", error);
            }
        };
        getEventos();
    }, []);

    async function criarEvento() {
        try {
            const produto = await addDoc(calendarioCollectionRef, {
                data,
                texto,
            });
            console.log("Evento criado:", produto.id);
            console.log("Evento Criado");
            Swal.fire({
                icon: "success",
                title: "Evento criado!"
                
              });
        } catch (error) {
            console.error("Erro ao criar evento:", error);
            Swal.fire({
                icon: "error",
                title: "Erro ao criar evento!"
                
              });
        }
    }
    
    return(
        <div> 
            <nav className="navbar navbar-expand-lg navbar-light ok">
                <div className="container">
                    <a className="navbar-brand" href="#"> </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-auto kl"> 
                            <Link className="nav-link fw-bold fs-2" to={"/cp"}>Cadastrar</Link>
                            <Link className="nav-link fw-bold fs-2" to={"/vp"}>Lista de produtos</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/vvp"}>Vendas</Link>
                            <Link className="nav-link fw-bold fs-2  " to={"/calendario"}>Calendario</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ width: '100%' }}>
                    <path fill="#0056b3" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,277.3C384,288,480,288,576,261.3C672,235,768,181,864,149.3C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="container rounded custom-container p-4 ">
                            <div className="mb-3">
                                <div className="text-center mb-4">
                                    <a className="navbar-brand2 navbar-brand-custom">
                                        <img src={logo} alt="Logo" className="logo2-img" />
                                    </a>
                                </div>
                                <label className="form-label">Nome do evento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Dia de promoção"
                                    value={texto}
                                    onChange={(event) => setTexto(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <DatePicker
                                    showIcon
                                    selected={data}
                                    onChange={date => setData(date)}
                                    dateFormat="yyyy-MM-dd"
                                    // className="form-control"
                                    placeholderText="Selecione uma data"
                                    required
                                />
                            </div>
                            <button className="btn-confirmar-venda" onClick={criarEvento}>Criar evento</button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log(eventos)}
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={eventos.map(evento => ({
                    title: evento.texto,
                    start: evento.data
                }))} 
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0056b3" fill-opacity="1" d="M0,224L48,224C96,224,192,224,288,234.7C384,245,480,267,576,282.7C672,299,768,309,864,288C960,267,1056,213,1152,181.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <footer className="footer">
                    <div className="container text-center">
                        <img src={logo} alt="Logo" className="logo2-img" />
                    </div>
                </footer>
        </div>
    )
}