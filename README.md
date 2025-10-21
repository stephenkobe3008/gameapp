# 祈りの大地 ✝️

信仰育成シミュレーションゲーム

## 概要

「祈りの大地」は、宗教団体を運営し、信者を増やしながら影響力を拡大していく育成シミュレーションゲームです。
建物を建設し、伝道者を雇用し、研究を進めることで、あなたの教団を繁栄させましょう。

## 機能

- **建設システム**: 礼拝所、教会、大聖堂、学校、病院、孤児院など、様々な建物を建設
- **伝道システム**: 見習い伝道者、司祭、司教を雇用して信者を増やす
- **研究開発**: カリスマ向上、慈善活動、癒しの儀式などの研究で教団を強化
- **礼拝と行事**: 建物内で礼拝を行い、特別行事を開催して満足度と影響力を向上
- **経済管理**: 資金と維持費のバランスを取りながら教団を運営
- **ドット絵グラフィック**: レトロな雰囲気のピクセルアートで描かれた世界

## プロジェクト構造

```
gameapp/
├── src/
│   ├── components/
│   │   ├── pixel/           # ピクセルアートコンポーネント
│   │   │   ├── PixelPerson.jsx
│   │   │   ├── PixelBuilding.jsx
│   │   │   ├── BuildingInterior.jsx
│   │   │   └── index.js
│   │   ├── screens/         # 画面コンポーネント
│   │   │   ├── TitleScreen.jsx
│   │   │   ├── GameOverScreen.jsx
│   │   │   ├── MainGameScreen.jsx
│   │   │   ├── BuildingScreen.jsx
│   │   │   └── index.js
│   │   └── ui/              # UIコンポーネント
│   │       ├── StatusBar.jsx
│   │       ├── InfoPanel.jsx
│   │       ├── ActionButtons.jsx
│   │       ├── Notification.jsx
│   │       ├── Modal.jsx
│   │       └── index.js
│   ├── constants/           # 定数定義
│   │   ├── buildingTypes.js
│   │   ├── missionaryTypes.js
│   │   ├── researchTypes.js
│   │   └── gameConstants.js
│   ├── hooks/               # カスタムフック
│   │   └── useGameState.js
│   ├── App.jsx              # メインコンポーネント
│   ├── index.jsx            # エントリーポイント
│   └── index.css            # グローバルスタイル
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## セットアップ

### 必要な環境

- Node.js (v14以上)
- npm または yarn

### インストール

```bash
# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm start
```

開発サーバーが起動したら、ブラウザで `http://localhost:3000` を開いてゲームをプレイできます。

### ビルド

```bash
# 本番用ビルド
npm run build
```

## ゲームの遊び方

1. **タイトル画面**: 「最初から始める」をクリックしてゲームを開始
2. **建設**: 画面下部の「建設」ボタンから建物を建設
3. **伝道者**: 「伝道者」ボタンから伝道者を雇用して信者を増やす
4. **研究**: 「研究」ボタンから新しい能力を研究
5. **建物管理**: 建物をクリックして内部に入り、礼拝や行事を行う
6. **経済運営**: 月次の収支を管理し、維持費と収入のバランスを保つ

## 技術スタック

- **React 18**: UIライブラリ
- **Tailwind CSS**: スタイリング
- **Lucide React**: アイコン
- **Create React App**: ビルドツール

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
