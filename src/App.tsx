import { useState } from 'react'
import './App.css'

// 1. 咲かせる花の種類をUnion型として定義
type EmojiType = '🌸' | '🌺' | '🪷'

// 2. 花1つあたりの情報（型定義）
type Flower = {
  id: number
  x: number         // 画面上の横位置 (%)
  y: number         // 画面上の縦位置 (%)
  size: number      // 大きさ (px)
  emoji: EmojiType  // 花の種類
  duration: number  // 開くスピード (秒)
}

// 咲かせる花の種類リスト
const FLOWER_TYPES: EmojiType[] = ['🌸', '🌺', '🪷']

function App() {
  const [flowers, setFlowers] = useState<Flower[]>([])

  // ランダムな位置・サイズの花を1つ作成して追加する関数
  const addRandomFlower = () => {
    const newFlower: Flower = {
      id: Date.now() + Math.random(),
      // 画面端で見切れないよう 5% 〜 90% の範囲にランダム配置
      x: Math.floor(Math.random() * 85) + 5,
      y: Math.floor(Math.random() * 80) + 10,
      // 30px 〜 110px の間で大きさをランダム化
      size: Math.floor(Math.random() * 80) + 30,
      // 花の種類をランダム選択
      emoji: FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)],
      // 咲くスピードを 1.2秒 〜 2.5秒 の間でランダム化（ゆっくり咲く表現）
      duration: Math.random() * 1.3 + 1.2,
    }

    setFlowers((prev) => [...prev, newFlower])
  }

  // 画面全体をリセット
  const resetGarden = () => {
    setFlowers([])
  }

  return (
    // 画面のどこをクリックしても花が咲くように onClick を付与
    <div className="garden-container" onClick={addRandomFlower}>
      {/* 操作パネル（ボタンをクリックした時は画面全体のクリック発火を防止） */}
      <div className="control-panel" onClick={(e) => e.stopPropagation()}>
        <button className="action-btn" onClick={addRandomFlower}>
          花を咲かせる 🌸
        </button>
        <button className="action-btn" onClick={resetGarden}>
          リセット
        </button>
        <span style={{ color: 'white', alignSelf: 'center', fontSize: '13px' }}>
          咲いた数: {flowers.length} (画面タップでも咲きます)
        </span>
      </div>

      {/* 咲いた花たちを展開 */}
      {flowers.map((f) => (
        <span
          key={f.id}
          className="flower-item"
          style={{
            left: `${f.x}\%`, top: `${f.y}%`,
            fontSize: `${f.size}px`, animationDuration: `${f.duration}s`,
          }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  )
}

export default App