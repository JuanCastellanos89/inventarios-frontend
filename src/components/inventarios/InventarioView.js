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

   <div className="container-fluid">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {
          inventarios.map((inventario) =>{
            return(
              <div className="col" key={inventario._id}>
              <div className="card">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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