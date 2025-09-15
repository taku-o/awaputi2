各種テストを実行してエラーがおきないことを確認してください。
* test:e2e, test:storybookは、Claude Codeで実行時、しばしばタイムアウトエラーする。**タイムアウト**原因の失敗ならそれほど気にしないで。
cd {project_root}
npm run test:e2e
npm run test:storybook -- --reporter=line
npm run test:bubblepop
npm run test:debug-game
npm run type-check
npm run lint
npm run build
npm run build-storybook

think.
