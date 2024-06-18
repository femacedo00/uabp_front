import { ListGroup, Row, Col } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import FetchProducts from '../FetchProducts';
import ListType from './ListType.js';
import '../styles/Comparar.css';

export default function Comparar() {
    const [typeFilter, setTypeFilter] = useState("Mercado");
    const { itemsList } = useContext(CartContext);
    const { data: mercados, loading, error } = FetchProducts(localStorage.getItem('token'), "http://localhost:8080/v1/mercado/", undefined);
    console.log(itemsList);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let resultValue = {
        "Mercado": [],
        "Essenciais": [],
        "Itens": []
    };

    let nomeAux = "";
    let pos = 0;
    let valorMercadoItem = 0;

    mercados.map((mercado) => {
        if (nomeAux !== mercado.nome) {
            pos = resultValue["Mercado"].length;
            resultValue["Mercado"][pos] = {
                "nome": mercado.nome,
                "rua": mercado.rua,
                "cep": mercado.cep,
                "valor": 0
            };
            nomeAux = mercado.nome;
        }

        itemsList.essenciais.map((essencial) => {
            let posEssencial = resultValue["Essenciais"].length;
            let valorMinItem = null;

            mercado.precoMercado.map((preco) => {
                if (preco.item.upc_a === essencial.upc_a) {
                    valorMercadoItem = preco.preco * essencial.quantity;

                    if (valorMinItem === null || valorMinItem > valorMercadoItem) valorMinItem = valorMercadoItem;
                    resultValue["Mercado"][pos].valor += valorMercadoItem;
                }
            });

            if(valorMinItem){
                resultValue["Essenciais"][posEssencial] = {
                    "nomeMercado": mercado.nome,
                    "nome": essencial.nome,
                    "marca": essencial.marca,
                    "uni_grand": essencial.uni_grand,
                    "num_grand": essencial.num_grand,
                    "valor": valorMinItem
                };
            }
        });

        itemsList.comuns.map((comum) => {
            let posComum = resultValue["Itens"].length;
            let valorMinItem = null;

            mercado.precoMercado.map((preco) => {
                if (preco.item.upc_a === comum.upc_a) {
                    valorMercadoItem = preco.preco * comum.quantity;

                    if (valorMinItem === null || valorMinItem > valorMercadoItem) valorMinItem = valorMercadoItem;
                    resultValue["Mercado"][pos].valor += valorMercadoItem;
                }
            });

            if(valorMinItem){
                resultValue["Itens"][posComum] = {
                    "nomeMercado": mercado.nome,
                    "nome": comum.nome,
                    "marca": comum.marca,
                    "uni_grand": comum.uni_grand,
                    "num_grand": comum.num_grand,
                    "valor": valorMinItem
                };
            }
        });
    });

    resultValue["Mercado"] = resultValue["Mercado"].filter(m => m.valor > 0).sort((a, b) => a.valor - b.valor);

    const filteredData = resultValue[typeFilter] || [];

    return (
        <div className="Comparar">
            <h2>Comparar preços de mercados ou Itens</h2>
            <Row>
                <Col md="4">
                    <ListGroup>
                        <ListGroup.Item active={typeFilter === "Mercado"} action onClick={() => setTypeFilter("Mercado")}>
                            Mercado mais barato
                        </ListGroup.Item>
                        <ListGroup.Item active={typeFilter === "Essenciais"} action onClick={() => setTypeFilter("Essenciais")}>
                            Essenciais mais barato
                        </ListGroup.Item>
                        <ListGroup.Item active={typeFilter === "Itens"} action onClick={() => setTypeFilter("Itens")}>
                            Itens mais baratos
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md="8">
                    {filteredData.map((type, index) => (
                        <ListType key={index} filter={typeFilter} pos={index} item={type} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}
