import React, { useState, useEffect } from 'react'
import { getTiposEquipo, crearTiposEquipo } from '../../services/tipoEquipoService';
import { TipoTable } from './TipoTable';
import Swal from 'sweetalert2';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;
  const listarTipos = async () => {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Loading...'
    });
    Swal.showLoading();
    try {
      const resp = await getTiposEquipo();
      console.log(resp.data);
      setTipos(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoTipo = async (tipo) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      });
      Swal.showLoading();
      const resp = await crearTiposEquipo(tipo);
      console.log(resp.data);
      listarTipos();
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

  const handleCrearTipo = (e) => {
    e.preventDefault();
    nuevoTipo(valoresForm);
  }
  useEffect(() => { listarTipos() }, []);

  return (
    <div className='container-fluid'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title' align='center'>Crear Tipo de Equipo</h4>
        </div>
        <form onSubmit={(e) => handleCrearTipo(e)}>
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
        <h4 align='center'>Lista de Tipos de Equipos</h4>
        <hr />
        <TipoTable tipos={tipos} />
      </div>
    </div>
  )
}
