import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadActivities() {
      try {
        const endpoint = '/api/activities/';
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = normalizeItems(payload);

        if (!ignore) {
          setActivities(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent movement and training logs.</p>
        </div>
      </div>
      <div className="list-group">
        {activities.map((activity) => (
          <article key={activity._id || `${activity.type}-${activity.date}`} className="list-group-item">
            <div className="d-flex justify-content-between gap-3">
              <div>
                <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                <p className="mb-1 text-muted">{activity.description || 'No description provided.'}</p>
                <small className="text-muted">{activity.date || 'Unknown date'}</small>
              </div>
              <span className="badge bg-primary rounded-pill">{activity.duration || '—'} min</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Activities;
