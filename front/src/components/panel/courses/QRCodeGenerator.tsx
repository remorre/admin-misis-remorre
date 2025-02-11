'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../../context/AuthContext';
import type { Lesson } from '../../../pages/panel/CoursesPage';

interface QRCodeGeneratorProps {
	lesson: Lesson;
	onClose: () => void;
}

export default function QRCodeGenerator({
	lesson,
	onClose,
}: QRCodeGeneratorProps) {
	const { token } = useAuth();
	const qrValue = `https://regami.ru/backend/course/course/${lesson.id}/lesson/${lesson.id}/check-in`;

	const handleCheckIn = async () => {
		try {
			const response = await fetch(qrValue, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) throw new Error('Failed to check in');
			const result = await response.json();
			console.log('Check-in successful:', result);
			// You might want to update the UI or show a success message here
		} catch (error) {
			console.error('Error during check-in:', error);
			// You might want to show an error message to the user here
		}
	};

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				QR-код для отметки посещаемости
			</h2>
			<p className="text-xl">Занятие: {lesson.description}</p>
			<div className="w-64 h-64 mx-auto bg-white p-4">
				<QRCodeSVG value={qrValue} size={256} />
			</div>
			<p className="text-center text-md text-gray-400">
				Отсканируйте для отметки посещаемости
			</p>
			<div className="flex justify-center space-x-4">
				<button
					onClick={handleCheckIn}
					className="cyberpunk-button bg-neon-green text-black px-6 py-2 text-xl hover:bg-green-400 transition duration-300"
				>
					Отметить посещение
				</button>
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
