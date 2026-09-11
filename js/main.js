/* ---- Scroll progress bar ---- */
const progressBar = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');
const header = document.getElementById('siteHeader');

function onScroll(){
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if(progressBar) progressBar.style.width = (total > 0 ? (scrolled / total * 100) : 0) + '%';
  if(backToTop) backToTop.classList.toggle('visible', scrolled > 500);
  if(header) header.classList.toggle('scrolled', scrolled > 40);
}
window.addEventListener('scroll', onScroll, {passive: true});
onScroll();

/* ---- Active nav highlight ---- */
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav.mainnav a[href^="#"]');
if(sections.length && 'IntersectionObserver' in window){
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, {rootMargin: '-40% 0px -55% 0px'});
  sections.forEach(s => navObserver.observe(s));
}

const mobileNav = document.getElementById('mobileNav');
const burgerBtn = document.getElementById('burgerBtn');

function setNavOpen(open){
  if(!mobileNav || !burgerBtn) return;
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
  burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('nav-open', open);
}

if(burgerBtn) burgerBtn.addEventListener('click', () => setNavOpen(!mobileNav || !mobileNav.classList.contains('open')));
const mobileNavClose = document.getElementById('mobileNavClose');
if(mobileNavClose) mobileNavClose.addEventListener('click', () => setNavOpen(false));
if(mobileNav){
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNavOpen(false)));
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') setNavOpen(false);
});
window.addEventListener('resize', () => {
  if(window.innerWidth > 900) setNavOpen(false);
});

function refreshOpenPanels(){
  document.querySelectorAll('.accordion-item.open .accordion-panel, .faq-item.open .faq-panel, #schedule li.open .sched-body').forEach(panel => {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });
}

