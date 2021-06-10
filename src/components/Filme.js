import React, { useState, useEffect } from "react";
import FilmeDataService from "../services/FilmeService";

const Filme = props => {
    const initialFilmeState = {
        id: null,
        titulo: "",
        diretor: "",
        genero: "",
        ano: ""
    };
  const [currentFilme, setCurrentFilme] = useState(initialFilmeState);
  const [message, setMessage] = useState("");

  const getFilme = id => {
    FilmeDataService.get(id)
      .then(response => {
        setCurrentFilme(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFilme(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentFilme({ ...currentFilme, [name]: value });
  };

  const updateFilme = () => {
    FilmeDataService.update(currentFilme.id, currentFilme)
      .then(response => {
        console.log(response.data);
        setMessage("O Filme foi atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteFilme = () => {
    FilmeDataService.remove(currentFilme.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/filmes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentFilme ? (
        <div className="edit-form">
          <h4>Filme</h4>
          <form>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={currentFilme.titulo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="diretor">Diretor</label>
              <input
                type="text"
                className="form-control"
                id="diretor"
                name="diretor"
                value={currentFilme.diretor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genero">Genero</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                name="genero"
                value={currentFilme.genero}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ano">Ano</label>
              <input
                type="text"
                className="form-control"
                id="ano"
                name="ano"
                value={currentFilme.ano}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteFilme}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateFilme}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor, clique em um Filme...</p>
        </div>
      )}
    </div>
  );
};

export default Filme;