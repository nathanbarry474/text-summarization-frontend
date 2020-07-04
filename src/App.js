import React, { useState } from "react";
import styled from 'styled-components';
import axios from "axios";

const Page = styled.div`
  text-align: center;
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
    <Page>
      <h2>Text Summarizer</h2>
      <textarea
        className="input"
        onChange={textSelectedHandler}
        placeholder="Enter Text You Want Summarized"
      />
      <button onClick={textUploadHandler}>Submit</button>
      <h2>{summary}</h2>
    </Page>
  );
}

export default App;
