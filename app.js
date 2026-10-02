/**
 * 高中選修數學乙(下) 第一章 線性規劃 (Linear Programming)
 * 互動式網頁應用程式核心邏輯
 */

// --- 預設題庫資料 ---
const PRESETS = {
  intro: {
    id: "intro",
    name: "🌟 章首生活實例：小毅的學期成績",
    category: "導入生活問題",
    badge: "極值求法引入",
    desc: "數學老師計算學期成績方法：平時成績 x 占 30%，段考成績 y 占 70%。已知平時加段考 (x+y) 不超過 150 分，且 0 ≤ x ≤ 100, 0 ≤ y ≤ 100。求學期成績最多幾分？",
    constraints: [
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#38bdf8" },
      { a: 1, b: 0, op: "<=", c: 100, label: "x ≤ 100", color: "#38bdf8" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#818cf8" },
      { a: 0, b: 1, op: "<=", c: 100, label: "y ≤ 100", color: "#818cf8" },
      { a: 1, b: 1, op: "<=", c: 150, label: "x + y ≤ 150", color: "#fb7185" }
    ],
    obj: { a: 0.3, b: 0.7, opt: "max", name: "學期成績 P = 0.3x + 0.7y" },
    view: { minX: -20, maxX: 130, minY: -20, maxY: 130 },
    explanation: `
      <strong>數學模型：</strong><br>
      目標函數：最大化 $P = 0.3x + 0.7y$<br>
      限制條件：$0 \\le x \\le 100$, $0 \\le y \\le 100$, $x + y \\le 150$<br><br>
      <strong>求解分析：</strong><br>
      可行解區域頂點為 $(0,0), (100,0), (100,50), (50,100), (0,100)$。<br>
      將頂點代入 $P$：<br>
      • $(0,0) \\to 0$<br>
      • $(100,0) \\to 30$<br>
      • $(100,50) \\to 65$<br>
      • $(50,100) \\to 0.3(50)+0.7(100) = 15+70 = 85$<br>
      • $(0,100) \\to 70$<br>
      最大學期成績為 <strong>85 分</strong>（當平時考 50 分，段考 100 分時達到）。
    `
  },
  parallel_1: {
    id: "parallel_1",
    name: "📐 單元 1 · 例題 1：平行直線系平移 (x - y = k)",
    category: "平行直線系",
    badge: "斜率與平移",
    desc: "設 L0: x - y = 0，將 L0 分別向右平移 1, 2, 3 單位，得直線 L1, L2, L3。觀察平移時斜率不變，僅常數項改變。",
    constraints: [
      { a: 1, b: -1, op: ">=", c: -3, label: "x - y ≥ -3", color: "#38bdf8", isDashed: false },
      { a: 1, b: -1, op: "<=", c: 3, label: "x - y ≤ 3", color: "#818cf8", isDashed: false },
      { a: 1, b: 0, op: ">=", c: -2, label: "x ≥ -2", color: "#64748b" },
      { a: 1, b: 0, op: "<=", c: 5, label: "x ≤ 5", color: "#64748b" },
      { a: 0, b: 1, op: ">=", c: -3, label: "y ≥ -3", color: "#64748b" },
      { a: 0, b: 1, op: "<=", c: 5, label: "y ≤ 5", color: "#64748b" }
    ],
    obj: { a: 1, b: -1, opt: "max", name: "直線系 x - y = k" },
    view: { minX: -4, maxX: 6, minY: -4, maxY: 6 },
    explanation: `
      <strong>核心觀念：</strong><br>
      兩平行直線斜率相等；直線平移只改變位置，不改變斜率。<br>
      $L_0: x - y = 0$ 向右平移 $k$ 單位，以 $(x - k)$ 代入得：$(x - k) - y = 0 \\implies x - y = k$。<br>
      • 向右平移 1 單位：$L_1: x - y = 1$<br>
      • 向右平移 2 單位：$L_2: x - y = 2$<br>
      • 向右平移 3 單位：$L_3: x - y = 3$<br>
      拖曳下方目標線滑桿，觀察直線平行移動時常數項與交點變化。
    `
  },
  parallel_2: {
    id: "parallel_2",
    name: "📐 單元 1 · 例題 2：截距與常數項 (2x + y = k)",
    category: "平行直線系",
    badge: "截距大小比較",
    desc: "三直線 L1: 2x+y=2, L2: 2x+y=4, L3: 2x+y=6。比較與 x 軸、y 軸之交點坐標大小。",
    constraints: [
      { a: 2, b: 1, op: ">=", c: 0, label: "2x + y ≥ 0", color: "#38bdf8" },
      { a: 2, b: 1, op: "<=", c: 8, label: "2x + y ≤ 8", color: "#818cf8" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#64748b" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#64748b" }
    ],
    obj: { a: 2, b: 1, opt: "max", name: "直線 2x + y = k" },
    view: { minX: -1, maxX: 5, minY: -1, maxY: 8 },
    explanation: `
      <strong>截距分析：</strong><br>
      直線 $2x + y = k$：<br>
      • 與 x 軸交點（令 y=0）：$x = k/2 \\implies (k/2, 0)$<br>
      • 與 y 軸交點（令 x=0）：$y = k \\implies (0, k)$<br>
      當 $k=2, 4, 6$ 時，x 截距依序為 $1, 2, 3$，故 $a_1 < a_2 < a_3$；<br>
      y 截距依序為 $2, 4, 6$，故 $b_1 < b_2 < b_3$。常數項越大，直線越往右上方。
    `
  },
  ineq_halfplane: {
    id: "ineq_halfplane",
    name: "🌓 單元 2 · 例題 3：聯立不等式半平面交集",
    category: "二元一次不等式",
    badge: "實線與虛線",
    desc: "畫出聯立不等式 x - 2y + 2 ≤ 0 與 x + y + 2 > 0 之圖形。注意含有等號為實線，不含等號為虛線。",
    constraints: [
      { a: 1, b: -2, op: "<=", c: -2, label: "x - 2y + 2 ≤ 0 (實線)", color: "#38bdf8", isDashed: false },
      { a: 1, b: 1, op: ">", c: -2, label: "x + y + 2 > 0 (虛線)", color: "#f43f5e", isDashed: true },
      { a: 1, b: 0, op: ">=", c: -6, label: "x ≥ -6", color: "#64748b" },
      { a: 1, b: 0, op: "<=", c: 6, label: "x ≤ 6", color: "#64748b" },
      { a: 0, b: 1, op: "<=", c: 6, label: "y ≤ 6", color: "#64748b" }
    ],
    obj: { a: 1, b: 0, opt: "max", name: "檢驗點探索" },
    view: { minX: -6, maxX: 6, minY: -4, maxY: 6 },
    explanation: `
      <strong>檢驗點判別法：</strong><br>
      1. $L_1: x - 2y + 2 = 0$，將原點 $(0,0)$ 代入得 $0 - 0 + 2 = 2 > 0$，不滿足 $\\le 0$。因此取不含原點的那一半平面，含等號畫<strong>實線</strong>。<br>
      2. $L_2: x + y + 2 = 0$，將原點 $(0,0)$ 代入得 $0 + 0 + 2 = 2 > 0$，滿足 $> 0$。因此取含原點的那一半平面，不含等號畫<strong>虛線</strong>。<br>
      兩者交集之共通區域即可行解半平面。
    `
  },
  lp_ex4: {
    id: "lp_ex4",
    name: "🎯 單元 3 · 例題 4：標準線性規劃問題",
    category: "線性規劃方法",
    badge: "平行線法 vs 頂點法",
    desc: "在 x + 2y ≤ 6, 2x + y ≤ 6, x ≥ 0, y ≥ 0 條件下，求目標函數 P = x + 3y 的最大值與最小值。",
    constraints: [
      { a: 1, b: 2, op: "<=", c: 6, label: "x + 2y ≤ 6", color: "#38bdf8" },
      { a: 2, b: 1, op: "<=", c: 6, label: "2x + y ≤ 6", color: "#818cf8" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#34d399" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#34d399" }
    ],
    obj: { a: 1, b: 3, opt: "max", name: "目標函數 P = x + 3y" },
    view: { minX: -1, maxX: 5, minY: -1, maxY: 5 },
    explanation: `
      <strong>頂點法求解步驟：</strong><br>
      1. 聯立求交點：$x+2y=6$ 與 $2x+y=6$ 解得頂點 $B(2,2)$。<br>
      2. 找出可行解區域全部 4 個頂點：$O(0,0), A(3,0), B(2,2), C(0,3)$。<br>
      3. 逐一代入目標函數 $P(x,y) = x + 3y$：<br>
         • $O(0,0) \\implies 0 + 0 = 0$ (最小值)<br>
         • $A(3,0) \\implies 3 + 0 = 3$<br>
         • $B(2,2) \\implies 2 + 3(2) = 8$<br>
         • $C(0,3) \\implies 0 + 3(3) = 9$ (最大值)<br>
      <strong>結論：</strong>最大值為 <strong>9</strong>（於點 (0,3)）；最小值為 <strong>0</strong>（於原點）。
    `
  },
  lp_practice4: {
    id: "lp_practice4",
    name: "🎯 單元 3 · 隨堂練習 4：無窮邊界的三角形區域",
    category: "線性規劃方法",
    badge: "頂點檢驗",
    desc: "在 x + y ≥ 10, x - y ≤ 0, y ≤ 10 條件下，求目標函數 2x + y 的最大值與最小值。",
    constraints: [
      { a: 1, b: 1, op: ">=", c: 10, label: "x + y ≥ 10", color: "#38bdf8" },
      { a: 1, b: -1, op: "<=", c: 0, label: "x - y ≤ 0", color: "#818cf8" },
      { a: 0, b: 1, op: "<=", c: 10, label: "y ≤ 10", color: "#fb7185" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#64748b" }
    ],
    obj: { a: 2, b: 1, opt: "max", name: "目標函數 P = 2x + y" },
    view: { minX: -2, maxX: 14, minY: -2, maxY: 14 },
    explanation: `
      <strong>頂點計算：</strong><br>
      • $x+y=10$ 與 $x-y=0$ 交點：$(5,5)$<br>
      • $x-y=0$ 與 $y=10$ 交點：$(10,10)$<br>
      • $x+y=10$ 與 $y=10$ 交點：$(0,10)$<br>
      代入 $P = 2x + y$：<br>
      • $(5,5) \\to 2(5) + 5 = 15$<br>
      • $(10,10) \\to 2(10) + 10 = 30$ (最大值)<br>
      • $(0,10) \\to 2(0) + 10 = 10$ (最小值)<br>
      <strong>結論：</strong>最大值為 30，最小值為 10。
    `
  },
  app_oil: {
    id: "app_oil",
    name: "🏭 單元 4 · 例題 5：精油提煉資源配置最大化",
    category: "生活素養應用",
    badge: "環保與成本限制",
    desc: "原料 A 每噸提煉 25kg 精油、廢棄物 75kg、成本 15 萬；原料 B 每噸提煉 12kg 精油、廢棄物 25kg、成本 12 萬。成本 ≤ 240 萬，廢棄物 ≤ 750kg。最多可提煉多少精油？",
    constraints: [
      { a: 5, b: 4, op: "<=", c: 80, label: "成本限制：5x + 4y ≤ 80", color: "#38bdf8" },
      { a: 3, b: 1, op: "<=", c: 30, label: "廢棄物限制：3x + y ≤ 30", color: "#f59e0b" },
      { a: 1, b: 0, op: ">=", c: 0, label: "原料 A: x ≥ 0", color: "#34d399" },
      { a: 0, b: 1, op: ">=", c: 0, label: "原料 B: y ≥ 0", color: "#34d399" }
    ],
    obj: { a: 25, b: 12, opt: "max", name: "產量 P = 25x + 12y (kg)" },
    view: { minX: -2, maxX: 25, minY: -2, maxY: 25 },
    explanation: `
      <strong>列式與簡化：</strong><br>
      • 成本限制：$15x + 12y \\le 240 \\implies 5x + 4y \\le 80$<br>
      • 廢棄物限制：$75x + 25y \\le 750 \\implies 3x + y \\le 30$<br>
      • 交點計算：解 $\\begin{cases} 5x+4y=80 \\\\ 3x+y=30 \\end{cases} \\implies (\\frac{40}{7}, \\frac{90}{7}) \\approx (5.71, 12.86)$<br>
      • 頂點代入精油產量 $P = 25x + 12y$：<br>
        $(0,0) \\to 0$<br>
        $(10,0) \\to 250$<br>
        $(0,20) \\to 240$<br>
        $(\\frac{40}{7}, \\frac{90}{7}) \\to 25(\\frac{40}{7}) + 12(\\frac{90}{7}) = \\frac{2080}{7} \\approx 297.14$ kg。<br>
      <strong>最佳決策：</strong>最多可提煉約 297.14 公斤精油。
    `
  },
  app_alloy: {
    id: "app_alloy",
    name: "🏭 單元 4 · 隨堂練習 5：大禹鍛冶工廠合金利潤",
    category: "生活素養應用",
    badge: "利潤最大化",
    desc: "A合金每kg用紅礦50g、黃礦40g，賺50元；B合金每kg用紅礦20g、黃礦40g，賺30元。現有紅礦900g、黃礦1200g。最多可賺多少元？",
    constraints: [
      { a: 5, b: 2, op: "<=", c: 90, label: "紅色礦砂：5x + 2y ≤ 90", color: "#ef4444" },
      { a: 1, b: 1, op: "<=", c: 30, label: "黃色礦砂：x + y ≤ 30", color: "#eab308" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#34d399" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#34d399" }
    ],
    obj: { a: 50, b: 30, opt: "max", name: "總利潤 P = 50x + 30y (元)" },
    view: { minX: -2, maxX: 35, minY: -2, maxY: 35 },
    explanation: `
      <strong>解析過程：</strong><br>
      • 紅礦限制：$50x + 20y \\le 900 \\implies 5x + 2y \\le 90$<br>
      • 黃礦限制：$40x + 40y \\le 1200 \\implies x + y \\le 30$<br>
      • 交點：解 $\\begin{cases} 5x+2y=90 \\\\ x+y=30 \\end{cases} \\implies 3x = 30 \\implies x=10, y=20$。<br>
      • 頂點代入：<br>
        $(0,0) \\to 0$<br>
        $(18,0) \\to 900$<br>
        $(0,30) \\to 900$<br>
        $(10,20) \\to 50(10) + 30(20) = 500 + 600 = 1100$ 元 (最大值)<br>
      <strong>最佳解：</strong>生產 A 合金 10 公斤、B 合金 20 公斤，最多可賺 1,100 元！
    `
  },
  app_factory: {
    id: "app_factory",
    name: "🏭 單元 4 · 例題 6：合金訂單生產最低成本",
    category: "生活素養應用",
    badge: "成本最低化",
    desc: "甲工廠每百克含A金屬2g、B金屬6g，成本6萬；乙工廠每百克含A金屬4g、B金屬3g，成本4萬。訂單要求A至少16g、B至少30g。如何生產使成本最低？",
    constraints: [
      { a: 1, b: 2, op: ">=", c: 8, label: "A 金屬需求：x + 2y ≥ 8", color: "#38bdf8" },
      { a: 2, b: 1, op: ">=", c: 10, label: "B 金屬需求：2x + y ≥ 10", color: "#818cf8" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#34d399" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#34d399" },
      { a: 1, b: 0, op: "<=", c: 12, label: "邊界參考 x ≤ 12", color: "#334155" },
      { a: 0, b: 1, op: "<=", c: 12, label: "邊界參考 y ≤ 12", color: "#334155" }
    ],
    obj: { a: 60000, b: 40000, opt: "min", name: "成本 C = 60000x + 40000y" },
    view: { minX: -1, maxX: 12, minY: -1, maxY: 12 },
    explanation: `
      <strong>分析：</strong><br>
      • A 金屬：$2x + 4y \\ge 16 \\implies x + 2y \\ge 8$<br>
      • B 金屬：$6x + 3y \\ge 30 \\implies 2x + y \\ge 10$<br>
      • 頂點為 $(0,10), (4,2), (8,0)$。<br>
      • 代入成本：<br>
        $(0,10) \\to 400,000$ 元<br>
        $(4,2) \\to 60000(4) + 40000(2) = 240000 + 80000 = 320,000$ 元 (最低)<br>
        $(8,0) \\to 480,000$ 元<br>
      <strong>最佳解：</strong>甲工廠生產 4 百公克、乙工廠生產 2 百公克，最低成本為 320,000 元。
    `
  },
  ex_lattice: {
    id: "ex_lattice",
    name: "📝 習題 5：整數解（格子點）問題",
    category: "課後精選習題",
    badge: "整數坐標解計數",
    desc: "已知 x, y 為整數，試求滿足二元一次聯立不等式 3x + 2y ≤ 6, x ≥ 0, y ≥ 0 的整數解 (x,y) 共有幾組？",
    constraints: [
      { a: 3, b: 2, op: "<=", c: 6, label: "3x + 2y ≤ 6", color: "#38bdf8" },
      { a: 1, b: 0, op: ">=", c: 0, label: "x ≥ 0", color: "#34d399" },
      { a: 0, b: 1, op: ">=", c: 0, label: "y ≥ 0", color: "#34d399" }
    ],
    obj: { a: 1, b: 1, opt: "max", name: "格子點計數 (開啟格子點開關查看)" },
    view: { minX: -1, maxX: 4, minY: -1, maxY: 4 },
    explanation: `
      <strong>枚舉整數解 (x, y)：</strong><br>
      當 $x = 0$ 時，$2y \\le 6 \\implies y = 0, 1, 2, 3$（4 組）<br>
      當 $x = 1$ 時，$2y \\le 3 \\implies y = 0, 1$（2 組）<br>
      當 $x = 2$ 時，$2y \\le 0 \\implies y = 0$（1 組）<br>
      整數解共有：$4 + 2 + 1 = $ <strong>7 組</strong>。<br>
      在畫布中勾選「顯示整數格子點」，可直接看見這 7 個發光的整數坐標點！
    `
  },
  ex_multisol: {
    id: "ex_multisol",
    name: "📝 習題 9：多重最佳解（線段解）",
    category: "課後精選習題",
    badge: "無窮多組最佳解",
    desc: "AB: 2x - y - 7 = 0, BC: x - y + 14 = 0, CA: 4x + 3y = 19。三角形可行解區域內，目標函數 x + ky 在 (5,3) 與 (7,7) 同時達最大值，求 k。",
    constraints: [
      { a: 2, b: -1, op: "<=", c: 7, label: "AB: 2x - y ≤ 7", color: "#38bdf8" },
      { a: 1, b: -1, op: ">=", c: -14, label: "BC: x - y ≥ -14", color: "#818cf8" },
      { a: 4, b: 3, op: ">=", c: 19, label: "CA: 4x + 3y ≥ 19", color: "#f43f5e" }
    ],
    obj: { a: 1, b: -0.5, opt: "max", name: "目標函數 x - 0.5y (k = -0.5)" },
    view: { minX: -2, maxX: 10, minY: -2, maxY: 10 },
    explanation: `
      <strong>幾何意義與代數求解：</strong><br>
      若目標函數在一線段的兩個端點 $(5,3)$ 與 $(7,7)$ 同時達到最大值，則目標函數的等高線必定與此線段平行！<br>
      代數解法：<br>
      將兩點代入 $P(x,y) = x + ky$：<br>
      $5 + 3k = 7 + 7k \\implies 4k = -2 \\implies k = -\\frac{1}{2} = -0.5$。<br>
      此時目標線為 $x - \\frac{1}{2}y = C \\iff 2x - y = 2C$，其斜率為 2，恰好與直線 $AB: 2x - y = 7$ 平行！線段 AB 上的每一點都是最佳解。
    `
  }
};

// --- 全局狀態 ---
let currentPreset = PRESETS.intro;
let canvas, ctx;
let state = {
  originX: 0,
  originY: 0,
  scale: 35,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  mouseMathX: 0,
  mouseMathY: 0,
  kVal: 0,
  kMin: 0,
  kMax: 100,
  isAnimating: false,
  animDirection: 1,
  animSpeed: 0.5,
  animFrameId: null,
  toggles: {
    showGrid: true,
    showAxes: true,
    showHalfPlanes: true,
    showFeasibleRegion: true,
    showVertices: true,
    showLattice: false,
    showObjLine: true,
    showParallelFamily: true,
    showLabels: true
  }
};

// --- 幾何計算工具 ---
const EPS = 1e-6;

function lineIntersection(l1, l2) {
  const D = l1.a * l2.b - l2.a * l1.b;
  if (Math.abs(D) < EPS) return null; // 平行無唯一交點
  const x = (l1.c * l2.b - l2.c * l1.b) / D;
  const y = (l1.a * l2.c - l2.a * l1.c) / D;
  return { x, y };
}

function satisfiesConstraint(p, c) {
  const val = c.a * p.x + c.b * p.y;
  if (c.op === "<=" || c.op === "<") return val <= c.c + EPS;
  if (c.op === ">=" || c.op === ">") return val >= c.c - EPS;
  return Math.abs(val - c.c) < EPS;
}

function computeFeasibleVertices(constraints, bounds) {
  // 將邊界框也加入作為限制條件
  const allLines = [...constraints];
  allLines.push({ a: 1, b: 0, op: ">=", c: bounds.minX, label: "box_left" });
  allLines.push({ a: 1, b: 0, op: "<=", c: bounds.maxX, label: "box_right" });
  allLines.push({ a: 0, b: 1, op: ">=", c: bounds.minY, label: "box_bottom" });
  allLines.push({ a: 0, b: 1, op: "<=", c: bounds.maxY, label: "box_top" });

  const candidatePoints = [];

  // 兩兩求交點
  for (let i = 0; i < allLines.length; i++) {
    for (let j = i + 1; j < allLines.length; j++) {
      const pt = lineIntersection(allLines[i], allLines[j]);
      if (!pt) continue;

      // 檢查是否滿足所有條件
      let valid = true;
      for (const c of constraints) {
        if (!satisfiesConstraint(pt, c)) {
          valid = false;
          break;
        }
      }
      // 確保在邊界視圖內
      if (pt.x < bounds.minX - 1 || pt.x > bounds.maxX + 1 ||
          pt.y < bounds.minY - 1 || pt.y > bounds.maxY + 1) {
        valid = false;
      }

      if (valid) {
        // 去重複
        const exists = candidatePoints.some(
          p => Math.hypot(p.x - pt.x, p.y - pt.y) < 1e-4
        );
        if (!exists) candidatePoints.push(pt);
      }
    }
  }

  if (candidatePoints.length < 3) return candidatePoints;

  // 計算質心並按極角排序成凸多邊形
  const cx = candidatePoints.reduce((s, p) => s + p.x, 0) / candidatePoints.length;
  const cy = candidatePoints.reduce((s, p) => s + p.y, 0) / candidatePoints.length;

  candidatePoints.sort((p1, p2) => {
    const ang1 = Math.atan2(p1.y - cy, p1.x - cx);
    const ang2 = Math.atan2(p2.y - cy, p2.x - cx);
    return ang1 - ang2;
  });

  return candidatePoints;
}

// 找可行區內之整數解格子點
function computeLatticePoints(vertices, constraints) {
  if (vertices.length === 0) return [];
  const minX = Math.floor(Math.min(...vertices.map(p => p.x)));
  const maxX = Math.ceil(Math.max(...vertices.map(p => p.x)));
  const minY = Math.floor(Math.min(...vertices.map(p => p.y)));
  const maxY = Math.ceil(Math.max(...vertices.map(p => p.y)));

  const pts = [];
  // 限制點數上限以防卡頓
  if ((maxX - minX) * (maxY - minY) > 2500) return [];

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const pt = { x, y };
      if (constraints.every(c => satisfiesConstraint(pt, c))) {
        pts.push(pt);
      }
    }
  }
  return pts;
}

// 坐標轉換
function mathToScreen(x, y) {
  return {
    px: state.originX + x * state.scale,
    py: state.originY - y * state.scale
  };
}

function screenToMath(px, py) {
  return {
    x: (px - state.originX) / state.scale,
    y: (state.originY - py) / state.scale
  };
}

// --- 初始化視圖與畫布 ---
function initCanvas() {
  canvas = document.getElementById("mathCanvas");
  ctx = canvas.getContext("2d");

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    render();
  }

  window.addEventListener("resize", resize);
  resize();

  // 拖曳平移
  canvas.addEventListener("mousedown", e => {
    state.isDragging = true;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    state.isDragging = false;
  });

  window.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const mPt = screenToMath(px, py);
    state.mouseMathX = mPt.x;
    state.mouseMathY = mPt.y;

    const readout = document.getElementById("coordReadout");
    if (readout) {
      readout.textContent = `X: ${mPt.x.toFixed(2)}, Y: ${mPt.y.toFixed(2)}`;
    }

    if (state.isDragging) {
      const dx = e.clientX - state.dragStartX;
      const dy = e.clientY - state.dragStartY;
      state.originX += dx;
      state.originY += dy;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      render();
    }
  });

  // 滾輪縮放
  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newScale = Math.max(8, Math.min(250, state.scale * zoomFactor));

    // 以滑鼠為中心縮放
    state.originX = mouseX - (mouseX - state.originX) * (newScale / state.scale);
    state.originY = mouseY - (mouseY - state.originY) * (newScale / state.scale);
    state.scale = newScale;
    render();
  }, { passive: false });
}

