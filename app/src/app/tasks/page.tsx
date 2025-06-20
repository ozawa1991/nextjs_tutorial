import { dummyTasks, dummyUsers } from '@/lib/dummyData';
import type { Task } from '@/types/Task';
import { User } from '@/types/User';
import Link from 'next/link';

export default function HomePage() {
  // ダミーデータからタスクとユーザー情報を取得
  const tasks: Task[] = dummyTasks;
  const users: User[] = dummyUsers; // ユーザー情報も取得（タスクに紐づくユーザー名を表示するため）

  // タスクにユーザー名を結合するヘルパー関数
  // このロジックは本来、API Routesなどで行うのが望ましいですが、
  // ダミーデータで簡易的に表示するためにここで実装します。
  const getTaskWithUserName = (task: Task) => {
    const user = users.find(u => u.id === task.userId);
    return {
      ...task,
      userName: user ? user.name : 'Unknown User',
    };
  };

  const tasksWithUsers = tasks.map(getTaskWithUserName);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">タスク一覧</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {tasksWithUsers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center">タスクがありません。</p>
        ) : (
          <ul className="space-y-4">
            {tasksWithUsers.map(task => (
              <li key={task.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:pb-0 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{task.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">担当: {task.userName}</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{task.description}</p>
                  </div>
                  {/* 今後のために、編集・削除ボタンのプレースホルダー */}
                  <div className="flex space-x-2">
                    <Link href={`/edit-task/${task.id}`} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600">編集</Link>
                    <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600">削除</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* タスク追加ボタン */}
      <div className="mt-8 text-center">
        <Link href="/add-task" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200">
          新しいタスクを追加
        </Link>
      </div>
    </div>
  );
}