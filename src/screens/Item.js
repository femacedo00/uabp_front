import { useParams } from "react-router-dom";
import React from "react";
import FetchData from '../FetchData.js';

export default function ItemScreen() {
    const {id} = useParams()
  return (
    <div>
        <h1>Pegando dados do item: {id}</h1>
        <h2><FetchData accessApi={"http://localhost:8080/v1/item/"} paramsApi={undefined}/></h2>
    </div>
  );
}