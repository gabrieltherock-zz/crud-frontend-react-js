import React, { useEffect} from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddFilme from "./components/AddFilme";
import Filme from "./components/Filme";
import FilmesList from "./components/FilmesList";

function App() {

  useEffect(() => {
    document.title = "Lab. Eng. Software";
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/filmes" className="navbar-brand">
          Gabriel da Rocha Souza
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/filmes"} className="nav-link">
              Filmes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Adicionar Novo Filme
            </Link>
          </li>
        </div>
      </nav>
      
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/filmes"]} component={FilmesList} />
          <Route exact path="/add" component={AddFilme} />
          <Route path="/filmes/:id" component={Filme} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
