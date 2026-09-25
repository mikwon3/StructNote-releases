/* 따라하기의 내용. 글은 한국어·영어를 짝으로 적는다(앱의 i18n 과 같은 원칙).
 *
 *   kind 'calc'   — 계산 블록. 고치면 값이 다시 나온다.
 *   kind 'fence'  — 그림 울타리. 고치면 그림이 다시 그려진다. lang 에 울타리 이름.
 *   kind 'note'   — 고칠 것이 없는 설명만.
 *
 * src 는 한 벌이면 두 언어가 같고, {ko, en} 이면 갈라 쓴다 — 그림 속 글자만 다르다.
 */
window.TRACKS = [
  {
    id: 'calc',
    name: { ko: '계산', en: 'Calculation' },
    blurb: {
      ko: '노트의 중심. 식을 적으면 값이 나오고, 단위는 스스로 맞는다.',
      en: 'The heart of a note: write the formula, get the number — with the units looking after themselves.',
    },
    steps: [
      {
        title: { ko: '정의와 결과', en: 'Definitions and results' },
        body: {
          ko: '계산 블록은 <code>```calc</code> 로 <b>열고</b> <code>```</code> 로 <b>닫습니다</b> — 아래 칸의 위아래에 흐리게 적힌 줄이 그것입니다. 닫는 줄을 빠뜨리면 노트는 그 아래 글까지 모두 블록으로 읽습니다.<br><br><code>:=</code> 는 값을 정하는 것이고, 줄 끝의 <code>=</code> 는 앱에게 답을 묻는 것입니다. 단위는 값에 붙어 다닙니다 — <code>6 m</code> 은 그냥 6이 아니라 6미터입니다.',
          en: 'A calculation block <b>opens</b> with <code>```calc</code> and <b>closes</b> with <code>```</code> — the two dim lines above and below the box. Leave the closing line out and the note reads everything below it as part of the block.<br><br><code>:=</code> defines a value; a trailing <code>=</code> asks CivilNote for the answer. Units travel with the value — <code>6 m</code> is not 6, it is six metres.',
        },
        tip: {
          ko: '오른쪽 값을 보면서 <code>a := 2 m</code> 를 <code>4 m</code> 로 고쳐 보십시오. 반력이 따라 바뀝니다.',
          en: 'Watch the values on the right and change <code>a := 2 m</code> to <code>4 m</code>. The reactions follow.',
        },
        kind: 'calc',
        src: {
          ko: '% 지간 6 m 의 단순보, 왼쪽에서 2 m 떨어진 곳에 20 kN\nL := 6 m\nP := 20 kN\na := 2 m\nR_{B} = \\frac{P*a}{L} = kN\nR_{A} = \\frac{P*(L-a)}{L} = kN\nM_{max} := \\frac{P*a*(L-a)}{L} = kN*m',
          en: '% A 6 m simple beam, 20 kN at 2 m from the left support\nL := 6 m\nP := 20 kN\na := 2 m\nR_{B} = \\frac{P*a}{L} = kN\nR_{A} = \\frac{P*(L-a)}{L} = kN\nM_{max} := \\frac{P*a*(L-a)}{L} = kN*m',
        },
      },
      {
        title: { ko: '단위가 스스로 맞는다', en: 'The units take care of themselves' },
        body: {
          ko: '<code>= mm</code> 처럼 원하는 단위를 적으면 그 단위로 답합니다. 같은 값을 다른 단위로 다시 물어도 됩니다. 차원이 맞지 않는 식은 계산되기 전에 걸리므로, 단위를 잘못 옮겨 적어 생기는 잘못은 애초에 노트에 남지 않습니다.',
          en: 'Write the unit you want — <code>= mm</code> — and the answer comes in it. Ask for the same value again in another unit if you like. An expression whose dimensions do not agree is caught before it is evaluated, so a slip in unit conversion never reaches the sheet.',
        },
        tip: {
          ko: '<code>= in</code> 을 <code>= ft</code> 로 바꿔 보거나, <code>E := 200 GPa</code> 를 <code>200 kN</code> 으로 바꿔 무엇이 걸리는지 보십시오.',
          en: 'Change <code>= in</code> to <code>= ft</code>, or make <code>E := 200 GPa</code> into <code>200 kN</code> and see what gets caught.',
        },
        kind: 'calc',
        src: 'P := 20 kN\nL := 6 m\nE := 200 GPa\nI := 8.0*10^{7} mm^4\n\\delta := \\frac{P*L^{3}}{48*E*I} = mm\n\\delta = in',
      },
      {
        title: { ko: '검토와 판정', en: 'Checks and verdicts' },
        body: {
          ko: '부등식만 적은 줄은 <b>O.K</b> 또는 <b>N.G</b> 로 판정합니다 — 검토 계산서를 손으로 쓰던 그대로 옮길 수 있습니다. <code>if()</code> 로 조건에 따라 값을 고를 수도 있습니다.',
          en: 'A line that is only an inequality is judged <b>O.K</b> or <b>N.G</b> — a design check reads the way you would write it by hand. <code>if()</code> picks a value by condition.',
        },
        tip: {
          ko: '<code>c := 71.366 mm</code> 를 <code>110 mm</code> 로 키워 보십시오. 변형률이 줄면서 &phi; 와 판정이 함께 바뀝니다.',
          en: 'Raise <code>c := 71.366 mm</code> to <code>110 mm</code>. The strain drops, and &phi; and the verdict change with it.',
        },
        kind: 'calc',
        src: {
          ko: 'd := 330 mm\nc := 71.366 mm\n\\varepsilon_{t} := 0.003*\\frac{d-c}{c} =\n% 인장철근의 변형률이 0.005 이상이면 인장지배단면\n\\varepsilon_{t} \\ge 0.005\n\\phi := if(\\varepsilon_{t} \\ge 0.005, 0.85, 0.65+0.25*\\frac{\\varepsilon_{t}-0.002}{0.003}) =',
          en: 'd := 330 mm\nc := 71.366 mm\n\\varepsilon_{t} := 0.003*\\frac{d-c}{c} =\n% A section is tension-controlled when the strain in the tension steel is 0.005 or more\n\\varepsilon_{t} \\ge 0.005\n\\phi := if(\\varepsilon_{t} \\ge 0.005, 0.85, 0.65+0.25*\\frac{\\varepsilon_{t}-0.002}{0.003}) =',
        },
      },
      {
        title: { ko: '함수와 구간', en: 'Functions and segments' },
        body: {
          ko: '교재처럼 <b>구간마다 한 줄씩</b> 적습니다. 같은 이름으로 여러 번 정의하면 구간이 이어 붙습니다. 이렇게 적어 둔 함수는 선도가 그대로 받아 그립니다.',
          en: 'Write them <b>one line per segment</b>, the way a textbook does. Defining the same name more than once joins the segments. The diagram tool draws straight from these functions.',
        },
        tip: {
          ko: '단위를 <code>10 kN</code> 처럼 편하게 적어도 됩니다 — 앱이 <code>10*\\mathrm{kN}</code> 으로 정리합니다. 여기서도 정리한 뒤 계산합니다.',
          en: 'Write units the plain way — <code>10 kN</code> — and the app tidies them into <code>10*\\mathrm{kN}</code>. This page tidies them the same way before evaluating.',
        },
        kind: 'calc',
        src: 'R_A := 10 kN\nV(x) := R_A , 0 \\le x \\le 3*m\nV(x) := R_A - 20 kN , 3*m \\le x \\le 6*m\nM(x) := R_A*x , 0 \\le x \\le 3*m\nM(x) := R_A*(6*m - x) , 3*m \\le x \\le 6*m\nV(2*m) = kN\nM(3*m) = kN*m',
      },
    ],
  },

  {
    id: 'structure',
    name: { ko: '구조 편집기', en: 'Structure editor' },
    blurb: {
      ko: '절점과 부재를 적으면 구조도가 되고, 푸는 방법을 더하면 선도가 된다.',
      en: 'Nodes and members make a drawing; add a method and they make diagrams.',
    },
    steps: [
      {
        title: { ko: '구조도 — 절점·부재·지점', en: 'The drawing — nodes, members, supports' },
        body: {
          ko: '그림 울타리도 계산 블록과 <b>같은 규칙</b>입니다 — <code>```structure</code> 로 열고 <code>```</code> 로 닫으며, 그 사이에 JSON 을 적습니다. 구조 편집기가 이것을 대신 적어 넣습니다.<br><br>절점은 좌표, 부재는 두 절점, 지점은 <code>fixed</code>·<code>pin</code>·<code>roller</code> 입니다. 울타리를 두 번 누르면 편집기가 그 값 그대로 다시 열립니다.',
          en: 'A figure fence follows the <b>same rule</b> as a calculation block — it opens with <code>```structure</code>, closes with <code>```</code>, and carries JSON in between. The structure editor writes it for you.<br><br>Nodes carry coordinates, members join two nodes, and a support is <code>fixed</code>, <code>pin</code> or <code>roller</code>. Double-click the fence in a note and the editor reopens with these same values.',
        },
        tip: {
          ko: '절점 <code>E</code> 의 <code>y</code> 를 <code>-4</code> 에서 <code>-7</code> 로 바꿔 기둥을 늘려 보십시오.',
          en: 'Change node <code>E</code>\'s <code>y</code> from <code>-4</code> to <code>-7</code> to make the column longer.',
        },
        kind: 'fence',
        lang: 'structure',
        src: {
          ko: '{\n  "type": "frame", "title": "단순 뼈대", "unit": "kN",\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 8, "y": 0 },\n    { "id": "C", "x": 10, "y": 0 }, { "id": "D", "x": 12, "y": 0 },\n    { "id": "E", "x": 8, "y": -4 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" }, { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }, { "id": "BE", "from": "B", "to": "E" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" }, { "node": "D", "kind": "fixed" },\n    { "node": "E", "kind": "fixed" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -30 }],\n  "memberLoads": [{ "member": "AB", "w": -12 }]\n}',
          en: '{\n  "type": "frame", "title": "Simple frame", "unit": "kN",\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 8, "y": 0 },\n    { "id": "C", "x": 10, "y": 0 }, { "id": "D", "x": 12, "y": 0 },\n    { "id": "E", "x": 8, "y": -4 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" }, { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }, { "id": "BE", "from": "B", "to": "E" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" }, { "node": "D", "kind": "fixed" },\n    { "node": "E", "kind": "fixed" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -30 }],\n  "memberLoads": [{ "member": "AB", "w": -12 }]\n}',
        },
      },
      {
        title: { ko: '선도 — 푸는 방법을 고른다', en: 'Diagrams — pick the method' },
        body: {
          ko: '같은 값에 <code>method</code> 와 <code>show</code> 만 더하면 선도가 됩니다. <code>slope</code>(처짐각법)·<code>cross</code>(모멘트분배법)·<code>matrix</code>(매트릭스법) 가운데 고를 수 있고, 편집기는 고른 방법의 <b>풀이 과정</b>까지 노트에 적어 줍니다.',
          en: 'Add <code>method</code> and <code>show</code> to the same structure and you get diagrams. Choose <code>slope</code> (slope-deflection), <code>cross</code> (moment distribution) or <code>matrix</code>, and the editor writes the <b>working</b> for that method into the note as well.',
        },
        tip: {
          ko: '<code>"show"</code> 에 <code>"axial"</code> 을 더해 축력도까지 보거나, <code>method</code> 를 <code>"cross"</code> 로 바꿔 보십시오 — 답은 같습니다.',
          en: 'Add <code>"axial"</code> to <code>"show"</code> for the axial force diagram, or switch <code>method</code> to <code>"cross"</code> — the answer is the same.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "단순 뼈대", "unit": "kN",\n  "method": "matrix", "show": ["moment", "shear"],\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 8, "y": 0 },\n    { "id": "C", "x": 10, "y": 0 }, { "id": "D", "x": 12, "y": 0 },\n    { "id": "E", "x": 8, "y": -4 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" }, { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }, { "id": "BE", "from": "B", "to": "E" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" }, { "node": "D", "kind": "fixed" },\n    { "node": "E", "kind": "fixed" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -30 }],\n  "memberLoads": [{ "member": "AB", "w": -12 }]\n}',
          en: '{\n  "type": "frame", "title": "Simple frame", "unit": "kN",\n  "method": "matrix", "show": ["moment", "shear"],\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 8, "y": 0 },\n    { "id": "C", "x": 10, "y": 0 }, { "id": "D", "x": 12, "y": 0 },\n    { "id": "E", "x": 8, "y": -4 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" }, { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }, { "id": "BE", "from": "B", "to": "E" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" }, { "node": "D", "kind": "fixed" },\n    { "node": "E", "kind": "fixed" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -30 }],\n  "memberLoads": [{ "member": "AB", "w": -12 }]\n}',
        },
      },
      {
        title: { ko: '이음과 해제', en: 'Releases' },
        body: {
          ko: '부재 끝의 이음을 풀면 그 끝은 모멘트를 전하지 않습니다. 게르버보의 힌지, 트러스의 핀이 모두 이것입니다.',
          en: 'Release a member end and it no longer carries moment there. The hinge in a Gerber beam and the pins of a truss are both this.',
        },
        tip: {
          ko: '<code>releases</code> 를 통째로 지워 보십시오. 같은 구조가 이음 없이 풀리면서 모멘트도가 달라집니다.',
          en: 'Delete the whole <code>releases</code> line. The same structure solves without the release and the moment diagram changes.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "이음이 있는 2경간 보", "unit": "kN",\n  "method": "matrix", "show": ["moment", "shear"],\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 6, "y": 0 },\n    { "id": "C", "x": 9, "y": 0 }, { "id": "D", "x": 15, "y": 0 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" },\n    { "node": "B", "kind": "roller" },\n    { "node": "D", "kind": "fixed" }\n  ],\n  "releases": [{ "node": "C", "kind": "moment" }],\n  "memberLoads": [\n    { "member": "AB", "w": -10 },\n    { "member": "CD", "w": -10 }\n  ]\n}',
          en: '{\n  "type": "frame", "title": "Two-span beam with a release", "unit": "kN",\n  "method": "matrix", "show": ["moment", "shear"],\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 }, { "id": "B", "x": 6, "y": 0 },\n    { "id": "C", "x": 9, "y": 0 }, { "id": "D", "x": 15, "y": 0 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CD", "from": "C", "to": "D" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "fixed" },\n    { "node": "B", "kind": "roller" },\n    { "node": "D", "kind": "fixed" }\n  ],\n  "releases": [{ "node": "C", "kind": "moment" }],\n  "memberLoads": [\n    { "member": "AB", "w": -10 },\n    { "member": "CD", "w": -10 }\n  ]\n}',
        },
      },
    ],
  },

  {
    id: 'truss',
    name: { ko: '트러스', en: 'Trusses' },
    blurb: {
      ko: '부재는 양끝이 핀이라 축력만 받는다. 인장이 양수이고, 앱이 정정인지 먼저 따져 준다.',
      en: 'Every member is pinned at both ends, so it carries axial force only. Tension is positive, and the app checks determinacy first.',
    },
    steps: [
      {
        title: { ko: '가장 단순한 트러스', en: 'The simplest truss' },
        body: {
          ko: '구조도와 같은 울타리에 <code>"truss": true</code> 만 더하면 트러스로 풉니다 — 모든 부재의 양끝을 핀으로 보아 <b>휨 없이 축력만</b> 전합니다. 그림 아래에 정정 여부와 가장 큰 인장·압축, 반력이 함께 적힙니다.',
          en: 'Add <code>"truss": true</code> to the same fence the structure editor writes and it is solved as a truss — every member pinned at both ends, carrying <b>axial force only, no bending</b>. Under the drawing you get the determinacy check, the largest tension and compression, and the reactions.',
        },
        tip: {
          ko: '꼭짓점 <code>C</code> 의 <code>"x"</code> 를 <code>2</code> 에서 <code>1</code> 로 옮겨 보십시오. 대칭이 깨지면서 두 사재의 힘이 갈라집니다. 실선이 인장, 점선이 압축입니다.',
          en: 'Move the apex <code>C</code>\'s <code>"x"</code> from <code>2</code> to <code>1</code>. The symmetry breaks and the two diagonals take different forces. Solid means tension, dashed means compression.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "삼각 트러스", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 4, "y": 0 },\n    { "id": "C", "x": 2, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CA", "from": "C", "to": "A" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "B", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -20 }],\n  "show": ["axial"]\n}',
          en: '{\n  "type": "frame", "title": "Triangular truss", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 4, "y": 0 },\n    { "id": "C", "x": 2, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CA", "from": "C", "to": "A" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "B", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -20 }],\n  "show": ["axial"]\n}',
        },
      },
      {
        title: { ko: '정정인가, 부정정인가, 기구인가', en: 'Determinate, indeterminate, or a mechanism' },
        body: {
          ko: '트러스는 <code>m + r − 2j</code> 로 가립니다(부재 수 m, 반력 수 r, 절점 수 j). <b>0 이면 정정</b>이라 부재의 단면적이 답을 바꾸지 않고, 양수면 그만큼 부정정이라 <code>EA</code> 에 따라 답이 달라지며, 음수면 움직이는 <b>기구</b>라 풀 수가 없습니다. 앱이 그림 아래에 이 셈을 적어 줍니다.',
          en: 'A truss is judged by <code>m + r − 2j</code> (m members, r reactions, j joints). <b>Zero is determinate</b> — the member areas do not change the answer. Positive means that many degrees of indeterminacy, where <code>EA</code> does matter. Negative means a <b>mechanism</b>, which cannot be solved. The app writes this sum under the drawing.',
        },
        tip: {
          ko: '<code>B</code> 의 지점을 <code>"roller"</code> 에서 <code>"pin"</code> 으로 바꿔 보십시오 — 반력이 하나 늘어 1차 부정정이 됩니다. 반대로 부재 <code>CA</code> 줄을 지우면 기구라고 말해 줍니다.',
          en: 'Change <code>B</code>\'s support from <code>"roller"</code> to <code>"pin"</code> — one more reaction, and it becomes one degree indeterminate. Or delete the <code>CA</code> member line and it tells you it is a mechanism.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "지점을 바꿔 본다", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 4, "y": 0 },\n    { "id": "C", "x": 2, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CA", "from": "C", "to": "A" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "B", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -20 }],\n  "show": ["axial"]\n}',
          en: '{\n  "type": "frame", "title": "Try another support", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 4, "y": 0 },\n    { "id": "C", "x": 2, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "CA", "from": "C", "to": "A" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "B", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "C", "fy": -20 }],\n  "show": ["axial"]\n}',
        },
      },
      {
        title: { ko: '영부재', en: 'Zero-force members' },
        body: {
          ko: '축력이 0 인 부재가 있으면 그림 아래에 이름을 적어 줍니다. 손으로 풀 때 먼저 지워 놓고 시작하는 그 부재입니다 — 하중이 없는 절점에 두 부재만 모이면 둘 다 0, 세 부재가 모이되 둘이 일직선이면 나머지 하나가 0 입니다.',
          en: 'When a member carries no force the app names it under the drawing. These are the ones you cross out before solving by hand: at an unloaded joint where only two members meet, both are zero; where three meet and two are collinear, the odd one is zero.',
        },
        tip: {
          ko: '하중을 <code>"node": "D"</code> 에서 <code>"node": "B"</code> 로 옮겨 보십시오. <code>BD</code> 가 더 이상 영부재가 아니게 됩니다.',
          en: 'Move the load from <code>"node": "D"</code> to <code>"node": "B"</code>. <code>BD</code> stops being a zero-force member.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "영부재가 있는 트러스", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 3, "y": 0 },\n    { "id": "C", "x": 6, "y": 0 },\n    { "id": "D", "x": 3, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "AD", "from": "A", "to": "D" },\n    { "id": "DC", "from": "D", "to": "C" },\n    { "id": "BD", "from": "B", "to": "D" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "C", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "D", "fy": -30 }],\n  "show": ["axial"]\n}',
          en: '{\n  "type": "frame", "title": "A truss with a zero-force member", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "A", "x": 0, "y": 0 },\n    { "id": "B", "x": 3, "y": 0 },\n    { "id": "C", "x": 6, "y": 0 },\n    { "id": "D", "x": 3, "y": 3 }\n  ],\n  "members": [\n    { "id": "AB", "from": "A", "to": "B" },\n    { "id": "BC", "from": "B", "to": "C" },\n    { "id": "AD", "from": "A", "to": "D" },\n    { "id": "DC", "from": "D", "to": "C" },\n    { "id": "BD", "from": "B", "to": "D" }\n  ],\n  "supports": [\n    { "node": "A", "kind": "pin" },\n    { "node": "C", "kind": "roller" }\n  ],\n  "nodeLoads": [{ "node": "D", "fy": -30 }],\n  "show": ["axial"]\n}',
        },
      },
      {
        title: { ko: '프랫 트러스 한 벌', en: 'A whole Pratt truss' },
        body: {
          ko: '실제 트러스는 절점표가 깁니다. 구조 편집기에서 <b>표준 형상</b>을 고르면 이 표를 앱이 적어 주고, <b>「트러스로 풀기」</b>를 켜면 <code>"truss": true</code> 가 붙습니다 — 여기 있는 것이 그렇게 나온 결과입니다.',
          en: 'A real truss has a long node table. Pick a <b>standard shape</b> in the structure editor and the app fills it in; tick <b>Solve as a truss</b> and <code>"truss": true</code> is added. What you see here is what comes out.',
        },
        tip: {
          ko: '하중 셋을 아래현(<code>L1</code>·<code>L2</code>·<code>L3</code>)에서 위현(<code>U1</code>·<code>U2</code>·<code>U3</code>)으로 옮겨 보십시오. 상현재하와 하현재하에서 수직재의 부호가 뒤집힙니다.',
          en: 'Move the three loads from the bottom chord (<code>L1</code>, <code>L2</code>, <code>L3</code>) to the top (<code>U1</code>, <code>U2</code>, <code>U3</code>). The verticals change sign between bottom-chord and top-chord loading.',
        },
        kind: 'fence',
        lang: 'chart',
        src: {
          ko: '{\n  "type": "frame", "title": "프랫 트러스", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "L0", "x": 0, "y": 0 }, { "id": "L1", "x": 3, "y": 0 },\n    { "id": "L2", "x": 6, "y": 0 }, { "id": "L3", "x": 9, "y": 0 },\n    { "id": "L4", "x": 12, "y": 0 },\n    { "id": "U0", "x": 0, "y": 4 }, { "id": "U1", "x": 3, "y": 4 },\n    { "id": "U2", "x": 6, "y": 4 }, { "id": "U3", "x": 9, "y": 4 },\n    { "id": "U4", "x": 12, "y": 4 }\n  ],\n  "members": [\n    { "id": "L0L1", "from": "L0", "to": "L1" }, { "id": "L1L2", "from": "L1", "to": "L2" },\n    { "id": "L2L3", "from": "L2", "to": "L3" }, { "id": "L3L4", "from": "L3", "to": "L4" },\n    { "id": "U0U1", "from": "U0", "to": "U1" }, { "id": "U1U2", "from": "U1", "to": "U2" },\n    { "id": "U2U3", "from": "U2", "to": "U3" }, { "id": "U3U4", "from": "U3", "to": "U4" },\n    { "id": "U0L0", "from": "U0", "to": "L0" }, { "id": "U1L1", "from": "U1", "to": "L1" },\n    { "id": "U2L2", "from": "U2", "to": "L2" }, { "id": "U3L3", "from": "U3", "to": "L3" },\n    { "id": "U4L4", "from": "U4", "to": "L4" },\n    { "id": "U0L1", "from": "U0", "to": "L1" }, { "id": "U1L2", "from": "U1", "to": "L2" },\n    { "id": "L2U3", "from": "L2", "to": "U3" }, { "id": "L3U4", "from": "L3", "to": "U4" }\n  ],\n  "supports": [\n    { "node": "L0", "kind": "pin" },\n    { "node": "L4", "kind": "roller" }\n  ],\n  "nodeLoads": [\n    { "node": "L1", "fy": -20 },\n    { "node": "L2", "fy": -20 },\n    { "node": "L3", "fy": -20 }\n  ],\n  "show": ["axial"]\n}',
          en: '{\n  "type": "frame", "title": "Pratt truss", "unit": "kN", "truss": true,\n  "nodes": [\n    { "id": "L0", "x": 0, "y": 0 }, { "id": "L1", "x": 3, "y": 0 },\n    { "id": "L2", "x": 6, "y": 0 }, { "id": "L3", "x": 9, "y": 0 },\n    { "id": "L4", "x": 12, "y": 0 },\n    { "id": "U0", "x": 0, "y": 4 }, { "id": "U1", "x": 3, "y": 4 },\n    { "id": "U2", "x": 6, "y": 4 }, { "id": "U3", "x": 9, "y": 4 },\n    { "id": "U4", "x": 12, "y": 4 }\n  ],\n  "members": [\n    { "id": "L0L1", "from": "L0", "to": "L1" }, { "id": "L1L2", "from": "L1", "to": "L2" },\n    { "id": "L2L3", "from": "L2", "to": "L3" }, { "id": "L3L4", "from": "L3", "to": "L4" },\n    { "id": "U0U1", "from": "U0", "to": "U1" }, { "id": "U1U2", "from": "U1", "to": "U2" },\n    { "id": "U2U3", "from": "U2", "to": "U3" }, { "id": "U3U4", "from": "U3", "to": "U4" },\n    { "id": "U0L0", "from": "U0", "to": "L0" }, { "id": "U1L1", "from": "U1", "to": "L1" },\n    { "id": "U2L2", "from": "U2", "to": "L2" }, { "id": "U3L3", "from": "U3", "to": "L3" },\n    { "id": "U4L4", "from": "U4", "to": "L4" },\n    { "id": "U0L1", "from": "U0", "to": "L1" }, { "id": "U1L2", "from": "U1", "to": "L2" },\n    { "id": "L2U3", "from": "L2", "to": "U3" }, { "id": "L3U4", "from": "L3", "to": "U4" }\n  ],\n  "supports": [\n    { "node": "L0", "kind": "pin" },\n    { "node": "L4", "kind": "roller" }\n  ],\n  "nodeLoads": [\n    { "node": "L1", "fy": -20 },\n    { "node": "L2", "fy": -20 },\n    { "node": "L3", "fy": -20 }\n  ],\n  "show": ["axial"]\n}',
        },
      },
    ],
  },

  {
    id: 'influence',
    name: { ko: '영향선', en: 'Influence lines' },
    blurb: {
      ko: '하중이 지나갈 때 한 자리의 값이 어떻게 변하는가. 최악의 배치까지 찾아 준다.',
      en: 'How one quantity changes as a load rolls across — and where to put the load to make it worst.',
    },
    steps: [
      {
        title: { ko: '단순보 — 휨모멘트와 전단력', en: 'Simple beam — moment and shear' },
        body: {
          ko: '<code>at</code> 이 보는 자리, <code>kind</code> 가 무엇을 볼지입니다. <code>udl</code> 과 <code>loads</code> 를 주면 그 하중을 가장 나쁘게 놓았을 때의 값까지 계산합니다.',
          en: '<code>at</code> is the section you are watching and <code>kind</code> is what you watch. Give it a <code>udl</code> and some <code>loads</code> and it also works out the worst placement of them.',
        },
        tip: {
          ko: '<code>"kind"</code> 를 <code>"shear"</code> 로 바꾸면 전단력의 영향선이 됩니다 — 그 자리에서 끊어진 모양이 나옵니다.',
          en: 'Switch <code>"kind"</code> to <code>"shear"</code> for the shear influence line — it steps across the section.',
        },
        kind: 'fence',
        lang: 'influence',
        src: {
          ko: '{\n  "title": "단순보 x = 5 m 의 휨모멘트",\n  "kind": "moment", "at": 5,\n  "right": "roller", "udl": 8,\n  "loads": [{ "at": 3, "magnitude": 40 }, { "at": 7, "magnitude": 60 }],\n  "spans": [\n    { "length": 12, "left": "pin" }\n  ]\n}',
          en: '{\n  "title": "Bending moment at x = 5 m of a simple beam",\n  "kind": "moment", "at": 5,\n  "right": "roller", "udl": 8,\n  "loads": [{ "at": 3, "magnitude": 40 }, { "at": 7, "magnitude": 60 }],\n  "spans": [\n    { "length": 12, "left": "pin" }\n  ]\n}',
        },
      },
      {
        title: { ko: '연속보와 게르버보', en: 'Continuous and Gerber beams' },
        body: {
          ko: '<code>spans</code> 를 여러 개 적으면 연속보가 됩니다. 경간 사이에 <code>"left": "hinge"</code> 를 두면 게르버보 — 그 자리에서 영향선이 꺾입니다.',
          en: 'List several <code>spans</code> and you have a continuous beam. Put <code>"left": "hinge"</code> between two of them and it becomes a Gerber beam — the line kinks there.',
        },
        tip: {
          ko: '가운데 경간의 <code>"left"</code> 를 <code>"hinge"</code> 와 <code>"roller"</code> 로 번갈아 바꿔 보십시오. 같은 보가 정정과 부정정을 오갑니다.',
          en: 'Flip the middle span\'s <code>"left"</code> between <code>"hinge"</code> and <code>"roller"</code>. The same beam moves between determinate and indeterminate.',
        },
        kind: 'fence',
        lang: 'influence',
        src: {
          ko: '{\n  "title": "게르버보 — 가운데 지점의 반력",\n  "kind": "reaction", "at": 12,\n  "right": "roller", "udl": 5,\n  "spans": [\n    { "length": 9, "left": "pin" },\n    { "length": 3, "left": "hinge" },\n    { "length": 6, "left": "roller" }\n  ]\n}',
          en: '{\n  "title": "Gerber beam — reaction at the middle support",\n  "kind": "reaction", "at": 12,\n  "right": "roller", "udl": 5,\n  "spans": [\n    { "length": 9, "left": "pin" },\n    { "length": 3, "left": "hinge" },\n    { "length": 6, "left": "roller" }\n  ]\n}',
        },
      },
    ],
  },

  {
    id: 'truss-influence',
    name: { ko: '트러스의 영향선', en: 'Truss influence lines' },
    blurb: {
      ko: '하중이 지나갈 때 한 부재의 힘이 어떻게 변하는가. 표준 형상을 고르고 부재를 지목하면 된다.',
      en: 'How one member\'s force changes as a load rolls across. Pick a standard shape and name the member.',
    },
    steps: [
      {
        title: { ko: '표준 형상', en: 'Standard shapes' },
        body: {
          ko: '프랫·하우·워런·K 트러스를 <b>격간 수·격간 길이·높이</b>만으로 세웁니다 — 절점을 하나씩 적을 필요가 없습니다. 부재 하나를 지목하면 그 부재의 영향선이 나옵니다. 인장이 양수입니다.',
          en: 'A Pratt, Howe, Warren or K truss is set up from the <b>panel count, panel length and height</b> alone — no node table to fill in. Name one member and you get its influence line. Tension is positive.',
        },
        tip: {
          ko: '<code>"type"</code> 을 <code>"howe"</code>·<code>"warren"</code>·<code>"warrenV"</code> 로 바꿔 보십시오. 사재가 기우는 쪽이 바뀌면서 같은 자리의 부재가 인장에서 압축으로 돕니다.',
          en: 'Change <code>"type"</code> to <code>"howe"</code>, <code>"warren"</code> or <code>"warrenV"</code>. The diagonals lean the other way and the member in the same place turns from tension to compression.',
        },
        kind: 'fence',
        lang: 'truss',
        src: {
          ko: '{\n  "title": "프랫 트러스의 사재 U1L2",\n  "kind": "member", "target": "U1L2", "loaded": "bottom",\n  "udl": 5,\n  "loads": [{ "at": 3, "magnitude": 40 }],\n  "preset": { "type": "pratt", "panels": 4, "panelLength": 3, "height": 4 }\n}',
          en: '{\n  "title": "Diagonal U1L2 of a Pratt truss",\n  "kind": "member", "target": "U1L2", "loaded": "bottom",\n  "udl": 5,\n  "loads": [{ "at": 3, "magnitude": 40 }],\n  "preset": { "type": "pratt", "panels": 4, "panelLength": 3, "height": 4 }\n}',
        },
      },
      {
        title: { ko: '어느 부재를 보는가', en: 'Which member you watch' },
        body: {
          ko: '<code>target</code> 에 부재 이름을 적습니다. 아래현은 <code>L</code>, 위현은 <code>U</code>, 그 사이를 이으면 사재·수직재입니다 — <code>L1L2</code>(하현재), <code>U2L2</code>(수직재), <code>U1L2</code>(사재). <code>loaded</code> 는 하중이 지나가는 현입니다.',
          en: 'Put the member name in <code>target</code>. The bottom chord is <code>L</code>, the top <code>U</code>, and joining them gives diagonals and verticals — <code>L1L2</code> (bottom chord), <code>U2L2</code> (vertical), <code>U1L2</code> (diagonal). <code>loaded</code> is the chord the load runs along.',
        },
        tip: {
          ko: '<code>"target"</code> 을 <code>"L1L2"</code> 로, <code>"loaded"</code> 를 <code>"top"</code> 으로 바꿔 보십시오. 하중이 위현으로 지나갈 때 수직재의 영향선이 어떻게 달라지는지가 특히 볼 만합니다.',
          en: 'Try <code>"target": "L1L2"</code>, or <code>"loaded": "top"</code>. The vertical\'s influence line is the one that changes most when the load runs along the top chord.',
        },
        kind: 'fence',
        lang: 'truss',
        src: {
          ko: '{\n  "title": "하현재 L1L2 — 모멘트 중심은 U1",\n  "kind": "member", "target": "L1L2", "loaded": "bottom",\n  "loads": [{ "at": 3, "magnitude": 40 }, { "at": 7.5, "magnitude": 60 }],\n  "preset": { "type": "pratt", "panels": 4, "panelLength": 3, "height": 4 }\n}',
          en: '{\n  "title": "Bottom chord L1L2 — moment centre at U1",\n  "kind": "member", "target": "L1L2", "loaded": "bottom",\n  "loads": [{ "at": 3, "magnitude": 40 }, { "at": 7.5, "magnitude": 60 }],\n  "preset": { "type": "pratt", "panels": 4, "panelLength": 3, "height": 4 }\n}',
        },
      },
      {
        title: { ko: 'K 트러스', en: 'The K truss' },
        body: {
          ko: 'K 트러스는 수직재를 반으로 나눈 반사재가 K 모양을 이룹니다. <b>가운데 수직재만 나누지 않아야</b> 정정이 되므로 격간 수는 짝수여야 합니다. 하중은 격점에만 들어오므로 영향선은 격점 사이에서 직선입니다 — 격점마다 한 번씩만 풀면 정확합니다.',
          en: 'In a K truss, half-diagonals split each vertical into the K shape. Leaving <b>only the middle vertical undivided</b> is what keeps it determinate, so the panel count has to be even. Load enters only at panel points, so the line is straight between them — one solve per panel point is exact, not an approximation.',
        },
        tip: {
          ko: '<code>"panels"</code> 를 <code>6</code> 으로 늘려 보십시오. 홀수로 두면 정정이 되지 않아 앱이 그렇다고 말해 줍니다.',
          en: 'Raise <code>"panels"</code> to <code>6</code>. Make it odd and the truss is no longer determinate — the app says so.',
        },
        kind: 'fence',
        lang: 'truss',
        src: {
          ko: '{\n  "title": "케이 트러스 — 반사재 L2M1",\n  "kind": "member", "target": "L2M1", "loaded": "bottom",\n  "udl": 5,\n  "preset": { "type": "k", "panels": 4, "panelLength": 3, "height": 4 }\n}',
          en: '{\n  "title": "K truss — half-diagonal L2M1",\n  "kind": "member", "target": "L2M1", "loaded": "bottom",\n  "udl": 5,\n  "preset": { "type": "k", "panels": 4, "panelLength": 3, "height": 4 }\n}',
        },
      },
    ],
  },

  {
    id: 'geotech',
    name: { ko: '토질', en: 'Geotechnics' },
    blurb: {
      ko: '지층·분류·압밀·옹벽·사면. 설정 › 분야 에서 토질을 켜면 계산 메뉴에 나타난다.',
      en: 'Profiles, classification, consolidation, walls and slopes. Turn Geotechnics on in Settings › Fields.',
    },
    steps: [
      {
        title: { ko: '지층과 유효응력', en: 'Soil profile and effective stress' },
        body: {
          ko: '지층과 지하수위를 적으면 전응력·간극수압·유효응력이 깊이에 따라 그려집니다. 각 층의 <code>gamma</code> 는 지하수위 위, <code>gammaSat</code> 는 아래에 쓰입니다.',
          en: 'Give it the layers and the water table, and total stress, pore pressure and effective stress follow with depth. Each layer\'s <code>gamma</code> applies above the water table, <code>gammaSat</code> below it.',
        },
        tip: {
          ko: '<code>"water"</code> 를 <code>0</code> 으로 올려 지하수위를 지표까지 끌어올려 보십시오. 유효응력이 얼마나 줄어드는지 한눈에 보입니다.',
          en: 'Raise <code>"water"</code> to <code>0</code> to bring the water table up to the surface, and see how much effective stress is lost.',
        },
        kind: 'fence',
        lang: 'soil',
        src: {
          ko: '{\n  "title": "모래 아래 점토",\n  "water": 1.5,\n  "layers": [\n    { "name": "모래", "h": 4, "gamma": 17, "gammaSat": 19.5, "c": 0, "phi": 32 },\n    { "name": "점토", "h": 5, "gamma": 18, "gammaSat": 18.5, "c": 15, "phi": 0 }\n  ],\n  "show": ["stress"]\n}',
          en: '{\n  "title": "Sand over clay",\n  "water": 1.5,\n  "layers": [\n    { "name": "Sand", "h": 4, "gamma": 17, "gammaSat": 19.5, "c": 0, "phi": 32 },\n    { "name": "Clay", "h": 5, "gamma": 18, "gammaSat": 18.5, "c": 15, "phi": 0 }\n  ],\n  "show": ["stress"]\n}',
        },
      },
      {
        title: { ko: '흙의 분류 (USCS)', en: 'Soil classification (USCS)' },
        body: {
          ko: '체분석과 연경도를 주면 기호를 정하고, <b>그렇게 정한 까닭</b>을 줄줄이 적어 줍니다. 입도곡선과 소성도를 함께 그립니다.',
          en: 'Sieve analysis and Atterberg limits give the symbol — and the <b>reasoning</b> for it, written out line by line. The grading curve and the plasticity chart are drawn together.',
        },
        tip: {
          ko: '<code>"LL": 34</code> 를 <code>55</code> 로 올려 보십시오. A선 위 어디로 옮겨가는지, 기호가 어떻게 바뀌는지 보입니다.',
          en: 'Raise <code>"LL": 34</code> to <code>55</code> and watch where the point moves relative to the A-line, and how the symbol changes.',
        },
        kind: 'fence',
        lang: 'classify',
        src: {
          ko: '{\n  "title": "현장 시료",\n  "kind": "uscs",\n  "LL": 34, "PL": 21,\n  "sieve": [\n    { "size": 19, "passing": 100 }, { "size": 9.5, "passing": 94 },\n    { "size": 4.75, "passing": 85 }, { "size": 2.0, "passing": 71 },\n    { "size": 0.85, "passing": 55 }, { "size": 0.425, "passing": 38 },\n    { "size": 0.15, "passing": 19 }, { "size": 0.075, "passing": 11 },\n    { "size": 0.02, "passing": 6 }, { "size": 0.005, "passing": 3 }\n  ]\n}',
          en: '{\n  "title": "Sample from the site",\n  "kind": "uscs",\n  "LL": 34, "PL": 21,\n  "sieve": [\n    { "size": 19, "passing": 100 }, { "size": 9.5, "passing": 94 },\n    { "size": 4.75, "passing": 85 }, { "size": 2.0, "passing": 71 },\n    { "size": 0.85, "passing": 55 }, { "size": 0.425, "passing": 38 },\n    { "size": 0.15, "passing": 19 }, { "size": 0.075, "passing": 11 },\n    { "size": 0.02, "passing": 6 }, { "size": 0.005, "passing": 3 }\n  ]\n}',
        },
      },
      {
        title: { ko: '압밀 침하', en: 'Consolidation settlement' },
        body: {
          ko: '최종 침하량과 시간에 따른 침하, 그리고 등시곡선을 함께 냅니다. <code>drainage</code> 가 <code>double</code> 이면 위아래로 빠지므로 배수거리가 절반입니다.',
          en: 'Final settlement, settlement against time, and the isochrones together. With <code>drainage</code> set to <code>double</code> the water leaves both faces, so the drainage path is half the layer.',
        },
        tip: {
          ko: '<code>"drainage"</code> 를 <code>"single"</code> 로 바꿔 보십시오. 같은 침하량에 도달하는 시간이 네 배가 됩니다.',
          en: 'Change <code>"drainage"</code> to <code>"single"</code>. The time to reach the same settlement goes up fourfold.',
        },
        kind: 'fence',
        lang: 'consol',
        src: {
          ko: '{\n  "title": "성토 아래 점토층",\n  "H": 5, "drainage": "double", "cv": 1.5,\n  "method": "nc", "Cc": 0.35, "e0": 0.95,\n  "s0": 90, "ds": 60,\n  "timeUnit": "yr", "scale": "linear", "marks": [1, 2],\n  "show": ["settlement", "isochrones"]\n}',
          en: '{\n  "title": "Clay under the embankment",\n  "H": 5, "drainage": "double", "cv": 1.5,\n  "method": "nc", "Cc": 0.35, "e0": 0.95,\n  "s0": 90, "ds": 60,\n  "timeUnit": "yr", "scale": "linear", "marks": [1, 2],\n  "show": ["settlement", "isochrones"]\n}',
        },
      },
      {
        title: { ko: '옹벽의 안정검토', en: 'Retaining wall stability' },
        body: {
          ko: '벽의 모양과 뒤채움을 주면 토압을 구하고 전도·활동·지지력의 안전율을 함께 냅니다. 단면도 그대로 그립니다.',
          en: 'Give it the wall geometry and the backfill; it works out the earth pressure and the factors of safety against overturning, sliding and bearing — and draws the section.',
        },
        tip: {
          ko: '<code>"base"</code>(저판 너비)를 <code>3.2</code> 에서 <code>2.4</code> 로 줄여 보십시오. 어느 안전율이 먼저 무너지는지 보입니다.',
          en: 'Narrow <code>"base"</code> from <code>3.2</code> to <code>2.4</code> and see which factor of safety gives way first.',
        },
        kind: 'fence',
        lang: 'retain',
        src: {
          ko: '{\n  "title": "도로변 옹벽 (랭킨)",\n  "method": "rankine",\n  "stem": 5, "topWidth": 0.3, "bottomWidth": 0.5,\n  "base": 3.2, "baseThickness": 0.5, "toe": 0.8, "embedment": 1.2,\n  "gamma": 18.5, "phi": 32, "beta": 10, "surcharge": 12, "qult": 450\n}',
          en: '{\n  "title": "Roadside retaining wall (Rankine)",\n  "method": "rankine",\n  "stem": 5, "topWidth": 0.3, "bottomWidth": 0.5,\n  "base": 3.2, "baseThickness": 0.5, "toe": 0.8, "embedment": 1.2,\n  "gamma": 18.5, "phi": 32, "beta": 10, "surcharge": 12, "qult": 450\n}',
        },
      },
      {
        title: { ko: '사면의 안정', en: 'Slope stability' },
        body: {
          ko: '무한사면은 한 줄로 끝나고, 원호활동은 분할법으로 풉니다. <code>kind</code> 로 가릅니다.',
          en: 'An infinite slope takes one line; a circular slip is solved by slices. <code>kind</code> chooses between them.',
        },
        tip: {
          ko: '<code>"beta"</code>(경사)를 <code>20</code> 에서 <code>30</code> 으로 올려 보십시오. 안전율이 1 아래로 떨어지는 지점을 찾아보십시오.',
          en: 'Raise <code>"beta"</code> from <code>20</code> to <code>30</code> and find where the factor of safety drops below 1.',
        },
        kind: 'fence',
        lang: 'slope',
        src: {
          ko: '{\n  "title": "마른 무한사면",\n  "kind": "infinite",\n  "beta": 20, "z": 3, "c": 12, "phi": 25, "gamma": 18\n}',
          en: '{\n  "title": "Dry infinite slope",\n  "kind": "infinite",\n  "beta": 20, "z": 3, "c": 12, "phi": 25, "gamma": 18\n}',
        },
      },
    ],
  },

  {
    id: 'hydraulics',
    name: { ko: '수리', en: 'Hydraulics' },
    blurb: {
      ko: '개수로·관수로·관망·수문. 설정 › 분야 에서 수리를 켜면 나타난다.',
      en: 'Open channels, pipes, networks and hydrology. Turn Hydraulics on in Settings › Fields.',
    },
    steps: [
      {
        title: { ko: '개수로 — 등류와 한계류', en: 'Open channel — normal and critical flow' },
        body: {
          ko: 'Manning 식으로 등류 수심을, <code>Q²T/(gA³) = 1</code> 로 한계수심을 구합니다. 단면과 비에너지 곡선을 함께 그립니다.',
          en: 'Normal depth from the Manning equation, critical depth from <code>Q²T/(gA³) = 1</code>. The section and the specific-energy curve are drawn together.',
        },
        tip: {
          ko: '<code>"S": 0.0004</code> 를 <code>0.004</code> 로 열 배 키워 보십시오. 상류에서 사류로 넘어갑니다.',
          en: 'Make <code>"S": 0.0004</code> ten times steeper — <code>0.004</code> — and the flow crosses from subcritical to supercritical.',
        },
        kind: 'fence',
        lang: 'channel',
        src: {
          ko: '{\n  "title": "관개 수로",\n  "shape": "trap", "B": 3, "z": 1.5,\n  "n": 0.025, "S": 0.0004, "Q": 12,\n  "show": ["section", "energy"]\n}',
          en: '{\n  "title": "Irrigation canal",\n  "shape": "trap", "B": 3, "z": 1.5,\n  "n": 0.025, "S": 0.0004, "Q": 12,\n  "show": ["section", "energy"]\n}',
        },
      },
      {
        title: { ko: '관수로 — 손실수두', en: 'Pipe flow — head loss' },
        body: {
          ko: 'Colebrook 식을 풀어 마찰계수를 구하고, 마찰손실과 미소손실을 더해 에너지선을 그립니다. Moody 선도 위에 지금 점이 어디인지도 찍어 줍니다.',
          en: 'The friction factor comes from solving Colebrook; friction and minor losses together give the energy line. The current point is marked on the Moody chart.',
        },
        tip: {
          ko: '<code>"eps": 0.26</code>(거칠기, mm)를 <code>0.0015</code> 로 낮춰 매끈한 관으로 바꿔 보십시오.',
          en: 'Drop <code>"eps": 0.26</code> (roughness in mm) to <code>0.0015</code> for a smooth pipe.',
        },
        kind: 'fence',
        lang: 'pipe',
        src: {
          ko: '{\n  "title": "송수관",\n  "D": 0.4, "L": 1200, "Q": 0.25,\n  "eps": 0.26,\n  "Ke": 0.5, "Kx": 1, "Km": 3,\n  "show": ["energy", "moody"]\n}',
          en: '{\n  "title": "Supply main",\n  "D": 0.4, "L": 1200, "Q": 0.25,\n  "eps": 0.26,\n  "Ke": 0.5, "Kx": 1, "Km": 3,\n  "show": ["energy", "moody"]\n}',
        },
      },
      {
        title: { ko: '관망과 펌프', en: 'Networks and pumps' },
        body: {
          ko: '직렬·병렬 관을 하나의 계통 곡선으로 합치고, 펌프 곡선과 만나는 점에서 운전점을 찾습니다.',
          en: 'Pipes in series or parallel are combined into one system curve; where it meets the pump curve is the operating point.',
        },
        tip: {
          ko: '<code>"kind"</code> 를 <code>"parallel"</code> 로 바꿔 두 관을 나란히 놓아 보십시오. 같은 양수고에서 유량이 늘어납니다.',
          en: 'Change <code>"kind"</code> to <code>"parallel"</code> to put the two pipes side by side — more flow for the same lift.',
        },
        kind: 'fence',
        lang: 'network',
        src: {
          ko: '{\n  "title": "펌프 송수관",\n  "kind": "series",\n  "legs": [\n    { "name": "A", "D": 0.25, "L": 600, "eps": 0.26, "K": 2.5 },\n    { "name": "B", "D": 0.2, "L": 300, "eps": 0.26, "K": 1.5 }\n  ],\n  "pump": { "a": 45, "b": 900 }, "lift": 18,\n  "show": ["schematic", "curve"]\n}',
          en: '{\n  "title": "Pump supply main",\n  "kind": "series",\n  "legs": [\n    { "name": "A", "D": 0.25, "L": 600, "eps": 0.26, "K": 2.5 },\n    { "name": "B", "D": 0.2, "L": 300, "eps": 0.26, "K": 1.5 }\n  ],\n  "pump": { "a": 45, "b": 900 }, "lift": 18,\n  "show": ["schematic", "curve"]\n}',
        },
      },
    ],
  },

  {
    id: 'mohr',
    name: { ko: '모어 원', en: "Mohr's circle" },
    blurb: {
      ko: '응력변환과 파괴포락선. 시험값에서 c·φ 를 맞춘다.',
      en: 'Stress transformation and the failure envelope — with c and φ fitted from test results.',
    },
    steps: [
      {
        title: { ko: '평면응력', en: 'Plane stress' },
        body: {
          ko: '<code>sx</code>·<code>sy</code>·<code>txy</code> 를 주면 주응력과 주면의 방향, 최대전단응력을 원 위에 그려 줍니다.',
          en: 'Give it <code>sx</code>, <code>sy</code> and <code>txy</code> and it draws the principal stresses, the direction of the principal planes and the maximum shear on the circle.',
        },
        tip: {
          ko: '<code>"txy"</code> 를 <code>0</code> 으로 두어 보십시오. 원이 축 위에 앉고 주면이 곧 좌표축이 됩니다.',
          en: 'Set <code>"txy"</code> to <code>0</code>. The circle sits on the axis and the principal planes become the coordinate axes.',
        },
        kind: 'fence',
        lang: 'mohr',
        src: {
          ko: '{\n  "title": "평면응력",\n  "kind": "stress", "unit": "MPa",\n  "sx": 80, "sy": -20, "txy": 30\n}',
          en: '{\n  "title": "Plane stress",\n  "kind": "stress", "unit": "MPa",\n  "sx": 80, "sy": -20, "txy": 30\n}',
        },
      },
      {
        title: { ko: '시험값에서 c·φ', en: 'c and φ from test results' },
        body: {
          ko: '직접전단 시험을 여러 번 하면 그 점들에 파괴포락선을 맞추어 점착력 <code>c</code> 와 내부마찰각 <code>φ</code> 를 냅니다.',
          en: 'Several direct shear tests give points; the failure envelope is fitted to them and yields the cohesion <code>c</code> and the friction angle <code>φ</code>.',
        },
        tip: {
          ko: '세 번째 점의 <code>"tau"</code> 를 <code>140</code> 에서 <code>170</code> 으로 올려 보십시오. 맞춤이 얼마나 흔들리는지, 어긋남이 얼마나 커지는지 보입니다.',
          en: 'Raise the third point\'s <code>"tau"</code> from <code>140</code> to <code>170</code> and see how far the fit moves and how the scatter grows.',
        },
        kind: 'fence',
        lang: 'mohr',
        src: {
          ko: '{\n  "title": "직접전단 시험 세 번",\n  "kind": "direct", "unit": "kPa",\n  "tests": [\n    { "sn": 100, "tau": 68 },\n    { "sn": 200, "tau": 105 },\n    { "sn": 300, "tau": 140 }\n  ]\n}',
          en: '{\n  "title": "Three direct shear tests",\n  "kind": "direct", "unit": "kPa",\n  "tests": [\n    { "sn": 100, "tau": 68 },\n    { "sn": 200, "tau": 105 },\n    { "sn": 300, "tau": 140 }\n  ]\n}',
        },
      },
    ],
  },

  {
    id: 'document',
    name: { ko: '문서로 내기', en: 'Handing it in' },
    blurb: {
      ko: '노트는 Markdown 파일이다. 인쇄·내보내기는 종이에 놓일 모습 그대로 나간다.',
      en: 'A note is a Markdown file. Print and export put on paper exactly what you saw.',
    },
    steps: [
      {
        title: { ko: '글쓰기', en: 'Writing' },
        body: {
          ko: '노트는 Markdown 입니다. 제목·목록·표·인용은 물론, 그림과 표에 번호를 붙이고 본문에서 <code>[@fig:beam]</code> 처럼 가리킬 수 있습니다 — 번호는 앱이 매깁니다.',
          en: 'A note is Markdown: headings, lists, tables, quotes. Figures and tables can be numbered and referred to from the text as <code>[@fig:beam]</code> — the app keeps the numbers right.',
        },
        kind: 'note',
      },
      {
        title: { ko: '내보내기', en: 'Export' },
        body: {
          ko: '파일 › 내보내기 로 Word(<code>.docx</code>)·한글(<code>.hwpx</code>)·PDF·HTML 로 냅니다. 그림은 벡터 그대로, 수식은 <b>편집할 수 있는 수식</b>으로 들어갑니다 — 받은 사람이 워드에서 그대로 고칠 수 있습니다.',
          en: 'File › Export writes Word (<code>.docx</code>), Hangul (<code>.hwpx</code>), PDF or HTML. Figures go in as vectors and formulas as <b>real, editable equations</b> — whoever receives it can edit them in Word.',
        },
        kind: 'note',
      },
      {
        title: { ko: '노트는 글이다', en: 'The note is just text' },
        body: {
          ko: '계산도 그림도 모두 글로 적혀 있습니다. 다른 편집기로 열어도 읽히고, Git 으로 판을 관리할 수 있으며, 십 년 뒤에도 열립니다. 이 페이지에서 고쳐 본 울타리를 그대로 복사해 노트에 붙여넣으면 똑같이 그려집니다.',
          en: 'The calculations and the drawings are all text. It opens in any editor, versions cleanly in Git, and will still open in ten years. Copy any fence you changed on this page straight into a note and it draws the same.',
        },
        kind: 'note',
      },
    ],
  },
];
