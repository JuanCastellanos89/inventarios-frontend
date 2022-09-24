import React from 'react'
import { Link } from 'react-router-dom'

export const UsuarioTable = (props) => {
    const { usuarios } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Fecha de creacion</th>
                    <th>Fecha de actualizacion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map(usuario => {
                        return <tr key={usuario._id}>
                            <th>{usuario.nombre}</th>
                            <th>{usuario.email}</th>
                            <th>{usuario.estado}</th>
                            <th>{usuario.fechaCreacion}</th>
                            <th>{usuario.fechaActualizacion}</th>
                            <Link to={`usuarios/edit/${usuario._id}`} >Modificar</Link>
                            </tr>
                    })
                }
            </tbody>
        </table>
    )
}