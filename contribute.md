---
layout: default
title: "Contribute"
permalink: /contribute/
---

<div class="page-wrap">
  <div class="section-eyebrow">Open source</div>
  <div class="section-title">Contribute to quantsworld</div>
  <div class="section-sub">Every topic is a single Markdown file. Add one, and the whole network updates automatically.</div>

  <div class="art-h2">How to add a new topic</div>
  <div class="art-p">Topics are Markdown files in <code>_topics/[field]/[slug].md</code>. The front matter drives everything — layout, cross-links, and the math sidebar.</div>

  <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--r);padding:1.25rem 1.5rem;font-family:var(--mono);font-size:0.75rem;line-height:2;margin:1.25rem 0;overflow-x:auto">
<span style="color:var(--ink4)">---</span><br>
<span style="color:var(--blue)">title</span>: <span style="color:var(--green)">"Your Topic Name"</span><br>
<span style="color:var(--blue)">field</span>: <span style="color:var(--green)">econometrics</span>  <span style="color:var(--ink4)"># must match a slug in _fields/</span><br>
<span style="color:var(--blue)">description</span>: <span style="color:var(--green)">"One sentence for the topic grid."</span><br>
<span style="color:var(--blue)">intro</span>: <span style="color:var(--green)">></span><br>
&nbsp;&nbsp;<span style="color:var(--green)">Two or three sentences introducing the topic.</span><br>
<span style="color:var(--blue)">math_concepts</span>:<br>
&nbsp;&nbsp;- <span style="color:var(--green)">gaussian-distribution</span>  <span style="color:var(--ink4)"># slugs from _concepts/</span><br>
&nbsp;&nbsp;- <span style="color:var(--green)">linear-algebra</span><br>
<span style="color:var(--blue)">difficulty</span>: <span style="color:var(--green)">intermediate</span>  <span style="color:var(--ink4)"># beginner | intermediate | advanced | expert</span><br>
<span style="color:var(--blue)">difficulty_level</span>: <span style="color:var(--green)">3</span>  <span style="color:var(--ink4)"># 1–5, controls the difficulty bar</span><br>
<span style="color:var(--blue)">read_time</span>: <span style="color:var(--green)">8</span>  <span style="color:var(--ink4)"># minutes</span><br>
<span style="color:var(--ink4)">---</span>
  </div>

  <div class="art-p">After the front matter, write the article in Markdown. Use <code>$$...$$</code> for display equations and <code>$...$</code> for inline math. To include a reusable widget, add:</div>

  <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--r);padding:0.85rem 1.25rem;font-family:var(--mono);font-size:0.75rem;margin:1rem 0">
    {% raw %}{% include widgets/normal-dist.html %}{% endraw %}
  </div>

  <div class="art-h2">What gets created automatically</div>
  <ul style="font-size:0.83rem;color:var(--ink2);line-height:1.9;padding-left:1.5rem;margin-bottom:1.5rem">
    <li>A URL at <code>/fields/[field]/[slug]/</code></li>
    <li>A card on the field overview page</li>
    <li>Cross-links in the math sidebar for every concept in <code>math_concepts</code></li>
    <li>The concept pages (e.g. <code>/concepts/gaussian-distribution/</code>) automatically list your topic</li>
    <li>Sitemap entry</li>
  </ul>

  <div class="art-h2">Adding a new math concept</div>
  <div class="art-p">Add a file to <code>_concepts/[slug].md</code>. The slug must match exactly what topics declare in their <code>math_concepts</code> list. Minimal front matter:</div>

  <div style="background:var(--white);border:1px solid var(--rule);border-radius:var(--r);padding:1.25rem 1.5rem;font-family:var(--mono);font-size:0.75rem;line-height:2;margin:1.25rem 0">
<span style="color:var(--ink4)">---</span><br>
<span style="color:var(--blue)">title</span>: <span style="color:var(--green)">"Concept Name"</span><br>
<span style="color:var(--blue)">slug</span>: <span style="color:var(--green)">concept-slug</span><br>
<span style="color:var(--blue)">equation</span>: <span style="color:var(--green)">'f(x) = ...'</span>  <span style="color:var(--ink4)"># LaTeX, shown at top</span><br>
<span style="color:var(--blue)">intro</span>: <span style="color:var(--green)">></span><br>
&nbsp;&nbsp;<span style="color:var(--green)">A short paragraph explaining the concept.</span><br>
<span style="color:var(--blue)">related_concepts</span>:<br>
&nbsp;&nbsp;- <span style="color:var(--green)">other-concept-slug</span><br>
<span style="color:var(--ink4)">---</span>
  </div>

  <div class="note-block">
    <strong>GitHub workflow:</strong> fork the repository → create your file → open a pull request.
    A reviewer will check the front matter and content before merging. Once merged, the site
    rebuilds automatically and your topic is live.
  </div>

  <div style="margin-top:1.5rem">
    <a href="https://github.com/3IVIS/quantsworld" target="_blank" rel="noopener"
       style="display:inline-flex;align-items:center;gap:0.5rem;background:var(--blue);color:#fff;padding:0.6rem 1.25rem;border-radius:var(--r);font-size:0.78rem;text-decoration:none">
      <i class="ti ti-brand-github"></i> Open the GitHub repository
    </a>
  </div>
</div>
