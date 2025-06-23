import { cleanup, render, screen } from '@testing-library/react';
import { expect, describe, it, vi, afterEach } from 'vitest';
import HomePage from '@/app/home/page'; // まだ存在しないか、中身が空
import '@testing-library/jest-dom/vitest';
import type * as dummyDataModule from '@/lib/dummyData';
import { dummyTasks, dummyUsers } from '@/lib/dummyData'; // 実際のダミーデータをテスト外で利用するためにもインポートしておく

// next/link のモックは必要なので、前回と同様にここに記述
vi.mock('next/link', () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => {
    return <a href={href}>{children}</a>;
  }),
}));

// ★トップレベルでの @/lib/dummyData のモック化
// 全てのテストのデフォルトとして、ダミーデータをモックしておく。
// 各テストで必要に応じてこれを上書きする。
vi.mock('@/lib/dummyData', async (importOriginal) => {
  const actual = await importOriginal<typeof dummyDataModule>();
  return {
    ...actual,
    dummyTasks: [], // デフォルトでは空のタスクリストを返す
    dummyUsers: [], // デフォルトでは空のユーザーリストを返す
  };
});

describe('HomePage', () => {
  // 各テストの実行後にモックをリセットする
  afterEach(() => {
    vi.resetModules(); // モジュールのキャッシュをリセット
    vi.restoreAllMocks(); // すべてのモックを元の実装に戻す
    cleanup();
  });

  it('「タスク一覧」のタイトルがレンダリングされること', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /タスク一覧/i })).toBeInTheDocument();
  });

  it('ダミーのタスクが正しく表示されること', async () => {
    // このテスト内でだけ、@/lib/dummyData のモックを上書きする
    // vi.doMock を使うと、テスト内でモックをより明示的に再定義できる
    vi.doMock('@/lib/dummyData', async (importOriginal) => {
      const actual = await importOriginal<typeof dummyDataModule>();
      return {
        ...actual,
        dummyTasks: [
          { id: 'task1', userId: 'user1', title: '牛乳を買う', description: 'スーパーで2Lの牛乳を購入する', isCompleted: false, createdAt: '2025-06-20T10:00:00Z', updatedAt: '2025-06-20T10:00:00Z' },
          { id: 'task2', userId: 'user2', title: 'Next.jsの学習', description: '公式ドキュメントを読む。ルーティング、データフェッチ、State管理。', isCompleted: false, createdAt: '2025-06-18T09:30:00Z', updatedAt: '2025-06-22T14:00:00Z' },
        ],
        dummyUsers: [
          { id: 'user1', email: 'alice@example.com', name: 'Alice' },
          { id: 'user2', email: 'bob@example.com', name: 'Bob' },
        ],
      };
    });

    // モックが適用された状態でHomePageを再インポートし、レンダリングする
    // これにより、このテストスコープ内で新しいモックが確実に適用されます。
    const { default: HomePageWithMockedData } = await import('@/app/home/page');
    render(<HomePageWithMockedData />);

    // タスクのタイトルと説明が正しく表示されていることを確認
    expect(screen.getByText('牛乳を買う')).toBeInTheDocument();
    expect(screen.getByText('スーパーで2Lの牛乳を購入する')).toBeInTheDocument();
    expect(screen.getByText('Next.jsの学習')).toBeInTheDocument();
    expect(screen.getByText('公式ドキュメントを読む。ルーティング、データフェッチ、State管理。')).toBeInTheDocument();

    // 担当ユーザーの名前も表示されていることを確認（page.tsxの実装に合わせる）
    expect(screen.getByText('担当: Alice')).toBeInTheDocument();
    expect(screen.getByText('担当: Bob')).toBeInTheDocument();
  });

  // 追加のテストケース: タスクがない場合の表示
  it('タスクがない場合に「タスクがありません。」と表示されること', async () => {
    // このテスト内でだけ、@/lib/dummyData のモックを上書きし、空のタスクリストを返す
    vi.doMock('@/lib/dummyData', async (importOriginal) => {
      const actual = await importOriginal<typeof dummyDataModule>();
      return {
        ...actual,
        dummyTasks: [], // 空のタスクリスト
        dummyUsers: dummyUsers, // ユーザーはあってもなくてもOK、とりあえず元のダミーユーザーにしておく
      };
    });

    // モックが適用された状態でHomePageを再インポートし、レンダリングする
    const { default: HomePageWithNoTasks } = await import('@/app/home/page');
    render(<HomePageWithNoTasks />);

    expect(screen.getByText('タスクがありません。')).toBeInTheDocument();
  });
});