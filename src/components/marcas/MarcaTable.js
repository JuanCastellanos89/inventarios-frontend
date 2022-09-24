import React from 'react'
import { Link } from 'react-router-dom'

export const MarcaTable = (props) => {
    const { marcas } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    marcas.map(marca => {
                        return <tr key={marca._id}>
                            <th>{marca.nombre}</th>
                            <th>{marca.estado}</th>
                            <Link to={`marcas/edit/${marca._id}`} >Modificar</Link>
                            </tr>
                    })
                }
            </tbody>
        </table>
    )
}
