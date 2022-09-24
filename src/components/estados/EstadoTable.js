import React from 'react'
import { Link } from 'react-router-dom'

export const EstadoTable = (props) => {
    const { estados } = props;
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
                    estados.map(estado => {
                        return <tr key={estado._id}>
                            <th>{++numeral}</th>
                            <th>{estado.nombre}</th>
                            <th>{estado.estado}</th>
                            <th>{estado.fechaCreacion}</th>
                            <th>{estado.fechaActualizacion}</th>
                            <Link to={`estados/edit/${estado._id}`} >Modificar</Link>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}
