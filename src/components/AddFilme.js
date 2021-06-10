import React, { useState } from "react";
import FilmeDataService from "../services/FilmeService";

const AddFilme = () => {
  const initialFilmeState = {
    id: null,
    titulo: "",
    diretor: "",
    genero: "",
    ano: ""
  };
  const [filme, setFilme] = useState(initialFilmeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFilme({ ...filme, [name]: value });
  };

  const saveFilme = () => {
    var data = {
      titulo: filme.titulo,
      diretor: filme.diretor,
      genero: filme.genero,
      ano: filme.ano
    };

    FilmeDataService.create(data)
      .then(response => {
        setFilme({
          id: response.data.id,
          titulo: response.data.titulo,
          diretor: response.data.diretor,
          genero: response.data.genero,
          ano: response.data.ano
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newFilme = () => {
    setFilme(initialFilmeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adicionado com sucesso!</h4>
          <button className="btn btn-success" onClick={newFilme}>
            Post
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="titulo">Titulo</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              required
              value={filme.titulo}
              onChange={handleInputChange}
              name="titulo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="diretor">Diretor</label>
            <input
              type="text"
              className="form-control"
              id="diretor"
              required
              value={filme.diretor}
              onChange={handleInputChange}
              name="diretor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genero">Genero</label>
            <input
              type="text"
              className="form-control"
              id="genero"
              required
              value={filme.genero}
              onChange={handleInputChange}
              name="genero"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ano">Ano</label>
            <input
              type="text"
              className="form-control"
              id="ano"
              required
              value={filme.ano}
              onChange={handleInputChange}
              name="ano"
            />
          </div>

          <button onClick={saveFilme} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFilme;