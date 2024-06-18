import { ListGroup, Row, Col } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ListType from './ListType.js';
import '../styles/Comparar.css';

export default function Comparar() {
    const [typeFilter, setTypeFilter] = useState("Mercado");
    const { itemsList } = useContext(CartContext);

    console.log(itemsList);

    const returnAPI = {
        "Mercado": [
            {
                "nome": "Supermercado da Maria",
                "rua": "Avenida das Palmeiras, 1332",
                "cnpj": "13458-789",
                "valor": 1724.32
            },
            {
                "nome": "Mercadinho da Ana",
                "rua": "Avenida das Palmeiras, 1332",
                "cnpj": "13458-789",
                "valor": 2823.89
            }
        ],
        "Essenciais": [
            {
                "nome": "Geleia de morango",
                "nomeMercado": "Mercadinho da Ana",
                "marca": "Doces da Vovó",
                "uni_grand": "g",
                "num_grand": 400,
                "valor": 28
            },
            {
                "nome": "Geleia de morango",
                "nomeMercado": "Mercadinho da Ana",
                "marca": "Doces da Vovó",
                "uni_grand": "g",
                "num_grand": 400,
                "valor": 28
            }
        ],
        "Itens": [
            {
                "nome": "Geleia de morango",
                "nomeMercado": "Mercadinho da Ana",
                "marca": "Doces da Vovó",
                "uni_grand": "g",
                "num_grand": 1000,
                "valor": 45
            },
            {
                "nome": "Geleia de morango",
                "nomeMercado": "Mercadinho da Ana",
                "marca": "Doces da Vovó",
                "uni_grand": "g",
                "num_grand": 400,
                "valor": 75
            }
        ]
    };

    const filteredData = returnAPI[typeFilter] || [];

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
