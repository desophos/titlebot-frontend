import React, { useState } from "react";
import { nanoid } from "nanoid";
import Result from "./components/Result";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function App(props) {
  const [results, setResults] = useState(props.results);

  function addResult(iconUrl, title) {
    const newResult = { id: `result-${nanoid()}`, iconUrl: iconUrl, title: title };
    console.log(`Adding result ${newResult}`);
    setResults([...results, newResult]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rawUrl = formData.get("url");
    const url = rawUrl.includes("://") ? rawUrl : "http://" + rawUrl;
    const iconUrl = new URL(`https://www.google.com/s2/favicons?domain=${url}&sz=16`);

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
    <Container className="App">
      <Stack gap={3}>
        <div />
        <div className="sticky-top">
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="url-input">Enter a URL to fetch its title:</Form.Label>
            <Stack direction="horizontal" gap={2}>
              <Form.Control type="text" placeholder="Enter URL" id="url-input" name="url" autoComplete="off" />
              <Button variant="primary" type="submit">Fetch</Button>
            </Stack>
          </Form>
        </div>
        <Container>
          <Row>
            <Col />
            <Col md="auto">
              <Stack gap={1} id="results">
                {resultList}
              </Stack>
            </Col>
            <Col />
          </Row>
        </Container>
      </Stack>
    </Container>
  );
}