// 根據題目自動置中視角
function fitCameraToPreset(preset) {
  const rect = canvas.parentElement.getBoundingClientRect();
  const v = preset.view || { minX: -5, maxX: 15, minY: -5, maxY: 15 };
  const spanX = v.maxX - v.minX;
  const spanY = v.maxY - v.minY;

  const padding = 50;
  const availW = rect.width - padding * 2;
  const availH = rect.height - padding * 2;

  state.scale = Math.min(availW / spanX, availH / spanY);
  const midX = (v.minX + v.maxX) / 2;
  const midY = (v.minY + v.maxY) / 2;

  state.originX = rect.width / 2 - midX * state.scale;
  state.originY = rect.height / 2 + midY * state.scale;
}

// --- 繪圖核心函式 ---
function render() {
  if (!canvas || !ctx) return;
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;

  ctx.clearRect(0, 0, w, h);

  // 1. 網格與坐標軸
  if (state.toggles.showGrid) drawGrid(w, h);
  if (state.toggles.showAxes) drawAxes(w, h);

  const vertices = computeFeasibleVertices(currentPreset.constraints, {
    minX: screenToMath(0, 0).x - 10,
    maxX: screenToMath(w, 0).x + 10,
    minY: screenToMath(0, h).y - 10,
    maxY: screenToMath(0, 0).y + 10
  });

  // 2. 繪製可行解區域 (Feasible Region)
  if (state.toggles.showFeasibleRegion && vertices.length >= 3) {
    drawFeasiblePolygon(vertices);
  }

  // 3. 繪製各限制條件直線與半平面
  drawConstraintLines(currentPreset.constraints, w, h);

  // 4. 繪製整數格子點 (Lattice Points)
  if (state.toggles.showLattice && vertices.length >= 3) {
    drawLatticePoints(vertices);
  }

  // 5. 繪製平行直線系群與當前掃描目標線
  if (currentPreset.obj) {
    if (state.toggles.showParallelFamily) {
      drawParallelLinesFamily(currentPreset.obj, w, h);
    }
    if (state.toggles.showObjLine) {
      drawActiveObjectiveLine(currentPreset.obj, state.kVal, w, h);
    }
  }

  // 6. 繪製頂點與標註
  if (state.toggles.showVertices && vertices.length > 0) {
    drawVertices(vertices, currentPreset.obj);
  }
}

