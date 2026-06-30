import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { getCareerPaths, getRoadmap, updateStepStatus } from '../services/dataService';
import './Dashboard.css';

const Dashboard = () => {
  const [paths, setPaths] = useState([]);
  const [selectedPathId, setSelectedPathId] = useState('');
  const [loadingPaths, setLoadingPaths] = useState(true);
  const [pathsError, setPathsError] = useState(null);

  const [roadmap, setRoadmap] = useState([]);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);

  // Initial load for Career Paths
  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await getCareerPaths();
        setPaths(response.data || []);
      } catch (err) {
        setPathsError('Failed to load career paths.');
        console.error(err);
      } finally {
        setLoadingPaths(false);
      }
    };
    
    fetchPaths();
  }, []);

  // Secondary load for Roadmap when path changes
  useEffect(() => {
    if (!selectedPathId) {
      setRoadmap([]);
      return;
    }

    const fetchRoadmap = async () => {
      setLoadingRoadmap(true);
      setRoadmapError(null);
      try {
        const response = await getRoadmap(selectedPathId);
        setRoadmap(response.data || []);
      } catch (err) {
        setRoadmapError('Failed to load the roadmap checklist.');
        console.error(err);
      } finally {
        setLoadingRoadmap(false);
      }
    };

    fetchRoadmap();
  }, [selectedPathId]);

  const handlePathChange = (e) => {
    const value = e.target.value;
    setSelectedPathId(value);
    console.log(`Selected Career Track ID: ${value}`);
  };

  const handleStatusChange = async (stepId, currentStatus) => {
    const newStatus = currentStatus === 'Not Started' ? 'Completed' : 'Not Started';
    try {
      await updateStepStatus({ stepId, status: newStatus });
      setRoadmap((prevRoadmap) =>
        prevRoadmap.map((step) =>
          step.id === stepId ? { ...step, status: newStatus } : step
        )
      );
    } catch (err) {
      console.error('Failed to update step status', err);
    }
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
                {pathsError && <div className="alert alert-danger">{pathsError}</div>}
                <Form.Group controlId="careerPathSelect">
                  <Form.Label className="fw-semibold mb-3">Career Discipline</Form.Label>
                  {loadingPaths ? (
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
                          {path.title}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Active Workspace Tracking Area */}
        {selectedPathId && (
          <Row className="mt-5 fade-in justify-content-center">
            <Col md={10} lg={8}>
              <Card className="border-0 shadow-lg glass-panel roadmap-panel">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="mb-4 text-center fw-bold text-dark">Roadmap Modules</h3>
                  
                  {roadmapError && <div className="alert alert-danger">{roadmapError}</div>}
                  
                  {loadingRoadmap ? (
                    <div className="text-center py-5">
                      <span className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></span>
                      <p className="mt-3 text-muted fw-semibold">Loading your curriculum timeline...</p>
                    </div>
                  ) : roadmap.length === 0 ? (
                    <div className="text-center py-4 text-muted">No modules found for this track.</div>
                  ) : (
                    <ListGroup variant="flush" className="roadmap-list">
                      {roadmap.map((step, index) => (
                        <ListGroup.Item 
                          key={step.id} 
                          className="d-flex justify-content-between align-items-center roadmap-item p-3 mb-3 shadow-sm rounded"
                        >
                          <div className="d-flex align-items-center gap-3">
                            <span className="step-number text-white rounded-circle d-flex justify-content-center align-items-center fw-bold shadow-sm" style={{ width: '40px', height: '40px' }}>
                              {index + 1}
                            </span>
                            <div className="fw-semibold text-dark fs-5">{step.title}</div>
                          </div>
                          
                          <div className="d-flex align-items-center gap-3">
                            <Badge 
                              bg={step.status === 'Completed' ? 'success' : 'secondary'} 
                              pill 
                              className="px-3 py-2 fs-6 shadow-sm"
                            >
                              {step.status}
                            </Badge>
                            
                            {/* Toggle Button for aesthetics/completion */}
                            <Button 
                              variant={step.status === 'Completed' ? 'outline-secondary' : 'outline-success'} 
                              size="sm" 
                              className="rounded-pill px-3 fw-bold"
                              onClick={() => handleStatusChange(step.id, step.status)}
                            >
                              {step.status === 'Completed' ? 'Undo' : 'Mark Done'}
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Dashboard;
