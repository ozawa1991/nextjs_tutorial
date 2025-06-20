import { Task } from "@/types/Task";
import { User } from "@/types/User";

export const dummyUsers: User[] = [
  { id: 'user1', email: 'user1@example.com', name: 'Alice' },
  { id: 'user2', email: 'user2@example.com', name: 'Bob' },
];

export const dummyTasks: Task[] = [
  { id: 'task1', userId: 'user1', title: '牛乳を買う', description: 'スーパーで2Lの牛乳を買う' },
  { id: 'task2', userId: 'user1', title: 'Next.jsの学習', description: '公式ドキュメントを読む' },
  { id: 'task3', userId: 'user2', title: 'メール返信', description: '重要なメールに返信する' },
];