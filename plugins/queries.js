import axios from "./axios.js";

export const login = (data) => {
  return axios
    .post(`api/v1/users/sign-in`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const getCountries = () => {
  return axios
    .get(`/api/v1/list-countries`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const createAgent = (data) => {
  return axios
    .post(`/api/v1/agents`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
export const getAgents = () => {
  return axios
    .get(`/api/v1/agents`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
export const getUsers = () => {
  return axios
    .get(`/api/v1/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.data;
    });
};
export const createUser = (data) => {
  return axios
    .post(`/api/v1/users`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.data;
    });
};
export const editUser = (id, data) => {
  return axios
    .put(`/api/v1/users/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.data;
    });
};
export const deleteUser = (id) => {
  return axios
    .delete(`/api/v1/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.data;
    });
};
export const getRoles = () => {
  return axios
    .get(`/api/v1/roles`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
export const createRole = (data) => {
  return axios
    .post(`/api/v1/roles`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
export const editRole = (id, data) => {
  return axios
    .put(`/api/v1/roles/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
export const deleteRole = (id) => {
  return axios
    .delete(`/api/v1/roles/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const getRates = () => {
  return axios
    .get(`/api/v1/exchange-rate`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};


export const createRate = (data) => {
  return axios
    .post(`/api/v1/exchange-rate`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const editRate = (id, data) => {
  return axios
    .put(`/api/v1/exchange-rate/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const deleteRate = (id) => {
  return axios
    .delete(`/api/v1/exchange-rate/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });
};
