import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { collection,  getDocs} from "firebase/firestore";
import { db } from "../services/firebase";
import logo from '../assets/4.png'; 




export default function VerProdutos(){



    const [produtos, setProdutos] = useState([]);


    const produtosCollectionRef = collection(db, "produtos");

    useEffect(() => {
        const getProdutos = async () => {
            const data = await getDocs(produtosCollectionRef);
            setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getProdutos();
    }, []);

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
            <div className="container mt-5">
                <h1>Lista de produtos</h1>
                <div className="table-responsive">
                    <table className="table table-scrollable ">
                        <thead className="thead-dark " >
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Fornecedor</th>
                                <th scope="col">Valor de Compra</th>
                                <th scope="col">Valor de Venda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) =>(
                                <tr key={produto.id}>
                                    <td>{produto.nomeProduto}</td>
                                    <td>{produto.fornecedor}</td>
                                    <td>{produto.ValorCompra}</td>
                                    <td>{produto.valorVenda}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    )
}