import type { Profile } from '../../../pages/panel/ProfilesPage.tsx';

interface ProfileDetailsProps {
	profile: Profile;
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{profile.name}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Email:</span>{' '}
				{profile.email}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Роль:</span>{' '}
				{profile.role}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Дата регистрации:
				</span>{' '}
				{new Date(profile.joinDate).toLocaleDateString()}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Последняя активность:
				</span>{' '}
				{new Date(profile.lastActive).toLocaleString()}
			</p>
			<div>
				<h3 className="text-2xl font-bold mb-2 text-neon-blue">
					Достижения:
				</h3>
				<ul className="list-disc list-inside">
					{profile.achievements.map((achievement, index) => (
						<li key={index} className="text-lg">
							{achievement}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
