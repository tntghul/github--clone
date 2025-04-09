import React, { useState } from "react";


function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!username) return;
  
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setError(null);
      })
      .catch((err) => {
        setRepos([]);
        setError(err.message);
      });
  };
  
    // You’ll fetch data here later


  return (
    <div className="container py-5">
      {/* Header */}
      <nav className="navbar navbar-dark bg-dark mb-4 rounded">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">GitHub Activity Tracker</span>
        </div>
      </nav>

      {/* Search Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">Enter GitHub Username</h4>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Get Data
          </button>
        </div>
      </div>

      {/* Repo Section */}

      {error && <div className="alert alert-danger">{error}</div>}

{repos.length > 0 ? (
  <div className="list-group">
    {repos.map((repo) => (
      <a
        key={repo.id}
        href={repo.html_url}
        className="list-group-item list-group-item-action"
        target="_blank"
        rel="noreferrer"
      >
        <strong>{repo.name}</strong> - ⭐ {repo.stargazers_count}
      </a>
    ))}
  </div>
) : (
  !error && <p>No repositories found yet.</p>
)}

      

      
    </div>
  );
}

export default App;
