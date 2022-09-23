import React from 'react';
import { useParams } from 'react-router-dom';

export const InventarioUpdate = () => {
  const { inventarioId } = useParams();
  console.log(inventarioId);
  return (
    <div>InventarioUpdate</div>
  )
}
