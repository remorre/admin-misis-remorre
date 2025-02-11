import { useState } from 'react';
import ProfileList from '../../components/panel/profiles/ProfileList.tsx';
import ProfileDetails from '../../components/panel/profiles/ProfileDetails.tsx';

export interface Profile {
	id: number;
	name: string;
	email: string;
	role: string;
	joinDate: string;
	lastActive: string;
	achievements: string[];
}

const initialProfiles: Profile[] = [
	{
		id: 1,
		name: 'Алекс Нейромант',
		email: 'alex@neuronet.com',
		role: 'Разработчик',
		joinDate: '2024-01-15',
		lastActive: '2025-05-20T09:30:00Z',
		achievements: ['Кибер-новичок', 'Мастер кода'],
	},
	{
		id: 2,
		name: 'Елена Хакер',
		email: 'elena@hacknet.com',
		role: 'Безопасник',
		joinDate: '2024-03-22',
		lastActive: '2025-05-19T16:45:00Z',
		achievements: ['Кибер-новичок', 'Страж системы'],
	},
];

export default function ProfilesPage() {
	const [profiles] = useState<Profile[]>(initialProfiles);
	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(
		null,
	);

	return (
		<div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Профили пользователей
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<ProfileList
							profiles={profiles}
							onSelectProfile={setSelectedProfile}
							selectedProfileId={selectedProfile?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{selectedProfile ? (
							<ProfileDetails profile={selectedProfile} />
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите профиль для просмотра деталей
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
