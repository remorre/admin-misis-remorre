'use client';

import { useState } from 'react';
import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';

interface RaffleGeneratorProps {
	meetup: Meetup;
	onClose: () => void;
}

export default function RaffleGenerator({
	meetup,
	onClose,
}: RaffleGeneratorProps) {
	const [winner, setWinner] = useState<number | null>(null);

	const generateWinner = () => {
		const randomWinner =
			Math.floor(Math.random() * meetup.users.length) + 1;
		setWinner(randomWinner);
	};

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Розыгрыш для митапа
			</h2>
			<p className="text-xl">Розыгрыш для митапа: {meetup.title}</p>
			<p className="text-xl">
				Количество участников: {meetup.users.length}
			</p>
			{winner === null ? (
				<button
					onClick={generateWinner}
					className="w-full cyberpunk-button bg-neon-purple text-white px-6 py-2 text-xl hover:bg-purple-400 transition duration-300"
				>
					Провести розыгрыш
				</button>
			) : (
				<p className="text-3xl font-bold text-center text-neon-purple">
					Победитель: Участник #{winner}
				</p>
			)}
			<div className="flex justify-end">
				<button
					onClick={onClose}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Закрыть
				</button>
			</div>
		</div>
	);
}