// 繪製背景網格
function drawGrid(w, h) {
  const topLeft = screenToMath(0, 0);
  const bottomRight = screenToMath(w, h);

  let step = 1;
  if (state.scale < 15) step = 10;
  else if (state.scale < 25) step = 5;
  else if (state.scale < 45) step = 2;
  else if (state.scale > 120) step = 0.5;

  ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
  ctx.lineWidth = 1;

  const startX = Math.floor(topLeft.x / step) * step;
  const endX = Math.ceil(bottomRight.x / step) * step;
  for (let x = startX; x <= endX; x += step) {
    const p1 = mathToScreen(x, topLeft.y);
    const p2 = mathToScreen(x, bottomRight.y);
    ctx.beginPath();
    ctx.moveTo(p1.px, p1.py);
    ctx.lineTo(p2.px, p2.py);
    ctx.stroke();
  }

  const startY = Math.floor(bottomRight.y / step) * step;
  const endY = Math.ceil(topLeft.y / step) * step;
  for (let y = startY; y <= endY; y += step) {
    const p1 = mathToScreen(topLeft.x, y);
    const p2 = mathToScreen(bottomRight.x, y);
    ctx.beginPath();
    ctx.moveTo(p1.px, p1.py);
    ctx.lineTo(p2.px, p2.py);
    ctx.stroke();
  }
}

