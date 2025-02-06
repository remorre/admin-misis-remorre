import type React from 'react';
import { useState } from 'react';
import type { Hackathon } from '../../../pages//panel/HackathonOrganizationPage.tsx';

type HackathonFormData = Omit<Hackathon, 'id' | 'isArchived'>;

interface HackathonFormProps {
	onSubmit: (data: HackathonFormData) => void;
	onCancel: () => void;
	initialData?: Partial<HackathonFormData>;
}

export default function HackathonForm({
	onSubmit,
	onCancel,
	initialData = {},
}: HackathonFormProps) {
	const [formData, setFormData] = useState<HackathonFormData>({
		title: initialData.title || '',
		description: initialData.description || '',
		startDate: initialData.startDate || '',
		endDate: initialData.endDate || '',
		location: initialData.location || '',
		maxParticipants: initialData.maxParticipants || 100,
		status: initialData.status || 'upcoming',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const value =
			e.target.type === 'number'
				? Number.parseInt(e.target.value)
				: e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{initialData.title
					? 'Редактировать хакатон'
					: 'Создать хакатон'}
			</h2>
			<div>
				<label
					htmlFor="title"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Название
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
					htmlFor="description"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Описание
				</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					rows={4}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				></textarea>
			</div>
			<div>
				<label
					htmlFor="startDate"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Дата начала
				</label>
				<input
					type="date"
					id="startDate"
					name="startDate"
					value={formData.startDate}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="endDate"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Дата окончания
				</label>
				<input
					type="date"
					id="endDate"
					name="endDate"
					value={formData.endDate}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="location"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Место проведения
				</label>
				<input
					type="text"
					id="location"
					name="location"
					value={formData.location}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="maxParticipants"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Максимальное количество участников
				</label>
				<input
					type="number"
					id="maxParticipants"
					name="maxParticipants"
					value={formData.maxParticipants}
					onChange={handleChange}
					required
					min={1}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="status"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Статус
				</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				>
					<option value="upcoming">Предстоящий</option>
					<option value="ongoing">Текущий</option>
					<option value="completed">Завершенный</option>
				</select>
			</div>
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="cyberpunk-button bg-gray-700 text-white px-6 py-2 text-xl hover:bg-gray-600 transition duration-300"
				>
					Отмена
				</button>
				<button
					type="submit"
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					{initialData.title ? 'Сохранить' : 'Создать'}
				</button>
			</div>
		</form>
	);
}
