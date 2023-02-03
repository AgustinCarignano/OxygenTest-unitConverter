import React from "react";
import { useState } from "react";
import { optionParams } from "./optionParams.js";
import "./styles.css";
import PanelImputs from "./PanelImputs";
import PanelHistory from "./PanelHistory";

function Panel() {
  const [output, setOutput] = useState(null); //Valor de salida o resultado
  const [input, setInput] = useState(""); //Valor de entrada a convertir
  const [params, setParams] = useState(optionParams[0]); //parametros para la conversión (unidades y factor)
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  ); //Array que almacena los resultados seleccionados.

  //Actualiza el valor del input a medida que el usuario lo va ingresando
  function handleChange(e) {
    setInput(e.target.value === "" ? "" : parseFloat(e.target.value));
  }

  //Actualiza el valor de salida (resultado) a medida que el ususario va ingresando el valor
  function handleOnKeyUp(e) {
    const input = e.target.value;
    setOutput(Math.round(input * params.factor * 100) / 100);
  }

  //Se observa el tipo de conversión que se quiere realizar y se setean los parámetros correspondientes.
  function handleOptionChange(e) {
    let optionSelected = parseInt(e.target.value);
    setInput("");
    setOutput("");
    setNewParams(optionSelected);
  }

  //Se recibe como parámetro los valores del ultimo resultado de la conversión y los invierte, seteando nuevamente los parámetros
  function toggleInput(data) {
    console.log(data.params.option);
    let optionFactor = data.params.option % 2 === 0 ? -1 : +1;
    let newOption = data.params.option + optionFactor;
    setInput(data.output);
    setOutput(data.input);
    setNewParams(newOption);
  }

  //Recibe por parámetro la información del último resultado para guardarlo en un array que conforma el historial.
  function putInHistory(result) {
    const historyCopy = [...history];
    if (result.input && result.output) {
      historyCopy.push(result);
      saveHistory(historyCopy);
      setHistory(historyCopy);
      setInput("");
      setOutput(null);
    }
  }

  //Recibe por parámtetro el índice en el array "history" del resultado a eliminar y lo quita del mismo.
  function deleteItem(index) {
    const historyCopy = [...history];
    historyCopy.splice(index, 1);
    saveHistory(historyCopy);
    setHistory(historyCopy);
  }

  //Setea los valores opción, unidad valor entrada, unidad valor salida y el factor de conversión., obteniendolos del objeto importado
  function setNewParams(option) {
    setParams(optionParams[option - 1]);
  }

  //Guarda el array "history" en la memoria local
  function saveHistory(list) {
    localStorage.setItem("history", JSON.stringify(list));
  }

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
