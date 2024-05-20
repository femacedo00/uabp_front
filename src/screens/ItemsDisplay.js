
function ItemsDisplay(props) {
    console.log(props.items);
    const showItems = (item) =>{
            return(
                <tr key={item.upc_a}>
                    <th scope='row'>Id: {item.upc_a}</th>
                    <td>{item.categoria.nome}</td>
                    <td>{item.nome}</td>
                    <td>{item.marca}</td>
                </tr>
            )
        }      

    return (
        <div className='container'>
            <div className='row'>
                <h2>Itens</h2>
            </div>
            <div className='row'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Categoria</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Marca</th>
                        </tr>
                    </thead>

                    <tbody>{props.items.map(showItems)}</tbody>
                </table>
            </div>
        </div>
    )

}

export default ItemsDisplay