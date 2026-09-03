# Margo Creative Lab

Одностраничный лендинг лаборатории моды на стыке воображения и искусственного интеллекта. Сайт рассказывает о программах (курсы, воркшопы, наставничество), основательнице Марго и собирает заявки на уведомление об открытии набора.

Репозиторий: [github.com/VozzhovaN/landing_version_1](https://github.com/VozzhovaN/landing_version_1)

## Стек

Чистый HTML, CSS и JavaScript — без сборки, npm и фреймворков. Шрифты подключаются из Google Fonts (Cormorant Garamond + Manrope), изображения отдаются в WebP с JPEG-фолбэком.

## Что умеет страница

- Переключение языка RU / EN с сохранением выбора в `localStorage`
- Якорная навигация, мобильное меню, подсветка активного пункта
- Аккордеон программы, раскрывающееся расписание и FAQ
- Форма подписки: проверка e-mail и согласия, затем черновик письма на `hello@margocreativelab.com`
- Прогресс-бар прокрутки и кнопка «наверх»
- Появление блоков при скролле; анимации отключаются при `prefers-reduced-motion`

## Структура

```
index.html      страница
css/styles.css  стили
js/main.js      навигация, аккордеоны, форма, i18n
images/         фотографии сайта (webp + jpg)
```

## Как запустить локально

Откройте папку проекта в терминале и поднимите любой статический сервер — так корректно подгрузятся шрифты и пути к файлам:

```bash
python -m http.server 8080
```

Затем откройте [http://127.0.0.1:8080](http://127.0.0.1:8080).

Либо просто откройте `index.html` в браузере: вёрстка заработает, но часть ресурсов (шрифты) может вести себя иначе из‑за `file://`.

## Публикация на GitHub Pages

1. Залейте ветку `main` в этот репозиторий.
2. В GitHub: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, branch: `main`, folder: `/ (root)`.
4. Через минуту сайт будет доступен по адресу  
   `https://vozzhovan.github.io/landing_version_1/`.

Все пути в разметке относительные, отдельный `base href` не нужен.

## Контакты на сайте

- Telegram Марго: [t.me/MarinaTopalo](https://t.me/MarinaTopalo)
- Сообщество: [t.me/MargoCreativeCommunity](https://t.me/MargoCreativeCommunity)
- Почта: hello@margocreativelab.com
