import React from 'react'
import { Link } from 'react-router-dom'

export const TipoTable = (props) => {
    const { tipos } = props;
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
                    tipos.map(tipo => {
                        return <tr key={tipo._id}>
                            <th>{++numeral}</th>
                            <th>{tipo.nombre}</th>
                            <th>{tipo.estado}</th>
                            <th>{tipo.fechaCreacion}</th>
                            <th>{tipo.fechaActualizacion}</th>
                            <Link to={`tipos/edit/${tipo._id}`} >
                                <button type="button" className="btn btn-warning">Modificar</button>
                            </Link>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}
