'use client';

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage.tsx';
import PanelPage from './pages/admin/PanelPage.tsx';
import SettingsPage from './pages/panel/SettingsPage.tsx';
import MeetupsPage from './pages/panel/MeetupsPage.tsx';
import CoursesPage from './pages/panel/CoursesPage.tsx';
import PersonalAchievementsPage from './pages/panel/PersonalAchievementsPage.tsx';
import BadgesPage from './pages/panel/BadgesPage.tsx';
import MessageBroadcastPage from './pages/panel/MessageBroadcastPage.tsx';
import ProfilesPage from './pages/panel/ProfilesPage.tsx';
import HackathonOrganizationPage from './pages/panel/HackathonOrganizationPage.tsx';
import CoworkingSpacePage from './pages/panel/CoworkingSpacePage.tsx';
import BackgroundGrid from './components/admin/BackgroundGrid.tsx';

function App() {
	useEffect(() => {
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
			{/* <audio id="background-audio" hidden controls loop>
				<source src="/city.mp3" type="audio/mpeg" />
				Аудиоплеер не поддерживается.
			</audio> */}
			<BackgroundGrid />

			<Routes>
				<Route path="/" element={<AdminPage />} />
				<Route path="/panel" element={<PanelPage />}>
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

export default App;
