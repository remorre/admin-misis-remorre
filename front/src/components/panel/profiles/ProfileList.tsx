import type { Profile } from '../../../pages/panel/ProfilesPage.tsx';

interface ProfileListProps {
	profiles: Profile[];
	onSelectProfile: (profile: Profile) => void;
	selectedProfileId: number | undefined;
}

export default function ProfileList({
	profiles,
	onSelectProfile,
	selectedProfileId,
}: ProfileListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список профилей
			</h2>
			<ul className="space-y-4">
				{profiles.map(profile => (
					<li
						key={profile.id}
						className={`cursor-pointer p-4 transition duration-300 ${
							profile.id === selectedProfileId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						}`}
						onClick={() => onSelectProfile(profile)}
					>
						<h3 className="text-xl font-bold">{profile.name}</h3>
						<p className="text-sm">{profile.email}</p>
						<p className="text-sm">Роль: {profile.role}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
