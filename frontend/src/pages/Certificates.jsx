import "../styles/dashboard.css";

const certificates = [
  {
    id: 1,
    title: "Tech Symposium 2025",
    issued: "28 Oct 2025",
  },
  {
    id: 2,
    title: "Campus Hackathon",
    issued: "18 Nov 2025",
  },
];

export default function Certificates() {
  return (
    <div className="page-container">

      <h1 className="page-title">Certificates</h1>
      <p className="page-subtitle">
        Download certificates for completed events
      </p>

      <div className="card-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="event-card">

            <div>
              <h3>{cert.title}</h3>
              <p className="muted">
                Issued on {cert.issued}
              </p>
            </div>

            <button className="primary-btn">
              Download PDF
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
