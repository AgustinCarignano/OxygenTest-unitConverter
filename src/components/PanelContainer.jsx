import React, { useEffect } from "react";
import { useState } from "react";
import { optionParams } from "./optionParams.js";
import "./styles.css";
import PanelImputs from "./PanelImputs";
import PanelHistory from "./PanelHistory";

function Panel() {
  const [output, setOutput] = useState(null); //Valor de salida o resultado
  const [input, setInput] = useState(null); //Valor de entrada a convertir
  const [params, setParams] = useState(optionParams[0]); //parametros para la conversión (unidades y factor)
  const [history, setHistory] = useState([]); //Array que almacena los resultados seleccionados.

  //Actualiza el valor del input a medida que el usuario lo va ingresando
  function handleChange(e) {
    setInput(e.target.value === "" ? null : parseFloat(e.target.value));
  }

  //Actualiza el valor de salida (resultado) a medida que el ususario va ingresando el valor
  function handleOnKeyUp(e) {
    const input = e.target.value;
    setOutput((input * params.factor).toFixed(2));
  }

  //Se observa el tipo de conversión que se quiere realizar y se setean los parámetros correspondientes.
  function handleOptionChange(e) {
    let optionSelected = parseInt(e.target.value);
    setInput(null);
    setOutput(null);
    setNewParams(optionSelected);
  }

  //Se recibe como parámetro los valores del ultimo resultado de la conversión y los invierte, seteando nuevamente los parámetros
  function toggleInput(data) {
    let optionFactor = data.params.option % 2 === 0 ? -1 : +1;
    let newOption = data.params.option + optionFactor;
    setInput(data.output);
    setOutput(data.input);
    setNewParams(newOption);
  }

  //Recibe por parámetro la información del último resultado para guardarlo en un array que conforma el historial.
  async function putInHistory(result) {
    if (!input || !output) return;
    const response = await fetch("http://localhost:8080/units", {
      method: "POST",
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newConvertion = await response.json();
    setHistory([...history, newConvertion.convertion]);
    setInput(null);
    setOutput(null);
  }

  //Recibe por parámtetro el índice en el array "history" del resultado a eliminar y lo quita del mismo.
  async function deleteItem(id) {
    await fetch(`http://localhost:8080/units/${id}`, {
      method: "DELETE",
    });
    const newHistory = history.filter((item) => item._id !== id);
    setHistory(newHistory);
  }

  //Setea los valores opción, unidad valor entrada, unidad valor salida y el factor de conversión., obteniendolos del objeto importado
  function setNewParams(option) {
    setParams(optionParams[option - 1]);
  }

  //Obtener el historual de conversiones de la base de datos
  async function getHistory() {
    const response = await fetch("http://localhost:8080/units");
    const data = await response.json();
    setHistory(data.convertions);
  }
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="container">
      <PanelImputs
        handleChange={handleChange}
        handleOnKeyUp={handleOnKeyUp}
        handleOptionChange={handleOptionChange}
        putInHistory={putInHistory}
        toggleInput={toggleInput}
        output={output}
        input={input}
        params={params}
      />
      {history.length !== 0 && (
        <PanelHistory history={history} deleteItem={deleteItem} />
      )}
    </div>
  );
}

export default Panel;
