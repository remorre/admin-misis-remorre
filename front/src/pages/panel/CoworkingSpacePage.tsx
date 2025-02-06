import { useState } from 'react';

export default function CoworkingSpacePage() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-4xl text-center">
				<h1 className="text-6xl font-bold mb-12 cyberpunk-glitch">
					Коворкинг
				</h1>
				<div className="cyberpunk-form bg-gray-900 p-12 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
					<p className="text-4xl mb-8">
						Статус:{' '}
						<span
							className={`font-bold ${
								isOpen ? 'text-neon-green' : 'text-red-500'
							}`}
						>
							{isOpen ? 'Открыто' : 'Закрыто'}
						</span>
					</p>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className={`cyberpunk-button ${
							isOpen
								? 'bg-red-500 hover:bg-red-400'
								: 'bg-neon-green hover:bg-green-400'
						} text-white px-8 py-3 text-2xl transition duration-300`}
					>
						{isOpen ? 'Закрыть коворкинг' : 'Открыть коворкинг'}
					</button>
				</div>
			</div>
		</div>
	);
}
