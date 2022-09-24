import { axiosInstance } from '../helpers/axios-config';

const getTiposEquipo = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearTiposEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editTiposEquipo = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipo-equipo/${tipoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTiposEquipoPorId = (tipoEquipoId) => {
    return axiosInstance.get(`tipo-equipo/${tipoEquipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getTiposEquipo,
    crearTiposEquipo,
    editTiposEquipo,
    getTiposEquipoPorId
}