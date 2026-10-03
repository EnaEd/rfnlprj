import type { Language } from './types';

export const TRANSLATIONS = {
  uk: {
    // Brand
    brandName: 'СільгоспОренда',
    brandTagline: 'Оренда техніки для села',

    // Header & Navigation
    navHome: 'Головна',
    navCatalog: 'Каталог',
    navAdmin: 'Адмін',
    navLogout: 'Вийти',
    cart: 'Кошик',
    langSelector: 'Мова',
    currencySelector: 'Валюта',

    // Hero
    heroTitle: 'Оренда техніки для села — просто та вигідно',
    heroSubtitle:
      'Мотоблоки, міні-трактори, електроінструмент, драбини та стрем’янки в оренду подобово. Доставимо прямо на ділянку.',
    heroCatalogBtn: 'Перейти до каталогу',
    heroCategoriesBtn: 'Категорії',

    // Categories Section
    categoriesTitle: 'Категорії техніки',
    cat_motoblock: 'Мотоблоки',
    cat_minitractor: 'Міні-трактори',
    cat_powertool: 'Електроінструмент',
    cat_ladder: 'Драбини',
    cat_stepladder: 'Стрем’янки',

    // Popular Section
    popularTitle: 'Популярне в оренду',

    // Advantages
    advDeliveryTitle: 'Доставка на ділянку',
    advDeliveryDesc: 'Привеземо техніку в день замовлення по району.',
    advDiscountTitle: 'Знижки за термін',
    advDiscountDesc: 'Від 3 днів — 5%, від 7 днів — 10% знижки.',
    advQualityTitle: 'Справна техніка',
    advQualityDesc: 'Все перевірено та готове до роботи.',

    // Catalog & Filters
    catalogTitle: 'Каталог техніки',
    filtersSearchLabel: 'Пошук',
    filtersSearchPlaceholder: 'Назва техніки...',
    filtersCategoryLabel: 'Категорія',
    filtersAllCategories: 'Всі категорії',
    filtersPriceLimit: 'Ціна за день: до {price}',
    filtersSortLabel: 'Сортування',
    filtersSortDefault: 'За замовчуванням',
    filtersSortPriceAsc: 'Спочатку дешевші',
    filtersSortPriceDesc: 'Спочатку дорожчі',
    filtersOnlyAvailable: 'Тільки доступні',
    catalogFoundCount: 'Знайдено: {count}',
    catalogEmpty: 'За вашим запитом нічого не знайдено.',

    // Product Card & Details
    productPricePerDay: '/день',
    productDeposit: 'Застава: {deposit}',
    productDepositInline: 'застава {deposit}',
    productRentAction: 'В оренду',
    productInCart: 'В кошику',
    productAlreadyInCart: 'Вже в кошику',
    productAddToCart: 'Додати в кошик',
    productCheckoutNow: 'Оформити оренду',
    productOccupied: 'Зайнято',
    productAvailable: 'Доступний',
    productUnavailable: 'Зайнятий',
    productBackToCatalog: '← Назад до каталогу',
    productNotFound: 'Товар не знайдено.',
    productRentTermDays: 'Термін оренди (днів):',
    productRentTotal: 'Разом оренда: {total}',

    // Cart Page
    cartTitle: 'Кошик',
    cartEmpty: 'Кошик порожній.',
    cartChooseEquipment: 'Обрати техніку',
    cartDaysLabel: 'Днів:',
    cartClear: 'Очистити кошик',
    cartSummaryTitle: 'Разом',
    cartRentSummary: 'Оренда',
    cartDepositSummary: 'Застава (поворотна)',
    cartTotalToPay: 'До сплати',
    cartProceedToCheckout: 'Оформити замовлення',

    // Checkout Page
    checkoutTitle: 'Оформлення оренди',
    checkoutFullName: 'ПІБ *',
    checkoutPhone: 'Телефон *',
    checkoutPhonePlaceholder: '+380 (50) 123-45-67',
    checkoutEmail: 'Email *',
    checkoutEmailPlaceholder: 'name@example.com',
    checkoutAddress: 'Адреса доставки *',
    checkoutAddressPlaceholder: 'Область, район, населений пункт, вулиця, будинок',
    checkoutStartDate: 'Дата початку оренди *',
    checkoutComment: 'Коментар',
    checkoutCommentPlaceholder: 'Додаткові побажання чи деталі доставки...',
    checkoutSubmit: 'Підтвердити замовлення',
    checkoutYourOrder: 'Ваше замовлення',
    checkoutDaysShort: 'дн.',
    checkoutDeposit: 'Застава',
    checkoutToPay: 'До сплати',
    checkoutEmptyCart: 'Кошик порожній — нічого оформляти.',
    checkoutBackToCatalog: 'В каталог',

    // Order Success
    orderSuccessTitle: 'Замовлення оформлено!',
    orderSuccessNumber: 'Номер вашого замовлення: {id}',
    orderSuccessNote: 'Ми зв’яжемося з вами найближчим часом для підтвердження оренди.',
    orderSuccessReturnBtn: 'Повернутися до каталогу',

    // Admin & Login
    adminLoginTitle: 'Вхід для адміністратора',
    adminLoginHint: 'Демо-доступ: логін admin, пароль admin',
    adminLoginLabel: 'Логін',
    adminPasswordLabel: 'Пароль',
    adminLoginSubmit: 'Увійти',
    adminLoginErrorAllFields: 'Заповніть усі поля',
    adminLoginErrorInvalid: 'Невірний логін або пароль',

    adminPageTitle: 'Адмін-панель',
    adminTabProducts: 'Товари ({count})',
    adminTabOrders: 'Замовлення ({count})',
    adminEditProduct: 'Редагування товару',
    adminNewProduct: 'Новий товар',
    adminProductName: 'Назва',
    adminProductCategory: 'Категорія',
    adminProductDescription: 'Опис',
    adminProductImageUrl: 'Посилання на фото',
    adminProductPricePerDay: 'Ціна за день, ₴',
    adminProductDeposit: 'Застава, ₴',
    adminProductAvailableCheckbox: 'Доступний до оренди',
    adminProductSave: 'Зберегти',
    adminProductAdd: 'Додати товар',
    adminProductCancel: 'Скасувати',

    adminTablePhoto: 'Фото',
    adminTableName: 'Назва',
    adminTableCategory: 'Категорія',
    adminTablePricePerDay: 'Ціна/день',
    adminTableStatus: 'Статус',
    adminNoOrders: 'Поки немає замовлень.',

    orderStatusNew: 'Новий',
    orderStatusConfirmed: 'Підтверджений',
    orderStatusDone: 'Завершений',
    orderStatusCancelled: 'Скасований',

    adminOrderAddress: 'Адреса: {address}',
    adminOrderStartDate: 'Початок оренди: {date}',
    adminOrderComment: 'Коментар: {comment}',
    adminOrderLinesTotal: '{name} — {days} дн. × {price} = {lineTotal}',
    adminOrderSummary: 'Разом до сплати: {total}',

    // Footer
    footerDesc:
      'Оренда техніки та інструменту для села в Україні: мотоблоки, міні-трактори, електроінструмент, драбини та стрем’янки.',
    footerContactsTitle: 'Контакти в Україні',
    footerPhone: '📞 +380 (44) 123-45-67',
    footerEmail: '✉️ info@silhosp-orenda.ua',
    footerHours: '🕒 Пн–Нд, 8:00–20:00',
    footerHowItWorksTitle: 'Як це працює',
    footerStep1: '1. Оберіть техніку',
    footerStep2: '2. Вкажіть термін оренди в днях',
    footerStep3: '3. Оформіть замовлення',
    footerCopyright: '© {year} СільгоспОренда. Усі права захищено. Україна.',

    // Validation
    valFullNameRequired: 'Вкажіть ПІБ',
    valFullNameShort: 'ПІБ занадто коротке (мінімум 3 символи)',
    valPhoneRequired: 'Вкажіть номер телефону',
    valPhoneInvalid: 'Введіть коректний український номер (+380 XX XXX XX XX або 0XX XXX XX XX)',
    valEmailRequired: 'Вкажіть email',
    valEmailInvalid: 'Некоректний email',
    valAddressRequired: 'Вкажіть адресу доставки в Україні',
    valStartDateRequired: 'Оберіть дату початку оренди',
    valStartDatePast: 'Дата не може бути в минулому',

    valProductNameRequired: 'Введіть назву',
    valProductDescRequired: 'Введіть опис',
    valProductImgRequired: 'Введіть посилання на фото',
    valProductPriceInvalid: 'Ціна повинна бути більше 0',
    valProductDepositInvalid: 'Некоректна застава',

    // 404
    notFoundTitle: 'Сторінку не знайдено',
  },

  ru: {
    // Brand
    brandName: 'СельхозАренда',
    brandTagline: 'Аренда техники для села',

    // Header & Navigation
    navHome: 'Главная',
    navCatalog: 'Каталог',
    navAdmin: 'Админ',
    navLogout: 'Выйти',
    cart: 'Корзина',
    langSelector: 'Язык',
    currencySelector: 'Валюта',

    // Hero
    heroTitle: 'Аренда техники для села — просто и выгодно',
    heroSubtitle:
      'Мотоблоки, мини-трактора, электроинструмент, лестницы и стремянки в аренду посуточно. Доставим прямо на участок.',
    heroCatalogBtn: 'Перейти в каталог',
    heroCategoriesBtn: 'Категории',

    // Categories Section
    categoriesTitle: 'Категории техники',
    cat_motoblock: 'Мотоблоки',
    cat_minitractor: 'Мини-трактора',
    cat_powertool: 'Электроинструмент',
    cat_ladder: 'Лестницы',
    cat_stepladder: 'Стремянки',

    // Popular Section
    popularTitle: 'Популярное в аренду',

    // Advantages
    advDeliveryTitle: 'Доставка на участок',
    advDeliveryDesc: 'Привезём технику в день заказа по району.',
    advDiscountTitle: 'Скидки за срок',
    advDiscountDesc: 'От 3 дней — 5%, от 7 дней — 10% скидки.',
    advQualityTitle: 'Исправная техника',
    advQualityDesc: 'Всё проверено и готово к работе.',

    // Catalog & Filters
    catalogTitle: 'Каталог техники',
    filtersSearchLabel: 'Поиск',
    filtersSearchPlaceholder: 'Название техники...',
    filtersCategoryLabel: 'Категория',
    filtersAllCategories: 'Все категории',
    filtersPriceLimit: 'Цена за день: до {price}',
    filtersSortLabel: 'Сортировка',
    filtersSortDefault: 'По умолчанию',
    filtersSortPriceAsc: 'Сначала дешевле',
    filtersSortPriceDesc: 'Сначала дороже',
    filtersOnlyAvailable: 'Только доступные',
    catalogFoundCount: 'Найдено: {count}',
    catalogEmpty: 'По вашему запросу ничего не найдено.',

    // Product Card & Details
    productPricePerDay: '/день',
    productDeposit: 'Залог: {deposit}',
    productDepositInline: 'залог {deposit}',
    productRentAction: 'В аренду',
    productInCart: 'В корзине',
    productAlreadyInCart: 'Уже в корзине',
    productAddToCart: 'Добавить в корзину',
    productCheckoutNow: 'Оформить аренду',
    productOccupied: 'Занято',
    productAvailable: 'Доступен',
    productUnavailable: 'Занят',
    productBackToCatalog: '← Назад в каталог',
    productNotFound: 'Товар не найден.',
    productRentTermDays: 'Срок аренды (дней):',
    productRentTotal: 'Итого аренда: {total}',

    // Cart Page
    cartTitle: 'Корзина',
    cartEmpty: 'Корзина пуста.',
    cartChooseEquipment: 'Выбрать технику',
    cartDaysLabel: 'Дней:',
    cartClear: 'Очистить корзину',
    cartSummaryTitle: 'Итого',
    cartRentSummary: 'Аренда',
    cartDepositSummary: 'Залог (возвратный)',
    cartTotalToPay: 'К оплате',
    cartProceedToCheckout: 'Оформить заказ',

    // Checkout Page
    checkoutTitle: 'Оформление аренды',
    checkoutFullName: 'ФИО *',
    checkoutPhone: 'Телефон *',
    checkoutPhonePlaceholder: '+380 (50) 123-45-67',
    checkoutEmail: 'Email *',
    checkoutEmailPlaceholder: 'name@example.com',
    checkoutAddress: 'Адрес доставки *',
    checkoutAddressPlaceholder: 'Область, район, населенный пункт, улица, дом',
    checkoutStartDate: 'Дата начала аренды *',
    checkoutComment: 'Комментарий',
    checkoutCommentPlaceholder: 'Дополнительные пожелания или детали доставки...',
    checkoutSubmit: 'Подтвердить заказ',
    checkoutYourOrder: 'Ваш заказ',
    checkoutDaysShort: 'дн.',
    checkoutDeposit: 'Залог',
    checkoutToPay: 'К оплате',
    checkoutEmptyCart: 'Корзина пуста — нечего оформлять.',
    checkoutBackToCatalog: 'В каталог',

    // Order Success
    orderSuccessTitle: 'Заказ оформлен!',
    orderSuccessNumber: 'Номер вашего заказа: {id}',
    orderSuccessNote: 'Мы свяжемся с вами в ближайшее время для подтверждения аренды.',
    orderSuccessReturnBtn: 'Вернуться в каталог',

    // Admin & Login
    adminLoginTitle: 'Вход для администратора',
    adminLoginHint: 'Демо-доступ: логин admin, пароль admin',
    adminLoginLabel: 'Логин',
    adminPasswordLabel: 'Пароль',
    adminLoginSubmit: 'Войти',
    adminLoginErrorAllFields: 'Заполните все поля',
    adminLoginErrorInvalid: 'Неверный логин или пароль',

    adminPageTitle: 'Админ-панель',
    adminTabProducts: 'Товары ({count})',
    adminTabOrders: 'Заказы ({count})',
    adminEditProduct: 'Редактирование товара',
    adminNewProduct: 'Новый товар',
    adminProductName: 'Название',
    adminProductCategory: 'Категория',
    adminProductDescription: 'Описание',
    adminProductImageUrl: 'Ссылка на фото',
    adminProductPricePerDay: 'Цена за день, ₴',
    adminProductDeposit: 'Залог, ₴',
    adminProductAvailableCheckbox: 'Доступен к аренде',
    adminProductSave: 'Сохранить',
    adminProductAdd: 'Добавить товар',
    adminProductCancel: 'Отмена',

    adminTablePhoto: 'Фото',
    adminTableName: 'Название',
    adminTableCategory: 'Категория',
    adminTablePricePerDay: 'Цена/день',
    adminTableStatus: 'Статус',
    adminNoOrders: 'Пока нет заказов.',

    orderStatusNew: 'Новый',
    orderStatusConfirmed: 'Подтверждён',
    orderStatusDone: 'Завершён',
    orderStatusCancelled: 'Отменён',

    adminOrderAddress: 'Адрес: {address}',
    adminOrderStartDate: 'Начало аренды: {date}',
    adminOrderComment: 'Комментарий: {comment}',
    adminOrderLinesTotal: '{name} — {days} дн. × {price} = {lineTotal}',
    adminOrderSummary: 'Итого к оплате: {total}',

    // Footer
    footerDesc:
      'Аренда техники и инструмента для села в Украине: мотоблоки, мини-трактора, электроинструмент, лестницы и стремянки.',
    footerContactsTitle: 'Контакты в Украине',
    footerPhone: '📞 +380 (44) 123-45-67',
    footerEmail: '✉️ info@selhozarenda.ua',
    footerHours: '🕒 Пн–Вс, 8:00–20:00',
    footerHowItWorksTitle: 'Как это работает',
    footerStep1: '1. Выберите технику',
    footerStep2: '2. Укажите срок аренды в днях',
    footerStep3: '3. Оформите заказ',
    footerCopyright: '© {year} СельхозАренда. Все права защищены. Украина.',

    // Validation
    valFullNameRequired: 'Укажите ФИО',
    valFullNameShort: 'ФИО слишком короткое (минимум 3 символа)',
    valPhoneRequired: 'Укажите номер телефона',
    valPhoneInvalid: 'Введите корректный украинский номер (+380 XX XXX XX XX или 0XX XXX XX XX)',
    valEmailRequired: 'Укажите email',
    valEmailInvalid: 'Некорректный email',
    valAddressRequired: 'Укажите адрес доставки в Украине',
    valStartDateRequired: 'Выберите дату начала аренды',
    valStartDatePast: 'Дата не может быть в прошлом',

    valProductNameRequired: 'Введите название',
    valProductDescRequired: 'Введите описание',
    valProductImgRequired: 'Введите ссылку на фото',
    valProductPriceInvalid: 'Цена должна быть больше 0',
    valProductDepositInvalid: 'Некорректный залог',

    // 404
    notFoundTitle: 'Страница не найдена',
  },
} as const;

export type TranslationKey = keyof (typeof TRANSLATIONS)['uk'];

export function getTranslation(
  lang: Language,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.uk;
  let text: string = dict[key] || TRANSLATIONS.uk[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return text;
}
