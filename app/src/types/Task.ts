export type Task = {
  id: string;
  userId: string; // 担当ユーザーのID
  title: string;
  description: string;
  dueDate?: string; // 期限 (任意)
  isCompleted: boolean; // 完了フラグ
  createdAt: string;
  updatedAt: string;
};