// 繪製坐標軸
function drawAxes(w, h) {
  const origin = mathToScreen(0, 0);

  ctx.strokeStyle = "rgba(226, 232, 240, 0.4)";
  ctx.lineWidth = 1.5;

  // X 軸
  ctx.beginPath();
  ctx.moveTo(0, origin.py);
  ctx.lineTo(w, origin.py);
  ctx.stroke();

  // Y 軸
  ctx.beginPath();
  ctx.moveTo(origin.px, 0);
  ctx.lineTo(origin.px, h);
  ctx.stroke();

  // 刻度數字
  ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
  ctx.font = "11px monospace";

  const topLeft = screenToMath(0, 0);
  const bottomRight = screenToMath(w, h);
  let step = 1;
  if (state.scale < 15) step = 10;
  else if (state.scale < 25) step = 5;
  else if (state.scale < 45) step = 2;

  // X 刻度
  for (let x = Math.floor(topLeft.x / step) * step; x <= bottomRight.x; x += step) {
    if (Math.abs(x) < 1e-4) continue;
    const p = mathToScreen(x, 0);
    ctx.fillText(x.toString(), p.px - 6, Math.max(15, Math.min(h - 10, origin.py + 15)));
  }

  // Y 刻度
  for (let y = Math.floor(bottomRight.y / step) * step; y <= topLeft.y; y += step) {
    if (Math.abs(y) < 1e-4) continue;
    const p = mathToScreen(0, y);
    ctx.fillText(y.toString(), Math.max(10, Math.min(w - 30, origin.px + 6)), p.py + 4);
  }

  // 原點 O
  ctx.fillText("O", origin.px - 14, origin.py + 15);
  ctx.fillText("x", w - 16, origin.py - 6);
  ctx.fillText("y", origin.px + 6, 16);
}

