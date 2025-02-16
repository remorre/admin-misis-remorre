import type React from 'react';
import { useState } from 'react';
import type { Badge } from '../../../pages/panel/BadgesPage.tsx';

type BadgeFormData = Omit<Badge, 'id' | 'isArchived'>;

interface BadgeFormProps {
	onSubmit: (data: BadgeFormData) => void;
	onCancel: () => void;
	initialData?: Partial<BadgeFormData>;
}

export default function BadgeForm({
	onSubmit,
	onCancel,
	initialData = {},
}: BadgeFormProps) {
	const [formData, setFormData] = useState<BadgeFormData>({
		name: initialData.name || '',
		description: initialData.description || '',
		imageUrl: initialData.imageUrl || '',
		criteria: initialData.criteria || '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{initialData.name ? 'Редактировать ачивку' : 'Создать ачивку'}
			</h2>
			<div>
				<label
					htmlFor="name"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Название
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
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
					rows={3}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				></textarea>
			</div>
			<div>
				<label
					htmlFor="imageUrl"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					URL изображения
				</label>
				<input
					type="url"
					id="imageUrl"
					name="imageUrl"
					value={formData.imageUrl}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="criteria"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Критерии получения
				</label>
				<textarea
					id="criteria"
					name="criteria"
					value={formData.criteria}
					onChange={handleChange}
					required
					rows={3}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				></textarea>
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
					{initialData.name ? 'Сохранить' : 'Создать'}
				</button>
			</div>
		</form>
	);
}
