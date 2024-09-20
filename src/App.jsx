import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [nat, setNat] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [languages, setLanguages] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("users"));
    setUser(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangeDesc(event) {
    setDesc(event.target.value);
  }
  function handleChangeNat(event) {
    setNat(event.target.value);
  }

  function handleChangeLanguage(event) {
    const value = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      setLanguages([...languages, value]);
    } else {
      setLanguages(
        languages.filter(function (element) {
          return element != value;
        })
      );
    }
  }

  function handleClick(event) {
    event.preventDefault();

    if (!username || !desc || !email) {
      alert("Barcha qismlarni to`ldirirng");
      return;
    }

    const userForm = {
      username: username,
      email: email,
      desc: desc,
      nat: nat,
      languages: languages,
      id: Date.now(),
    };

    let copied = [...users];
    copied.push(userForm);
    setUser(copied);

    setLanguages([]);
    setUsername("");
    setNat("uzbek");
    setDesc("");
    setEmail("");
  }
  function deleteCard(id) {
    setUser((element) => element.filter((value) => value.id !== id));
  }
  return (
    <div className="container">
      <form className="form">
        <input
          onChange={handleChangeUsername}
          value={username}
          type="text"
          placeholder="Enter username..."
        />
        <input
          onChange={handleChangeEmail}
          value={email}
          type="email"
          name=""
          id=""
          placeholder="Enter email..."
        />
        <select onChange={handleChangeNat} value={nat}>
          <option value="uzbek">uzbek</option>
          <option value="tadjik">tadjik</option>
          <option value="english">english</option>
        </select>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="O'zbek"
              onChange={handleChangeLanguage}
            />
            O'zbek
          </label>{" "}
          <label>
            <input
              type="checkbox"
              value="Tadjik"
              onChange={handleChangeLanguage}
            />
            Tadjik
          </label>
          <label>
            <input
              type="checkbox"
              value="English"
              onChange={handleChangeLanguage}
            />
            English
          </label>{" "}
          <label>
            <input
              type="checkbox"
              value="Russian"
              onChange={handleChangeLanguage}
            />
            Russian
          </label>
        </div>

        <textarea
          onChange={handleChangeDesc}
          value={desc}
          placeholder="Enter description..."
        ></textarea>
        <button onClick={handleClick}>Register</button>
      </form>
      <div className="cards">
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id} className="card">
              <h3>{user.username}</h3>
              <h3>{user.email}</h3>
              <span>{user.nat}</span>
              <p>{user.languages.join(" ")}</p>
              <p>{user.desc}</p>
              <button
                onClick={() => {
                  deleteCard(user.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
