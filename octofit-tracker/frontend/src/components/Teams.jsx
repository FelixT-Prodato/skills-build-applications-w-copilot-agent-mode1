import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadTeams() {
      try {
        const endpoint = '/api/teams/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = normalizeItems(payload);

        if (!ignore) {
          setTeams(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Group-based motivation and collaboration.</p>
        </div>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.name} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 mb-1">{team.name || 'Team'}</h3>
                <p className="text-muted mb-2">{team.description || 'A focused group for shared progress.'}</p>
                <span className="badge bg-info text-dark">{team.members?.length || 0} members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;