function initAccordion(containerSelector, itemSelector, trigSelector, panelSelector, singleOpen){
  document.querySelectorAll(containerSelector).forEach(container => {
    const items = container.querySelectorAll(itemSelector);
    items.forEach(item => {
      const trig = item.querySelector(trigSelector);
      const panel = item.querySelector(panelSelector);
      if(!trig || !panel) return;
      if(item.classList.contains('open')){
        panel.style.maxHeight = panel.scrollHeight + 'px';
        trig.setAttribute('aria-expanded', 'true');
      } else {
        trig.setAttribute('aria-expanded', 'false');
      }
      trig.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        if(singleOpen){
          items.forEach(i => {
            i.classList.remove('open');
            const p = i.querySelector(panelSelector);
            const t = i.querySelector(trigSelector);
            if(p) p.style.maxHeight = 0;
            if(t) t.setAttribute('aria-expanded', 'false');
          });
        }
        if(!isOpen){
          item.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          trig.setAttribute('aria-expanded', 'true');
        } else if(!singleOpen){
          item.classList.remove('open');
          panel.style.maxHeight = 0;
          trig.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
}
initAccordion('#labAccordion', '.accordion-item', '.accordion-trig', '.accordion-panel', true);
initAccordion('#faqList', '.faq-item', '.faq-trig', '.faq-panel', true);

document.querySelectorAll('#schedule li').forEach(li => {
  const body = li.querySelector('.sched-body');
  if(!body) return;
  li.setAttribute('tabindex', '0');
  li.setAttribute('role', 'button');
  li.setAttribute('aria-expanded', li.classList.contains('open') ? 'true' : 'false');
  const toggle = () => {
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('#schedule li').forEach(o => {
      o.classList.remove('open');
      o.setAttribute('aria-expanded', 'false');
      const b = o.querySelector('.sched-body');
      if(b) b.style.maxHeight = 0;
    });
    if(!isOpen){
      li.classList.add('open');
      li.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  };
  li.addEventListener('click', toggle);
  li.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
  });
});

const I18N = {
  ru: {
    'nav.lab': 'О лаборатории',
    'nav.programs': 'Программы',
    'nav.margo': 'О Марго',
    'nav.contacts': 'Контакты',
    'nav.signup': 'Записаться',
    'nav.free': 'Начать бесплатно',
    'nav.mentors': 'Менторы',
    'nav.close': 'Закрыть',
    'hero.eyebrow': 'AI × Fashion × Business',
    'hero.manifest': 'Практические инструменты для дизайнеров, владельцев ателье и небольших fashion-брендов.',
    'hero.tagline': 'От первой идеи и AI-визуализации до продвижения и построения собственного fashion-бизнеса.',
    'hero.free': 'Начать бесплатно',
    'hero.programs': 'Посмотреть программы',
    'products.eyebrow': 'Создай · Упакуй · Построй бизнес',
    'products.title': 'Три уровня погружения',
    'products.lead': 'Начни с бесплатного гида, доведи одну коллекцию до полноценной кампании и построй свой fashion-бизнес.',
    'products.result': 'Результат',
    'products.free.badge': 'FREE',
    'products.free.title': 'Создай свою первую мини-коллекцию с помощью ИИ',
    'products.free.sub': 'Как из одной идеи создать 5 связанных между собой fashion-образов.',
    'products.free.li1': 'Поиск идеи и концепции',
    'products.free.li2': 'Разработка направления',
    'products.free.li3': 'AI prompts для дизайнера',
    'products.free.li4': 'Создание fashion-образов',
    'products.free.li5': 'Сборка первой мини-коллекции',
    'products.free.result': 'Первая AI mini collection и понимание, как использовать AI как инструмент дизайнера.',
    'products.free.note': '* Для получения бесплатных материалов в Telegram-боте напишите слово <b>GUIDE</b>.',
    'products.free.cta': 'Получить бесплатно',
    'products.paid.badge': '$19',
    'products.paid.title': 'Одно платье — целая рекламная кампания',
    'products.paid.sub': 'Как из одного дизайна собрать визуалы, контент и готовую презентацию продукта.',
    'products.paid.li1': 'AI-модель на основе твоего дизайна',
    'products.paid.li2': 'Разные ракурсы одного образа',
    'products.paid.li3': 'Campaign images для бренда',
    'products.paid.li4': 'Social-media content',
    'products.paid.li5': 'Готовая fashion-история продукта',
    'products.paid.result': 'Один дизайн превращается в полноценную campaign concept.',
    'products.paid.cta': 'Создать свою кампанию',
    'products.program.badge': '$199',
    'products.program.title': 'Как построить своё fashion-ателье',
    'products.program.sub': 'Полная система запуска fashion-бизнеса — пять модулей от идеи до продаж.',
    'products.program.m1': 'Идея',
    'products.program.m1.sub': 'концепция, ниша, стиль',
    'products.program.m2': 'Позиционирование',
    'products.program.m2.sub': 'бренд, аудитория, отличие',
    'products.program.m3': 'Услуги',
    'products.program.m3.sub': 'продуктовая линейка, цены, формат',
    'products.program.m4': 'Процессы',
    'products.program.m4.sub': 'производство, организация, управление',
    'products.program.m5': 'Продвижение',
    'products.program.m5.sub': 'контент, продажи, маркетинг',
    'products.program.result': 'Готовая система запуска своего fashion-ателье.',
    'products.program.cta': 'Join Program',
    'community.eyebrow': 'Telegram MARGO Creative Lab',
    'community.title': 'Хотите больше практических материалов по AI, Fashion и Business?',
    'community.li1': 'AI-инструменты и практические уроки',
    'community.li2': 'Fashion-кейсы и разборы',
    'community.li3': 'Идеи для коллекций',
    'community.li4': 'Новости и анонсы новых продуктов',
    'community.cta': 'Присоединиться к Telegram',
    'manifesto.title': 'Новый язык моды',
    'manifesto.lead': 'Технологии не заменяют творчество. Они расширяют границы возможного.',
    'manifesto.p1': 'Раньше идея упиралась в бюджет, производство и время. Эскиз оставался эскизом, потому что до коллекции — месяцы работы ателье. Margo Creative Lab меняет эту логику: с ИИ путь от образа в голове до готовой кампании занимает дни, а не сезоны.',
    'manifesto.p2': 'Ты не учишься «работать в нейросети» — ты учишься говорить с ней на языке моды: силуэт, ткань, свет, история.',
    'manifesto.micro': 'Если у тебя есть идея — у тебя уже есть коллекция. Просто она ещё не увидена.',
    'process.title': 'От идеи до создания',
    'process.1.title': 'Идея',
    'process.1.text': 'Интуиция. Всё начинается с образа, который пока живёт только в голове.',
    'process.2.title': 'Форма',
    'process.2.text': 'Придай ей форму. Опиши словами, приложи референс — и начни диалог с ИИ.',
    'process.3.title': 'ИИ',
    'process.3.text': 'Развивай и расширяй. Нейросеть предлагает вариации, ты выбираешь направление.',
    'process.4.title': 'Коллекция',
    'process.4.text': 'Создай целый мир. Один образ превращается в цельную линейку.',
    'process.5.title': 'Кампания',
    'process.5.text': 'Покажи её миру. Коллекция становится брендом.',
    'create.title': 'Создай визуальный контент fashion-продукта с AI',
    'create.lead': 'Вы приходите с идеей — а с помощью ИИ уходите с визуальным продуктом для продвижения и продаж.',
    'create.note': 'Весь путь — от мудборда до кампании — создаётся с ИИ.',
    'create.1.title': 'Идея',
    'create.1.text': 'ИИ-мудборд, референсы, промпты.',
    'create.2.title': 'Создание',
    'create.2.text': 'Образ и силуэт с помощью ИИ.',
    'create.3.title': 'Кампания',
    'create.3.text': 'ИИ-визуалы, съёмки, контент.',
    'create.4.title': 'Рынок',
    'create.4.text': 'Готовый продукт с ИИ для продвижения и продаж.',
    'lab.title': 'Лаборатория',
    'lab.courses': 'Курсы',
    'lab.learn': 'Учись',
    'lab.courses.text': 'Структурированный путь от первого промпта до готовой коллекции — пошагово, с обратной связью.',
    'lab.workshops': 'Воркшопы',
    'lab.practice': 'Практикуй',
    'lab.workshops.text': 'Интенсивы на 1–2 дня: конкретный навык, конкретный результат уже к вечеру.',
    'lab.mentor': 'Наставничество',
    'lab.grow': 'Расти',
    'lab.mentor.text': 'Персональное сопровождение проекта — от идеи до кампании рядом с Марго.',
    'lab.exp': 'Эксперименты',
    'lab.create': 'Создавай',
    'lab.exp.text': 'Открытая площадка для тех, кто уже владеет инструментами и ищет новую форму.',
    'lab.cta': 'Сообщить об открытии набора',
    'lab.inside': 'Что внутри',
    'lab.day1': 'День 1',
    'lab.day1.title': 'Погружение в ИИ как в материал',
    'lab.day1.text': 'Разбираем инструменты не как софт, а как новый вид ткани — что он умеет, где сопротивляется, как с ним «шить».',
    'lab.day2': 'День 2',
    'lab.day2.title': 'От референса к силуэту',
    'lab.day2.text': 'Собираем визуальный код будущей коллекции: настроение, цвет, форма.',
    'lab.day3': 'День 3',
    'lab.day3.title': 'Коллекция вместо одного образа',
    'lab.day3.text': 'Расширяем находку в серию — принцип вариативности и цельности.',
    'lab.day4': 'День 4',
    'lab.day4.title': 'Бренд вокруг идеи',
    'lab.day4.text': 'Название, айдентика, интонация — коллекция становится историей со своим голосом.',
    'lab.day5': 'День 5',
    'lab.day5.title': 'Кампания и презентация',
    'lab.day5.text': 'Финальная съёмка, сборка кампании, показ работы миру.',
    'lab.uniq': 'Уникальность программы',
    'lab.uniq.1': 'Работаешь над своим проектом, а не учебным упражнением',
    'lab.uniq.2': 'Ведёт практикующий креативный директор, а не преподаватель теории',
    'lab.uniq.3': 'Результат — не сертификат, а готовая кампания в портфолио',
    'lab.uniq.4': 'Разбор работ вживую, а не по шаблону',
    'campaign.title': 'От концепции до рекламной кампании',
    'campaign.2': 'Концепция',
    'campaign.3': 'Образ',
    'campaign.6': 'История',
    'founder.title': 'Креативный директор и основатель лаборатории',
    'founder.p1': 'Марго работает на стыке моды и генеративных технологий: от индивидуальных капсульных коллекций до рекламных кампаний, полностью собранных при помощи ИИ.',
    'founder.p2': 'Верит, что нейросеть — не замена дизайнеру, а новый инструмент в его руках, такой же, как когда-то стала швейная машина.',
    'founder.quote': '«Технологии не спрашивают, есть ли у тебя ателье. Они спрашивают, есть ли у тебя идея.»',
    'mentors.eyebrow': 'Команда MARGO Creative Lab',
    'mentors.title': 'Менторы программы',
    'mentors.lead': 'Четыре взгляда на fashion-бизнес: стратегия, маркетинг, креатив и предпринимательский опыт.',
    'mentors.kicker': 'Mentor',
    'mentors.margo.role': 'Founder & Fashion Business Mentor',
    'mentors.margo.text': 'Видение проекта, fashion-бизнес, стратегия, предпринимательский опыт и общая методология MARGO Creative Lab.',
    'mentors.kendra.role': 'Business Strategy Mentor',
    'mentors.kendra.text': 'Бизнес-модель, позиционирование, структура, рост, продажи и коммерческая логика.',
    'mentors.ava.role': 'Marketing & Content Mentor',
    'mentors.ava.text': 'Контент-стратегия, продвижение, social media, AI-инструменты для маркетинга и коммуникация с аудиторией.',
    'mentors.leya.role': 'Creativity & Brand Mentor',
    'mentors.leya.text': 'Креативная концепция, бренд, визуальная идея, storytelling, коллекции и подача продукта.',
    'youtube.label': 'YouTube MARGO Creative Lab',
    'youtube.title': 'Смотрите бесплатные уроки и разборы',
    'youtube.cta': 'Смотреть на YouTube',
    'works.title': 'Работы лаборатории',
    'works.lead': 'Коллекции, кампании и бренды, рождённые в Margo Creative Lab.',
    'works.course': 'Курс',
    'works.workshop': 'Воркшоп',
    'works.experiment': 'Эксперимент',
    'works.category.project': 'Проект Margo Creative Lab',
    'works.category.ai': 'AI-концепт',
    'works.category.study': 'Мудборд',
    'lab.acc.about': 'О программе',
    'lab.acc.about.text': 'Margo Creative Lab — это не курс по нейросетям, а лаборатория, где мода и ИИ работают вместе. За основной интенсив ты пройдёшь путь от идеи до готовой рекламной кампании — тем же маршрутом, которым идут дизайнерские дома, только без бюджета на производство и студию.',
    'lab.acc.req': 'Требования к участию',
    'lab.acc.req.text': 'Опыт в дизайне не обязателен. Нужны: ноутбук, любопытство и готовность смотреть на моду не только как на вещь, но и как на историю. Базовое знакомство с любым графическим редактором — плюс, но не условие.',
    'lab.acc.format': 'Формат и длительность',
    'lab.acc.format.text': 'Онлайн, живые созвоны и практика в своём темпе. Базовый интенсив — 5 дней, глубина модулей растёт от идеи к кампании.',
    'faq.title': 'Остались вопросы?',
    'faq.q1': 'Нужен ли опыт в дизайне или ИИ?',
    'faq.a1': 'Нет. Часть участников приходит из моды, часть — из технологий. Программа строится так, чтобы обе стороны говорили на одном языке уже к третьему дню.',
    'faq.q2': 'Какие инструменты понадобятся?',
    'faq.a2': 'Ноутбук и доступ в интернет. Список конкретных сервисов и как их подключить — присылаем после записи.',
    'faq.q3': 'Это про генерацию картинок или про реальный продукт?',
    'faq.a3': 'Про продукт. Картинка — только первый шаг; цель — собранная кампания или коллекция, которую можно показывать.',
    'faq.q4': 'Можно ли прийти со своим проектом?',
    'faq.a4': 'Да, особенно на форматы «Наставничество» и «Эксперименты» — они строятся вокруг твоей идеи.',
    'cta.title': 'Создай то, чего ещё не существует.',
    'cta.lead': 'Преврати своё воображение в реальность.',
    'cta.btn': 'Смотреть программы',
    'footer.channels': 'Все каналы MARGO Creative Lab',
    'footer.place': 'South Africa · Working Worldwide'
  },
  en: {
    'nav.lab': 'About the Lab',
    'nav.programs': 'Programs',
    'nav.margo': 'About Margo',
    'nav.contacts': 'Contacts',
    'nav.signup': 'Join',
    'nav.free': 'Start for free',
    'nav.mentors': 'Mentors',
    'nav.close': 'Close',
    'hero.eyebrow': 'AI × Fashion × Business',
    'hero.manifest': 'Practical tools for designers, atelier owners and small fashion brands.',
    'hero.tagline': 'From the first idea and AI visualisation to promotion and building your own fashion business.',
    'hero.free': 'Start for free',
    'hero.programs': 'View programs',
    'products.eyebrow': 'Create · Package · Build a business',
    'products.title': 'Three levels of depth',
    'products.lead': 'Start with a free guide, turn one collection into a full campaign, and build your own fashion business.',
    'products.result': 'Outcome',
    'products.free.badge': 'FREE',
    'products.free.title': 'Create your first AI mini-collection',
    'products.free.sub': 'How to grow one idea into 5 connected fashion looks.',
    'products.free.li1': 'Finding the idea and concept',
    'products.free.li2': 'Developing the direction',
    'products.free.li3': 'AI prompts for the designer',
    'products.free.li4': 'Creating fashion looks',
    'products.free.li5': 'Assembling your first mini-collection',
    'products.free.result': 'Your first AI mini collection and a clear understanding of AI as a designer’s tool.',
    'products.free.note': '* To get the free materials, send the word <b>GUIDE</b> to the Telegram bot.',
    'products.free.cta': 'Get it free',
    'products.paid.badge': '$19',
    'products.paid.title': 'One dress — a whole campaign',
    'products.paid.sub': 'How to turn one design into visuals, content and a ready product presentation.',
    'products.paid.li1': 'AI model from your own design',
    'products.paid.li2': 'Different angles of one look',
    'products.paid.li3': 'Campaign images for the brand',
    'products.paid.li4': 'Social-media content',
    'products.paid.li5': 'A finished fashion story around the product',
    'products.paid.result': 'One design becomes a full campaign concept.',
    'products.paid.cta': 'Create your campaign',
    'products.program.badge': '$199',
    'products.program.title': 'How to launch your own fashion atelier',
    'products.program.sub': 'A complete system for launching a fashion business — five modules from idea to sales.',
    'products.program.m1': 'Idea',
    'products.program.m1.sub': 'concept, niche, style',
    'products.program.m2': 'Positioning',
    'products.program.m2.sub': 'brand, audience, distinction',
    'products.program.m3': 'Services',
    'products.program.m3.sub': 'product line, pricing, format',
    'products.program.m4': 'Operations',
    'products.program.m4.sub': 'production, organisation, management',
    'products.program.m5': 'Promotion',
    'products.program.m5.sub': 'content, sales, marketing',
    'products.program.result': 'A ready system for launching your fashion atelier.',
    'products.program.cta': 'Join Program',
    'community.eyebrow': 'Telegram MARGO Creative Lab',
    'community.title': 'Want more practical materials on AI, Fashion and Business?',
    'community.li1': 'AI tools and practical lessons',
    'community.li2': 'Fashion cases and breakdowns',
    'community.li3': 'Ideas for collections',
    'community.li4': 'News and announcements of new products',
    'community.cta': 'Join on Telegram',
    'manifesto.title': 'A new language of fashion',
    'manifesto.lead': 'Technology does not replace creativity. It expands the boundaries of the possible.',
    'manifesto.p1': 'An idea used to stall at budget, production and time. A sketch stayed a sketch because a collection meant months in an atelier. Margo Creative Lab changes that logic: with AI, the path from an image in your mind to a finished campaign takes days, not seasons.',
    'manifesto.p2': 'You are not learning to “use a neural net” — you are learning to speak with it in the language of fashion: silhouette, fabric, light, story.',
    'manifesto.micro': 'If you have an idea, you already have a collection. It simply has not been seen yet.',
    'process.title': 'From idea to creation',
    'process.1.title': 'Idea',
    'process.1.text': 'Intuition. Everything begins with an image that still lives only in the mind.',
    'process.2.title': 'Form',
    'process.2.text': 'Give it shape. Describe it in words, add a reference — and start a dialogue with AI.',
    'process.3.title': 'AI',
    'process.3.text': 'Develop and expand. The model offers variations; you choose the direction.',
    'process.4.title': 'Collection',
    'process.4.text': 'Create a whole world. One look becomes a coherent line.',
    'process.5.title': 'Campaign',
    'process.5.text': 'Show it to the world. The collection becomes a brand.',
    'create.title': 'Create visual content for a fashion product with AI',
    'create.lead': 'You arrive with an idea — and with AI you leave with a visual product for promotion and sales.',
    'create.note': 'The whole path — from moodboard to campaign — is created with AI.',
    'create.1.title': 'Idea',
    'create.1.text': 'AI moodboard, references, prompts.',
    'create.2.title': 'Creation',
    'create.2.text': 'Look and silhouette with AI.',
    'create.3.title': 'Campaign',
    'create.3.text': 'AI visuals, shoots, content.',
    'create.4.title': 'Market',
    'create.4.text': 'A finished AI product for promotion and sales.',
    'lab.title': 'Laboratory',
    'lab.courses': 'Courses',
    'lab.learn': 'Learn',
    'lab.courses.text': 'A structured path from the first prompt to a finished collection — step by step, with feedback.',
    'lab.workshops': 'Workshops',
    'lab.practice': 'Practice',
    'lab.workshops.text': 'One- or two-day intensives: a specific skill and a concrete result by evening.',
    'lab.mentor': 'Mentorship',
    'lab.grow': 'Grow',
    'lab.mentor.text': 'Personal guidance for your project — from idea to campaign, alongside Margo.',
    'lab.exp': 'Experiments',
    'lab.create': 'Create',
    'lab.exp.text': 'An open space for those who already know the tools and are looking for a new form.',
    'lab.cta': 'Notify me about enrollment',
    'lab.inside': 'What’s inside',
    'lab.day1': 'Day 1',
    'lab.day1.title': 'Immersion in AI as a material',
    'lab.day1.text': 'We treat the tools not as software, but as a new kind of fabric — what it can do, where it resists, how to “sew” with it.',
    'lab.day2': 'Day 2',
    'lab.day2.title': 'From reference to silhouette',
    'lab.day2.text': 'We assemble the visual code of the future collection: mood, colour, form.',
    'lab.day3': 'Day 3',
    'lab.day3.title': 'A collection instead of a single look',
    'lab.day3.text': 'We expand a find into a series — variation and coherence.',
    'lab.day4': 'Day 4',
    'lab.day4.title': 'A brand around the idea',
    'lab.day4.text': 'Name, identity, tone — the collection becomes a story with its own voice.',
    'lab.day5': 'Day 5',
    'lab.day5.title': 'Campaign and presentation',
    'lab.day5.text': 'Final shoot, campaign assembly, showing the work to the world.',
    'lab.uniq': 'What makes the program unique',
    'lab.uniq.1': 'You work on your own project, not a classroom exercise',
    'lab.uniq.2': 'Led by a practising creative director, not a theory lecturer',
    'lab.uniq.3': 'The outcome is not a certificate, but a finished campaign for your portfolio',
    'lab.uniq.4': 'Live critique of work, not a template review',
    'campaign.title': 'From concept to advertising campaign',
    'campaign.2': 'Concept',
    'campaign.3': 'Look',
    'campaign.6': 'Story',
    'founder.title': 'Creative director and founder of the laboratory',
    'founder.p1': 'Margo works at the intersection of fashion and generative technology: from capsule collections to advertising campaigns assembled with AI.',
    'founder.p2': 'She believes a neural network is not a replacement for the designer, but a new tool in their hands — just as the sewing machine once was.',
    'founder.quote': '“Technology does not ask whether you have an atelier. It asks whether you have an idea.”',
    'mentors.eyebrow': 'MARGO Creative Lab team',
    'mentors.title': 'Program mentors',
    'mentors.lead': 'Four views on the fashion business: strategy, marketing, creative and entrepreneurial experience.',
    'mentors.kicker': 'Mentor',
    'mentors.margo.role': 'Founder & Fashion Business Mentor',
    'mentors.margo.text': 'Project vision, fashion business, strategy, entrepreneurial experience and the overall methodology of MARGO Creative Lab.',
    'mentors.kendra.role': 'Business Strategy Mentor',
    'mentors.kendra.text': 'Business model, positioning, structure, growth, sales and commercial logic.',
    'mentors.ava.role': 'Marketing & Content Mentor',
    'mentors.ava.text': 'Content strategy, promotion, social media, AI tools for marketing and communication with the audience.',
    'mentors.leya.role': 'Creativity & Brand Mentor',
    'mentors.leya.text': 'Creative concept, brand, visual idea, storytelling, collections and product presentation.',
    'youtube.label': 'YouTube MARGO Creative Lab',
    'youtube.title': 'Watch free lessons and breakdowns',
    'youtube.cta': 'Watch on YouTube',
    'works.title': 'Lab works',
    'works.lead': 'Collections, campaigns and brands born in Margo Creative Lab.',
    'works.course': 'Course',
    'works.workshop': 'Workshop',
    'works.experiment': 'Experiment',
    'works.category.project': 'Margo Creative Lab Project',
    'works.category.ai': 'AI Concept',
    'works.category.study': 'Creative Study',
    'lab.acc.about': 'About the program',
    'lab.acc.about.text': 'Margo Creative Lab is not a course about neural networks — it is a laboratory where fashion and AI work together. During the main intensive you will walk the path from idea to a finished advertising campaign, the same route followed by fashion houses — without a production or studio budget.',
    'lab.acc.req': 'Participation requirements',
    'lab.acc.req.text': 'No design experience needed. You will need: a laptop, curiosity, and willingness to see fashion not just as a garment but as a story. Basic familiarity with any graphics editor is a plus, not a requirement.',
    'lab.acc.format': 'Format and duration',
    'lab.acc.format.text': 'Online, live calls and practice at your own pace. The core intensive is 5 days, with modules growing deeper from idea to campaign.',
    'faq.title': 'Still have questions?',
    'faq.q1': 'Do I need experience in design or AI?',
    'faq.a1': 'No. Some participants come from fashion, others from technology. The program is designed so that both sides speak the same language by day three.',
    'faq.q2': 'What tools will I need?',
    'faq.a2': 'A laptop and internet access. We send the list of specific services and setup instructions after enrollment.',
    'faq.q3': 'Is this about generating images or a real product?',
    'faq.a3': 'A real product. The image is just the first step; the goal is an assembled campaign or collection you can show.',
    'faq.q4': 'Can I bring my own project?',
    'faq.a4': 'Yes, especially for the "Mentorship" and "Experiments" formats — they are built around your idea.',
    'cta.title': 'Create what does not yet exist.',
    'cta.lead': 'Turn your imagination into reality.',
    'cta.btn': 'View programs',
    'footer.channels': 'All MARGO Creative Lab channels',
    'footer.place': 'South Africa · Working Worldwide'
  }
};

function applyLang(lang){
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;
  document.title = lang === 'en'
    ? 'Margo Creative Lab — create what does not yet exist'
    : 'Margo Creative Lab — создай то, чего ещё не существует';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if(dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if(dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('margo-lang', lang);
  requestAnimationFrame(refreshOpenPanels);
}

document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(localStorage.getItem('margo-lang') === 'ru' ? 'ru' : 'en');

/* ---- Scroll-reveal via IntersectionObserver ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12, rootMargin: '0px 0px -40px 0px'});

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
