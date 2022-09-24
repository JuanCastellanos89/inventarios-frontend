import React, { useState, useEffect } from 'react'
import { getEstadosEquipo, crearEstadosEquipo } from '../../services/estadoEquipoService';
import { EstadoTable } from './EstadoTable';
import Swal from 'sweetalert2';

export const EstadoView = () => {
  const [estados, setEstados] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;
  const listarEstados = async () => {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Loading...'
    });
    Swal.showLoading();
    try {
      const resp = await getEstadosEquipo();
      console.log(resp.data);
      setEstados(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoEstado = async (estado) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      });
      Swal.showLoading();
      const resp = await crearEstadosEquipo(estado);
      console.log(resp.data);
      listarEstados();
      setvaloresForm({ nombre: '', estado: '' })
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
      let mensaje;
      if (error && error.reponse && error.reponse.data) {
        mensaje = error.reponse.data;
      } else {
        mensaje = 'Ocurrio un error, por favor intente de nuevo...';
      }
      Swal.fire('Error', mensaje, 'error');
    }
  }

  const handleCrearEstado = (e) => {
    e.preventDefault();
    nuevoEstado(valoresForm);
  }
  useEffect(() => { listarEstados() }, []);

  return (
    <div className='container-fluid'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title' align='center'>Crear Estados de Equipo</h4>
        </div>
        <form onSubmit={(e) => handleCrearEstado(e)}>
          <div className='card-body'>
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
                  <label className="form-label">Estado</label>
                  <select className="form-select"
                    required
                    onChange={(e) => handleOnChange(e)}
                    name='estado'
                    value={estado}>
                    <option defaultValue="">Seleccione</option>
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
        <hr />
        <h4 align='center'>Lista de Estados de Equipos</h4>
        <hr />
        <EstadoTable estados={estados} />
      </div>
    </div>
  )
}
