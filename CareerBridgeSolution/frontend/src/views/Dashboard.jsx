import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { getCareerPaths } from '../services/dataService';
import './Dashboard.css';

const Dashboard = () => {
  const [paths, setPaths] = useState([]);
  const [selectedPathId, setSelectedPathId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await getCareerPaths();
        setPaths(response.data || []);
      } catch (err) {
        setError('Failed to load career paths.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaths();
  }, []);

  const handlePathChange = (e) => {
    const value = e.target.value;
    setSelectedPathId(value);
    // Standard testing requirement: verify that selecting a discipline prints the track identifier value
    console.log(`Selected Career Track ID: ${value}`);
  };

  return (
    <Container className="dashboard-container py-5 min-vh-100" fluid>
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="dashboard-header text-center p-4 shadow-sm glass-panel">
              <h1 className="fw-bold mb-3">Student Dashboard</h1>
              <p className="text-muted">Select your target career track to view your roadmap and completion status.</p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg path-selector-card border-0">
              <Card.Body className="p-4 p-md-5">
                {error && <div className="alert alert-danger">{error}</div>}
                <Form.Group controlId="careerPathSelect">
                  <Form.Label className="fw-semibold mb-3">Career Discipline</Form.Label>
                  {loading ? (
                    <div className="text-center py-2"><span className="spinner-border spinner-border-sm text-primary"></span> Loading tracks...</div>
                  ) : (
                    <Form.Select 
                      size="lg"
                      value={selectedPathId}
                      onChange={handlePathChange}
                      className="modern-select"
                    >
                      <option value="">-- Choose a Track --</option>
                      {paths.map(path => (
                        <option key={path.id} value={path.id}>
                          {path.name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Placeholder for the active workspace tracking area */}
        {selectedPathId && (
          <Row className="mt-5 fade-in">
            <Col>
              <Card className="border-0 shadow-sm glass-panel text-center p-5">
                <h4 className="text-muted">Tracking workspace active for ID: {selectedPathId}</h4>
                <p>Roadmap metrics and milestone components will be injected here.</p>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Dashboard;
