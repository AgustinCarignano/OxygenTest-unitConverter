import React from "react";

function PanelImputs(props) {
  const {
    handleChange,
    handleOnKeyUp,
    handleOptionChange,
    putInHistory,
    toggleInput,
    output,
    unitInput,
    unitOutput,
    input,
    factor,
    option,
  } = props;

  return (
    <>
      <div className="panel">
        <h2 className="panel__title">Convert</h2>
        <div className="panel__inputs">
          <select
            id="options"
            className="panel__inputs-input"
            onChange={handleOptionChange}
            value={option}
          >
            <option value="1">Km → miles</option>
            <option value="2">miles → Km</option>
            <option value="3">metres → feet</option>
            <option value="4">feet → metres</option>
            <option value="5">cm → inches</option>
            <option value="6">inches → cm</option>
          </select>
          <label
            htmlFor="options"
            className="panel__inputs-label"
            onClick={() =>
              toggleInput({
                input,
                output,
                unitInput,
                unitOutput,
                option,
                factor,
              })
            }
          >
            ⇆
          </label>
        </div>
        <div className="panel__inputs">
          <input
            type="number"
            className="panel__inputs-input"
            id="inputValue"
            onKeyUp={handleOnKeyUp}
            onChange={handleChange}
            value={input}
          />
          <label htmlFor="inputValue" className="panel__inputs-label">
            {unitInput}
          </label>
        </div>
        <div className="panel__output">
          <span
            onClick={() =>
              putInHistory({ input, output, unitInput, unitOutput })
            }
          >
            ❤
          </span>
          <p>{`${output || ""} ${input !== "" ? unitOutput : ""}`}</p>
        </div>
      </div>
    </>
  );
}

export default PanelImputs;
// ❤ 🤍
