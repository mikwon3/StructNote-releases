/* 따라하기 페이지의 움직임.
 *
 * 글(content.js)과 엔진(engine.js)을 받아 한 화면에 한 단계씩 보여 준다. 왼쪽 칸을 고치면
 * 오른쪽을 다시 그린다 — 앱과 **같은 엔진**이 여기서 돌기 때문에, 여기서 맞으면 노트에서도 맞다.
 */
(function () {
  'use strict';

  var page = document.getElementById('page');
  var railEl = document.getElementById('rail');
  var trackEl = document.getElementById('track');
  var fallback = document.getElementById('fallback');
  var TRACKS = window.TRACKS || [];
  var CN = window.CN;

  var lang = 'ko';
  var ti = 0; // 갈래
  var si = 0; // 단계
  var edits = {}; // '갈래.단계.언어' → 고쳐 놓은 원문
  var timer = null;

  var T = function (o) {
    return o && typeof o === 'object' ? o[lang] || o.ko || '' : o || '';
  };
  var esc = function (s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  };
  var say = function (ko, en) {
    return lang === 'en' ? en : ko;
  };

  /** 엔진을 못 불렀을 때의 알림. 말을 고르기 **전**에 뜰 수 있어 두 언어를 함께 적는다. */
  function sayNoEngine() {
    fallback.hidden = false;
    fallback.innerHTML =
      '<span class="ko">계산 엔진을 불러오지 못했습니다. 글과 적어 넣을 것은 그대로 보이지만 ' +
      '그림은 그려지지 않습니다.</span>' +
      '<span class="en">The calculation engine did not load. The text and the sources are still ' +
      'here, but nothing is drawn.</span>';
  }
  if (!CN || !CN.run) sayNoEngine();

  // ── 기능 목록 ────────────────────────────────────────────────
  function drawRail() {
    railEl.innerHTML = '';
    TRACKS.forEach(function (tr, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = '<i>' + String(i + 1).padStart(2, '0') + '</i><span>' + esc(T(tr.name)) + '</span>';
      if (i === ti) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () {
        go(i, 0);
      });
      li.appendChild(b);
      railEl.appendChild(li);
    });
  }

  // ── 계산 블록의 결과 ─────────────────────────────────────────
  function calcOut(src) {
    var r;
    try {
      r = CN.run('```calc\n' + src + '\n```');
    } catch (e) {
      return '<p class="err-line">' + esc((e && e.message) || e) + '</p>';
    }
    var rows = [];
    var errs = [];
    r.result.blocks.forEach(function (b) {
      if (b.kind !== 'calc') return;
      b.lines.forEach(function (l) {
        var msg = (l.error && l.error.message) || (l.resultError && l.resultError.message);
        if (msg) {
          errs.push(l.source.trim() + ' — ' + msg);
          return;
        }
        if (l.check) {
          rows.push(
            '<tr><td class="src">' + esc(l.check.label || l.source.trim()) + '</td>' +
              '<td class="val"><span class="badge ' + (l.check.ok ? 'ok">O.K' : 'ng">N.G') + '</span></td></tr>',
          );
        } else if (l.display) {
          rows.push(
            '<tr><td class="src">' + esc(l.defines || l.source.trim()) + '</td>' +
              '<td class="val">' + esc(l.display.label) + '</td></tr>',
          );
        }
      });
    });
    var html = '';
    if (r.changed)
      html +=
        '<p class="note-line">' +
        say(
          '단위 표기를 정리한 뒤 계산했습니다 — 앱도 줄을 떠날 때 같은 일을 합니다.',
          'Units were tidied before evaluating — the app does the same as you leave a line.',
        ) +
        '</p>';
    html += rows.length
      ? '<table class="res">' + rows.join('') + '</table>'
      : '<p class="err-line">' + say('보여 줄 값이 없습니다.', 'Nothing to show yet.') + '</p>';
    errs.forEach(function (e) {
      html += '<p class="err-line">' + esc(e) + '</p>';
    });
    return html;
  }

  function fenceOut(src, fenceLang) {
    try {
      var f = CN.renderers('')[fenceLang];
      if (!f) return '<p class="err-line">' + esc(fenceLang) + ': renderer missing</p>';
      return f(src, fenceLang, 0);
    } catch (e) {
      return '<p class="err-line">' + esc((e && e.message) || e) + '</p>';
    }
  }

  function redraw() {
    var st = TRACKS[ti].steps[si];
    var out = document.getElementById('out');
    if (!out || st.kind === 'note') return;
    var src = current(st);
    if (!CN || !CN.run) {
      out.textContent = src;
      return;
    }
    if (st.kind === 'calc') {
      out.className = 'out';
      out.innerHTML = calcOut(src);
    } else {
      out.className = 'out fig';
      out.innerHTML = fenceOut(src, st.lang);
    }
  }

  /** 울타리를 여는 줄: ```calc · ```soil … */
  function fenceOpen(st) {
    return '```' + (st.kind === 'calc' ? 'calc' : st.lang);
  }
  /** 노트에 그대로 붙여넣을 수 있는 온전한 울타리 — 여는 줄·몸통·닫는 줄. */
  function whole(st, body) {
    return fenceOpen(st) + '\n' + body + '\n```';
  }

  function key(st) {
    return ti + '.' + si + '.' + lang;
  }
  function original(st) {
    return T(st.src);
  }
  function current(st) {
    var k = key(st);
    return Object.prototype.hasOwnProperty.call(edits, k) ? edits[k] : original(st);
  }

  // ── 한 단계 ──────────────────────────────────────────────────
  function drawStep() {
    var tr = TRACKS[ti];
    var st = tr.steps[si];
    var n = tr.steps.length;

    var head =
      '<header><h2>' + esc(T(tr.name)) + '</h2><p class="blurb">' + esc(T(tr.blurb)) + '</p></header>';

    var lab = '';
    if (st.kind !== 'note') {
      // 여는 줄과 닫는 줄을 **보이게** 둔다. 울타리는 ```이름 으로 열고 ``` 로 닫아야 하는데,
      // 가운데 몸통만 보여 주면 닫는 줄을 빠뜨린 채 노트에 옮겨 적게 된다.
      lab =
        '<div class="lab">' +
        '<div class="pane"><header><span>' +
        say('노트에 적는 것', 'What you write in the note') +
        '</span><span class="sp"></span>' +
        '<button class="mini" id="reset" type="button">' + say('처음으로', 'Reset') + '</button>' +
        '<button class="mini" id="copy" type="button">' + say('복사', 'Copy') + '</button>' +
        '</header>' +
        '<div class="fence open" aria-hidden="true">' + esc(fenceOpen(st)) + '</div>' +
        '<textarea id="src" spellcheck="false" aria-label="' +
        say('고쳐 보는 칸', 'Editable source') + '"></textarea>' +
        '<div class="fence close" aria-hidden="true">```</div></div>' +
        '<div class="pane"><header>' +
        say('앱이 내놓는 것', 'What the app gives you') +
        '</header><div class="out' + (st.kind === 'calc' ? '' : ' fig') + '" id="out"></div></div>' +
        '</div>';
    }

    var dots = '';
    for (var i = 0; i < n; i++)
      dots +=
        '<button type="button" data-go="' + i + '" aria-label="' +
        say('단계 ', 'Step ') + (i + 1) + '"' + (i === si ? ' aria-current="true"' : '') + '></button>';

    trackEl.innerHTML =
      head +
      '<div class="step"><span class="no">' +
      String(si + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0') +
      '</span><h3>' + esc(T(st.title)) + '</h3><p>' + T(st.body) + '</p>' +
      (st.tip ? '<p class="tip">' + T(st.tip) + '</p>' : '') +
      lab +
      '</div>' +
      '<div class="nav">' +
      '<button type="button" id="prev">← ' + say('앞으로', 'Back') + '</button>' +
      '<div class="dots">' + dots + '</div>' +
      '<button type="button" class="go" id="next">' + say('다음', 'Next') + ' →</button>' +
      '</div>';

    var ta = document.getElementById('src');
    if (ta) {
      ta.value = current(st);
      ta.rows = Math.min(26, Math.max(9, ta.value.split('\n').length + 1));
      ta.setAttribute('wrap', 'off');
      ta.addEventListener('input', function () {
        edits[key(st)] = ta.value;
        clearTimeout(timer);
        timer = setTimeout(redraw, 220);
      });
      document.getElementById('reset').addEventListener('click', function () {
        delete edits[key(st)];
        ta.value = original(st);
        redraw();
        ta.focus();
      });
      document.getElementById('copy').addEventListener('click', function (e) {
        var b = e.currentTarget;
        var done = function () {
          var was = b.textContent;
          b.textContent = say('복사됨', 'Copied');
          setTimeout(function () {
            b.textContent = was;
          }, 1300);
        };
        var pick = function () {
          ta.select();
        };
        try {
          navigator.clipboard.writeText(whole(st, ta.value)).then(done, pick);
        } catch (err) {
          pick();
        }
      });
      redraw();
    }

    document.getElementById('prev').disabled = si === 0 && ti === 0;
    document.getElementById('prev').addEventListener('click', function () {
      if (si > 0) go(ti, si - 1);
      else if (ti > 0) go(ti - 1, TRACKS[ti - 1].steps.length - 1);
    });
    var next = document.getElementById('next');
    next.disabled = ti === TRACKS.length - 1 && si === n - 1;
    next.addEventListener('click', function () {
      if (si < n - 1) go(ti, si + 1);
      else if (ti < TRACKS.length - 1) go(ti + 1, 0);
    });
    Array.prototype.forEach.call(trackEl.querySelectorAll('.dots button'), function (b) {
      b.addEventListener('click', function () {
        go(ti, +b.getAttribute('data-go'));
      });
    });
  }

  function go(nextTrack, nextStep) {
    var first = ti === nextTrack && si === nextStep;
    ti = nextTrack;
    si = nextStep;
    try {
      history.replaceState(null, '', '#' + TRACKS[ti].id);
    } catch (e) {
      /* 주소를 못 바꿔도 페이지는 돈다 */
    }
    drawRail();
    drawStep();
    if (!first) trackEl.scrollIntoView({ block: 'nearest' });
  }

  // ── 말 고르기 ────────────────────────────────────────────────
  function setLang(next, remember) {
    lang = next;
    page.setAttribute('data-lang', lang);
    document.getElementById('b-ko').setAttribute('aria-pressed', String(lang === 'ko'));
    document.getElementById('b-en').setAttribute('aria-pressed', String(lang === 'en'));
    document.title = lang === 'en' ? 'CivilNote Walkthrough' : 'CivilNote 따라하기';
    // 화면을 읽어 주는 장치가 어느 말인지 알아야 제대로 읽는다.
    try {
      document.documentElement.lang = lang;
    } catch (e) {
      /* 못 바꿔도 페이지는 돈다 */
    }
    if (CN && CN.setLang) CN.setLang(lang);
    if (remember) {
      try {
        localStorage.setItem('civilnote-tutorial-lang', lang);
      } catch (e) {
        /* 사생활 모드 — 이번 판에서만 쓴다 */
      }
    }
    drawRail();
    drawStep();
  }

  document.getElementById('b-ko').addEventListener('click', function () {
    setLang('ko', true);
  });
  document.getElementById('b-en').addEventListener('click', function () {
    setLang('en', true);
  });

  // 좌우 화살표로 넘긴다. 글을 고치는 중에는 건드리지 않는다.
  document.addEventListener('keydown', function (e) {
    var el = document.activeElement;
    if (el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')) return;
    if (e.key === 'ArrowRight') document.getElementById('next').click();
    else if (e.key === 'ArrowLeft') document.getElementById('prev').click();
  });

  // ── 시작 ─────────────────────────────────────────────────────
  document.getElementById('f-tracks').textContent = String(TRACKS.length);
  document.getElementById('f-steps').textContent = String(
    TRACKS.reduce(function (n, t) {
      return n + t.steps.length;
    }, 0),
  );

  function fromHash() {
    var h = (location.hash || '').replace('#', '');
    return TRACKS.findIndex(function (t) {
      return t.id === h;
    });
  }
  var found = fromHash();
  if (found >= 0) ti = found;

  // 주소의 #갈래 로 건너뛴다. 링크를 건네받아 눌렀을 때도 그 갈래로 간다.
  window.addEventListener('hashchange', function () {
    var i = fromHash();
    if (i >= 0 && i !== ti) go(i, 0);
  });

  /**
   * 처음 열 때 어느 말로 보일지 고른다. 앞의 것이 이긴다.
   *
   *   1. 주소의 `?lang=` — 앱이 제 메뉴 언어로 열 때 쓴다.
   *   2. 지난번에 고른 것.
   *   3. **브라우저의 말.** 이것이 없으면 링크를 받은 사람에게 늘 한국어로 열려,
   *      영문 사용자에게는 영문판이 없는 것이나 마찬가지가 된다.
   *   4. 한국어.
   */
  function firstLang() {
    try {
      var asked = new URLSearchParams(location.search).get('lang');
      if (asked === 'en' || asked === 'ko') return asked;
    } catch (e) {
      /* 주소를 읽지 못해도 아래로 넘어간다 */
    }
    try {
      var saved = localStorage.getItem('civilnote-tutorial-lang');
      if (saved === 'en' || saved === 'ko') return saved;
    } catch (e) {
      /* 사생활 모드 — 아래로 넘어간다 */
    }
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^ko\b/i.test(nav) ? 'ko' : 'en';
  }
  setLang(firstLang(), false);
})();
