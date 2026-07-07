import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness platform for tracking workouts, teams, and progress.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React 19</span>
                <span className="badge bg-success">Vite</span>
                <span className="badge bg-info text-dark">Express + TypeScript</span>
                <span className="badge bg-warning text-dark">MongoDB + Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
