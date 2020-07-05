import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Title = styled.h1`
  padding-top: 10%;
  padding-bottom: 50px;
  font-size: 3rem;
  margin: auto;
  text-align: center;
`;

const Inputs = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const SumHeader = styled.h2`
  padding-top: 60px;
  padding-bottom: 20px;
  text-align: center;
`;

const SummaryText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 100px;
`;

const TextForm = styled(Form.Control)`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

function App() {
  const [summary, setSummary] = useState(null);
  const [text, setText] = useState(null);

  const textSelectedHandler = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
  };

  const textUploadHandler = () => {
    let fd = new FormData();
    fd.append("text", text);
    axios
      .post("http://127.0.0.1:5000/", fd)
      .then((res) => {
        setSummary(res.data.result[0].summary_text);
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Title>Text Summarizer</Title>
      <Inputs>
        <TextForm
          as="textarea"
          onChange={textSelectedHandler}
          placeholder="Enter Text You Want Summarized"
        />
        <Button variant="outline-dark" onClick={textUploadHandler}>
          Let's Summarize!
        </Button>
        {
        summary ? <SumHeader>Summary</SumHeader> : null
        }
        <SummaryText>{summary}</SummaryText>
      </Inputs>
    </React.Fragment>
  );
}

export default App;
