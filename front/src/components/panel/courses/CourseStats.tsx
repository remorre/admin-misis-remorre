/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

interface CourseStatsProps {
	onClose: () => void;
}

interface CourseStatistics {
	totalCourses: number;
	activeCourses: number;
	archivedCourses: number;
}

export default function CourseStats({ onClose }: CourseStatsProps) {
	const { token } = useAuth();
	const [stats, setStats] = useState<CourseStatistics | null>(null);

	useEffect(() => {
		fetchCourseStatistics();
	}, []);

	const fetchCourseStatistics = async () => {
		try {
			const response = await fetch(
				'https://regami.ru/backend/course/course/statistic',
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			if (!response.ok)
				throw new Error('Failed to fetch course statistics');
			const data = await response.json();
			setStats(data);
		} catch (error) {
			console.error('Error fetching course statistics:', error);
		}
	};

	if (!stats) {
		return <div>Loading statistics...</div>;
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Статистика курсов
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Всего курсов:</span>{' '}
				{stats.totalCourses}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Активных курсов:
				</span>{' '}
				{stats.activeCourses}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Архивированных курсов:
				</span>{' '}
				{stats.archivedCourses}
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
