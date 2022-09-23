import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipo } from '../../services/tipoEquipoService';
import { getEstadosEquipo } from '../../services/estadoEquipoService';

export const InventarioNew = ({ handleOpenModal }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);

    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarMarcas();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await getTiposEquipo();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarTipos();
    }, []);

    const listarEstados = async () => {
        try {
            const { data } = await getEstadosEquipo();
            setEstados(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarEstados();
    }, []);

    return (
        <div className='sidebar'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sidebar-header'>
                            <h3>Nuevo Activo</h3>
                            <i className="fa-solid fa-xmark" onClick={() => handleOpenModal()}></i>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <hr />
                    </div>
                </div>
                <form>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Serial</label>
                                <input type="text" name='serial' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" name='modelo' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Descripcion</label>
                                <input type="text" name='descripcion' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input type="text" name='color' className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Foto</label>
                                <input type="text" name='foto' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Fecha Compra</label>
                                <input type="date" name='fechaCompra' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input type="number" name='precio' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Usuario</label>
                                <select className="form-select">
                                    <option value="">--SELECCIONE--</option>
                                    {
                                        usuarios.map(({ _id, nombre }) => {
                                            return <option key={_id} value={_id}>
                                                {nombre}
                                                </option>
                                        })                                       
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <input type="text" name='marca' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Tipo de Equipo</label>
                                <input type="text" name='tipoEquipo' className="form-control" />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label className="form-label">Estado de Equipo</label>
                                <input type="text" name='estadoEquipo' className="form-control" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
