import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMarcas, getMarcasPorId, editMarcas } from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcaUpdate = () => {
    const { marcaId = '' } = useParams();
    const [marca, setMarcas] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { nombre = '', estado } = valoresForm;

    const getMarcas = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Loading...'
            });
            Swal.showLoading();
            const { data } = await getMarcasPorId(marcaId);
            console.log(data);
            setMarcas(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMarcas();
    }, [marcaId]);

    useEffect(() => {
        setValoresForm({
            nombre: marca.nombre,
            estado: marca.estado,
        });
    }, [marca]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value }); //spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const marca = {
            nombre, estado,
        }
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Loading...'
            });
            Swal.showLoading();
            const { data } = await editMarcas(marcaId, marca);
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
            <div className='card'>
                <div className='card-header'>
                    <h4 className='card-title' align='center'>Modificar Marca</h4>
                </div>
                <form onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col'>
                                <div className='mb-3'>
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name='nombre'
                                        required
                                        value={nombre}
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
                    </div>
                </form>
            </div>
        </div>
    )
}
