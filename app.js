/* Cottony promo site: the language switch, the reveal cards, the gallery and
   the sample board. The board follows docs/design/GAME-DESIGN.md sections 5-7
   and ports scripts/match3.gd for runs, groups and rewards. */
(() => {
  'use strict';

  /* ================================================================ i18n */

  // English lives in the HTML; this is the Portuguese for every data-i18n key.
  const PT = {
    'meta.title': 'Cottony · Um match-3 de pelúcia da Viglet Games',
    'meta.description': 'Cottony é um match-3 de feltro e enchimento, com corações, gotas, estrelas e botões de pelúcia que amassam quando caem e viram nuvem quando estouram. O primeiro jogo da Viglet Games, em desenvolvimento para a Steam.',
    'nav.skip': 'Pular para o conteúdo',
    'nav.label': 'Seções',
    'nav.language': 'Idioma',
    'nav.game': 'O jogo',
    'nav.cast': 'Peças',
    'nav.try': 'Jogue',
    'nav.boosters': 'Ajudas',
    'nav.peek': 'Espiadinha',

    'hero.status': 'Em desenvolvimento · Em breve na Steam',
    'hero.presents': 'Viglet Games apresenta',
    'hero.title': 'O <span class="nw">match-3</span> que dá vontade de <em>apertar</em>.',
    'hero.lead': 'Cottony é um match-3 feito de feltro e enchimento. Corações, gotas, estrelas e botões amassam quando caem e viram nuvenzinhas quando estouram. É o primeiro jogo da Viglet Games, e está sendo costurado agora mesmo.',
    'hero.play': 'Jogue uma amostra',
    'hero.more': 'Veja o que vem aí',
    'hero.fact.board': 'Tabuleiro 8 × 8',
    'hero.fact.pieces': '6 peças de pelúcia',
    'hero.fact.specials': '3 especiais',
    'hero.fact.boosters': '3 ajudas',
    'hero.alt': 'O mascote nuvem do Cottony abraçando o logo de coração, ao lado de um celular com o tabuleiro de pelúcia',

    'game.kicker': 'O jogo',
    'game.title': 'Troque dois vizinhos. Alinhe três. Veja tudo cair.',
    'game.intro': 'Cada fase pede uma pontuação dentro de um limite de movimentos. As combinações somem, as peças de cima caem no buraco e novas peças despencam do topo.',
    'game.soft.title': 'Nada é duro',
    'game.soft.text': 'As peças amassam ao cair, quicam ao se acomodar e deixam um tufo de algodão quando estouram.',
    'game.legible.title': 'Dá pra ler de relance',
    'game.legible.text': 'Cada peça tem cor e formato próprios, então o tabuleiro continua legível para quem não distingue as cores.',
    'game.generous.title': 'Nunca trava',
    'game.generous.text': 'Quando não sobra jogada, o tabuleiro se embaralha sozinho e você segue jogando. Ficou parado cinco segundos? Uma dica acende.',

    'cast.kicker': 'A turma',
    'cast.title': 'Seis peças de pelúcia para combinar',
    'cast.intro': 'Corações, gotas e balas têm carinha. Estrelas, botões e pompons ficam na deles.',
    'piece.heart': 'Coração',
    'piece.drop': 'Gota',
    'piece.star': 'Estrela',
    'piece.button': 'Botão',
    'piece.puff': 'Pompom',
    'piece.candy': 'Bala',

    'specials.title': '…e três que você precisa conquistar',
    'specials.intro': 'Combine mais de três e o tabuleiro te devolve um presente. Toque num cartão para ver qual.',
    'specials.tap': 'Toque para revelar',
    'specials.line.earn': 'Combine 4 em linha',
    'specials.line.name': 'Listrado',
    'specials.line.text': 'Limpa a linha ou a coluna inteira, conforme a direção em que os quatro se alinharam.',
    'specials.bomb.earn': 'Combine em L ou em T',
    'specials.bomb.name': 'Bomba',
    'specials.bomb.text': 'Limpa todas as peças no 3 × 3 ao redor.',
    'specials.rainbow.earn': 'Combine 5 em linha',
    'specials.rainbow.name': 'Arco-íris',
    'specials.rainbow.text': 'Troque com qualquer peça e todas as peças daquele tipo saem do tabuleiro.',
    'specials.chain': 'Um especial atingido por uma explosão também dispara, e um pode acionar o próximo.',

    'combos.title': 'Coloque dois especiais lado a lado',
    'combos.intro': 'Troque um especial com outro e eles disparam juntos, maiores.',
    'combos.ll.name': 'Listrado + listrado',
    'combos.ll.text': 'Limpa a linha e a coluna.',
    'combos.lb.name': 'Listrado + bomba',
    'combos.lb.text': 'Três linhas e três colunas.',
    'combos.bb.name': 'Bomba + bomba',
    'combos.bb.text': 'Tudo num 5 × 5.',
    'combos.rl.name': 'Arco-íris + listrado',
    'combos.rl.text': 'Todas as peças daquele tipo viram listradas, e todas disparam.',
    'combos.rr.name': 'Arco-íris + arco-íris',
    'combos.rr.text': 'Esse a gente deixa você descobrir.',

    'cascade.title': 'Cascatas valem mais',
    'cascade.text': 'Cada vez que as peças que caem formam uma nova combinação sozinhas, o multiplicador sobe.',
    'cascade.label': 'Multiplicador por cascata',
    'cascade.x15': '×1,5',

    'try.kicker': 'Jogue',
    'try.title': 'Um tabuleiro de amostra, aqui mesmo',
    'try.intro': 'Arraste uma peça até a vizinha, ou toque em uma e depois na outra. Você tem 20 movimentos. Faça 2.500 pontos para a primeira estrela.',
    'try.score': 'Pontos',
    'try.moves': 'Movimentos',
    'try.new': 'Novo tabuleiro',
    'try.note': 'Uma amostra web com a arte do Cottony e as regras do seu documento de design. Não é o jogo: sem som, com efeitos mais simples e sem ajudas.',
    'try.boardLabel': 'Tabuleiro de amostra do Cottony. Use as setas para mover, Enter para escolher uma peça e Enter de novo numa vizinha para trocar.',

    'boosters.kicker': 'Ajudas',
    'boosters.title': 'Três ferramentas para um aperto',
    'boosters.intro': 'Usar uma ajuda não gasta movimento, e o que você não usar vai junto para a próxima fase.',
    'boosters.hammer.name': 'Martelo',
    'boosters.hammer.text': 'Tira do tabuleiro a peça em que você tocar.',
    'boosters.shuffle.name': 'Embaralhar',
    'boosters.shuffle.text': 'Mistura o tabuleiro inteiro.',
    'boosters.wand.name': 'Varinha',
    'boosters.wand.text': 'Transforma qualquer peça em arco-íris.',
    'levels.title': 'Três estrelas por fase',
    'levels.text': 'Alcance a meta para uma estrela, 160% dela para duas e 240% para três.',
    'levels.offline.title': 'Sem conta, sem internet',
    'levels.offline.text': 'Suas fases, estrelas e ajudas ficam salvas no seu próprio computador.',
    'levels.motion.title': 'Movimento mais calmo',
    'levels.motion.text': 'Uma opção de movimento reduzido encurta todas as animações e desliga o tremor do tabuleiro.',

    'peek.kicker': 'Espiadinha',
    'peek.title': 'Direto da mesa de costura',
    'peek.intro': 'Arte conceitual ao lado da arte do jogo em produção. Muita coisa ainda vai mudar até o lançamento.',
    'peek.wip': 'Em produção',
    'peek.concept': 'Arte conceitual',
    'peek.screens': 'Título, fase completa e sem movimentos',
    'peek.screens.alt': 'Três telas em produção: a tela de título, um cartão de fase completa com duas estrelas e um cartão de sem movimentos',
    'peek.combo': 'Como um combo acontece, da combinação ao novo especial',
    'peek.combo.alt': 'Arte conceitual de um combo: quatro corações combinados em linha, a eliminação, a cascata e um novo coração arco-íris',
    'peek.board': 'O tabuleiro, desenhado com a arte do próprio jogo',
    'peek.board.alt': 'A tela do tabuleiro do Cottony com a arte de pelúcia gerada para o jogo e um aviso de +1.200 pontos',
    'peek.first': 'A tela do tabuleiro, como foi imaginada',
    'peek.concept.alt': 'Arte conceitual da tela do tabuleiro com fase 12, 24.680 pontos e 18 movimentos restantes',
    'peek.close': 'Fechar',

    'studio.title': 'Criamos aventuras épicas para a Steam.',
    'studio.text': 'A Viglet Games é uma publisher movida a criatividade e carinho. Cottony é a nossa estreia.',
    'studio.casual': 'Jogos casuais e divertidos',
    'studio.connect': 'Experiências que conectam',
    'studio.detail': 'Criatividade em cada detalhe',

    'finale.title': 'Cottony está a caminho da Steam',
    'finale.text': 'A página na loja ainda não abriu. Enquanto isso, mande esta página para alguém que apertaria um coração de pelúcia.',
    'finale.share': 'Compartilhar esta página',
    'finale.soon': 'Página na Steam em breve',

    'foot.text': '© 2026 Viglet Games. Cottony está em desenvolvimento, e tudo o que aparece aqui pode mudar.',
  };

  // Strings the script writes itself, in both languages.
  const TEXT = {
    en: {
      cascade: m => `Cascade ×${m}`,
      shuffle: 'No moves left: reshuffling',
      winTitle: 'Board complete!',
      loseTitle: 'Out of moves',
      points: s => `${s} points`,
      endText: 'That was the sample. The full game adds levels, boosters, sound and a lot more fluff.',
      again: 'Play again',
      live: (s, m) => `Score ${s}. ${m} moves left.`,
      copied: 'Link copied. Go send it to someone.',
      shareTitle: 'Cottony',
      shareText: 'A plush match-3 from Viglet Games, coming to Steam.',
    },
    pt: {
      cascade: m => `Cascata ×${m}`,
      shuffle: 'Sem jogadas: embaralhando',
      winTitle: 'Tabuleiro completo!',
      loseTitle: 'Acabaram os movimentos',
      points: s => `${s} pontos`,
      endText: 'Essa foi a amostra. O jogo completo traz fases, ajudas, som e muito mais fofura.',
      again: 'Jogar de novo',
      live: (s, m) => `Pontos: ${s}. Restam ${m} movimentos.`,
      copied: 'Link copiado. Agora é só mandar para alguém.',
      shareTitle: 'Cottony',
      shareText: 'Um match-3 de pelúcia da Viglet Games, a caminho da Steam.',
    },
  };

  let lang = 'en';
  const t = key => TEXT[lang][key];
  const number = n => n.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US');

  const textNodes = [...document.querySelectorAll('[data-i18n]')];
  const attrNodes = [...document.querySelectorAll('[data-i18n-attr]')];
  const english = new Map();
  textNodes.forEach(node => english.set(node.dataset.i18n, node.innerHTML));
  const attrPairs = node => node.dataset.i18nAttr.split(';').map(pair => pair.split(':'));
  attrNodes.forEach(node => attrPairs(node).forEach(([attr, key]) => english.set(key, node.getAttribute(attr))));

  function setLang(next) {
    lang = next === 'pt' ? 'pt' : 'en';
    const pick = key => (lang === 'pt' && key in PT ? PT[key] : english.get(key));
    textNodes.forEach(node => { node.innerHTML = pick(node.dataset.i18n); });
    attrNodes.forEach(node => attrPairs(node).forEach(([attr, key]) => node.setAttribute(attr, pick(key))));
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-lang]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    try { localStorage.setItem('cottony-lang', lang); } catch { /* private mode */ }
    document.dispatchEvent(new CustomEvent('cottony:lang'));
  }

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  });

  let stored = null;
  try { stored = localStorage.getItem('cottony-lang'); } catch { /* private mode */ }
  const browserPt = (navigator.languages || [navigator.language]).some(l => /^pt\b/i.test(l || ''));
  setLang(stored || (browserPt ? 'pt' : 'en'));

  /* ================================================================ mini boards */

  const PATTERNS = {
    row: (r, c) => (r === 3 && c === 3 ? 'src' : r === 3 ? 'on' : ''),
    bomb: (r, c) => (r === 3 && c === 3 ? 'src' : Math.abs(r - 3) <= 1 && Math.abs(c - 3) <= 1 ? 'on' : ''),
    kind: (r, c) => (r === 3 && c === 3 ? 'src' : SCATTER.has(r * 7 + c) ? 'kind' : ''),
    cross: (r, c) => (r === 3 && c === 3 ? 'src' : r === 3 || c === 3 ? 'on' : ''),
    wide: (r, c) => (r === 3 && c === 3 ? 'src' : Math.abs(r - 3) <= 1 || Math.abs(c - 3) <= 1 ? 'on' : ''),
    big: (r, c) => (r === 3 && c === 3 ? 'src' : Math.abs(r - 3) <= 2 && Math.abs(c - 3) <= 2 ? 'on' : ''),
    kindlines: (r, c) => (SCATTER.has(r * 7 + c) ? 'src' : LINES.rows.has(r) || LINES.cols.has(c) ? 'on' : ''),
    secret: () => '',
  };
  const SCATTER = new Set([1, 11, 16, 27, 28, 38, 47]);
  const LINES = { rows: new Set([0, 4, 6]), cols: new Set([2, 5]) };

  document.querySelectorAll('[data-pattern]').forEach(mini => {
    const rule = PATTERNS[mini.dataset.pattern];
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const cell = document.createElement('i');
        const cls = rule(r, c);
        if (cls) cell.className = cls;
        mini.append(cell);
      }
    }
  });

  /* ================================================================ reveal cards */

  document.querySelectorAll('.special').forEach(card => {
    card.addEventListener('click', () => {
      card.setAttribute('aria-pressed', String(card.getAttribute('aria-pressed') !== 'true'));
    });
  });

  /* ================================================================ gallery */

  const lightbox = document.getElementById('lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const image = lightbox.querySelector('img');
    const caption = lightbox.querySelector('.lightbox-caption');
    document.querySelectorAll('.shot-open').forEach(button => {
      button.addEventListener('click', () => {
        const thumb = button.querySelector('img');
        image.src = button.dataset.full;
        image.alt = thumb.alt;
        caption.textContent = button.closest('figure').querySelector('figcaption span:last-child').textContent;
        lightbox.showModal();
      });
    });
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  /* ================================================================ share */

  const share = document.getElementById('share');
  const shareStatus = document.getElementById('share-status');
  if (share) {
    share.addEventListener('click', async () => {
      const data = { title: t('shareTitle'), text: t('shareText'), url: location.href.split('#')[0] };
      try {
        if (navigator.share) {
          await navigator.share(data);
          return;
        }
        await navigator.clipboard.writeText(data.url);
        shareStatus.textContent = t('copied');
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        shareStatus.textContent = data.url;
      }
    });
  }

  /* ================================================================ sample board */

  const boardRoot = document.getElementById('board');
  if (boardRoot) sampleBoard(boardRoot);

  function sampleBoard(root) {
    const SIZE = 8;
    const MOVES = 20;
    const TARGET = 2500;
    const STARS = [1, 1.6, 2.4];          // of TARGET, section 8
    const NOTCH = [26, 58, 90];           // where the stars sit on the bar, section 3
    const MULT = [1, 1.5, 2, 3, 4, 5];    // by cascade depth, section 7
    const KINDS = ['heart', 'drop', 'star', 'button', 'puff', 'candy'];
    const NONE = '';
    const LINE_H = 'line_h';
    const LINE_V = 'line_v';
    const BOMB = 'bomb';
    const RAINBOW = 'rainbow';

    const EASE_OUT = 'cubic-bezier(.33, 1, .68, 1)';
    const EASE_IN = 'cubic-bezier(.32, 0, .67, 0)';
    const EASE_IN_OUT = 'cubic-bezier(.65, 0, .35, 1)';

    // section 11; reduced motion halves every beat and drops the shake (section 15)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const BEATS = { swap: 140, back: 120, pop: 240, cell: 55, minFall: 120, land: 220, shuffle: 420, intro: 440 };
    const beat = name => Math.round(BEATS[name] * (reduced.matches ? 0.5 : 1));

    const piecesLayer = root.querySelector('.pieces');
    const fxLayer = root.querySelector('.fx');
    const cellsLayer = root.querySelector('.cells');
    const cursorEl = root.querySelector('.cursor');
    const comboTag = root.querySelector('.combo-tag');
    const endLayer = root.querySelector('.board-end');
    const live = document.getElementById('board-live');
    const hudScore = document.getElementById('hud-score');
    const hudMoves = document.getElementById('hud-moves');
    const hudFill = document.getElementById('hud-fill');
    const notches = [...document.querySelectorAll('.bar .notch')];

    let grid = [];
    let score = 0;
    let moves = MOVES;
    let busy = false;
    let over = false;
    let nextId = 1;
    let selected = null;
    let cursor = null;
    let hintTimer = 0;
    let earned = 0;
    let dealing = 0;

    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement('i');
        if ((r + c) % 2) cell.className = 'alt';
        cellsLayer.append(cell);
      }
    }

    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const rand = n => Math.floor(Math.random() * n);
    const inside = (r, c) => r >= 0 && r < SIZE && c >= 0 && c < SIZE;
    const key = (r, c) => r * SIZE + c;
    const unkey = k => [Math.floor(k / SIZE), k % SIZE];
    // a rainbow ignores its kind, so it never lines up with anything
    const matchKind = p => (!p || p.special === RAINBOW ? -1 : p.kind);
    const snapshot = () => grid.map(row => row.map(matchKind));
    const specialAt = (r, c) => (grid[r][c] ? grid[r][c].special : NONE);
    const isLine = s => s === LINE_H || s === LINE_V;

    /* ---------------------------------------------------------- pieces */

    function makePiece(kind) {
      const el = document.createElement('div');
      el.className = 'piece';
      el.dataset.kind = KINDS[kind];
      el.innerHTML = '<div class="body"><img alt="" draggable="false"><span class="mark"></span></div>';
      const piece = { id: nextId++, kind, special: NONE, el, r: 0, c: 0 };
      paint(piece);
      return piece;
    }

    function paint(piece) {
      const src = `assets/pieces/${piece.special === RAINBOW ? 'rainbow' : KINDS[piece.kind]}.webp`;
      piece.el.querySelector('img').src = src;
      piece.el.dataset.special = piece.special;
      piece.el.style.setProperty('--img', `url("${src}")`);
    }

    function place(piece, r, c, ms = 0, ease = EASE_OUT, delay = 0) {
      piece.r = r;
      piece.c = c;
      const style = piece.el.style;
      style.setProperty('--t', `${ms}ms`);
      style.setProperty('--ease', ease);
      style.setProperty('--d', `${delay}ms`);
      style.setProperty('--x', c);
      style.setProperty('--y', r);
    }

    const replay = (el, cls) => {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    };

    /* ---------------------------------------------------------- rules (match3.gd) */

    function runs(k) {
      const out = [];
      const scan = (fixed, horizontal) => {
        let start = 0;
        while (start < SIZE) {
          const kind = horizontal ? k[fixed][start] : k[start][fixed];
          let stop = start + 1;
          if (kind >= 0) {
            while (stop < SIZE && (horizontal ? k[fixed][stop] : k[stop][fixed]) === kind) stop++;
            if (stop - start >= 3) {
              const cells = [];
              for (let i = start; i < stop; i++) cells.push(horizontal ? key(fixed, i) : key(i, fixed));
              out.push(cells);
            }
          }
          start = stop;
        }
      };
      for (let i = 0; i < SIZE; i++) scan(i, true);
      for (let i = 0; i < SIZE; i++) scan(i, false);
      return out;
    }

    // runs merged by flood fill, so an L or a T is one group earning one reward
    function groups(k) {
      const marked = new Set(runs(k).flat());
      const seen = new Set();
      const out = [];
      for (const start of marked) {
        if (seen.has(start)) continue;
        const [sr, sc] = unkey(start);
        const kind = k[sr][sc];
        const cells = [];
        const stack = [start];
        seen.add(start);
        while (stack.length) {
          const cell = stack.pop();
          cells.push(cell);
          const [r, c] = unkey(cell);
          for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
            const nr = r + dr;
            const nc = c + dc;
            if (!inside(nr, nc)) continue;
            const next = key(nr, nc);
            if (marked.has(next) && !seen.has(next) && k[nr][nc] === kind) {
              seen.add(next);
              stack.push(next);
            }
          }
        }
        const members = new Set(cells);
        const h = longest(members, 0, 1);
        const v = longest(members, 1, 0);
        out.push({ kind, cells, h, v, special: reward(h, v) });
      }
      return out;
    }

    function longest(members, dr, dc) {
      let best = 0;
      for (const m of members) {
        const [r, c] = unkey(m);
        if (inside(r - dr, c - dc) && members.has(key(r - dr, c - dc))) continue;
        let length = 0;
        let rr = r;
        let cc = c;
        while (inside(rr, cc) && members.has(key(rr, cc))) {
          length++;
          rr += dr;
          cc += dc;
        }
        best = Math.max(best, length);
      }
      return best;
    }

    // first rule that matches wins, section 6
    function reward(h, v) {
      if (h >= 5 || v >= 5) return RAINBOW;
      if (h >= 3 && v >= 3) return BOMB;
      if (h === 4) return LINE_H;
      if (v === 4) return LINE_V;
      return NONE;
    }

    function completesRun(k, r, c) {
      const kind = k[r][c];
      if (kind < 0) return false;
      const reach = (dr, dc) => {
        let count = 1;
        for (const sign of [1, -1]) {
          let rr = r + dr * sign;
          let cc = c + dc * sign;
          while (inside(rr, cc) && k[rr][cc] === kind) {
            count++;
            rr += dr * sign;
            cc += dc * sign;
          }
        }
        return count;
      };
      return reach(0, 1) >= 3 || reach(1, 0) >= 3;
    }

    // the first swap that would do something, as [[r, c], [r, c]], or null
    function firstMove(k, special = () => NONE) {
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          for (const [dr, dc] of [[0, 1], [1, 0]]) {
            const r2 = r + dr;
            const c2 = c + dc;
            if (!inside(r2, c2)) continue;
            const sa = special(r, c);
            const sb = special(r2, c2);
            if (sa === RAINBOW || sb === RAINBOW || (sa && sb)) return [[r, c], [r2, c2]];
            if (k[r][c] === k[r2][c2]) continue;
            [k[r][c], k[r2][c2]] = [k[r2][c2], k[r][c]];
            const scores = completesRun(k, r, c) || completesRun(k, r2, c2);
            [k[r][c], k[r2][c2]] = [k[r2][c2], k[r][c]];
            if (scores) return [[r, c], [r2, c2]];
          }
        }
      }
      return null;
    }

    function dealKinds() {
      for (;;) {
        const k = [];
        for (let r = 0; r < SIZE; r++) {
          k.push([]);
          for (let c = 0; c < SIZE; c++) {
            let kind;
            do {
              kind = rand(KINDS.length);
            } while (
              (c >= 2 && k[r][c - 1] === kind && k[r][c - 2] === kind) ||
              (r >= 2 && k[r - 1][c] === kind && k[r - 2][c] === kind)
            );
            k[r].push(kind);
          }
        }
        if (firstMove(k)) return k;
      }
    }

    /* ---------------------------------------------------------- flow */

    async function newBoard() {
      const round = ++dealing;
      clearHint();
      select(null);
      over = false;
      busy = true;
      score = 0;
      earned = 0;
      moves = MOVES;
      endLayer.hidden = true;
      piecesLayer.replaceChildren();
      fxLayer.replaceChildren();
      updateHud(true);

      grid = dealKinds().map((row, r) => row.map((kind, c) => {
        const piece = makePiece(kind);
        place(piece, r - SIZE, c);
        piecesLayer.append(piece.el);
        return piece;
      }));
      void piecesLayer.offsetWidth;
      grid.forEach(row => row.forEach(piece => {
        place(piece, piece.r + SIZE, piece.c, beat('intro'), EASE_IN, piece.c * 30 + (SIZE - piece.r) * 12);
      }));
      await wait(beat('intro') + SIZE * 30 + SIZE * 12);
      if (round !== dealing) return;
      grid.forEach(row => row.forEach(piece => replay(piece.el, 'land')));
      busy = false;
      armHint();
    }

    async function trySwap(a, b) {
      if (busy || over) return;
      busy = true;
      clearHint();
      const round = dealing;
      const pa = grid[a[0]][a[1]];
      const pb = grid[b[0]][b[1]];
      await swapPieces(pa, pb, beat('swap'), EASE_OUT);
      if (round !== dealing) return;

      const special = pa.special === RAINBOW || pb.special === RAINBOW || (pa.special && pb.special);
      if (!special && !groups(snapshot()).length) {
        replay(pa.el, 'nope');
        replay(pb.el, 'nope');
        await swapPieces(pa, pb, beat('back'), EASE_IN_OUT);
        if (round !== dealing) return;
        busy = false;
        armHint();
        return;
      }

      moves--;
      updateHud();
      await resolve([a, b], special ? combine(pa, pb) : null, round);
      if (round !== dealing) return;
      await settle(round);
    }

    async function swapPieces(pa, pb, ms, ease) {
      const [ar, ac, br, bc] = [pa.r, pa.c, pb.r, pb.c];
      grid[ar][ac] = pb;
      grid[br][bc] = pa;
      pa.el.classList.add('front');
      place(pa, br, bc, ms, ease);
      place(pb, ar, ac, ms, ease);
      await wait(ms + 16);
      pa.el.classList.remove('front');
    }

    // two specials swapped together, or a rainbow swapped with anything (section 6)
    function combine(moved, other) {
      const cells = new Set([key(moved.r, moved.c), key(other.r, other.c)]);
      const visited = new Set();
      const { r, c } = moved;
      const addRow = row => {
        if (row < 0 || row >= SIZE) return;
        for (let i = 0; i < SIZE; i++) cells.add(key(row, i));
        effect('beam-h', row, c);
      };
      const addCol = col => {
        if (col < 0 || col >= SIZE) return;
        for (let i = 0; i < SIZE; i++) cells.add(key(i, col));
        effect('beam-v', r, col);
      };
      let fired = 0;

      if (moved.special === RAINBOW && other.special === RAINBOW) {
        for (let i = 0; i < SIZE * SIZE; i++) cells.add(i);
        visited.add(moved.id).add(other.id);
        effect('ring', r, c);
        effect('ring', other.r, other.c);
        fired = 2;
      } else if (moved.special === RAINBOW || other.special === RAINBOW) {
        const rainbow = moved.special === RAINBOW ? moved : other;
        const partner = rainbow === moved ? other : moved;
        visited.add(rainbow.id);
        effect('ring', rainbow.r, rainbow.c);
        fired = 1;
        grid.flat().forEach(piece => {
          if (piece.special === RAINBOW || piece.kind !== partner.kind) return;
          if (isLine(partner.special) && piece.special === NONE) {
            piece.special = rand(2) ? LINE_H : LINE_V;
            paint(piece);
          }
          cells.add(key(piece.r, piece.c));
        });
      } else {
        visited.add(moved.id).add(other.id);
        fired = 2;
        if (isLine(moved.special) && isLine(other.special)) {
          addRow(r);
          addCol(c);
        } else if (isLine(moved.special) || isLine(other.special)) {
          for (let d = -1; d <= 1; d++) {
            addRow(r + d);
            addCol(c + d);
          }
        } else {
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) if (inside(r + dr, c + dc)) cells.add(key(r + dr, c + dc));
          }
          effect('ring', r, c);
        }
      }
      return { cells, visited, fired };
    }

    async function resolve(swapCells, blast, round) {
      let depth = 0;
      for (;;) {
        const found = groups(snapshot());
        if (!found.length && !blast) break;

        const clear = new Set(blast ? blast.cells : []);
        const visited = new Set(blast ? blast.visited : []);
        const births = new Map();
        let fired = blast ? blast.fired : 0;

        for (const group of found) {
          group.cells.forEach(cell => clear.add(cell));
          if (group.special) {
            const spot = birthSpot(group, swapCells, births);
            if (spot !== null) births.set(spot, group.special);
          }
        }
        fired += detonate(clear, visited, births);
        births.forEach((_, spot) => clear.delete(spot));

        const cleared = [...clear].filter(cell => grid[unkey(cell)[0]][unkey(cell)[1]]);
        const multiplier = MULT[Math.min(depth, MULT.length - 1)];
        const gained = Math.round((cleared.length * 60 + births.size * 200 + fired * 300) * multiplier);
        score += gained;

        if (depth > 0) showTag(t('cascade')(lang === 'pt' ? String(multiplier).replace('.', ',') : multiplier));
        if (cleared.length) popup(gained, cleared);
        if (fired && !reduced.matches) replay(root, 'quake');

        births.forEach((special, spot) => {
          const [r, c] = unkey(spot);
          const piece = grid[r][c];
          piece.special = special;
          paint(piece);
          replay(piece.el, 'born');
        });
        cleared.forEach(cell => {
          const [r, c] = unkey(cell);
          const piece = grid[r][c];
          piece.el.style.setProperty('--pop', `${beat('pop')}ms`);
          replay(piece.el, 'pop');
          effect('puff', r, c);
        });
        updateHud();

        await wait(beat('pop') + 30);
        if (round !== dealing) return;
        cleared.forEach(cell => {
          const [r, c] = unkey(cell);
          grid[r][c].el.remove();
          grid[r][c] = null;
        });
        await gravity();
        if (round !== dealing) return;
        blast = null;
        swapCells = null;
        depth++;
      }
    }

    // specials caught in the clear fire too, each once (section 6, activation)
    function detonate(clear, visited, births) {
      let fired = 0;
      const queue = [...clear];
      while (queue.length) {
        const cell = queue.pop();
        if (births.has(cell)) continue;
        const [r, c] = unkey(cell);
        const piece = grid[r][c];
        if (!piece || !piece.special || visited.has(piece.id)) continue;
        visited.add(piece.id);
        fired++;
        for (const hit of area(piece)) {
          if (!clear.has(hit)) {
            clear.add(hit);
            queue.push(hit);
          }
        }
      }
      return fired;
    }

    function area(piece) {
      const { r, c, special } = piece;
      const out = [];
      if (special === LINE_H) {
        for (let i = 0; i < SIZE; i++) out.push(key(r, i));
        effect('beam-h', r, c);
      } else if (special === LINE_V) {
        for (let i = 0; i < SIZE; i++) out.push(key(i, c));
        effect('beam-v', r, c);
      } else if (special === BOMB) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) if (inside(r + dr, c + dc)) out.push(key(r + dr, c + dc));
        }
        effect('ring', r, c);
      } else if (special === RAINBOW) {
        // caught in a blast rather than swapped: take the commonest kind on the board
        const counts = new Array(KINDS.length).fill(0);
        grid.flat().forEach(p => { if (p && p.special !== RAINBOW) counts[p.kind]++; });
        const kind = counts.indexOf(Math.max(...counts));
        grid.flat().forEach(p => { if (p && p.special !== RAINBOW && p.kind === kind) out.push(key(p.r, p.c)); });
        effect('ring', r, c);
      }
      return out;
    }

    // the swapped cell if it is in the group, else the intersection, else the
    // middle of the longest run (section 6, creation)
    function birthSpot(group, swapCells, births) {
      const free = group.cells.filter(cell => {
        const [r, c] = unkey(cell);
        return !grid[r][c].special && !births.has(cell);
      });
      if (!free.length) return null;
      const members = new Set(group.cells);
      if (swapCells) {
        for (const [r, c] of swapCells) if (free.includes(key(r, c))) return key(r, c);
      }
      const crossing = free.find(cell => {
        const [r, c] = unkey(cell);
        const across = (c > 0 && members.has(key(r, c - 1))) || (c < SIZE - 1 && members.has(key(r, c + 1)));
        const down = (r > 0 && members.has(key(r - 1, c))) || (r < SIZE - 1 && members.has(key(r + 1, c)));
        return across && down;
      });
      if (crossing !== undefined) return crossing;
      const alongRow = group.h >= group.v;
      const sorted = [...group.cells].sort((a, b) => (alongRow ? (a % SIZE) - (b % SIZE) : a - b));
      const middle = sorted[Math.floor(sorted.length / 2)];
      return free.includes(middle) ? middle : free[0];
    }

    // straight down only, then refill from above (section 5)
    async function gravity() {
      const fallMs = cells => Math.max(beat('minFall'), beat('cell') * cells);
      const moved = [];
      const spawned = [];
      let longestFall = 0;
      for (let c = 0; c < SIZE; c++) {
        let write = SIZE - 1;
        for (let r = SIZE - 1; r >= 0; r--) {
          const piece = grid[r][c];
          if (!piece) continue;
          if (r !== write) {
            grid[write][c] = piece;
            grid[r][c] = null;
            const ms = fallMs(write - r);
            place(piece, write, c, ms, EASE_IN);
            moved.push(piece);
            longestFall = Math.max(longestFall, ms);
          }
          write--;
        }
        const missing = write + 1;
        for (let r = write; r >= 0; r--) {
          const piece = makePiece(rand(KINDS.length));
          place(piece, r - missing, c);
          piecesLayer.append(piece.el);
          grid[r][c] = piece;
          spawned.push([piece, r, missing]);
        }
      }
      void piecesLayer.offsetWidth;
      spawned.forEach(([piece, r, distance]) => {
        const ms = fallMs(distance);
        place(piece, r, piece.c, ms, EASE_IN);
        moved.push(piece);
        longestFall = Math.max(longestFall, ms);
      });
      await wait(longestFall + 10);
      moved.forEach(piece => {
        piece.el.style.setProperty('--land', `${beat('land')}ms`);
        replay(piece.el, 'land');
      });
      await wait(Math.round(beat('land') * 0.5));
    }

    async function settle(round) {
      if (moves <= 0 || score >= TARGET * STARS[2]) {
        finish();
        return;
      }
      if (!firstMove(snapshot(), specialAt)) {
        showTag(t('shuffle'));
        await reshuffle();
        if (round !== dealing) return;
      }
      busy = false;
      armHint();
    }

    // the pieces already on the board, rearranged with a move and no free match
    async function reshuffle() {
      const pool = grid.flat();
      for (let attempt = 0; attempt < 400; attempt++) {
        for (let i = pool.length - 1; i > 0; i--) {
          const j = rand(i + 1);
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const k = [];
        for (let r = 0; r < SIZE; r++) k.push(pool.slice(r * SIZE, (r + 1) * SIZE).map(matchKind));
        const special = (r, c) => pool[key(r, c)].special;
        if (!runs(k).length && firstMove(k, special)) {
          pool.forEach((piece, i) => {
            const [r, c] = unkey(i);
            grid[r][c] = piece;
            place(piece, r, c, beat('shuffle'), EASE_IN_OUT);
          });
          await wait(beat('shuffle') + 20);
          return;
        }
      }
      await newBoard();
    }

    function finish() {
      over = true;
      busy = false;
      clearHint();
      select(null);
      renderEnd();
      endLayer.hidden = false;
      endLayer.querySelector('.end-again').focus({ preventScroll: true });
    }

    function renderEnd() {
      const stars = STARS.filter(s => score >= s * TARGET).length;
      endLayer.querySelector('.end-title').textContent = stars ? t('winTitle') : t('loseTitle');
      endLayer.querySelector('.end-stars').innerHTML = [0, 1, 2]
        .map(i => `<img src="assets/star-${i < stars ? 'gold' : 'dim'}.webp" alt="">`).join('');
      endLayer.querySelector('.end-score').textContent = t('points')(number(score));
      endLayer.querySelector('.end-text').textContent = t('endText');
      endLayer.querySelector('.end-again').textContent = t('again');
    }

    /* ---------------------------------------------------------- hud and effects */

    function barPercent(value) {
      const marks = [0, ...STARS.map(s => s * TARGET)];
      const spots = [0, ...NOTCH];
      for (let i = 1; i < marks.length; i++) {
        if (value <= marks[i]) {
          return spots[i - 1] + ((value - marks[i - 1]) / (marks[i] - marks[i - 1])) * (spots[i] - spots[i - 1]);
        }
      }
      return 100;
    }

    function updateHud(quiet = false) {
      hudScore.textContent = number(score);
      hudMoves.textContent = moves;
      hudMoves.classList.toggle('low', moves > 0 && moves <= 5);
      hudFill.style.width = `${barPercent(score)}%`;
      const stars = STARS.filter(s => score >= s * TARGET).length;
      notches.forEach((notch, i) => {
        notch.src = `assets/star-${i < stars ? 'gold' : 'dim'}.webp`;
        if (!quiet && i < stars && i >= earned) replay(notch, 'earned');
      });
      earned = stars;
      if (!quiet) live.textContent = t('live')(number(score), moves);
    }

    function effect(type, r, c) {
      const at = (el, row, col) => {
        el.style.left = `${((col + 0.5) / SIZE) * 100}%`;
        el.style.top = `${((row + 0.5) / SIZE) * 100}%`;
      };
      let el;
      if (type === 'beam-h' || type === 'beam-v') {
        el = document.createElement('div');
        el.className = `fx-beam ${type === 'beam-h' ? 'h' : 'v'}`;
        if (type === 'beam-h') el.style.top = `${((r + 0.5) / SIZE) * 100}%`;
        else el.style.left = `${((c + 0.5) / SIZE) * 100}%`;
      } else {
        el = document.createElement('img');
        el.alt = '';
        el.className = `fx-${type}`;
        el.src = `assets/fx-${type}.webp`;
        at(el, r, c);
        if (type === 'puff' && Math.random() < 0.5) {
          const spark = document.createElement('img');
          spark.alt = '';
          spark.className = 'fx-twinkle';
          spark.src = 'assets/fx-twinkle.webp';
          at(spark, r - 0.3, c + 0.3);
          spark.addEventListener('animationend', () => spark.remove());
          fxLayer.append(spark);
        }
      }
      el.addEventListener('animationend', () => el.remove());
      fxLayer.append(el);
    }

    function popup(points, cells) {
      let rows = 0;
      let cols = 0;
      cells.forEach(cell => {
        const [r, c] = unkey(cell);
        rows += r;
        cols += c;
      });
      const el = document.createElement('div');
      el.className = 'fx-score';
      el.textContent = `+${number(points)}`;
      el.style.left = `${Math.min(84, Math.max(16, ((cols / cells.length + 0.5) / SIZE) * 100))}%`;
      el.style.top = `${Math.min(88, Math.max(10, ((rows / cells.length + 0.5) / SIZE) * 100))}%`;
      el.addEventListener('animationend', () => el.remove());
      fxLayer.append(el);
    }

    function showTag(text) {
      comboTag.textContent = text;
      replay(comboTag, 'show');
    }

    /* ---------------------------------------------------------- hint */

    // five idle seconds and the pieces of one scoring swap pulse (section 5)
    function armHint() {
      clearTimeout(hintTimer);
      hintTimer = setTimeout(() => {
        if (busy || over) return;
        const move = firstMove(snapshot(), specialAt);
        if (move) move.forEach(([r, c]) => grid[r][c].el.classList.add('hint'));
      }, 5000);
    }

    function clearHint() {
      clearTimeout(hintTimer);
      piecesLayer.querySelectorAll('.hint').forEach(el => el.classList.remove('hint'));
    }

    /* ---------------------------------------------------------- input */

    function select(cell) {
      if (selected) {
        const piece = grid[selected[0]] && grid[selected[0]][selected[1]];
        if (piece) piece.el.classList.remove('selected');
      }
      selected = cell;
      if (cell) grid[cell[0]][cell[1]].el.classList.add('selected');
    }

    const adjacent = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

    function pick(cell) {
      if (busy || over) return;
      clearHint();
      if (selected && adjacent(selected, cell)) {
        const from = selected;
        select(null);
        trySwap(from, cell);
      } else if (selected && selected[0] === cell[0] && selected[1] === cell[1]) {
        select(null);
        armHint();
      } else {
        select(cell);
      }
    }

    function cellAt(event) {
      const rect = root.getBoundingClientRect();
      const c = Math.floor(((event.clientX - rect.left) / rect.width) * SIZE);
      const r = Math.floor(((event.clientY - rect.top) / rect.height) * SIZE);
      return inside(r, c) ? [r, c] : null;
    }

    let drag = null;

    root.addEventListener('pointerdown', event => {
      if (busy || over || event.button > 0) return;
      const cell = cellAt(event);
      if (!cell) return;
      event.preventDefault();
      root.focus({ preventScroll: true });
      root.setPointerCapture(event.pointerId);
      cursorEl.hidden = true;
      clearHint();
      drag = { id: event.pointerId, cell, x: event.clientX, y: event.clientY, dir: null };
    });

    // past a quarter of a cell towards a neighbour, and it swaps on release (section 10)
    root.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const size = root.getBoundingClientRect().width / SIZE;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < size * 0.25) {
        drag.dir = null;
        return;
      }
      drag.dir = Math.abs(dx) > Math.abs(dy) ? [0, Math.sign(dx)] : [Math.sign(dy), 0];
    });

    root.addEventListener('pointerup', event => {
      if (!drag || event.pointerId !== drag.id) return;
      const { cell, dir } = drag;
      drag = null;
      if (dir) {
        const target = [cell[0] + dir[0], cell[1] + dir[1]];
        select(null);
        if (inside(target[0], target[1])) trySwap(cell, target);
        return;
      }
      pick(cell);
    });

    root.addEventListener('pointercancel', () => { drag = null; });

    root.addEventListener('keydown', event => {
      const steps = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (steps[event.key]) {
        event.preventDefault();
        const [dr, dc] = steps[event.key];
        const from = cursor || selected || [3, 3];
        cursor = cursorEl.hidden && !selected ? from : [
          Math.min(SIZE - 1, Math.max(0, from[0] + dr)),
          Math.min(SIZE - 1, Math.max(0, from[1] + dc)),
        ];
        showCursor();
      } else if ((event.key === 'Enter' || event.key === ' ') && event.target === root) {
        event.preventDefault();
        if (!cursor) {
          cursor = [3, 3];
          showCursor();
          return;
        }
        pick(cursor);
      } else if (event.key === 'Escape') {
        select(null);
      }
    });

    function showCursor() {
      cursorEl.hidden = false;
      cursorEl.style.setProperty('--x', cursor[1]);
      cursorEl.style.setProperty('--y', cursor[0]);
      clearHint();
      armHint();
    }

    root.addEventListener('blur', () => { cursorEl.hidden = true; });

    document.getElementById('new-board').addEventListener('click', newBoard);
    endLayer.querySelector('.end-again').addEventListener('click', newBoard);

    document.addEventListener('cottony:lang', () => {
      updateHud(true);
      if (over) renderEnd();
    });

    // deal when the board scrolls into view, so the pieces are seen falling in
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          newBoard();
        }
      }, { threshold: 0.25 });
      observer.observe(root);
    } else {
      newBoard();
    }
  }
})();
