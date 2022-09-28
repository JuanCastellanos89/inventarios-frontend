import React from 'react'
import { Link } from 'react-router-dom'

export const MarcaTable = (props) => {
    const { marcas } = props;
    let numeral = 0;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Fecha de creacion</th>
                    <th>Fecha de actualizacion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    marcas.map(marca => {
                        return <tr key={marca._id}>
                            <th>{++numeral}</th>
                            <th>{marca.nombre}</th>
                            <th>{marca.estado}</th>
                            <th>{marca.fechaCreacion}</th>
                            <th>{marca.fechaActualizacion}</th>
                            <Link to={`marcas/edit/${marca._id}`} >
                                <button type="button" className="btn btn-warning">Modificar</button>
                            </Link>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}
