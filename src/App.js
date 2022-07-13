import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";


function App() {

const [username, setUsername] = useState('');
const [data, setData] = useState(null);
const [repos, setRepos] = useState(null);



const onClick = (e) => {
  e.preventDefault();
  getGitHubInfo();
  getGitHubRepos();
  setUsername('');

}
const onReset = () => {
  setData(null);
  setRepos(null);
}



const handleChange = (event) => {
  setUsername(event.target.value);
}

const getGitHubInfo = () => {
  return fetch(`https://api.github.com/users/${username}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => { setData(data); console.log(data); })
  .catch((error) => console.log(error));
}

const getGitHubRepos = () => {
  return fetch(`https://api.github.com/users/${username}/repos`)
  .then((response) => {
    return response.json();
  })
  .then((data) => { setRepos(data);  })
  .catch((error) => console.log(error));
}
console.log(repos);

  return (
    <>
    {data === null && <div className="form-wrapper">
      <h1 className="title">Check the GitHub repos</h1>
      <form className="form">
        <label htmlFor="" className="form-label">GitHub Username:</label>
        <input type="text" className="form-input" placeholder="e.g. facebook" value={username} onChange={(event) => handleChange(event)}/>
        <Button type="submit" onClick={onClick}>GO!</Button>
      </form>
    </div>}
    {data !== null &&
    <div className="form-wrapper">
      <form className="form">
        <div className="avatar__image">
          <img className="avatar" src={data.avatar_url} alt="" />
          <span className="name">{data.name}</span>
        </div>
        <div className="label-box">
          <span className="label__title">Bio:</span>
          <span className="label__text">{data.bio}</span>
        </div>
        <div className="label-box">
          <span className="label__title">location:</span>
          <span className="label__text">{data.location}</span>
        </div>
        <span className="label__title repos">Repositories:</span>
        {repos.map((repo, index) => {
        return (
          <div key={index} className="repositories">{repo.name}</div>
        )}
        )}
        <Button type="reset" onClick={onReset}>Reset</Button>
      </form>
    </div>
    }
    </>
  );
}

export default App;
