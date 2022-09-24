import React, { useState, useEffect } from 'react'
import { getMarcas, crearMarcas } from '../../services/marcaService';
import { MarcaTable } from './MarcaTable';
import Swal from 'sweetalert2';


export const MarcaView = () => {
  const [marcas, setMarcas] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const listarMarcas = async () => {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Loading...'
    });
    Swal.showLoading();
    try {
      const resp = await getMarcas();
      console.log(resp.data);
      setMarcas(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevaMarca = async (marca) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      });
      Swal.showLoading();
      const resp = await crearMarcas(marca);
      console.log(resp.data);
      listarMarcas();
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

  const handleCrearMarca = (e) => {
    e.preventDefault();
    nuevaMarca(valoresForm);
  }
  useEffect(() => { listarMarcas() }, []);
  return (
    <div className='container-fluid'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title' align='center'>Crear Marca</h4>
        </div>
        <form onSubmit={(e) => handleCrearMarca(e)}>
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
        <h4 align='center'>Lista de Marcas</h4>
        <hr />
        <MarcaTable marcas={marcas} />
      </div>
    </div>
  )
}
