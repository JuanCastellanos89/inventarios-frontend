import React from 'react'

export const UsuarioTable = (props) => {
    const { usuarios } = props;

    return (
        <table className="table">
            <thead>
                <tr>

                    <th >Nombre</th>
                    <th >Email</th>
                    <th >Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map(usuario => {
                        return <tr key={usuario._id}>
                            <th>{usuario.nombre}</th>
                            <th>{usuario.email}</th>
                            <td>{usuario.estado}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}