import React, { useState, useEffect } from 'react'
import { getUsuarios, crearUsuarios } from '../../services/usuarioService';
import { UsuarioTable } from './UsuarioTable';
import Swal from 'sweetalert2';


export const UsuarioView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [valoresForm, setvaloresForm] = useState({});
  const { nombre = '', email = '', estado = '' } = valoresForm;

  const listarUsuarios = async () => {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Loading...'
    });
    Swal.showLoading();
    try {
      const resp = await getUsuarios();
      console.log(resp.data);
      setUsuarios(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }
  const handleOnChange = (e) => {
    setvaloresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const nuevoUsuario = async (usuario) => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Loading...'
      });
      Swal.showLoading();
      const resp = await crearUsuarios(usuario);
      console.log(resp.data);
      listarUsuarios();
      setvaloresForm({ nombre: '', email: '', estado: '' })
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

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    nuevoUsuario(valoresForm);
  }
  useEffect(() => { listarUsuarios() }, []);

  return (
    <div className='container-fluid'>
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title' align='center'>Crear Usuario</h4>
        </div>
        <form onSubmit={(e) => handleCrearUsuario(e)}>
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
        <h4 align='center'>Lista de usuarios</h4>
        <hr/>
        <UsuarioTable usuarios={usuarios} />
      </div>
    </div>
    
  )
}