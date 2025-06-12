import AddProjectForm from '../components/AddProjectForm';
import ProjectEditor from '../components/ProjectEditor';

function AdminPanel() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  if (!token) return <LoginForm onLogin={setToken} />;

  return (
    <div className="container">
      <h1>Panel administratora</h1>
      <AddNewsForm token={token} />
      <NewsEditor token={token} />
      <hr />
      <AddProjectForm token={token} />
      <ProjectEditor token={token} />
    </div>
  );
}
