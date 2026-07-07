import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadWorkouts() {
      try {
        const endpoint = '/api/workouts/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = normalizeItems(payload);

        if (!ignore) {
          setWorkouts(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Planned sessions and activity suggestions.</p>
        </div>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.name} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 mb-1">{workout.name || 'Workout'}</h3>
                <p className="text-muted mb-2">{workout.description || 'A motivating training plan.'}</p>
                <span className="badge bg-warning text-dark">{workout.duration || '—'} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;
