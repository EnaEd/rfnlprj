# СільгоспОренда / СельхозАренда — оренда техніки для села в Україні

Учебный интернет-магазин **аренды техники для Украины** на **React + TypeScript + Vite**.
Тематика: мотоблоки, мини-трактора, электроинструмент, лестницы и стремянки.
Аренда оформляется **посуточно** (по количеству дней) со скидками за длительный срок.

## Возможности

- **Локализация для Украины**: украинские контакты, валидация украинских номеров телефонов (+380...).
- **Мультиязычность (i18n)**: поддержка украинского и русского языков с переключателем в шапке.
- **Мультивалютность**: поддержка цен в гривнах (₴ / UAH) и долларах ($ / USD) с автоматической конвертацией.
- Каталог техники с **фильтрами поиска** (по названию, категории, цене, доступности) и сортировкой.
- Карточка товара с характеристиками и **калькулятором стоимости аренды по дням**.
- **Корзина** с изменением срока аренды и расчётом итогов + залога.
- **Форма оформления заказа** с полноценной **валидацией** (ФИО, украинский телефон, email, адрес, дата).
- **Админ-панель** (CRUD товаров + управление статусами заказов), вход по логину/паролю.
- Хранение данных в **localStorage** + авторизация через **cookie**.
- Глобальный стейт через **React Context (useContext)**: `LocaleContext`, `ProductsContext`, `CartContext`, `AuthContext`.
- Полностью **адаптивная** вёрстка.

## Как соответствует требованиям

| Требование | Реализация |
|---|---|
| 5+ классов ООП, наследование | `src/models/RentalItem.ts` (абстрактный базовый класс) + наследники `Motoblock`, `MiniTractor`, `PowerTool`, `Ladder`, `Stepladder` в `src/models/equipment.ts`, плюс класс `Order` |
| Пропсы, хуки | `ProductCard`, `Filters`, `Layout` (props); кастомные хуки `useLocale`, `useProducts`, `useCart`, `useAuth` |
| Мультиязычность и мультивалютность | `src/context/LocaleContext.tsx`, `src/i18n/translations.ts`, `src/i18n/types.ts` |
| Фильтры поиска товаров | `src/components/Filters.tsx`, `src/pages/CatalogPage.tsx` |
| Корзина и заказы | `src/context/CartContext.tsx`, `CartPage`, `CheckoutPage` |
| Админ-панель | `src/pages/AdminPage.tsx` |
| Валидация форм (Украина) | `src/utils/validation.ts` |
| Хранение (куки, localStorage) | `src/utils/storage.ts` |
| useContext / Redux | Context API: `LocaleContext`, `ProductsContext`, `CartContext`, `AuthContext` |
| Эргономика и стили | `src/index.css` |
| Адаптивность | media-запросы в `src/index.css` |

## Архитектура

```
src/
├── models/        # ООП-классы (RentalItem, наследники, Order)
├── data/          # начальный каталог (seed)
├── context/       # глобальное состояние (LocaleContext, ProductsContext, CartContext, AuthContext)
├── i18n/          # переводы и типы интернационализации
├── components/    # переиспользуемые компоненты (Header, Footer, ProductCard, Filters, Layout)
├── pages/         # страницы-роуты (HomePage, CatalogPage, ProductPage, CartPage, CheckoutPage, AdminPage, LoginPage)
├── utils/         # хранилище и валидация
├── App.tsx        # роутинг
└── main.tsx       # провайдеры контекстов
```

## Запуск

```bash
npm install
npm run dev      # режим разработки (http://localhost:5173)
npm run build    # production-сборка в dist/
npm run preview  # предпросмотр собранной версии
```

## Доступ в админ-панель

- Логин: `admin`
- Пароль: `admin`

## Деплой

Проект собирается в статику (`npm run build` → папка `dist/`) и разворачивается,
например, на **Vercel** / **Netlify** / **GitHub Pages**. Для SPA-роутинга
настройте fallback всех маршрутов на `index.html`.

## Репозиторий

> Добавьте сюда ссылку на ваш Git-репозиторий, например:
> `https://github.com/<username>/selhoz-arenda`
