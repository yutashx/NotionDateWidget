# Notion 日付ウィジェット

Notionページに埋め込める、シンプルでカスタマイズ可能な日付ウィジェットです。
プロジェクトの期限、経過日数、進捗率などを視覚的に表示できます。

## 特徴

- 📅 経過日数の表示
- ⏱️ 残り日数のカウントダウン
- 📊 進捗率の計算と表示
- 🎨 カラーテーマのカスタマイズ
- 🔄 自動更新（1時間ごと）

## Notionへの埋め込み方法

1. Notionページで `/embed` と入力
2. 「Create an embed」を選択
3. 以下のURLをコピー＆ペースト（パラメータを変更して使用）:
`https://yourusername.github.io/notion-date-widget/?type=remaining&title=2025年が終わるまで&endDate=2025-12-31&color=blue`

4. ウィジェットのサイズを調整（推奨サイズ: 幅300px, 高さ120px）


## URLパラメータ

| パラメータ | 説明 | 例 |
|------------|------|-----|
| `type` | 計算方式 (`remaining`=残日数, `passed`=経過日数, `progress`=進捗率) | `type=remaining` |
| `title` | ウィジェットのタイトル | `title=プロジェクト期限` |
| `startDate` | 開始日（ISO形式: YYYY-MM-DD） | `startDate=2025-01-01` |
| `endDate` | 終了日（ISO形式: YYYY-MM-DD） | `endDate=2025-12-31` |
| `color` | カラーテーマ (`blue`, `red`, `green`, `purple`, `orange`) | `color=blue` |

## 埋め込み例

### 残り日数カウントダウン