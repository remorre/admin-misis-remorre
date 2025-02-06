import type { Message } from '../../../pages/panel/MessageBroadcastPage.tsx';

interface MessageListProps {
	messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				История сообщений
			</h2>
			<ul className="space-y-4">
				{messages.map(message => (
					<li
						key={message.id}
						className="p-4 bg-gray-800 hover:bg-gray-700 transition duration-300"
					>
						<h3 className="text-xl font-bold text-neon-blue">
							{message.title}
						</h3>
						<p className="text-sm text-gray-400 mb-2">
							Отправлено:{' '}
							{new Date(message.sentAt).toLocaleString()} |
							Получатели: {message.recipients}
						</p>
						<p className="text-white">{message.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
