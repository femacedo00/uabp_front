import React from 'react';

export default function ListType({ filter, pos, item }) {
    const typeImg = filter === "Mercado" ? "market" : "items"
    return (
        <div className="ListaComparatrivo">
            <div className="InfoComparativo">
                <img className={filter === "Mercado" ? "Mercado" : "Item"} src={`/img/${typeImg}/${item.nome}.png`} alt={item.nome} />
                <div>
                    <h3>{item.nome}</h3>
                    {filter === "Mercado" ? (
                        <>
                            <p>{item.rua}</p>
                            <p>{item.cnpj}</p>
                        </>
                    ) : (
                        <>
                            <p>{item.marca}</p>
                            <p>{item.num_grand + item.uni_grand}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="ValorComparativo">
                {filter === "Mercado" && pos === 0 ? (
                    <>
                        <span>
                            <img src="/img/icons/trophy.png" alt="Troféu" />
                            Menor Preço!
                        </span>
                    </>
                ) : (
                    filter !== "Mercado" && (
                        <>
                            <img className="Mercado" src={`/img/market/${item.nomeMercado}.png`} alt={item.nomeMercado} />
                            <p>{item.nomeMercado}</p>
                        </>
                    )
                )}
                <h4>R$ {item.valor.toFixed(2)}</h4>
            </div>
        </div>
    );
}
