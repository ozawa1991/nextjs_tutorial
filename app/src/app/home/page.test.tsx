import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import HomePage from '@/app/home/page'; // まだ存在しないか、中身が空
import '@testing-library/jest-dom/vitest';

// next/link のモックは必要なので、前回と同様にここに記述
vi.mock('next/link', () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => {
    return <a href={href}>{children}</a>;
  }),
}));

// ダミーデータはまだ直接インポートせず、テストでモックする準備をしておく
// (このテストではまだダミーデータは不要だが、今後のテストのためにモックの可能性を示唆)
vi.mock('@/lib/dummyData', () => ({
  dummyTasks: [], // このテストではタスクは不要なので空にしておく
  dummyUsers: [], // このテストではユーザーも不要なので空にしておく
}));

describe('HomePage', () => {
  it('「タスク一覧」のタイトルがレンダリングされること', () => {
    // コンポーネントをレンダリングする
    render(<HomePage />);

    // 「タスク一覧」というテキストを持つ見出し要素が存在しないことを期待
    // (まだコンポーネントがないため、このテストは失敗する)
    expect(screen.getByRole('heading', { name: /タスク一覧/i })).toBeInTheDocument();
  });
});