# SEO Progress — Havana Club

## Статус: в работе

---

## Исправить (баги)

- [x] **Favicon сломан** — `logo white.svg` удалён из репо, заменить на `logo white.png`
  ```html
  <link rel="icon" type="image/png" href="logo white.png">
  ```

- [x] **`<title>` не совпадает с OG title** — добавить "латинских", унифицировать
- [x] **Пробел в OG image URL** — `logo white.png` ломает превью в соцсетях, закодировать пробел или использовать `hero-bg.png`
- [x] **`<meta description>` слабее OG description** — синхронизировать с OG description
- [x] **Дубли фото в галерее** — `photo-28.png`, `photo-29.png`, `photo-30.jpg` встречаются дважды (строки 517–525 в index.html)

---

## Улучшить (желательно)

- [x] **Добавить `<link rel="canonical">`** — указать Google канонический URL
- [x] **Schema.org — добавить `priceRange` и `geo`**
- [x] **Обновить `lastmod` в `sitemap.xml`** — обновлено до `2026-07-17`

---

## Внешние действия (вручную)

**Google Search Console:** https://search.google.com/search-console
_(войти через Google аккаунт → Add property → URL prefix → вставить URL сайта)_

- [x] **Google Search Console** — верификационный файл добавлен и запушен
- [ ] **Google Search Console** — нажать VERIFY и добавить sitemap (`sitemap.xml`)

**Яндекс Вебмастер:** https://webmaster.yandex.ru
_(войти через Яндекс аккаунт → Добавить сайт → вставить URL)_

- [x] **Яндекс Вебмастер** — верификационный файл `yandex_50e4fcaa1b4a0a50.html` добавлен и запушен
- [ ] **Яндекс Вебмастер** — нажать «Проверить» на https://webmaster.yandex.ru
- [ ] **Яндекс Вебмастер** — добавить sitemap после верификации