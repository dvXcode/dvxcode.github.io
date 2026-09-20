(() => {
  'use strict';

  const canvas = document.querySelector('#signal-canvas');
  if (!canvas) return;
  const output = canvas.getContext('2d');
  if (!output) return;
  const ribbon = document.createElement('canvas');
  ribbon.width = 1440;
  ribbon.height = 310;
  const context = ribbon.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = false;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const theme = getComputedStyle(document.documentElement);
  const color = name => theme.getPropertyValue(name).trim();
  const colors = ['--accent', '--signal-teal', '--signal-green', '--signal-yellow', '--foreground'].map(color);
  const ink = color('--background');
  const glyphs = {
    '(': [2, 4, 8, 8, 8, 4, 2],
    ')': [8, 4, 2, 2, 2, 4, 8],
    '[': [14, 8, 8, 8, 8, 8, 14],
    ']': [14, 2, 2, 2, 2, 2, 14],
    '{': [3, 4, 4, 8, 4, 4, 3],
    '}': [24, 4, 4, 2, 4, 4, 24],
    '<': [0, 2, 4, 8, 4, 2, 0],
    '>': [0, 8, 4, 2, 4, 8, 0],
    '0': [14, 17, 19, 21, 25, 17, 14], '1': [4, 12, 4, 4, 4, 4, 14],
    '2': [14, 17, 1, 2, 4, 8, 31], '3': [30, 1, 1, 14, 1, 1, 30],
    '4': [2, 6, 10, 18, 31, 2, 2], '5': [31, 16, 16, 30, 1, 1, 30],
    '6': [14, 16, 16, 30, 17, 17, 14], '7': [31, 1, 2, 4, 8, 8, 8],
    '8': [14, 17, 17, 14, 17, 17, 14], '9': [14, 17, 17, 15, 1, 1, 14],
    A: [14, 17, 17, 31, 17, 17, 17], B: [30, 17, 17, 30, 17, 17, 30],
    C: [15, 16, 16, 16, 16, 16, 15], D: [30, 17, 17, 17, 17, 17, 30],
    E: [31, 16, 16, 30, 16, 16, 31], F: [31, 16, 16, 30, 16, 16, 16],
    G: [15, 16, 16, 23, 17, 17, 15], I: [31, 4, 4, 4, 4, 4, 31],
    '+': [0, 4, 4, 31, 4, 4, 0], ':': [0, 4, 4, 0, 4, 4, 0],
    '×': [0, 17, 10, 4, 10, 17, 0], '~': [0, 0, 9, 22, 0, 0, 0],
    '↗': [31, 3, 5, 9, 16, 0, 0], '↖': [31, 24, 20, 18, 1, 0, 0],
    '↘': [0, 0, 16, 9, 5, 3, 31], '↙': [0, 0, 1, 18, 20, 24, 31],
    '↑': [4, 14, 21, 4, 4, 4, 4], '↓': [4, 4, 4, 4, 21, 14, 4],
    '→': [0, 4, 2, 31, 2, 4, 0], '←': [0, 4, 8, 31, 8, 4, 0],
    'ϟ': [2, 6, 12, 31, 6, 12, 8], '#': [21, 31, 21, 31, 21, 31, 21]
  };
  const atlas = new Map();
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let time = 0;
  let frame = null;
  let lastFrame = null;
  let frameElapsed = 0;
  let paused = preference.matches;

  function rect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  // A small bitmap alphabet keeps every character sharp without a font download.
  function glyph(character, x, y, color, size = 1) {
    const key = character + color;
    if (!atlas.has(key)) {
      const tile = document.createElement('canvas');
      tile.width = 15;
      tile.height = 21;
      const pen = tile.getContext('2d');
      pen.fillStyle = color;
      glyphs[character].forEach((bits, row) => {
        for (let column = 0; column < 5; column++) {
          if (bits & (16 >> column)) pen.fillRect(column * 3, row * 3, 3, 3);
        }
      });
      atlas.set(key, tile);
    }
    context.drawImage(atlas.get(key), Math.round(x), Math.round(y), 15 * size, 21 * size);
  }

  function histogram(t) {
    const baseline = 250;
    for (let column = 0; column < 21; column++) {
      const center = 7 + Math.sin(t * 0.45) * 1.3;
      const peak = Math.exp(-(((column - center) / 3.4) ** 2));
      const shoulder = Math.exp(-(((column - 13) / 4.1) ** 2));
      const value = Math.round((peak * 173 + shoulder * 51 + 6) / 12) * 12;
      rect(column * 11, baseline - value, 11, value, colors[1]);
    }
    rect(0, baseline + 19, 230, 2, colors[2]);
    for (let x = 0; x <= 230; x += 23) {
      rect(x, baseline + 20, 2, 3, ink);
      if (x % 69 === 0) rect(x, baseline, 3, 21, colors[4]);
    }
    for (let row = 0; row < 7; row++) {
      const x = row < 2 ? 44 - row * 27 : 14 + (row - 1) * 29;
      rect(x, 24 + row * 29, row % 3 === 0 ? 22 : 34, 4, colors[4]);
    }
    '43CEA9844'.split('').forEach((letter, i) => glyph(letter, i * 23, 284, colors[2], 0.7));
  }

  function node(x, y, color, shape) {
    rect(x, y, 24, 30, color);
    if (shape === 'square') {
      rect(x + 4, y + 6, 16, 18, ink);
      rect(x + 6, y + 8, 12, 14, color);
      rect(x + 8, y + 10, 8, 10, ink);
    } else {
      context.fillStyle = ink;
      context.beginPath();
      context.moveTo(x + 12, y + 5);
      context.lineTo(x + 21, y + 15);
      context.lineTo(x + 12, y + 25);
      context.lineTo(x + 3, y + 15);
      context.fill();
    }
  }

  function routePoint(points, distance) {
    if (distance < 0) return null;
    for (let p = 1; p < points.length; p++) {
      const [x1, y1] = points[p - 1];
      const [x2, y2] = points[p];
      const length = Math.abs(x2 - x1) + Math.abs(y2 - y1);
      if (distance <= length) {
        return {
          x: Math.round(x1 + (x2 - x1) * distance / length),
          y: Math.round(y1 + (y2 - y1) * distance / length)
        };
      }
      distance -= length;
    }
    return null;
  }

  function traveller(points, distance, color, shape) {
    // Sample each segment on the route so the tail follows every corner.
    // Out-of-range samples leave separately at the endpoint before the next pass.
    for (let segment = 9; segment >= 1; segment--) {
      const point = routePoint(points, distance - segment * 12);
      if (!point) continue;
      const size = 16 - segment;
      const tailColor = colors[segment < 3 ? 2 : segment < 6 ? 1 : 0];
      rect(point.x - size / 2, point.y - size / 2, size, size, tailColor);
    }
    const head = routePoint(points, distance);
    if (head) node(head.x - 12, head.y - 15, color, shape);
  }

  function routes(t) {
    for (let x = 255; x < 570; x += 58) {
      for (let y = 37; y < 300; y += 58) rect(x, y, 2, 4, colors[2]);
    }
    const main = [[258, 40], [332, 40], [332, 226], [442, 226], [442, 91], [556, 91]];
    const branch = [[332, 106], [332, 226], [442, 226], [474, 226], [474, 186], [556, 186]];
    const paths = [main, [[442, 226], [474, 226], [474, 186], [556, 186]]];
    paths.forEach((points) => {
      for (let p = 1; p < points.length; p++) {
        const [x1, y1] = points[p - 1];
        const [x2, y2] = points[p];
        const length = Math.abs(x2 - x1) + Math.abs(y2 - y1);
        for (let step = 0; step < length; step += 18) {
          const x = x1 + (x2 - x1) * step / length;
          const y = y1 + (y2 - y1) * step / length;
          if (x1 === x2) glyph(y2 > y1 ? '↓' : '↑', x - 4, y, colors[0], 0.55);
          else glyph('→', x, y - 5, colors[0], 0.55);
        }
      }
    });
    const travellers = [
      { points: main, speed: 94, phase: 160, color: colors[2], shape: 'square' },
      { points: main, speed: 86, phase: 460, color: colors[4], shape: 'diamond' },
      { points: branch, speed: 108, phase: 280, color: colors[1], shape: 'square' }
    ];
    travellers.forEach(({ points, speed, phase, color, shape }) => {
      const length = points.slice(1).reduce((total, [x, y], i) =>
        total + Math.abs(x - points[i][0]) + Math.abs(y - points[i][1]), 0);
      const distance = (t * speed + phase) % (length + 144) - 18;
      traveller(points, distance, color, shape);
    });
  }

  function waves(t) {
    for (let row = 0; row < 8; row++) {
      const baseline = 49 + row * 34;
      const color = colors[[2, 0, 2, 3, 1, 1, 2, 3][row]];
      for (let column = 0; column < 23; column++) {
        const phase = column * 0.49 - t * 0.62 + row * 1.37;
        const amplitude = (Math.sin(phase) + Math.sin(phase * 0.53 + row) * 0.55 + 0.4) * 15;
        const value = Math.max(0, Math.round(amplitude / 5) * 5);
        const x = 569 + column * 15;
        if (value > 0) rect(x, baseline - value, 15, Math.min(value, 29), color);
        else if (column % 2 === row % 2) glyph('~', x, baseline - 16, color, 0.7);
      }
    }
  }

  function field(t) {
    const phase = Math.floor(t * 2);
    const symbols = 'I0+01#ϟA×:1';
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 25; column++) {
        const x = 914 + column * 22;
        const y = 16 + row * 34;
        const matrix = column >= 16 || (row >= 4 && column >= 13 - row * 2);
        if (matrix) {
          const band = Math.floor(column / 3 + row * 0.6 + Math.sin(t * 0.35 + row) * 1.8);
          const color = colors[((band % 5) + 5) % 5];
          rect(x, y, 22, 34, color);
          const letter = column >= 16
            ? 'ABCDEFG'[(Math.floor(column / 2) + row + phase % 7) % 7]
            : symbols[(column * 3 + row * 5 + phase) % symbols.length];
          glyph(letter, x + 3, y + 6, ink);
        } else {
          const bend = 7 + Math.sin(t * 0.55 + row * 0.38) * 2;
          const direction = column < bend - 2 ? (row < 2 ? '↖' : '←')
            : column < bend ? '↑' : column < bend + 2 ? '↗' : '→';
          const lit = Math.abs(column - (bend - row * 0.45)) < 0.85;
          if (lit) rect(x, y, 22, 34, colors[row % 2 === 0 ? 4 : 2]);
          glyph(lit ? 'ϟ' : direction, x + 3, y + 7, lit ? ink : colors[(column + row) % 6 === 0 ? 4 : row < 2 ? 2 : 0], 0.85);
        }
      }
    }
  }

  function bracketPattern(t) {
    const motif = '{[(<<{[(<<{>>)]}>>)]}';
    const pitch = 28;
    const period = motif.length * pitch;
    const rowColors = [0, 3, 1, 2, 0, 1, 0, 3];
    const opacity = context.globalAlpha;

    for (let row = 0; row < 8; row++) {
      const direction = row % 2 === 0 ? 1 : -1;
      const speed = 11 + row % 3 * 3;
      const scroll = ((t * speed * direction + row * 47) % period + period) % period;
      const first = Math.floor(-scroll / pitch) - 1;
      const last = Math.ceil((1440 - scroll) / pitch) + 1;
      const base = colors[rowColors[row]];
      const glow = colors[row % 3 === 0 ? 4 : 2];

      for (let column = first; column <= last; column++) {
        const index = ((column % motif.length) + motif.length) % motif.length;
        const position = column * pitch + scroll;
        // A shared wave compresses the spacing and lifts neighboring characters.
        const wave = position * 0.013 - t * 0.9 + row * 0.62;
        const x = position + Math.sin(wave) * 6;
        const y = 17 + row * 37 + Math.sin(wave * 0.72) * 3;
        const shimmer = (Math.sin(position * 0.005 - t * 0.42 + row * 0.7) + 1) * 0.3;
        context.globalAlpha = opacity;
        glyph(motif[index], x, y, base, 1.2);
        // Overlay a fixed palette color. This keeps the bitmap atlas bounded.
        context.globalAlpha = opacity * shimmer;
        glyph(motif[index], x, y, glow, 1.2);
      }
    }
    context.globalAlpha = opacity;
  }

  function signalPattern(t) {
    histogram(t);
    routes(t);
    waves(t);
    field(t);
  }

  const patterns = [signalPattern, bracketPattern];
  const holdSeconds = 7;
  const transitionSeconds = 3;

  function draw() {
    const sceneSeconds = holdSeconds + transitionSeconds;
    const scene = Math.floor(time / sceneSeconds) % patterns.length;
    const progress = Math.max(0, (time % sceneSeconds - holdSeconds) / transitionSeconds);
    const blend = progress * progress * (3 - 2 * progress);

    // Resize complete bitmaps so the pixel blocks stay joined and sharp.
    const scale = Math.max(width / ribbon.width, height / ribbon.height);
    const scaledWidth = Math.round(ribbon.width * scale * pixelRatio);
    const scaledHeight = Math.round(ribbon.height * scale * pixelRatio);
    const x = Math.round((canvas.width - scaledWidth) / 2);
    const y = Math.round((canvas.height - scaledHeight) / 2);

    function paint(index, opacity) {
      // Opaque scenes crossfade without a dark flash or an empty frame.
      rect(0, 0, ribbon.width, ribbon.height, ink);
      patterns[index](time);
      output.globalAlpha = opacity;
      output.drawImage(ribbon, x, y, scaledWidth, scaledHeight);
    }

    paint(scene, 1);
    if (blend > 0) paint((scene + 1) % patterns.length, blend);
    output.globalAlpha = 1;
  }

  function tick(now) {
    frame = null;
    if (paused || document.hidden) return;
    if (lastFrame === null) lastFrame = now;
    const elapsed = Math.min(now - lastFrame, 100);
    lastFrame = now;
    time += elapsed / 1000;
    frameElapsed += elapsed;
    if (frameElapsed >= 1000 / 24) {
      frameElapsed %= 1000 / 24;
      draw();
    }
    frame = window.requestAnimationFrame(tick);
  }

  function syncMotion() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    lastFrame = null;
    frameElapsed = 0;
    if (!paused && !document.hidden) frame = window.requestAnimationFrame(tick);
  }

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    output.imageSmoothingEnabled = false;
    draw();
  }

  resize();
  new ResizeObserver(resize).observe(canvas);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', syncMotion);
  preference.addEventListener('change', () => {
    paused = preference.matches;
    syncMotion();
  });
  syncMotion();
})();
