import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUsuarios, getUsuariosPorId, editUsuarios } from '../../services/usuarioService';
import Swal from 'sweetalert2';



export const UsuarioUpdate = () => {
    const { usuarioId = '' } = useParams();
    const [usuario, setUsuarios] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { nombre = '', email = '', estado } = valoresForm;

    const getUsuarios = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Loading...'
            });
            Swal.showLoading();
            const { data } = await getUsuariosPorId(usuarioId);
            console.log(data);
            setUsuarios(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getUsuarios();
    }, [usuarioId]);

    useEffect(() => {
        setValoresForm({
            nombre: usuario.nombre,
            email: usuario.email,
            estado: usuario.estado,
        });
    }, [usuario]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre, email, estado,
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Loading...'
            });
            Swal.showLoading();
            const { data } = await editUsuarios(usuarioId, usuario);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrio un error, por favor intente de nuevo...';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid'>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div className='row'>
                    <div className='col'>
                        <div className='mb-3'>
                            <label className="form-label">Nombre</label>
                            <input type="text" name='nombre'
                                required
                                value={nombre}
                                placeholder="Nombre"
                                onChange={(e) => handleOnChange(e)}
                                className="form-control" />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='mb-3'>
                            <label className="form-label">E-mail</label>
                            <input type="email" name='email'
                                required
                                value={email}
                                placeholder="example@mail.com"
                                onChange={(e) => handleOnChange(e)}
                                className="form-control" />
                        </div>
                    </div>

                    <div className='col'>
                        <div className='mb-3'>
                            <label className="form-label">Estado</label>
                            <select className="form-select"
                                required
                                onChange={(e) => handleOnChange(e)}
                                name='estado'
                                value={estado}>
                                
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-success'>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
