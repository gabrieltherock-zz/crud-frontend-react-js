import React, { useState, useEffect } from "react";
import FilmeDataService from "../services/FilmeService";
import { Link } from "react-router-dom";

const FilmesList = () => {
  const [filmes, setFilmes] = useState([]);
  const [currentFilme, setCurrentFilme] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retriveFilmes();
  }, []);

  const retriveFilmes = () => {
    FilmeDataService.getAll()
      .then(response => {
        setFilmes(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retriveFilmes();
    setCurrentFilme(null);
    setCurrentIndex(-1);
  };

  const setActiveFilme = (filme, index) => {
    setCurrentFilme(filme);
    setCurrentIndex(index);
  };

  const removeAllFilmes = () => {
    FilmeDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de Filmes</h4>

        <ul className="list-group">
          {filmes &&
            filmes.map((filme, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFilme(filme, index)}
                key={index}
              >
                {filme.titulo}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllFilmes}
        >
          Delete All
        </button>
      </div>
      <div className="col-md-6">
        {currentFilme ? (
          <div>
            <h4>Filme</h4>
            <div>
              <label>
                <strong>Titulo:</strong>
              </label>{" "}
              {currentFilme.titulo}
            </div>
            <div>
              <label>
                <strong>Diretor:</strong>
              </label>{" "}
              {currentFilme.diretor}
            </div>
            <div>
              <label>
                <strong>Genero:</strong>
              </label>{" "}
              {currentFilme.genero}
            </div>
            <div>
              <label>
                <strong>Ano:</strong>
              </label>{" "}
              {currentFilme.ano}
            </div>

            <Link
              to={"/filmes/" + currentFilme.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um Filme...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmesList;