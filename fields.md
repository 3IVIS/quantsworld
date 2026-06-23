---
layout: default
title: "Fields — quantsworld"
permalink: /fields/
---

<div class="fields-page">
  <div class="section-eyebrow">Browse</div>
  <div class="section-title">All fields</div>
  <div class="section-sub">{{ site.data.fields | size }} fields · each connected by shared mathematics</div>

  {% assign by_cat = site.data.fields | group_by: "category" %}
  {% assign cat_order = "cs,finance,life,physics,earth,social" | split: "," %}

  {% for cat_id in cat_order %}
    {% assign cat_group = by_cat | where: "name", cat_id | first %}
    {% if cat_group %}
    <div class="category-section">
      <div class="category-eyebrow chip chip-{{ cat_id }}">{{ cat_group.items[0].category_name }}</div>
      <div class="fields-grid">
        {% for field in cat_group.items %}
        <a class="field-card" href="{{ '/fields/' | append: field.slug | relative_url }}">
          <div class="field-card-icon"><i class="ti {{ field.icon }}"></i></div>
          <div class="field-card-name">{{ field.name }}</div>
          <div class="field-card-desc">{{ field.description | strip_newlines | truncate: 100 }}</div>
        </a>
        {% endfor %}
      </div>
    </div>
    {% endif %}
  {% endfor %}
</div>
