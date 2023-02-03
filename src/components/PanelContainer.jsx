import React from "react";
import { useState } from "react";
import "./styles.css";
import PanelImputs from "./PanelImputs";
import PanelHistory from "./PanelHistory";

function Panel() {
  const [output, setOutput] = useState(null);
  const [unitInput, setUnitInput] = useState("km");
  const [unitOutput, setUnitOutput] = useState("miles");
  const [input, setInput] = useState("");
  const [factor, setFactor] = useState(0.621371);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [option, setOption] = useState(1);

  function handleChange(e) {
    setInput(e.target.value === "" ? "" : parseFloat(e.target.value));
  }

  function handleOnKeyUp(e) {
    const input = e.target.value;
    setOutput(Math.round(input * factor * 100) / 100);
  }

  function handleOptionChange(e) {
    let optionSelected = parseInt(e.target.value);
    setInput("");
    setOutput("");
    setOption(optionSelected);
    switch (optionSelected) {
      case 1:
        setUnitInput("km");
        setUnitOutput("miles");
        setFactor(0.621371);
        break;
      case 2:
        setUnitInput("miles");
        setUnitOutput("km");
        setFactor(1.60934);
        break;
      case 3:
        setUnitInput("metres");
        setUnitOutput("feet");
        setFactor(3.28084);
        break;
      case 4:
        setUnitInput("feet");
        setUnitOutput("meters");
        setFactor(0.3048);
        break;
      case 5:
        setUnitInput("cm");
        setUnitOutput("inches");
        setFactor(0.393701);
        break;
      case 6:
        setUnitInput("inches");
        setUnitOutput("cm");
        setFactor(2.54);
        break;
      default:
        setUnitInput("km");
        setUnitOutput("miles");
        setFactor(0.621371);
        break;
    }
  }

  function toggleInput(data) {
    let optionFactor = data.option % 2 === 0 ? -1 : +1;
    let newOption = data.option + optionFactor;
    setOption(newOption);
    setInput(data.output);
    setOutput(data.input);
    setUnitInput(data.unitOutput);
    setUnitOutput(data.unitInput);
    setFactor(1 / data.factor);
  }

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

  function deleteItem(index) {
    const historyCopy = [...history];
    historyCopy.splice(index, 1);
    saveHistory(historyCopy);
    setHistory(historyCopy);
  }

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
        unitInput={unitInput}
        unitOutput={unitOutput}
        input={input}
        factor={factor}
        option={option}
      />
      {history.length !== 0 && (
        <PanelHistory history={history} deleteItem={deleteItem} />
      )}
    </div>
  );
}

export default Panel;