// 繪製可行解多邊形
function drawFeasiblePolygon(vertices) {
  ctx.save();
  ctx.beginPath();
  const start = mathToScreen(vertices[0].x, vertices[0].y);
  ctx.moveTo(start.px, start.py);
  for (let i = 1; i < vertices.length; i++) {
    const p = mathToScreen(vertices[i].x, vertices[i].y);
    ctx.lineTo(p.px, p.py);
  }
  ctx.closePath();

  // 區域半透明填充與柔和發光
  ctx.fillStyle = "rgba(56, 189, 248, 0.16)";
  ctx.fill();

  ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();
}

// 繪製限制條件直線
function drawConstraintLines(constraints, w, h) {
  const topLeft = screenToMath(0, 0);
  const bottomRight = screenToMath(w, h);

  constraints.forEach((c, idx) => {
    ctx.save();
    ctx.strokeStyle = c.color || "#38bdf8";
    ctx.lineWidth = 1.8;
    if (c.isDashed) {
      ctx.setLineDash([6, 4]);
    }

    // 計算直線與視窗邊界的兩交點
    let pts = [];
    if (Math.abs(c.b) > EPS) {
      pts.push({ x: topLeft.x, y: (c.c - c.a * topLeft.x) / c.b });
      pts.push({ x: bottomRight.x, y: (c.c - c.a * bottomRight.x) / c.b });
    } else if (Math.abs(c.a) > EPS) {
      const x = c.c / c.a;
      pts.push({ x, y: topLeft.y });
      pts.push({ x, y: bottomRight.y });
    }

    if (pts.length >= 2) {
      const p1 = mathToScreen(pts[0].x, pts[0].y);
      const p2 = mathToScreen(pts[1].x, pts[1].y);
      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();

      // 標註直線方程式
      if (state.toggles.showLabels && c.label) {
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        const screenMid = mathToScreen(midX, midY);
        if (screenMid.px > 30 && screenMid.px < w - 60 && screenMid.py > 30 && screenMid.py < h - 30) {
          ctx.font = "12px sans-serif";
          ctx.fillStyle = c.color || "#38bdf8";
          ctx.fillText(c.label, screenMid.px + 8, screenMid.py - 6);
        }
      }
    }
    ctx.restore();
  });
}

