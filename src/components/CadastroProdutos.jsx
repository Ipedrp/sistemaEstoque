import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import logo from '../assets/4.png'; 

import "./cadastroProdutos.css";

export default function CadastroProdutos() {
    const [nomeProduto, setNomeProduto] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [ValorCompra, setValorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [quantidadeVendida, setQuantidadeVendida] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [editandoProduto, setEditandoProduto] = useState(null);
    const [vendendoProduto, setVendendoProduto] = useState(null); // Estado para controlar a venda de um produto

    const produtosCollectionRef = collection(db, "produtos");
    const vendasCollectionRef = collection(db, "vendas"); // Referência à coleção de vendas

    useEffect(() => {
        const getProdutos = async () => {
            const data = await getDocs(produtosCollectionRef);
            setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getProdutos();
    }, []);

    async function criarProduto() {
        try {
            const produto = await addDoc(produtosCollectionRef, {
                nomeProduto,
                fornecedor,
                ValorCompra,
                valorVenda,
            });
            console.log("Produto criado:", produto.id);
            console.log("Produto Criado");
            Swal.fire({
                title: "Produto cadastrado!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Feito"
            }).then((result) => { 
                if (result.isConfirmed) {
                    window.location.href = "/cp";

                }
            });
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            Swal.fire({
                icon: "error",
                title: "Erro ao cadastrar produto!"
                
              });
        }
    }

    async function deletarProduto(id) {
        const produtoDoc = doc(db, "produtos", id);
        await deleteDoc(produtoDoc);
        console.log("deletado");
        Swal.fire({
            title: "Produto deletado!",
            icon: "success",
            // showCancelButton: true,
            confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Feito"
        }).then((result) => { 
            if (result.isConfirmed) {
                window.location.href = "/cp";

            }
        });
    }

    async function atualizarProduto(produto) {
        const produtoDoc = doc(db, "produtos", produto.id);
        await updateDoc(produtoDoc, {
            nomeProduto: produto.nomeProduto,
            fornecedor: produto.fornecedor,
            ValorCompra: produto.ValorCompra,
            valorVenda: produto.valorVenda,
        });
        setEditandoProduto(null);
        Swal.fire({
            title: "Produto atualizado!",
            icon: "success",
            // showCancelButton: true,
            confirmButtonColor: "#3085d6",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Feito"
        }).then((result) => { 
            if (result.isConfirmed) {
                window.location.href = "/cp";

            }
        });
    }

    async function venderProduto(produto) {
        setVendendoProduto(produto);
    }

    async function confirmarVenda() {
        try {
            await addDoc(vendasCollectionRef, {
                nomePeca: vendendoProduto.nomeProduto,
                precoVenda: vendendoProduto.valorVenda,
                quantidadeVendida,
                totalVenda: vendendoProduto.valorVenda * quantidadeVendida
                // Se houver outros campos relevantes para a venda, adicione-os aqui
            });
            Swal.fire({
                title: "Produto vendido!",
                icon: "success",
                // showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Feito"
            }).then((result) => { 
                if (result.isConfirmed) {
                    window.location.href = "/cp";

                }
            });
        } catch (error) {
            console.error("Erro ao vender produto:", error);
            Swal.fire({
                icon: "error",
                title: "Erro ao vender produto!"
                
              });
        }
    }
    return (
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
                        <div className="container rounded custom-container p-4 " >
                            {editandoProduto ? (
                                <div>
                                    <div className="mb-3">
                                        <div className="text-center mb-4">
                                            <a className="navbar-brand2 navbar-brand-custom">
                                                <img src={logo} alt="Logo" className="logo2-img" />
                                            </a>
                                        </div>
                                        <label className="form-label">Nome da Peça</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editandoProduto.nomeProduto}
                                            onChange={(event) => setEditandoProduto({ ...editandoProduto, nomeProduto: event.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fornecedor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editandoProduto.fornecedor}
                                            onChange={(event) => setEditandoProduto({ ...editandoProduto, fornecedor: event.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Valor de Compra</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editandoProduto.ValorCompra}
                                            onChange={(event) => setEditandoProduto({ ...editandoProduto, ValorCompra: event.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Valor de Venda</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editandoProduto.valorVenda}
                                            onChange={(event) => setEditandoProduto({ ...editandoProduto, valorVenda: event.target.value })}
                                            required
                                        />
                                    </div>
                                    <button type="button" className="btn btn-primary mr-2" onClick={() => atualizarProduto(editandoProduto)}>Salvar</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditandoProduto(null)}>Cancelar</button>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-center mb-4">
                                        <a className="navbar-brand2 navbar-brand-custom">
                                            <img src={logo} alt="Logo" className="logo2-img" />
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nome da Peça</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Pneu de carro"
                                            value={nomeProduto}
                                            onChange={(event) => setNomeProduto(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fornecedor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ex: Pirelli"
                                            value={fornecedor}
                                            onChange={(event) => setFornecedor(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Valor de Compra</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ex: 500.00"
                                            value={ValorCompra}
                                            onChange={(event) => setValorCompra(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Valor de Venda</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Ex: 789.50"
                                            value={valorVenda}
                                            onChange={(event) => setValorVenda(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-criar-produto" onClick={criarProduto}>Criar produto</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h1>Produtos em estoque</h1>
                    <div className="table-responsive">
                        <table className="table table-scrollable ">
                            <thead className="thead-dark " >
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Fornecedor</th>
                                    <th scope="col">Valor de Compra</th>
                                    <th scope="col">Valor de Venda</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map((produto) => (
                                    <tr key={produto.id}>
                                        <td>{editandoProduto === produto.id ? (
                                            // Se estiver no modo de edição, mostre o campo de entrada
                                            <input
                                                type="text"
                                                value={editandoProduto.nomeProduto}
                                                onChange={(event) => setEditandoProduto({ ...editandoProduto, nomeProduto: event.target.value })}
                                            />
                                        ) : (
                                            // Caso contrário, mostre o nome do produto
                                            produto.nomeProduto
                                        )}</td>
                                        <td>{editandoProduto === produto.id ? (
                                            <input
                                                type="text"
                                                value={editandoProduto.fornecedor}
                                                onChange={(event) => setEditandoProduto({ ...editandoProduto, fornecedor: event.target.value })}
                                            />
                                        ) : (
                                            produto.fornecedor
                                        )}</td>
                                        <td>{editandoProduto === produto.id ? (
                                            <input
                                                type="number"
                                                value={editandoProduto.ValorCompra}
                                                onChange={(event) => setEditandoProduto({ ...editandoProduto, ValorCompra: event.target.value })}
                                            />
                                        ) : (
                                            produto.ValorCompra
                                        )}</td>
                                        <td>{editandoProduto === produto.id ? (
                                            <input
                                                type="number"
                                                value={editandoProduto.valorVenda}
                                                onChange={(event) => setEditandoProduto({ ...editandoProduto, valorVenda: event.target.value })}
                                            />
                                        ) : (
                                            produto.valorVenda
                                        )}</td>
                                        <td>
                                            {editandoProduto === produto.id ? (
                                                <div>
                                                    <button className="btn btn-primary mr-2" onClick={() => atualizarProduto(editandoProduto)}>Salvar</button>
                                                    <button className="btn-deletar" onClick={() => setEditandoProduto(null)}>Cancelar</button>
                                                </div>
                                            ) : (
                                                <button className="btn-editar" onClick={() => setEditandoProduto(produto)}>Editar</button>
                                            )}
                                            <button className="btn-deletar" onClick={() => deletarProduto(produto.id)}>Deletar</button>
                                            <button className="btn-confirmar-venda" onClick={() => venderProduto(produto)}>Vender</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                 {/* Novo formulário para venda */}
                 {vendendoProduto && (
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
                                                        <label className="form-label">Nome da Peça:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={vendendoProduto.nomeProduto}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Preço:</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={vendendoProduto.valorVenda}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Quantidade:</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={quantidadeVendida}
                                                            onChange={(event) => setQuantidadeVendida(event.target.value)}
                                                        />
                                                    </div>
                                                    <button className="btn-confirmar-venda" onClick={confirmarVenda}>Confirmar venda</button>
                                                    <button className="btn-deletar" onClick={() =>setVendendoProduto(null)}>Cancelar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0056b3" fill-opacity="1" d="M0,224L48,224C96,224,192,224,288,234.7C384,245,480,267,576,282.7C672,299,768,309,864,288C960,267,1056,213,1152,181.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <footer className="footer">
                    <div className="container text-center">
                        <img src={logo} alt="Logo" className="logo2-img" />
                    </div>
                </footer>
            </div>
            
        </div>
    );
}


