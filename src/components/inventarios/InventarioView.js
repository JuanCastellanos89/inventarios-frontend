import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';

export const InventarioView = () => {

  const [ inventarios, setInventarios ] = useState([]);

  const listarInventarios = async () => {
    try {
      const { data } = await getInventarios();
      console.log(data);
      setInventarios(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarInventarios();
  }, []);

  return (

   <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {
          inventarios.map((inventario) =>{
            return(
              <div className="col" key={inventario._id}>
              <div className="card">
                <img src={inventario.foto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Caracteristicas</h5>
                  <hr />
                  <p className="card-text">{`Serial: ${inventario.serial}`}</p>
                  <p className="card-text">{`Marca: ${inventario.marca.nombre}`}</p>
                  <p className="card-text">
                    <a>Ver Mas...</a>
                  </p>
                </div>
              </div>
            </div>          
            )
          })          
        }
      </div>
   </div>
   
   
  )
}