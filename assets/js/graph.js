/* quantsworld — D3 force graph
 * Called by index.html after injecting GRAPH_NODES, GRAPH_EDGES, GRAPH_FIELDS_BASE
 * via Liquid/Jekyll data. */

const CAT = {
  cs:      { h: '#2348c4', t: 'Engineering & CS' },
  finance: { h: '#0a7a5e', t: 'Finance & economics' },
  life:    { h: '#6d28c4', t: 'Life sciences' },
  physics: { h: '#b34500', t: 'Physical sciences' },
  earth:   { h: '#1a6e34', t: 'Earth sciences' },
  social:  { h: '#a0186e', t: 'Social sciences' },
};

function buildGraph(rawNodes, rawEdges, fieldsBase) {
  const NODES = rawNodes.map(f => ({
    id:   f.id,
    lb:   f.name,
    cat:  f.category,
    s:    f.size || 1,
    tx:   f.equation || '',
    slug: f.slug,
    url:  fieldsBase + f.slug + '/',
  }));

  const EDGES = rawEdges.map(e => ({ source: e.source, target: e.target }));

  const nm = Object.fromEntries(NODES.map(n => [n.id, n]));
  const nb = {};
  NODES.forEach(n => { nb[n.id] = []; });
  EDGES.forEach(({ source: s, target: t }) => { nb[s].push(t); nb[t].push(s); });
  const ld = EDGES.map(({ source: s, target: t }) => ({ source: s, target: t }));

  const area = document.getElementById('l-graph-area');
  if (!area) return;
  const W = area.clientWidth, H = area.clientHeight;
  const GUARD = 260;

  NODES.forEach(n => {
    n.x = GUARD + Math.random() * (W - GUARD - 30);
    n.y = 60 + Math.random() * (H - 100);
  });

  const svg = d3.select('#landing-svg');
  svg.selectAll('*').remove();

  const defs = svg.append('defs');
  const sh = defs.append('filter').attr('id', 'gsh').attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%');
  sh.append('feDropShadow').attr('dx', 0).attr('dy', 2).attr('stdDeviation', 3).attr('flood-color', '#00000012');
  const sh2 = defs.append('filter').attr('id', 'gsh2').attr('x', '-60%').attr('y', '-60%').attr('width', '220%').attr('height', '220%');
  sh2.append('feDropShadow').attr('dx', 0).attr('dy', 3).attr('stdDeviation', 7).attr('flood-color', '#00000020');

  const gE = svg.append('g'), gN = svg.append('g');

  function forceGuard() {
    return function (alpha) {
      NODES.forEach(n => { if (n.x < GUARD + 20) n.vx += (GUARD + 20 - n.x) * 0.15 * alpha; });
    };
  }

  const sim = d3.forceSimulation(NODES)
    .force('link', d3.forceLink(ld).id(d => d.id).distance(d => 75 + (d.source.s || 1) * 16 + (d.target.s || 1) * 16).strength(0.28))
    .force('charge', d3.forceManyBody().strength(d => -380 - d.s * 120))
    .force('center', d3.forceCenter((W + GUARD) / 2, H / 2))
    .force('collision', d3.forceCollide(d => d.s * 20 + 16))
    .force('guard', forceGuard())
    .force('x', d3.forceX((W + GUARD) / 2).strength(0.03))
    .force('y', d3.forceY(H / 2).strength(0.05))
    .alphaDecay(0.022);

  const eSel = gE.selectAll('path').data(ld).join('path')
    .attr('fill', 'none').attr('stroke', '#d4d0c8').attr('stroke-width', 1).attr('stroke-opacity', 0.5);

  const nSel = gN.selectAll('g').data(NODES).join('g').style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.2).restart(); d.fx = d.x; d.fy = d.y; })
      .on('drag',  (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on('end',   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));

  nSel.append('rect')
    .attr('class', 'gbg')
    .attr('rx', d => d.s * 8).attr('ry', d => d.s * 8)
    .attr('width', d => d.s * 30).attr('height', d => d.s * 30)
    .attr('x', d => -d.s * 15).attr('y', d => -d.s * 15)
    .attr('fill', d => CAT[d.cat].h + '14').attr('stroke', d => CAT[d.cat].h + '44')
    .attr('stroke-width', 0.8).attr('filter', 'url(#gsh)');

  nSel.each(function (d) {
    const g = d3.select(this);
    const sz = d.s * 18;
    const fo = g.append('foreignObject').attr('x', -sz / 2).attr('y', -sz / 2).attr('width', sz).attr('height', sz);
    fo.append('xhtml:div')
      .style('width', '100%').style('height', '100%')
      .style('display', 'flex').style('align-items', 'center').style('justify-content', 'center')
      .style('pointer-events', 'none')
      .append('xhtml:i')
      .attr('class', iconClass(d.id))
      .style('font-size', (d.s * 12) + 'px').style('color', CAT[d.cat].h).style('opacity', '0.85');
  });

  nSel.append('text')
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .attr('y', d => d.s * 17 + 4)
    .attr('font-size', d => Math.max(7, d.s * 7) + 'px')
    .attr('font-family', 'Inter,sans-serif').attr('font-weight', '500')
    .attr('fill', d => CAT[d.cat].h).attr('opacity', 0.85)
    .attr('pointer-events', 'none')
    .text(d => d.lb);

  nSel.append('rect')
    .attr('width', d => Math.max(56, d.s * 40)).attr('height', d => d.s * 36 + 12)
    .attr('x', d => -Math.max(28, d.s * 20)).attr('y', d => -d.s * 18)
    .attr('rx', 4).attr('fill', 'transparent');

  function ePath(d) {
    const sx = d.source.x, sy = d.source.y, tx = d.target.x, ty = d.target.y;
    const mx = (sx + tx) / 2, my = (sy + ty) / 2;
    const dx = tx - sx, dy = ty - sy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const c = Math.min(len * 0.15, 26);
    const nx = -dy / len, ny = dx / len;
    return `M${sx},${sy} Q${mx + nx * c},${my + ny * c} ${tx},${ty}`;
  }

  sim.on('tick', () => {
    NODES.forEach(n => {
      n.x = Math.max(GUARD, Math.min(W - 25, n.x));
      n.y = Math.max(55, Math.min(H - 50, n.y));
    });
    eSel.attr('d', ePath);
    nSel.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  const tt = document.getElementById('l-tt');
  function setHov(id) {
    const nb2 = id ? new Set([id, ...nb[id]]) : null;
    eSel.attr('stroke', l => !id ? '#d4d0c8' : (l.source.id === id || l.target.id === id) ? CAT[nm[id].cat].h + 'bb' : '#ebe8e2')
       .attr('stroke-width', l => !id ? 1 : (l.source.id === id || l.target.id === id) ? 2 : 0.7)
       .attr('stroke-opacity', l => !id ? 0.5 : (l.source.id === id || l.target.id === id) ? 1 : 0.1);
    nSel.select('.gbg')
      .attr('fill', d => !id || nb2.has(d.id) ? CAT[d.cat].h + '18' : '#efede9')
      .attr('stroke', d => !id || nb2.has(d.id) ? CAT[d.cat].h + '55' : '#ddd')
      .attr('stroke-width', d => d.id === id ? 1.8 : 0.8)
      .attr('filter', d => d.id === id ? 'url(#gsh2)' : 'url(#gsh)');
    nSel.selectAll('text').attr('opacity', d => !id || nb2.has(d.id) ? 0.85 : 0.18);
    nSel.selectAll('foreignObject').style('opacity', d => !id || nb2.has(d.id) ? 1 : 0.18);
  }

  nSel.on('mouseover', (_e, d) => {
    setHov(d.id);
    document.getElementById('l-tt-cat').textContent = CAT[d.cat].t;
    document.getElementById('l-tt-cat').style.color  = CAT[d.cat].h;
    document.getElementById('l-tt-name').textContent = d.lb;
    const teq = document.getElementById('l-tt-eq');
    try { katex.render(d.tx, teq, { displayMode: false, throwOnError: false }); } catch (x) { teq.textContent = ''; }
    document.getElementById('l-tt-tags').innerHTML = nb[d.id].map(id => `<span class="l-tt-tag">${nm[id].lb}</span>`).join('');
    tt.style.display = 'block';
  })
  .on('mousemove', e => {
    const bx = area.getBoundingClientRect();
    const x = e.clientX - bx.left + 18, y = e.clientY - bx.top - 10;
    tt.style.left = Math.min(x, W - 225) + 'px';
    tt.style.top  = Math.max(y, 10) + 'px';
  })
  .on('mouseout', () => { setHov(null); tt.style.display = 'none'; })
  .on('click', (_e, d) => { window.location.href = d.url; });

  // rotating equation display
  const EQS = [
    { l: 'Normal distribution',  t: 'f(x)=\\tfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/2\\sigma^2}' },
    { l: "Bayes' theorem",       t: 'P(A|B)=\\tfrac{P(B|A)P(A)}{P(B)}' },
    { l: 'Eigenvalue eq.',       t: 'A\\mathbf{v}=\\lambda\\mathbf{v}' },
    { l: 'Fourier transform',    t: '\\hat{f}(\\xi)=\\int f(x)e^{-2\\pi ix\\xi}dx' },
    { l: 'Gradient descent',     t: '\\theta\\leftarrow\\theta-\\eta\\nabla_\\theta\\mathcal{L}' },
    { l: 'SDE',                  t: 'dX_t=\\mu\\,dt+\\sigma\\,dW_t' },
  ];
  let qi = 0;
  function showEq(fade) {
    const q = EQS[qi++ % EQS.length];
    const wrap = document.getElementById('l-hero-eq');
    function render() {
      document.getElementById('l-eq-lbl').textContent = q.l;
      try { katex.render(q.t, document.getElementById('l-eq-out'), { displayMode: false, throwOnError: false }); } catch (x) {}
    }
    if (fade && wrap) {
      wrap.style.opacity = '0';
      setTimeout(() => {
        render();
        void wrap.offsetHeight; // force reflow so fade-in is a fresh transition
        wrap.style.opacity = '1';
      }, 420);
    } else {
      render();
    }
  }
  showEq(false);
  const win = /** @type {any} */ (window);
  if (win._eqInterval) clearInterval(win._eqInterval);
  win._eqInterval = setInterval(() => showEq(true), 4200);
}

function iconClass(id) {
  const map = {
    ml: 'ti ti-cpu', qf: 'ti ti-chart-line', bio: 'ti ti-activity',
    econ: 'ti ti-building-bank', qc: 'ti ti-atom', bi: 'ti ti-dna',
    astro: 'ti ti-planet', sig: 'ti ti-wave-sine', or: 'ti ti-route',
    act: 'ti ti-shield-check', clim: 'ti ti-cloud-storm', crypt: 'ti ti-lock',
    rob: 'ti ti-robot', eco: 'ti ti-leaf', qgen: 'ti ti-dna-2',
    met: 'ti ti-wind', psych: 'ti ti-brain', geo: 'ti ti-mountain',
    gam: 'ti ti-chess', chem: 'ti ti-flask',
  };
  return map[id] || 'ti ti-circle';
}
