// src/lib/dummyData.ts
import type { Task } from '@/types/Task';
import type { User } from '@/types/User';

// ダミーユーザーデータ
export const dummyUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice',
    email: 'alice@example.com',
  },
  {
    id: 'user2',
    name: 'Bob',
    email: 'bob@example.com',
  },
  {
    id: 'user3',
    name: 'Charlie',
    email: 'charlie@example.com',
  },
];

// ダミータスクデータ
export const dummyTasks: Task[] = [
  {
    id: 'task1',
    userId: 'user1', // Alice
    title: '牛乳を買う',
    description: 'スーパーで2Lの牛乳を購入する',
    dueDate: '2025-06-25',
    isCompleted: false,
    createdAt: '2025-06-20T10:00:00Z',
    updatedAt: '2025-06-20T10:00:00Z',
  },
  {
    id: 'task2',
    userId: 'user2', // Bob
    title: 'Next.jsの学習',
    description: '公式ドキュメントを読む。ルーティング、データフェッチ、State管理。',
    dueDate: '2025-07-10',
    isCompleted: false,
    createdAt: '2025-06-18T09:30:00Z',
    updatedAt: '2025-06-22T14:00:00Z',
  },
  {
    id: 'task3',
    userId: 'user1', // Alice
    title: 'メール返信',
    description: '重要なメールに返信する',
    dueDate: '2025-06-23',
    isCompleted: false,
    createdAt: '2025-06-23T08:00:00Z',
    updatedAt: '2025-06-23T08:00:00Z',
  },
  {
    id: 'task4',
    userId: 'user3', // Charlie
    title: 'ジムに行く',
    description: '週3回の運動を継続する',
    dueDate: '2025-06-24',
    isCompleted: true, // 完了済みタスク
    createdAt: '2025-06-15T18:00:00Z',
    updatedAt: '2025-06-20T19:00:00Z',
  },
  {
    id: 'task5',
    userId: 'user2', // Bob
    title: 'レポート作成',
    description: '四半期ごとの売上レポートをまとめる',
    dueDate: '2025-06-30',
    isCompleted: false,
    createdAt: '2025-06-21T11:00:00Z',
    updatedAt: '2025-06-21T11:00:00Z',
  },
];