// 繪製整數格子點
function drawLatticePoints(vertices) {
  const points = computeLatticePoints(vertices, currentPreset.constraints);
  ctx.save();
  ctx.fillStyle = "#facc15";
  ctx.shadowColor = "#facc15";
  ctx.shadowBlur = 6;
  points.forEach(pt => {
    const sp = mathToScreen(pt.x, pt.y);
    ctx.beginPath();
    ctx.arc(sp.px, sp.py, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

// 繪製平行直線系 (背景虛線族)
function drawParallelLinesFamily(obj, w, h) {
  ctx.save();
  ctx.strokeStyle = "rgba(129, 140, 248, 0.22)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);

  const kStep = (state.kMax - state.kMin) / 6 || 2;
  for (let k = state.kMin; k <= state.kMax; k += kStep) {
    drawLineByEquation(obj.a, obj.b, k, w, h);
  }
  ctx.restore();
}

// 繪製當前動態掃描的目標函數直線
function drawActiveObjectiveLine(obj, k, w, h) {
  ctx.save();
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "rgba(251, 191, 36, 0.6)";
  ctx.shadowBlur = 12;

  drawLineByEquation(obj.a, obj.b, k, w, h);

  // 標註當前 k 值與前進箭頭
  const labelPt = findVisibleLinePoint(obj.a, obj.b, k, w, h);
  if (labelPt) {
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = "#fbbf24";
    ctx.fillText(`${obj.a}x + ${obj.b}y = ${k.toFixed(1)}`, labelPt.px + 12, labelPt.py - 10);

    // 梯度/法向量指示小箭頭
    const norm = Math.hypot(obj.a, obj.b) || 1;
    const arrowLen = 24;
    const ax = (obj.a / norm) * arrowLen;
    const ay = -(obj.b / norm) * arrowLen; // y 軸反轉
    ctx.beginPath();
    ctx.moveTo(labelPt.px, labelPt.py);
    ctx.lineTo(labelPt.px + ax, labelPt.py + ay);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLineByEquation(a, b, c, w, h) {
  const topLeft = screenToMath(0, 0);
  const bottomRight = screenToMath(w, h);

  let pts = [];
  if (Math.abs(b) > EPS) {
    pts.push({ x: topLeft.x, y: (c - a * topLeft.x) / b });
    pts.push({ x: bottomRight.x, y: (c - a * bottomRight.x) / b });
  } else if (Math.abs(a) > EPS) {
    const x = c / a;
    pts.push({ x, y: topLeft.y });
    pts.push({ x, y: bottomRight.y });
  }

  if (pts.length >= 2) {
    const p1 = mathToScreen(pts[0].x, pts[0].y);
    const p2 = mathToScreen(pts[1].x, pts[1].y);
    ctx.beginPath();
    ctx.moveTo(p1.px, p1.py);
    ctx.lineTo(p2.px, p2.py);
    ctx.stroke();
  }
}

function findVisibleLinePoint(a, b, c, w, h) {
  const topLeft = screenToMath(0, 0);
  const bottomRight = screenToMath(w, h);
  let pt = null;
  if (Math.abs(b) > EPS) {
    const midX = (topLeft.x + bottomRight.x) / 2;
    pt = { x: midX, y: (c - a * midX) / b };
  } else if (Math.abs(a) > EPS) {
    pt = { x: c / a, y: (topLeft.y + bottomRight.y) / 2 };
  }
  if (!pt) return null;
  const sp = mathToScreen(pt.x, pt.y);
  if (sp.px >= 20 && sp.px <= w - 20 && sp.py >= 20 && sp.py <= h - 20) return sp;
  return null;
}

// 繪製頂點與其目標函數數值
function drawVertices(vertices, obj) {
  let optimalIdx = -1;
  let optimalVal = obj.opt === "max" ? -Infinity : Infinity;

  vertices.forEach((v, idx) => {
    const val = obj.a * v.x + obj.b * v.y;
    if (obj.opt === "max" && val > optimalVal) {
      optimalVal = val;
      optimalIdx = idx;
    } else if (obj.opt === "min" && val < optimalVal) {
      optimalVal = val;
      optimalIdx = idx;
    }
  });

  vertices.forEach((v, idx) => {
    const sp = mathToScreen(v.x, v.y);
    const isOptimal = idx === optimalIdx;

    ctx.save();
    ctx.beginPath();
    ctx.arc(sp.px, sp.py, isOptimal ? 7.5 : 5, 0, Math.PI * 2);

    if (isOptimal) {
      ctx.fillStyle = "#34d399";
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 16;
    } else {
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 6;
    }
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 標籤文字
    ctx.font = isOptimal ? "bold 13px sans-serif" : "11px sans-serif";
    ctx.fillStyle = isOptimal ? "#34d399" : "#e2e8f0";
    const val = obj.a * v.x + obj.b * v.y;
    const txt = `(${v.x.toFixed(1)}, ${v.y.toFixed(1)}) → P=${val.toFixed(1)}`;
    ctx.fillText(txt, sp.px + 10, sp.py - 8);
    ctx.restore();
  });
}

// --- 更新右側資訊面版與頂點表格 ---
function updateInfoPanel(preset) {
  document.getElementById("problemTitle").textContent = preset.name;
  document.getElementById("problemCategory").textContent = preset.category;
  document.getElementById("problemBadge").textContent = preset.badge;
  document.getElementById("problemDesc").innerHTML = preset.desc;
  document.getElementById("problemExplanation").innerHTML = preset.explanation;

  const vertices = computeFeasibleVertices(preset.constraints, {
    minX: -100, maxX: 200, minY: -100, maxY: 200
  });

  // 更新頂點評估表格
  const tableBody = document.querySelector("#vertexTable tbody");
  tableBody.innerHTML = "";

  if (vertices.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#94a3b8;">此區域無有界頂點或可行解為空集</td></tr>`;
    return;
  }

  let maxVal = -Infinity, minVal = Infinity;
  let maxPt = null, minPt = null;

  const evaluated = vertices.map(v => {
    const val = preset.obj.a * v.x + preset.obj.b * v.y;
    if (val > maxVal) { maxVal = val; maxPt = v; }
    if (val < minVal) { minVal = val; minPt = v; }
    return { pt: v, val };
  });

  // 更新動態滑桿範圍
  state.kMin = Math.floor(minVal - Math.max(2, (maxVal - minVal) * 0.25));
  state.kMax = Math.ceil(maxVal + Math.max(2, (maxVal - minVal) * 0.25));
  state.kVal = (preset.obj.opt === "max") ? maxVal : minVal;

  const kSlider = document.getElementById("kSlider");
  if (kSlider) {
    kSlider.min = state.kMin;
    kSlider.max = state.kMax;
    kSlider.step = ((state.kMax - state.kMin) / 100).toFixed(2);
    kSlider.value = state.kVal;
    document.getElementById("kSliderVal").textContent = state.kVal.toFixed(1);
  }

  evaluated.forEach((item, idx) => {
    const tr = document.createElement("tr");
    const isMax = Math.abs(item.val - maxVal) < 1e-4;
    const isMin = Math.abs(item.val - minVal) < 1e-4;

    if (preset.obj.opt === "max" && isMax) tr.className = "highlight-max";
    else if (preset.obj.opt === "min" && isMin) tr.className = "highlight-min";

    let tag = "-";
    if (isMax && isMin) tag = '<span class="pill pill-max">唯一解</span>';
    else if (isMax) tag = '<span class="pill pill-max">最大值 (Max)</span>';
    else if (isMin) tag = '<span class="pill pill-min">最小值 (Min)</span>';

    tr.innerHTML = `
      <td>頂點 ${String.fromCharCode(65 + idx)}</td>
      <td>(${item.pt.x.toFixed(2)}, ${item.pt.y.toFixed(2)})</td>
      <td><strong>${item.val.toFixed(2)}</strong></td>
      <td>${tag}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// --- 動態平移掃描動畫 ---
function toggleAnimation() {
  state.isAnimating = !state.isAnimating;
  const btn = document.getElementById("btnAnimate");
  if (state.isAnimating) {
    btn.innerHTML = `⏸️ 暫停掃描`;
    btn.style.background = "linear-gradient(135deg, #f59e0b, #d97706)";
    animateSweep();
  } else {
    btn.innerHTML = `▶️ 播放平移掃描`;
    btn.style.background = "linear-gradient(135deg, #0284c7, #2563eb)";
    if (state.animFrameId) cancelAnimationFrame(state.animFrameId);
  }
}

function animateSweep() {
  if (!state.isAnimating) return;

  const step = (state.kMax - state.kMin) * 0.008 * state.animSpeed;
  state.kVal += step * state.animDirection;

  if (state.kVal >= state.kMax) {
    state.kVal = state.kMax;
    state.animDirection = -1;
  } else if (state.kVal <= state.kMin) {
    state.kVal = state.kMin;
    state.animDirection = 1;
  }

  const kSlider = document.getElementById("kSlider");
  if (kSlider) {
    kSlider.value = state.kVal;
    document.getElementById("kSliderVal").textContent = state.kVal.toFixed(1);
  }

  render();
  state.animFrameId = requestAnimationFrame(animateSweep);
}

// --- 重新觸發 KaTeX 數學公式渲染 ---
function triggerMathRender() {
  if (window.renderMathInElement) {
    try {
      renderMathInElement(document.getElementById("problemExplanation"), {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    } catch (e) {
      // 容錯降級
    }
  }
}

// --- 切換題目 Preset ---
function loadPreset(key) {
  if (!PRESETS[key]) return;
  currentPreset = PRESETS[key];
  document.getElementById("presetSelect").value = key;
  fitCameraToPreset(currentPreset);
  updateInfoPanel(currentPreset);
  triggerMathRender();
  render();
}

// --- 自訂沙盒 (Custom Sandbox) ---
function setupCustomSandbox() {
  const btnSolve = document.getElementById("btnSolveCustom");
  if (!btnSolve) return;

  btnSolve.addEventListener("click", () => {
    const rawConstraints = document.getElementById("customConstraints").value.trim().split("\n");
    const objStr = document.getElementById("customObj").value.trim();
    const optType = document.getElementById("customOptType").value;

    const parsedConstraints = [];
    rawConstraints.forEach((line, idx) => {
      line = line.trim();
      if (!line) return;
      // 解析 ax + by <= c 或 ax + by >= c
      let op = "<=";
      if (line.includes("<=")) op = "<=";
      else if (line.includes(">=")) op = ">=";
      else if (line.includes("<")) op = "<";
      else if (line.includes(">")) op = ">";
      else if (line.includes("=")) op = "<=";

      const parts = line.split(op);
      if (parts.length === 2) {
        const lhs = parts[0].replace(/\s+/g, "");
        const rhs = parseFloat(parts[1]) || 0;

        let a = 0, b = 0;
        // 簡單多項式正規表達式匹配
        const xMatch = lhs.match(/([+-]?\d*\.?\d*)x/);
        if (xMatch) {
          a = xMatch[1] === "" || xMatch[1] === "+" ? 1 : (xMatch[1] === "-" ? -1 : parseFloat(xMatch[1]));
        }
        const yMatch = lhs.match(/([+-]?\d*\.?\d*)y/);
        if (yMatch) {
          b = yMatch[1] === "" || yMatch[1] === "+" ? 1 : (yMatch[1] === "-" ? -1 : parseFloat(yMatch[1]));
        }

        parsedConstraints.push({
          a, b, op, c: rhs,
          label: line,
          color: ["#38bdf8", "#818cf8", "#f43f5e", "#fbbf24", "#34d399"][idx % 5]
        });
      }
    });

    // 解析目標函數
    let objA = 1, objB = 1;
    const xMatch = objStr.match(/([+-]?\d*\.?\d*)x/);
    if (xMatch) {
      objA = xMatch[1] === "" || xMatch[1] === "+" ? 1 : (xMatch[1] === "-" ? -1 : parseFloat(xMatch[1]));
    }
    const yMatch = objStr.match(/([+-]?\d*\.?\d*)y/);
    if (yMatch) {
      objB = yMatch[1] === "" || yMatch[1] === "+" ? 1 : (yMatch[1] === "-" ? -1 : parseFloat(yMatch[1]));
    }

    const customPreset = {
      id: "custom_" + Date.now(),
      name: "🛠️ 自訂線性規劃模型",
      category: "使用者自訂沙盒",
      badge: optType === "max" ? "最大化求解" : "最小化求解",
      desc: `自訂目標函數：${optType.toUpperCase()} ${objStr}，在輸入的 ${parsedConstraints.length} 個限制條件下求解。`,
      constraints: parsedConstraints,
      obj: { a: objA, b: objB, opt: optType, name: `P = ${objStr}` },
      view: { minX: -5, maxX: 15, minY: -5, maxY: 15 },
      explanation: "由自訂沙盒引擎即時求解可行解區域多邊形交集與頂點坐標。"
    };

    currentPreset = customPreset;
    fitCameraToPreset(currentPreset);
    updateInfoPanel(currentPreset);
    render();

    // 自動切換回互動實驗室分頁
    switchTab("lab");
  });
}

// --- 互動自我測驗模組 (Quiz) ---
const QUIZ_DATA = [
  {
    q: "1. 直線方程式 ax + by + c = 0 (b ≠ 0) 的斜率為何？",
    options: ["a/b", "-a/b", "-b/a", "b/a"],
    ans: 1,
    desc: "直線一般式 $ax+by+c=0$ 移項得 $by = -ax - c \\implies y = -\\frac{a}{b}x - \\frac{c}{b}$，故斜率為 $-\\frac{a}{b}$。"
  },
  {
    q: "2. 在二元一次不等式中，若不等式為「x + y < 2」（不含等號），在坐標平面繪圖時應畫作什麼線？",
    options: ["實線", "虛線", "雙實線", "點狀線"],
    ans: 1,
    desc: "課本規範：當不等式不含等號時，圖形不包含界線，以「虛線」表示。"
  },
  {
    q: "3. 若線性規劃的可行解區域為有界的凸多邊形，則目標函數的最大值或最小值必出現在何處？",
    options: ["多邊形幾何中心", "凸多邊形的頂點（或邊界）", "原點 (0, 0)", "坐標軸截距點"],
    ans: 1,
    desc: "定理：若可行解區域有界，一次目標函數的極值若存在，必在可行解區域的頂點（或邊界線段）出現。"
  },
  {
    q: "4. 直線 L1: 2x - y = 1 向右平移 1 單位後，方程式變為下列何者？",
    options: ["2x - y = 3", "2x - y = -1", "2x - y = 2", "2x - y = 0"],
    ans: 0,
    desc: "向右平移 1 單位以 $(x - 1)$ 代入得 $2(x - 1) - y = 1 \\implies 2x - 2 - y = 1 \\implies 2x - y = 3$。"
  },
  {
    q: "5. 若目標函數 P = x + ky 在頂點 (5, 3) 與 (7, 7) 同時取得最大值，則常數 k 之值為何？",
    options: ["1", "-0.5", "2", "-2"],
    ans: 1,
    desc: "兩點目標函數值相等：$5 + 3k = 7 + 7k \\implies 4k = -2 \\implies k = -\\frac{1}{2} = -0.5$。"
  }
];

function initQuiz() {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  container.innerHTML = "";
  QUIZ_DATA.forEach((item, qIdx) => {
    const card = document.createElement("div");
    card.className = "quiz-card";

    const qTitle = document.createElement("div");
    qTitle.className = "quiz-question";
    qTitle.textContent = item.q;
    card.appendChild(qTitle);

    const optsDiv = document.createElement("div");
    optsDiv.className = "quiz-options";

    item.options.forEach((optText, oIdx) => {
      const optBtn = document.createElement("div");
      optBtn.className = "quiz-option";
      optBtn.innerHTML = `<span><strong>${String.fromCharCode(65 + oIdx)}.</strong></span> <span>${optText}</span>`;

      optBtn.addEventListener("click", () => {
        // 只能答一次
        if (card.dataset.answered) return;
        card.dataset.answered = "true";

        const allOpts = optsDiv.querySelectorAll(".quiz-option");
        if (oIdx === item.ans) {
          optBtn.classList.add("correct");
        } else {
          optBtn.classList.add("wrong");
          allOpts[item.ans].classList.add("correct");
        }

        const feedback = card.querySelector(".quiz-feedback");
        feedback.style.display = "block";
        feedback.style.background = oIdx === item.ans ? "rgba(52, 211, 153, 0.15)" : "rgba(248, 113, 113, 0.15)";
        feedback.innerHTML = `<strong>${oIdx === item.ans ? "🎉 答對了！" : "❌ 答錯了！"}</strong><br>${item.desc}`;
      });

      optsDiv.appendChild(optBtn);
    });

    card.appendChild(optsDiv);

    const feedback = document.createElement("div");
    feedback.className = "quiz-feedback";
    card.appendChild(feedback);

    container.appendChild(card);
  });
}

// --- 習題展開 / 折疊與一鍵載入至畫布 ---
function setupExercises() {
  document.querySelectorAll(".exercise-item").forEach(item => {
    const header = item.querySelector(".exercise-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-load-preset]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const pKey = btn.dataset.loadPreset;
      loadPreset(pKey);
      switchTab("lab");
    });
  });
}

// --- 分頁切換 (Tabs) ---
function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.toggle("active", sec.id === `sec-${tabId}`);
  });
  if (tabId === "lab") {
    setTimeout(() => {
      if (canvas && ctx) {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        render();
      }
    }, 50);
  }
}

// --- DOM Ready 啟動 ---
document.addEventListener("DOMContentLoaded", () => {
  initCanvas();

  // 分頁按鈕綁定
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // 預設題庫切換
  const pSelect = document.getElementById("presetSelect");
  if (pSelect) {
    pSelect.addEventListener("change", e => {
      loadPreset(e.target.value);
    });
  }

  // 視角控制按鈕
  document.getElementById("btnZoomIn").addEventListener("click", () => {
    state.scale = Math.min(250, state.scale * 1.25);
    render();
  });
  document.getElementById("btnZoomOut").addEventListener("click", () => {
    state.scale = Math.max(8, state.scale * 0.8);
    render();
  });
  document.getElementById("btnResetView").addEventListener("click", () => {
    fitCameraToPreset(currentPreset);
    render();
  });

  // 目標線平移滑桿
  const kSlider = document.getElementById("kSlider");
  if (kSlider) {
    kSlider.addEventListener("input", e => {
      state.kVal = parseFloat(e.target.value);
      document.getElementById("kSliderVal").textContent = state.kVal.toFixed(1);
      render();
    });
  }

  // 平移掃描按鈕
  document.getElementById("btnAnimate").addEventListener("click", toggleAnimation);

  // 切換勾選方塊 (Toggles)
  document.querySelectorAll("[data-toggle]").forEach(chk => {
    chk.addEventListener("change", e => {
      const key = e.target.dataset.toggle;
      state.toggles[key] = e.target.checked;
      render();
    });
  });

  setupCustomSandbox();
  initQuiz();
  setupExercises();

  // 載入預設章首實例
  loadPreset("intro");
});
