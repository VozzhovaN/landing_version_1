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

const subForm = document.getElementById('subForm');
if(subForm){
  subForm.addEventListener('submit', function(e){
    e.preventDefault();
    const emailInput = this.querySelector('input[type=email]');
    const consent = this.querySelector('input[name=consent]');
    const errorEl = document.getElementById('subError');
    const email = emailInput ? emailInput.value.trim() : '';
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!validEmail || !consent || !consent.checked){
      if(errorEl) errorEl.classList.add('is-visible');
      return;
    }
    if(errorEl) errorEl.classList.remove('is-visible');
    const subject = encodeURIComponent('Subscribe — Margo Creative Lab');
    const body = encodeURIComponent('Please add this email to the lab list:\n\n' + email);
    const mail = document.createElement('a');
    mail.href = 'mailto:hello@margocreativelab.com?subject=' + subject + '&body=' + body;
    mail.rel = 'noopener';
    mail.style.display = 'none';
    document.body.appendChild(mail);
    mail.click();
    mail.remove();
    const row = this.querySelector('.sub-row');
    const consentLabel = this.querySelector('.consent');
    if(row) row.style.display = 'none';
    if(consentLabel) consentLabel.style.display = 'none';
    const ok = document.getElementById('subSuccess');
    if(ok) ok.style.display = 'block';
  });
}

const I18N = {
  ru: {
    'nav.lab': 'О лаборатории',
    'nav.programs': 'Программы',
    'nav.margo': 'О Марго',
    'nav.contacts': 'Контакты',
    'nav.signup': 'Записаться',
    'nav.close': 'Закрыть',
    'hero.manifest': 'Создай то, чего ещё не существует.',
    'hero.tagline': 'Лаборатория моды на стыке воображения и искусственного интеллекта',
    'hero.explore': 'Исследовать лабораторию',
    'hero.programs': 'Посмотреть программы',
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
    'create.title': 'Что ты создашь?',
    'create.design': 'Дизайн',
    'create.atelier': 'Ателье',
    'create.brand': 'Бренд',
    'create.creative': 'Креатив',
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
    'founder.write': 'Написать Марго',
    'works.title': 'Работы лаборатории',
    'works.lead': 'Коллекции, кампании и бренды, рождённые в Margo Creative Lab.',
    'works.course': 'Курс',
    'works.workshop': 'Воркшоп',
    'works.experiment': 'Эксперимент',
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
    'cta.btn': 'Войди в мир будущего с Марго',
    'sub.title': 'Будь в курсе лаборатории',
    'sub.lead': 'Даты новых потоков, открытые эксперименты и работы участников — раз в одну-две недели, без спама.',
    'sub.email': 'Ваш e-mail',
    'sub.btn': 'Подписаться',
    'sub.consent': 'Согласен(на) с обработкой персональных данных',
    'sub.ok': 'Откроется почтовый клиент. Отправьте письмо — и мы добавим вас в список ближайшего потока.',
    'sub.error': 'Укажите корректный e-mail и подтвердите согласие.',
    'footer.place': 'Frankfurt am Main · онлайн по всему миру'
  },
  en: {
    'nav.lab': 'About the Lab',
    'nav.programs': 'Programs',
    'nav.margo': 'About Margo',
    'nav.contacts': 'Contacts',
    'nav.signup': 'Join',
    'nav.close': 'Close',
    'hero.manifest': 'Create what does not yet exist.',
    'hero.tagline': 'A fashion laboratory at the intersection of imagination and artificial intelligence',
    'hero.explore': 'Explore the laboratory',
    'hero.programs': 'View programs',
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
    'create.title': 'What will you create?',
    'create.design': 'Design',
    'create.atelier': 'Atelier',
    'create.brand': 'Brand',
    'create.creative': 'Creative',
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
    'founder.write': 'Write to Margo',
    'works.title': 'Lab works',
    'works.lead': 'Collections, campaigns and brands born in Margo Creative Lab.',
    'works.course': 'Course',
    'works.workshop': 'Workshop',
    'works.experiment': 'Experiment',
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
    'cta.btn': 'Enter the future with Margo',
    'sub.title': 'Stay close to the laboratory',
    'sub.lead': 'New cohort dates, open experiments and student work — once every week or two, no spam.',
    'sub.email': 'Your e-mail',
    'sub.btn': 'Subscribe',
    'sub.consent': 'I agree to the processing of personal data',
    'sub.ok': 'Your email app will open. Send the message and we will add you to the next cohort list.',
    'sub.error': 'Enter a valid e-mail and confirm your consent.',
    'footer.place': 'Frankfurt am Main · online worldwide'
  }
};

function applyLang(lang){
  const dict = I18N[lang] || I18N.ru;
  document.documentElement.lang = lang;
  document.title = lang === 'en'
    ? 'Margo Creative Lab — create what does not yet exist'
    : 'Margo Creative Lab — создай то, чего ещё не существует';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(dict[key]) el.textContent = dict[key];
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

applyLang(localStorage.getItem('margo-lang') === 'en' ? 'en' : 'ru');

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
