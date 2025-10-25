(function () {
  function buildRectangleTable(W, H, radius = 0, steps = 200) {
    let pts = [];
    const cornerSteps = Math.max(
      2,
      Math.floor((steps * radius) / Math.min(W, H))
    );

    for (let i = radius; i < W - radius; i += (W - 2 * radius) / steps)
      pts.push({ x: i, y: 0 });

    for (let i = 0; i <= cornerSteps; i++) {
      let angle = Math.PI * 1.5 + (Math.PI / 2) * (i / cornerSteps);
      pts.push({
        x: W - radius + radius * Math.cos(angle),
        y: radius + radius * Math.sin(angle),
      });
    }

    for (let i = radius; i < H - radius; i += (H - 2 * radius) / steps)
      pts.push({ x: W, y: i });

    for (let i = 0; i <= cornerSteps; i++) {
      let angle = 0 + (Math.PI / 2) * (i / cornerSteps);
      pts.push({
        x: W - radius + radius * Math.cos(angle),
        y: H - radius + radius * Math.sin(angle),
      });
    }

    for (let i = W - radius; i >= radius; i -= (W - 2 * radius) / steps)
      pts.push({ x: i, y: H });

    for (let i = 0; i <= cornerSteps; i++) {
      let angle = Math.PI / 2 + (Math.PI / 2) * (i / cornerSteps);
      pts.push({
        x: radius + radius * Math.cos(angle),
        y: H - radius + radius * Math.sin(angle),
      });
    }

    for (let i = H - radius; i >= radius; i -= (H - 2 * radius) / steps)
      pts.push({ x: 0, y: i });

    for (let i = 0; i <= cornerSteps; i++) {
      let angle = Math.PI + (Math.PI / 2) * (i / cornerSteps);
      pts.push({
        x: radius + radius * Math.cos(angle),
        y: radius + radius * Math.sin(angle),
      });
    }
    return pts;
  }

  document.querySelectorAll(".board").forEach((board) => {
    const W = board.offsetWidth;
    const H = board.offsetHeight;
    const style = getComputedStyle(board);

    const runText = board.querySelector(".runText");
    const BASE_TEXT = runText
      ? runText.textContent.trim() || " * some text * "
      : " * some text * ";

    let radius = 0;

    let points = [],
      totalLength = 0,
      lengths = [];

    points = buildRectangleTable(W, H, radius);
    totalLength = 0;
    lengths = [0];
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
      lengths.push(totalLength);
    }

    function interpPoint(dist) {
      dist = dist % totalLength;
      let lo = 0,
        hi = lengths.length - 1;
      while (lo < hi) {
        let mid = (lo + hi) >> 1;
        if (lengths[mid] < dist) lo = mid + 1;
        else hi = mid;
      }
      return points[lo];
    }

    const charWidth = 24;
    const maxChars = Math.floor(totalLength / charWidth);
    let text = "";
    while (text.length < maxChars) text += BASE_TEXT;
    text = text.slice(0, maxChars);
    const chars = [...text];
    const step = totalLength / chars.length;

    const spans = chars.map((ch) => {
      const s = document.createElement("span");
      s.className = "letter";
      s.textContent = ch;
      runText.appendChild(s);
      return s;
    });

    let offset = 0;
    function animate() {
      offset += 1;
      if (offset > totalLength) offset = 0;

      let dist = offset;
      for (let i = 0; i < spans.length; i++) {
        const p = interpPoint(dist);
        let angle = 0;

        if (points.length > 1) {
          const idx = points.indexOf(p);
          const next = points[(idx + 1) % points.length];
          angle = (Math.atan2(next.y - p.y, next.x - p.x) * 180) / Math.PI;
        }

        spans[i].style.left = p.x + "px";
        spans[i].style.top = p.y + "px";
        spans[i].style.transform = `rotate(${angle}deg)`;

        dist += step;
      }

      requestAnimationFrame(animate);
    }
    animate();
  });
})();
