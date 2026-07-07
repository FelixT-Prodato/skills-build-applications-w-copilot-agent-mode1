import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  return (
    <main className="container py-4 py-md-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                <div>
                  <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
                  <p className="lead text-muted mb-0">
                    A modern multi-tier fitness platform for tracking workouts, teams, and progress.
                  </p>
                </div>
                <div className="text-md-end">
                  <span className="badge bg-primary me-2">React 19</span>
                  <span className="badge bg-success me-2">Vite</span>
                  <span className="badge bg-info text-dark">Express + TypeScript</span>
                </div>
              </div>

              <div className="alert alert-info mb-4" role="status">
                <strong>API target:</strong> {apiBaseUrl}
                <div className="small text-muted mt-1">
                  Define VITE_CODESPACE_NAME in .env.local for Codespaces, or leave it unset to use localhost.
                </div>
              </div>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                  Overview
                </NavLink>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">
                  Activities
                </NavLink>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">
                  Leaderboard
                </NavLink>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
                  Teams
                </NavLink>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
                  Users
                </NavLink>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">
                  Workouts
                </NavLink>
              </nav>

              <Routes>
                <Route path="/" element={
                  <section>
                    <h2 className="h4 mb-3">Overview</h2>
                    <p className="text-muted mb-4">
                      Explore the health, performance, and community data that powers the OctoFit experience.
                    </p>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <h3 className="h6">Community activity</h3>
                            <p className="text-muted mb-0">Track the latest workouts and movement logs.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body">
                            <h3 className="h6">Team performance</h3>
                            <p className="text-muted mb-0">Monitor leaderboard momentum and team progress.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                } />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/users" element={<Users />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
