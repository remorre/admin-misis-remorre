import { useState } from 'react';
import LoginForm from '../../components/admin/LoginForm';
import { AuthProvider } from '../../context/AuthContext';
import BackgroundGrid from '../../components/admin/BackgroundGrid';

export default function AdminPage() {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<AuthProvider>
			<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
				<BackgroundGrid />
				{!showLogin ? (
					<div className="text-center z-10">
						<h1 className="text-9xl font-extrabold mb-20 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 cyberpunk-glitch">
							Мисис EDITION
						</h1>
						<button
							onClick={() => setShowLogin(true)}
							className="bg-black text-2xl hover:bg-gray-900 text-white font-bold py-3 px-8 transition duration-300 ease-in-out border border-neon-blue cyberpunk-button"
						>
							Залетай
						</button>
					</div>
				) : (
					<LoginForm />
				)}
			</div>
		</AuthProvider>
	);
}
