import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as actions from "./redux/actions"; //Importamos todas las actions de redux
import * as render from "./imports/AppImports"; //Importamos todos los componentes

//Rutas
const routes = {
  products: "/products",
  about: "/about",
};

function App() {
  //Nos permite dispatchear las actions de nuestro reducers
  const dispatch = useDispatch();

  var guestStorage = window.localStorage;
  var userActive = useSelector((state) => state.user);
  var prod = useSelector((state) => state.products);
  var categories = useSelector((state) => state.categories);
  //Con useSelector obtenemos el valor actualizo del estado en nuestro reducer
  //si queremos traer uno especifico como este es el caso llamamos al
  //componente del objeto que queremos asignar
  //podria compararse con hacer store.getStore()

  const [changeProducts, setChangeProd] = useState("");
  const [changeCategories, setChangeCat] = useState("");
  const [changeUser, setChangeUser] = useState("");

  const getProducts = async () => {
    try {
      dispatch(actions.getProducts());
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCategories = async () => {
    try {
      dispatch(actions.getCategories());
      if (typeof userActive === "object") {
        guestStorage.clear();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProducts();
    setChangeProd("");
    // guestStorage.clear();
  }, [changeProducts]);
  //Cuando se produzca un cambio en el changeProducts
  //se ejecutara el useEffect para ejecutar getProducts
  //asi cuando hagamos un post, put y delete no se
  //necesite recargar la pagina

  useEffect(() => {
    getCategories();
    setChangeCat("");
  }, [changeCategories]);
  //Cuando se produzca un cambio en el changeCategories
  //se ejecutara el useEffect para ejecutar getProducts
  //asi cuando hagamos un post, put y delete no se
  //necesite recargar la pagina

  useEffect(() => {
    setChangeUser('ingresando a un nuevo usuario')
  }, [changeUser])

  return (
    <Router>
      <div>
        <render.NavBar />
        <Switch>
          {/*:::::::::::::::::::::::::::::: HOME ::::::::::::::::::::::::::::::*/}
          <Route exact path="/" component={render.Home}/>
          <Route path={routes.about} component={render.AboutUs}/>
          <Route exact path="/faq" component={render.Faq}/>
          {/*:::::::::::::::::::::::::::::: EDIT USER ::::::::::::::::::::::::::::::*/}
          <Route exact path="/deleteuser" component={render.DeleteUser}/>
          <Route exact path="/editpassword" component={render.EditPassword}/>
          <Route exact path="/editprofile" component={render.EditUser}/>
          <Route exact path="/resetpassword" component={render.ResetPassword}/>
          <Route exact path="/promote" component={render.UserPromote}/>

          {/*:::::::::::::::::::::::::::::: LOG IN ::::::::::::::::::::::::::::::*/}
          <Route exact path="/login"><render.Login {...{ setChangeUser, setChangeProd }}/></Route>
          <Route exact path="/me" component={render.Profile}></Route>

          {/*:::::::::::::::::::::::::::::: FORMS ::::::::::::::::::::::::::::::*/}
          <Route exact path="/form">
            <render.Form {...{ categories, prod, setChangeProd }} />
          </Route>
          <Route exact path="/form/:idProd">
            <render.Form {...{ categories, prod, setChangeProd }} />
          </Route>
          <Route exact path="/formcategory">
            <render.FormCategory {...{ categories, prod, setChangeCat }} />
          </Route>
          <Route exact path="/user/register">
            <render.FormUserRegister {...{ setChangeUser }} />
          </Route>

          {/*:::::::::::::::::::::::::::::: SHOW PRODUCTS ::::::::::::::::::::::::::::::*/}
          <Route exact path={routes.products}>
            <render.Catalogue {...{ categories, prod, setChangeProd }} />
          </Route>
          <Route exact path={routes.products + "/:idCat"}>
            <render.Catalogue {...{ categories, prod, setChangeProd }} />
          </Route>
          <Route exact path="/search" component={render.Results}/>
          <Route exact path="/shopcart"><render.ShopCart {...{ setChangeProd }}/></Route>
          <Route exact path="/orders" component={render.UserCheckout}/>
          <Route exact path="/product/:id"><render.Product {...{ setChangeProd }} /></Route>
          <Route exact path="/orders/user/:id" component={render.UserOrders}/>

          {/*:::::::::::::::::::::::::::::: EXTRA PRODUCTS ::::::::::::::::::::::::::::::*/}
          <Route exact path="/reviews/:id">
            <render.Reviews {...{setChangeProd}}/>
          </Route>

          {/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/}
        </Switch>
        <render.Fotter/>
      </div>
    </Router>
  );
}

export default App;
