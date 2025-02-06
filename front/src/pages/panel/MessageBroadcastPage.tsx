import { useState } from 'react';
import MessageForm from '../../components/panel/messages/MessageForm.tsx';
import MessageList from '../../components/panel/messages/MessageList.tsx';

export interface Message {
	id: number;
	title: string;
	content: string;
	recipients: string;
	sentAt: string;
}

const initialMessages: Message[] = [
	{
		id: 1,
		title: 'Важное обновление системы',
		content:
			'Завтра в 03:00 будет проводиться плановое обновление системы. Ожидаемое время простоя - 2 часа.',
		recipients: 'Все пользователи',
		sentAt: '2025-05-15T10:30:00Z',
	},
	{
		id: 2,
		title: 'Новый курс по квантовому программированию',
		content:
			"Открыта регистрация на новый курс 'Основы квантового программирования'. Начало занятий через неделю.",
		recipients: 'Студенты, Разработчики',
		sentAt: '2025-05-14T14:45:00Z',
	},
];

export default function MessageBroadcastPage() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);

	const handleSendMessage = (newMessage: Omit<Message, 'id' | 'sentAt'>) => {
		const message: Message = {
			...newMessage,
			id: messages.length + 1,
			sentAt: new Date().toISOString(),
		};
		setMessages([message, ...messages]);
	};

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Рассылка сообщений
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						<MessageForm onSubmit={handleSendMessage} />
					</div>
					<div className="space-y-8">
						<MessageList messages={messages} />
					</div>
				</div>
			</div>
		</div>
	);
}
