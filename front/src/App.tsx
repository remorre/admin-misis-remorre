import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PanelPage from './pages/admin/PanelPage';
import SettingsPage from './pages/panel/SettingsPage';
import MeetupsPage from './pages/panel/MeetupsPage';
import CoursesPage from './pages/panel/CoursesPage';
import PersonalAchievementsPage from './pages/panel/PersonalAchievementsPage';
import BadgesPage from './pages/panel/BadgesPage';
import MessageBroadcastPage from './pages/panel/MessageBroadcastPage';
import ProfilesPage from './pages/panel/ProfilesPage';
import HackathonOrganizationPage from './pages/panel/HackathonOrganizationPage';
import CoworkingSpacePage from './pages/panel/CoworkingSpacePage';
import BackgroundGrid from './components/admin/BackgroundGrid';
import AdminPage from './pages/admin/AdminPage.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { token } = useAuth();
	if (!token) {
		return <Navigate to="/" replace />;
	}
	return <>{children}</>;
};

function AppContent() {
	const { token } = useAuth();

	React.useEffect(() => {
		const handleUserInteraction = () => {
			const audioElement = document.getElementById(
				'background-audio',
			) as HTMLAudioElement | null;
			if (audioElement) {
				audioElement.currentTime = 0;
				audioElement.play().catch(error => {
					console.error('Аудио заблокировано:', error);
				});

				document.removeEventListener('click', handleUserInteraction);
			}
		};

		document.addEventListener('click', handleUserInteraction);

		return () => {
			document.removeEventListener('click', handleUserInteraction);
		};
	}, []);

	return (
		<div>
			<audio id="background-audio" hidden controls loop>
				<source src="/city.mp3" type="audio/mpeg" />
				Аудиоплеер не поддерживается.
			</audio>
			<BackgroundGrid />

			<Routes>
				<Route
					path="/"
					element={
						token ? <Navigate to="/panel" replace /> : <AdminPage />
					}
				/>
				<Route
					path="/panel"
					element={
						<ProtectedRoute>
							<PanelPage />
						</ProtectedRoute>
					}
				>
					<Route path="settings" element={<SettingsPage />} />
					<Route path="meetups" element={<MeetupsPage />} />
					<Route path="courses" element={<CoursesPage />} />
					<Route
						path="achievements"
						element={<PersonalAchievementsPage />}
					/>
					<Route path="badges" element={<BadgesPage />} />
					<Route path="messages" element={<MessageBroadcastPage />} />
					<Route path="profiles" element={<ProfilesPage />} />
					<Route
						path="hackathons"
						element={<HackathonOrganizationPage />}
					/>
					<Route path="coworking" element={<CoworkingSpacePage />} />
				</Route>
			</Routes>
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
