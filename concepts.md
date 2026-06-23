---
layout: default
title: "Math index — quantsworld"
permalink: /concepts/
---

<div class="concepts-page">
  <div class="section-eyebrow">Reference</div>
  <div class="section-title">Math index</div>
  <div class="section-sub">Pure mathematical ideas that appear across multiple fields. Every concept page lists every topic that uses it.</div>

  <div class="concepts-grid">
    {% assign all_concepts = site.concepts | sort: "title" %}
    {% for concept in all_concepts %}
      {% assign users = site.topics | where_exp: "t", "t.math_concepts contains concept.slug" %}
      <a class="concept-card" href="{{ concept.url | relative_url }}">
        <div class="concept-card-name">{{ concept.title }}</div>
        <div class="concept-card-count">{{ users.size }} topic{% if users.size != 1 %}s{% endif %}</div>
      </a>
    {% endfor %}
  </div>

  <div class="note-block" style="margin-top:2rem">
    <strong>Can't find a concept?</strong> The index grows with every new topic added.
    If you want to add a concept, open a pull request in
    <a href="https://github.com/3IVIS/quantsworld" target="_blank" rel="noopener">the GitHub repo</a>
    and add a file to <code>_concepts/</code>.
  </div>
</div>
