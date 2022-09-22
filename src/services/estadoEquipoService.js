import { axiosInstance } from '../helpers/axios-config';

const getEstadosEquipo = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearEstadosEquipo = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editEstadosEquipo = (estadoEquipoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoEquipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export{
    getEstadosEquipo,
    crearEstadosEquipo,
    editEstadosEquipo
}