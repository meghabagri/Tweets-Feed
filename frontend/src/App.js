import React, { useState } from "react";
import axios from "axios";
import logo from "./twitter.svg";

import "./App.css";

function downloadTextFile(text, name) {
  const a = document.createElement("a");
  const type = name.split(".").pop();
  a.href = URL.createObjectURL(
    new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` })
  );
  a.download = name;
  a.click();
}

function App() {
  const [name, setName] = useState("");
  const [tweets, setTweets] = useState([]);
  const [userError, setUserError] = useState();

  const handleSubmit = evt => {
    evt.preventDefault();
    getTweets();
  };

  const getTweets = () => {
    axios
      .get("http://localhost:4000/api/tweets/" + name)
      .then(response => {
        setUserError(false);
        setTweets(response.data);
      })
      .catch(() => setUserError(true));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="twitter" />
        <h3>Tweets Feed</h3>
      </header>
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Search.."
            onChange={e => setName(e.target.value)}
          />
        </form>
      </div>

      {!userError && tweets.length > 0 && (
        <div className="content">
          <button
            className="download-btn"
            onClick={() =>
              downloadTextFile(JSON.stringify(tweets), "tweets.json")
            }
          >
            Download Tweets
          </button>
          <ul>
            {tweets.map((tweet, index) => (
              <li value={index}>{tweet["text"]} </li>
            ))}
          </ul>
        </div>
      )}
      {userError && <p>Oh snap! This user does not exists.</p>}
    </div>
  );
}

export default App;
