import http from "../http-common";

const getAll = () => {
  return http.get("/filmes");
};

const get = id => {
  return http.get(`/filmes/${id}`);
};

const create = data => {
  return http.post("/filmes", data);
};

const update = (id, data) => {
  return http.put(`/filmes/${id}`, data);
};

const remove = id => {
  return http.delete(`/filmes/${id}`);
};

const removeAll = () => {
  return http.delete(`/filmes`);
};

const filmeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default filmeService;