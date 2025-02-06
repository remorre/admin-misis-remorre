import type React from 'react';
import { useState } from 'react';
import type { Message } from '../../../pages/panel/MessageBroadcastPage.tsx';

type MessageFormData = Omit<Message, 'id' | 'sentAt'>;

interface MessageFormProps {
	onSubmit: (data: MessageFormData) => void;
}

export default function MessageForm({ onSubmit }: MessageFormProps) {
	const [formData, setFormData] = useState<MessageFormData>({
		title: '',
		content: '',
		recipients: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		setFormData({ title: '', content: '', recipients: '' });
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Отправить сообщение
			</h2>
			<div>
				<label
					htmlFor="title"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Заголовок
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="content"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Содержание
				</label>
				<textarea
					id="content"
					name="content"
					value={formData.content}
					onChange={handleChange}
					required
					rows={4}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				></textarea>
			</div>
			<div>
				<label
					htmlFor="recipients"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Получатели (через запятую)
				</label>
				<input
					type="text"
					id="recipients"
					name="recipients"
					value={formData.recipients}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div className="flex justify-end">
				<button
					type="submit"
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Отправить
				</button>
			</div>
		</form>
	);
}
