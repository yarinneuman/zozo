/* Zozo — charts: MA150 signal chart (lightweight-charts), Fear & Greed gauge, TradingView live widget. */
(function () {
  const Z = (window.ZozoCharts = {});

  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const isDark = () => {
    const t = document.documentElement.getAttribute('data-theme');
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  Z.isDark = isDark;

  /** simple moving average; returns array aligned with input (null until n values exist) */
  Z.sma = function (values, n) {
    const out = new Array(values.length).fill(null);
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
      sum += values[i];
      if (i >= n) sum -= values[i - n];
      if (i >= n - 1) out[i] = sum / n;
    }
    return out;
  };

  /* ---------- MA150 signal chart ---------- */
  const live = new Set();
  let cancelBatch = null;
  Z.destroyAll = function () {
    if (cancelBatch) { cancelBatch(); cancelBatch = null; }
    live.forEach((c) => { try { c.remove(); } catch (e) {} }); live.clear();
  };

  // On a big red-streak day the signals page can list 100-200+ stocks. Creating a lightweight-charts
  // instance (canvas + its own ResizeObserver) for every one of them synchronously, in one go, blocks
  // the main thread for many seconds and the tab looks frozen. Instead, build them a few at a time,
  // yielding back to the browser between batches so it can keep painting and respond to input.
  Z.lazySignalCharts = function (cards) {
    if (cancelBatch) cancelBatch();
    // a hard cap per batch, not just a time budget: some environments (backgrounded/non-rendering tabs)
    // report an idle deadline that never runs out, which would otherwise collapse this back into building
    // every chart in one synchronous pass. A fixed batch size guarantees we always yield regularly.
    const BATCH = 1;
    let i = 0, handle = null, stopped = false;
    const step = () => {
      const end = Math.min(i + BATCH, cards.length);
      for (; i < end; i++) {
        const c = cards[i];
        // a chart built while #main's .28s page-enter animation (zozo.css) is still running can hit the
        // chart library's own resize handling mid-transition and throw; one bad chart shouldn't stop the rest.
        if (c.el) { try { Z.signalChart(c.el, c.item); } catch (e) {} }
      }
      if (i < cards.length && !stopped) handle = setTimeout(step, 0);
    };
    // let the page-enter animation finish first so the first charts aren't built mid-transition
    handle = setTimeout(step, 300);
    cancelBatch = () => { stopped = true; clearTimeout(handle); };
  };

  Z.signalChart = function (el, item) {
    if (!window.LightweightCharts || !item.ohlc || item.ohlc.length < 30) {
      el.insertAdjacentHTML('beforeend', '<div class="empty" style="margin:16px;border-style:solid">אין נתוני מחיר לגרף</div>');
      return;
    }
    const rows = item.ohlc;
    const closes = rows.map((r) => r[4]);
    const s150 = Z.sma(closes, 150), s20 = Z.sma(closes, 20);
    const up = css('--up'), down = css('--down');
    const chart = LightweightCharts.createChart(el, {
      autoSize: true,
      layout: { background: { type: 'solid', color: css('--card') }, textColor: css('--muted'), fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 },
      grid: { vertLines: { visible: false }, horzLines: { color: css('--line') } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, rightOffset: 4 },
      crosshair: { mode: 1 },
      handleScroll: { mouseWheel: false, pressedMouseMove: true, horzTouchDrag: true, vertTouchDrag: false },
      handleScale: { mouseWheel: false, pinch: true },
    });
    live.add(chart);

    const vol = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '', lastValueVisible: false, priceLineVisible: false });
    vol.priceScale().applyOptions({ scaleMargins: { top: 0.84, bottom: 0 } });
    vol.setData(rows.map((r) => ({ time: r[0], value: r[5] || 0, color: (r[4] >= r[1] ? up : down) + '40' })));

    const candles = chart.addCandlestickSeries({ upColor: up, downColor: down, wickUpColor: up, wickDownColor: down, borderVisible: false, priceLineVisible: false });
    candles.priceScale().applyOptions({ scaleMargins: { top: 0.08, bottom: 0.2 } });
    candles.setData(rows.map((r) => ({ time: r[0], open: r[1], high: r[2], low: r[3], close: r[4] })));

    const line = (arr, color, width) => {
      const s = chart.addLineSeries({ color, lineWidth: width, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false });
      s.setData(rows.map((r, i) => (arr[i] == null ? null : { time: r[0], value: +arr[i].toFixed(2) })).filter(Boolean));
    };
    line(s20, css('--sma20'), 1.5);
    line(s150, css('--sma150'), 2.5);

    const last = rows[rows.length - 1];
    candles.setMarkers([{ time: last[0], position: 'belowBar', color: css('--accent'), shape: 'arrowUp', text: item.type === 'cross' ? 'חציה' : item.type === 'above' ? 'סגירה מעל' : 'נגיעה' }]);
    chart.timeScale().setVisibleLogicalRange({ from: Math.max(0, rows.length - 170), to: rows.length + 3 });
  };

  /* ---------- Fear & Greed gauge (SVG) ---------- */
  Z.gauge = function (score) {
    const cx = 160, cy = 150, r = 120, w = 26;
    const bands = [[0, 25, '--down'], [25, 45, '--amber'], [45, 55, '--faint'], [55, 75, '--sma20'], [75, 100, '--up']];
    const pt = (v, rad) => {
      const a = Math.PI * (1 - v / 100);
      return [cx + rad * Math.cos(a), cy - rad * Math.sin(a)];
    };
    const arc = (a, b) => {
      const [x1, y1] = pt(a, r), [x2, y2] = pt(b, r);
      return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    };
    const has = typeof score === 'number';
    const [nx, ny] = pt(has ? Math.max(0, Math.min(100, score)) : 50, r - 34);
    let s = `<svg viewBox="0 0 320 172" role="img" aria-label="מדד פחד ותאוות בצע: ${has ? score : 'אין נתון'}">`;
    bands.forEach(([a, b, c]) => {
      s += `<path d="${arc(a + 0.6, b - 0.6)}" fill="none" stroke="var(${c})" stroke-width="${w}" opacity="${has && score >= a && score < b + (b === 100 ? 1 : 0) ? 1 : 0.28}"/>`;
    });
    [0, 25, 50, 75, 100].forEach((v) => {
      const [x, y] = pt(v, r + 24);
      s += `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="var(--faint)">${v}</text>`;
    });
    if (has) s += `<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="9" fill="var(--ink)"/>`;
    return s + '</svg>';
  };

  Z.fgLabel = function (score) {
    if (typeof score !== 'number') return '—';
    if (score < 25) return 'פחד קיצוני';
    if (score < 45) return 'פחד';
    if (score <= 55) return 'ניטרלי';
    if (score <= 75) return 'חמדנות';
    return 'חמדנות קיצונית';
  };

  /* ---------- TradingView live widget (with SMA150 + SMA20) ---------- */
  let tvLoading = null;
  const loadTV = () => tvLoading || (tvLoading = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://s3.tradingview.com/tv.js';
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  }));
  let tvId = 0;
  Z.tvWidget = function (el, symbol) {
    const id = 'tv_' + (++tvId);
    if (window.ZOZO_ARTIFACT) {
      // Artifact pages can't embed other sites: link out instead.
      const u = 'https://www.tradingview.com/chart/?symbol=' + encodeURIComponent(symbol);
      el.innerHTML = `<div dir="rtl" style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;text-align:center">
        <div class="tkr" style="font-size:28px">${symbol.replace(/[^A-Z0-9.\-]/gi, '')}</div>
        <p class="muted" style="max-width:40ch">גרף חי עם SMA150 ו-SMA20 נפתח ב-TradingView.</p>
        <a class="btn primary" href="${u}" target="_blank" rel="noopener">פתח גרף חי</a></div>`;
      el.style.height = 'auto'; el.style.minHeight = '200px';
      return;
    }
    el.innerHTML = `<div id="${id}" style="height:100%"></div>`;
    loadTV().then(() => {
      new window.TradingView.widget({
        container_id: id, autosize: true, symbol, interval: 'D', timezone: 'Asia/Jerusalem',
        theme: isDark() ? 'dark' : 'light', style: '1', locale: 'he_IL',
        hide_side_toolbar: true, allow_symbol_change: false, withdateranges: true, save_image: false,
        studies: [
          { id: 'MASimple@tv-basicstudies', inputs: { length: 150 } },
          { id: 'MASimple@tv-basicstudies', inputs: { length: 20 } },
        ],
      });
    }).catch(() => {
      el.innerHTML = `<div class="empty" style="margin:16px;border-style:solid">לא ניתן לטעון גרף חי. <a href="https://www.tradingview.com/chart/?symbol=${encodeURIComponent(symbol)}" target="_blank" rel="noopener">פתח ב-TradingView</a></div>`;
    });
  };
})();
