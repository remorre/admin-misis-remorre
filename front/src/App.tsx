import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage.tsx';
import PanelPage from './pages/PanelPage.tsx';

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
			<audio id="background-audio" hidden controls loop>
				<source src="/city.mp3" type="audio/mpeg" />
				Аудиоплеер не поддерживается.
			</audio>

			<Routes>
				<Route path="/" element={<AdminPage />} />
				<Route path="/panel" element={<PanelPage />} />
			</Routes>
		</div>
	);
}

export default App;
