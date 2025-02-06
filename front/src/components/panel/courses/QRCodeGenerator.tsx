import { QRCodeSVG } from 'qrcode.react';
import type { Lesson } from '../../../pages/panel/CoursesPage.tsx';

interface QRCodeGeneratorProps {
	lesson: Lesson;
	onClose: () => void;
}

export default function QRCodeGenerator({
	lesson,
	onClose,
}: QRCodeGeneratorProps) {
	const qrValue = `https://yourdomain.com/lessons/${lesson.id}/attendance`;

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				QR-код для отметки посещаемости
			</h2>
			<p className="text-xl">Занятие: {lesson.title}</p>
			<div className="w-64 h-64 mx-auto bg-white p-4">
				<QRCodeSVG value={qrValue} size={256} />
			</div>
			<p className="text-center text-md text-gray-400">
				Отсканируйте для отметки посещаемости
			</p>
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
