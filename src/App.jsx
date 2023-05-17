import React, { useState } from "react";
import { nanoid } from "nanoid";
import Result from "./components/Result";

export default function App(props) {
  const [results, setResults] = useState(props.results);

  function addResult(iconUrl, title) {
    const newResult = { id: `result-${nanoid()}`, iconUrl: iconUrl, title: title };
    console.log("Adding result %o", newResult);
    setResults([...results, newResult]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rawUrl = formData.get("url");
    const url = rawUrl.includes("://") ? rawUrl : "http://" + rawUrl;
    const iconUrl = new URL("favicon.ico", url);

    fetch("http://localhost:8080/", { method: "POST", mode: "cors", body: url })
      .then((response) => response.text())
      .then((title) => addResult(iconUrl.toString(), title))
      .catch((e) => console.log(e));
  }

  const resultList = results.map((result) => (
    <Result
      key={result.id}
      id={result.id}
      iconUrl={result.iconUrl}
      title={result.title}
    />
  ));

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2><label htmlFor="url-input">Enter a URL:</label></h2>
        <input type="text" id="url-input" name="url" autoComplete="off" />
        <button type="submit">Fetch</button>
      </form>
      <ul id="results">{resultList}</ul>
    </div>
  );
}
