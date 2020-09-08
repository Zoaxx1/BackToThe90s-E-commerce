import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/userPromote.css";

import CardPromote from "./CardsPromote";
import { Redirect } from "react-router-dom";

const UserPromote = () => {
  const dispatch = useDispatch();
  const userActive = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [getUserss, setUsers] = useState("");

  const getAllUsers = () => {
    dispatch(getUsers());
  };

  useEffect(() => {
    getAllUsers();
    setUsers("");
  }, [getUserss]);

  return (
    <div className="contenedor-promote">
      {(typeof userActive !== "object" || userActive.access !== "Admin") && (
        <Redirect to="/"></Redirect>
      )}
      {users.length ? (
        users.map((user) => {
          return (
            <CardPromote {...{ user, userActive, setUsers }}></CardPromote>
          );
        })
      ) : (
        <p>No hay usuarios</p>
      )}
    </div>
  );
};

export default UserPromote;
