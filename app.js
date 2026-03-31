/* ═══════════════════════════════════════════════
   TOP TREND — Interactive Logic
   ═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    // ── Header scroll ──
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
    });

    // ── Mobile burger ──
    const burger = document.getElementById('burger-btn');
    const nav = document.querySelector('.nav');
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('.nav__link').forEach(l =>
        l.addEventListener('click', () => nav.classList.remove('open'))
    );

    // ── Scroll reveal ──
    const revealEls = document.querySelectorAll(
        '.sport-card, .feature-card, .testimonial-card, .sports__header, .integration__header, .testimonials__header, .search__container'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), i * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));

    // ── Integration network SVG ──
    const canvas = document.getElementById('integration-canvas');
    if (canvas) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 700 400');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.overflow = 'visible';

        const nodes = [
            { x:350, y:200, r:40, label:'Top Trend', primary:true },
            { x:150, y:100, r:28, label:'Football' },
            { x:550, y:100, r:28, label:'Basketball' },
            { x:130, y:300, r:28, label:'Tennis' },
            { x:570, y:300, r:28, label:'F1' },
            { x:90,  y:195, r:18, label:'' },
            { x:610, y:195, r:18, label:'' },
            { x:250, y:55,  r:14, label:'' },
            { x:450, y:55,  r:14, label:'' },
            { x:250, y:345, r:14, label:'' },
            { x:450, y:345, r:14, label:'' },
            { x:350, y:45,  r:12, label:'' },
            { x:350, y:355, r:12, label:'' },
        ];

        const connections = [
            [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
            [1,7],[2,8],[3,9],[4,10],[1,5],[2,6],
            [7,11],[8,11],[9,12],[10,12],[5,3],[6,4]
        ];

        // Defs
        const defs = document.createElementNS(svgNS, 'defs');
        defs.innerHTML = '<filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        svg.appendChild(defs);

        // Lines
        connections.forEach(([a, b]) => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', nodes[a].x); line.setAttribute('y1', nodes[a].y);
            line.setAttribute('x2', nodes[b].x); line.setAttribute('y2', nodes[b].y);
            line.setAttribute('stroke', 'rgba(0,212,170,0.2)');
            line.setAttribute('stroke-width', '1.5');
            svg.appendChild(line);

            // Animated dot
            const dot = document.createElementNS(svgNS, 'circle');
            dot.setAttribute('r', '2.5');
            dot.setAttribute('fill', '#00d4aa');
            dot.setAttribute('filter', 'url(#glow)');
            const anim = document.createElementNS(svgNS, 'animateMotion');
            anim.setAttribute('dur', (3 + Math.random() * 4) + 's');
            anim.setAttribute('repeatCount', 'indefinite');
            anim.setAttribute('path', `M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`);
            dot.appendChild(anim);
            svg.appendChild(dot);
        });

        // Nodes
        nodes.forEach(node => {
            const g = document.createElementNS(svgNS, 'g');
            if (node.primary) {
                const glow = document.createElementNS(svgNS, 'circle');
                glow.setAttribute('cx', node.x); glow.setAttribute('cy', node.y);
                glow.setAttribute('r', node.r + 10);
                glow.setAttribute('fill', 'none');
                glow.setAttribute('stroke', 'rgba(0,212,170,0.15)');
                glow.setAttribute('stroke-width', '2');
                const animR = document.createElementNS(svgNS, 'animate');
                animR.setAttribute('attributeName', 'r');
                animR.setAttribute('values', `${node.r+8};${node.r+16};${node.r+8}`);
                animR.setAttribute('dur', '3s');
                animR.setAttribute('repeatCount', 'indefinite');
                glow.appendChild(animR);
                g.appendChild(glow);
            }
            const c = document.createElementNS(svgNS, 'circle');
            c.setAttribute('cx', node.x); c.setAttribute('cy', node.y);
            c.setAttribute('r', node.r);
            c.setAttribute('fill', node.primary ? 'rgba(0,212,170,0.25)' : 'rgba(0,212,170,0.08)');
            c.setAttribute('stroke', node.primary ? '#00d4aa' : 'rgba(0,212,170,0.3)');
            c.setAttribute('stroke-width', node.primary ? '2' : '1');
            g.appendChild(c);

            if (node.label) {
                const text = document.createElementNS(svgNS, 'text');
                text.setAttribute('x', node.x); text.setAttribute('y', node.y + 1);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('dominant-baseline', 'central');
                text.setAttribute('fill', '#fff');
                text.setAttribute('font-size', node.primary ? '11' : '9');
                text.setAttribute('font-weight', '700');
                text.setAttribute('font-family', 'Inter, sans-serif');
                text.textContent = node.label;
                g.appendChild(text);
            }
            svg.appendChild(g);
        });

        canvas.appendChild(svg);
    }

    // ── Search tags ──
    document.querySelectorAll('.search__tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const input = document.getElementById('search-input');
            input.value = tag.dataset.search;
            input.focus();
        });
    });

    // ── Search form ──
    document.getElementById('search-form').addEventListener('submit', e => {
        e.preventDefault();
        const val = document.getElementById('search-input').value.trim();
        if (val) alert(`Searching for: "${val}"\n\nThis is a demo.`);
    });

    // ── Active nav tracking ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + current) l.classList.add('active');
        });
    });
});
