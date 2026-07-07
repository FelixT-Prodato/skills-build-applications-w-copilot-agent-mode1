import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const data = await fetchCollection('users');
        if (!ignore) {
          setUsers(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">People driving the fitness community.</p>
        </div>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.email} className="col-md-6">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h6 mb-1">{user.name || 'Anonymous user'}</h3>
                <p className="text-muted mb-2">{user.email || 'No email provided'}</p>
                <span className="badge bg-secondary">{user.goal || 'Consistency'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
