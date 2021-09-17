import { useState } from "react";
import "./styles.css";

var notes = [2000, 500, 100, 20, 10, 5, 1];

export default function App() {
  var [change, setChange] = useState({});
  var [message, setMessage] = useState("");

  function hideResult() {
    setChange({});
    document.getElementById("displayResults").style.display = "none";
  }

  function validateBill() {
    var bill = parseInt(document.getElementById("bill-amt").value, 10);
    if (Number.isNaN(bill) || bill === 0) {
      setMessage("Bill should be Greater than 0");
      hideResult();
      document.getElementById("next-btn").style.display = "inline";
      document.getElementById("cash-field").style.display = "none";
      document.getElementById("check-btn").style.display = "none";
      return false;
    }
    setMessage("");
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("cash-field").style.display = "inline";
    document.getElementById("check-btn").style.display = "inline";
    return true;
  }

  function validate(bill, cash) {
    if (!validateBill()) {
      return;
    }
    if (bill === cash) {
      setMessage("Cash Given is Equal to Bill...");
      hideResult();
      return false;
    }
    if (bill > cash || Number.isNaN(cash)) {
      setMessage("Cash Given should be Greater than or Equal to Bill...");
      hideResult();
      return false;
    }
    return true;
  }

  function calculateChange() {
    var bill = parseInt(document.getElementById("bill-amt").value, 10);
    var cash = parseInt(document.getElementById("cash-amt").value, 10);

    if (!validate(bill, cash)) {
      return;
    }

    var result = Object();
    var balance = cash - bill;
    var totalNotes = 0;
    setChange(result);

    for (var i = 0; i < notes.length; i++) {
      var numOfnotes = 0;
      if (balance >= notes[i]) {
        numOfnotes = Math.floor(balance / notes[i]);
        balance = balance % notes[i];
      }
      result[notes[i]] = numOfnotes;
      totalNotes = totalNotes + numOfnotes;
    }
    // console.log(totalNotes);
    // console.log(result);

    if (totalNotes > 0) {
      document.getElementById("displayResults").style.display = "inline";
      setMessage("Balance : " + (cash - bill));
      setChange(result);
    }
  }

  return (
    <div className="App">
      <h1>Cash Register</h1>
      <ul>
        <li>
          Bill Amount : <input id="bill-amt" type="number" min="1" step="1" />
        </li>
        <li style={{ display: "none" }} id="cash-field">
          Cash Given : <input id="cash-amt" type="number" min="1" step="1" />
        </li>
        <li>
          <button id="next-btn" onClick={validateBill}>
            {" "}
            Next{" "}
          </button>
        </li>
        <li>
          <button
            id="check-btn"
            style={{ display: "none" }}
            onClick={calculateChange}
          >
            {" "}
            Check{" "}
          </button>
        </li>
      </ul>

      <p id="error-message">{message}</p>

      <table style={{ display: "none" }} id="displayResults">
        <tbody>
          <tr>
            <th>Note: </th>
            {notes.map((item, index) => {
              return <td key={item}> {item} </td>;
            })}
          </tr>

          <tr>
            <th>Denoination: </th>
            {notes.map((item, index) => {
              return <td key={item}> {change[item]} </td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
