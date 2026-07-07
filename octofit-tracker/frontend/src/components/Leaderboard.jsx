import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard');
        if (!ignore) {
          setEntries(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Competitive standings for your community.</p>
        </div>
      </div>
      <div className="list-group">
        {entries.map((entry, index) => (
          <article key={entry._id || `${entry.user}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6 mb-1">#{index + 1} {entry.user || 'Unknown user'}</h3>
              <p className="mb-0 text-muted">{entry.team || 'No team assigned'}</p>
            </div>
            <span className="badge bg-success rounded-pill">{entry.score || 0} pts</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;
