import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage.tsx';

function App() {
	return (
		<Routes>
			<Route path="/" element={<AdminPage />} />
		</Routes>
	);
}

export default App;
