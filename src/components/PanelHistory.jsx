import React from "react";

function PanelHistory(props) {
  const { history, deleteItem } = props;
  return (
    <>
      <h3 className="savedTitle">Saved</h3>
      <div className="historyContainer">
        {history.map((item, index) => {
          return (
            <div key={index} className="history">
              <p className="history__items">
                {item.input} {item.params.unitInput} → {item.output}{" "}
                {item.params.unitOutput}
              </p>
              <span onClick={() => deleteItem(index)}>×</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PanelHistory;
