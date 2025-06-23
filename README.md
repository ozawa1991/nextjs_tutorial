# 備忘録

## 構築時

- vsCode に入れた拡張機能は以下
  - DevContainer
  - Docker
  - Docker Linter
  - Typescript の Lint
  - MarkDown の Lint
  - Next Js の Snippet
  - Prettier
  - WSL
- WindowsOSに必要なのは以下
  - WSL
  - Docker Desktop
- npm installer は bun でやりたいので、bun のイメージを採用
  - alpine linux でもよかったけどね
- docker-compose には最小限だけ記述
  - volume に /app/node_modules を入れることで、大量のnode_modules をマウントする必要がなくなるので、めちゃんこ早くなる
  - command: bash にしておくことで、vs code のインスペクターで中をいじれる
- get start は <https://nextjs.org/docs/app/getting-started/installation> を参考にした
  - npx ではなく、bunx で実行
  - 選択肢は import alias 以外すべて Yes
  - ブラウザは拡張機能が入っていないのを選ぶ方が楽
  - ホットリロードが機能しないときがある
    - WATCHPACK_POLLING=true の環境変数が必要
    - docker-compose の env に追加するか、bun dev 実行時に追加
      - 今回は package.json に追加
      - "dev": "WATCHPACK_POLLING=true next dev",
- vsCode上のlinterを活用したい場合は、自端末上で npm install すればOK

- bun だとうまく install できずに動作しなかった場合があったので、pnpm を使用
  - npm install -g pnpm@latest-10 で容易に入れられるので、base の image は node:lts-slim で
  - pnpx create-next-app@latest --example with-vitest app
  - 遅いと思ったが、 .pnpm-store を ignore したところかなり早くなった