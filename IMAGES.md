# Изображения для dist/images/

Список получен из `content.js` (единый источник — объект `IMG`, все 37 записей).
Сеть на `images.unsplash.com` / `unsplash.com` заблокирована политикой текущей
сессии (подтверждено `403` на обоих хостах через диагностику агент-прокси), поэтому
скачать эти файлы можно только вручную, с машины с доступом в интернет.

**Как скачать**: открыть ссылку из колонки «Ссылка для скачивания» в браузере —
она ведёт прямо на файл изображения нужной ширины и в JPEG (`fm=jpg`, без
`auto=format`, чтобы браузер не подставил webp/avif) — и сохранить (Save Image As)
под именем из последней колонки в `dist/images/`.

Ширина уже выставлена в самой ссылке по месту использования: **1600px** —
полноэкранные hero/баннерные секции, **800px** — карточки, плашки (`plate`) и
мелкие иллюстрации. Качество `q=80` — соответствует пункту 4 задачи.

Строки **24** и **30** ссылаются на **один и тот же** снимок Unsplash
(`industrialHall` и `metalStructure` — это `photo-1565610222536-ef125c59da2e`
на разной ширине в оригинале); можно скачать один раз на 800px и сохранить под
обоими именами, если не нужны два разных кропа.

Автора (фотографа) в таблице нет — эта информация тоже на `unsplash.com`,
который недоступен из этой сессии. Для `CREDITS.txt` его нужно будет посмотреть
на странице `https://unsplash.com/photos/<id>` (тот же `id`, что в ссылке ниже,
до `?`) при сохранении файлов.

| # | Ключ (content.js) | Где используется | Описание (alt) | Ширина | Ссылка для скачивания | Имя файла в dist/images/ |
|---|---|---|---|---|---|---|
| 1 | `heroPort` | index.html — hero-секция «Building Connections» (фон) | Container terminal at a commercial seaport | 1600 | https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&fm=jpg&fit=crop | `hero-port-terminal.jpg` |
| 2 | `terminal` | reach.html — hero-секция «Oman. Connected to the World.» (фон); также index.html — плашка «Built Around Opportunity» | Aerial view of a container terminal with stacked freight containers | 1600 | https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80&fm=jpg&fit=crop | `aerial-container-terminal.jpg` |
| 3 | `portCranes` | solutions.html — hero-секция «Seven Ways We Take On Work» (фон) | Gantry cranes loading containers onto a vessel | 1600 | https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=80&fm=jpg&fit=crop | `gantry-cranes-vessel.jpg` |
| 4 | `truck` | reach.html — плашка «International suppliers»; sectors.html — категория «General Merchandise» (Housewares) | Freight truck on a highway | 800 | https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80&fm=jpg&fit=crop | `freight-truck-highway.jpg` |
| 5 | `warehouseAisle` | sectors.html — категории «Consumer Goods» (Housewares), «Metal Supply» (Iron & Metal) | Aisle between racking in a distribution warehouse | 800 | https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&fm=jpg&fit=crop | `warehouse-aisle-racking.jpg` |
| 6 | `warehouseWide` | sectors.html — категории «Home Equipment» (Housewares), «Industrial Consumables» (Chemicals), «Material Handling» (Equipment), «Industrial Metals» (Iron & Metal) | Wide interior of a high-bay warehouse | 800 | https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80&fm=jpg&fit=crop | `warehouse-high-bay.jpg` |
| 7 | `racking` | sectors.html — категория «Household Products» (Housewares) | Cookware and pans arranged on a surface | 800 | https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=800&q=80&fm=jpg&fit=crop | `cookware-pans-surface.jpg` |
| 8 | `boxes` | sectors.html — плашка сектора Housewares; категория «Industrial Chemicals» (Chemicals) | Workers packing cartons for dispatch | 800 | https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80&fm=jpg&fit=crop | `workers-packing-cartons.jpg` |
| 9 | `desk` | sectors.html — hero сектора Administrative Services (фон); категория «Technology Hardware» (Electrical) | Laptop and notebook on a working desk | 1600 | https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&fm=jpg&fit=crop | `laptop-notebook-desk.jpg` |
| 10 | `office` | about.html — hero-секция «A Trading Platform, Built in Oman.» (фон) | Open-plan commercial office interior | 1600 | https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fm=jpg&fit=crop | `open-plan-office.jpg` |
| 11 | `meeting` | about.html — плашка «Positioning»; solutions.html — карточка «Strategic Sourcing»; industries.html — карточка «Procurement» | Colleagues reviewing documents in a meeting | 800 | https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&fm=jpg&fit=crop | `meeting-reviewing-documents.jpg` |
| 12 | `documents` | sectors.html — плашка сектора Administrative Services | Printed commercial documents and paperwork | 800 | https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&q=80&fm=jpg&fit=crop | `commercial-documents.jpg` |
| 13 | `handshake` | forms.html — hero-секция «Build With Us» (Partner, фон); solutions.html — карточка «Market Access» | Two people shaking hands across a table | 1600 | https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&fm=jpg&fit=crop | `handshake-across-table.jpg` |
| 14 | `kitchen` | sectors.html — hero сектора Housewares Trade (фон) | Domestic kitchen with cookware on the range | 1600 | https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1600&q=80&fm=jpg&fit=crop | `domestic-kitchen-cookware.jpg` |
| 15 | `hotelRoom` | sectors.html — категории «Hospitality Supplies» (Housewares), «Finishing Materials» (Building Materials); industries.html — карточка «Hospitality» | Made-up guest bedroom in a hotel | 800 | https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80&fm=jpg&fit=crop | `hotel-guest-bedroom.jpg` |
| 16 | `interior` | sectors.html — карточка сектора Housewares Trade; категория «Kitchenware» | Cast-iron cookware pot on a kitchen surface | 800 | https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80&fm=jpg&fit=crop | `cast-iron-cookware-pot.jpg` |
| 17 | `switchgear` | sectors.html — hero сектора Electrical & Electronic Equipment (фон) | Electrician working on an electrical distribution panel | 1600 | https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&q=80&fm=jpg&fit=crop | `electrician-distribution-panel.jpg` |
| 18 | `electronics` | sectors.html — карточка сектора Electrical; категория «Electronic Equipment» | Processor seated on a computer mainboard | 800 | https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80&fm=jpg&fit=crop | `processor-mainboard.jpg` |
| 19 | `screens` | sectors.html — плашка сектора Electrical | Close-up of a populated circuit board | 800 | https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fm=jpg&fit=crop | `circuit-board-closeup.jpg` |
| 20 | `techHardware` | sectors.html — категория «Components» (Electrical) | Internal assembly of a hard disk drive | 800 | https://images.unsplash.com/photo-1601737487795-dab272f52420?w=800&q=80&fm=jpg&fit=crop | `hard-disk-assembly.jpg` |
| 21 | `plant` | sectors.html — hero сектора Chemicals Trading (фон) | Pipework at an industrial processing plant | 1600 | https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=80&fm=jpg&fit=crop | `industrial-plant-pipework.jpg` |
| 22 | `lab` | sectors.html — карточка сектора Chemicals; категория «Chemical Raw Materials» | Technicians in coats working in a laboratory | 800 | https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80&fm=jpg&fit=crop | `laboratory-technicians.jpg` |
| 23 | `earthworks` | sectors.html — hero сектора Equipment & Machinery (фон); index.html — секция «Business enquiry» (фон); forms.html — hero Request a Quote (фон); категория «Construction Materials» (Building Materials) | Heavy earthmoving machinery on an excavation site | 1600 | https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1600&q=80&fm=jpg&fit=crop | `earthmoving-excavation-site.jpg` |
| 24 | `productionLine` | sectors.html — hero всей страницы (индекс секторов, фон); карточка сектора Equipment; категории «Control Equipment» (Electrical), «Manufacturing Inputs» (Chemicals), «Metal Materials» (Iron & Metal); forms.html — карточка «I Am a Supplier» | Robotic arm on an automated production line | 1600 | https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1600&q=80&fm=jpg&fit=crop | `robotic-arm-production-line.jpg` |
| 25 | `industrialHall` | sectors.html — категории «Specialty Products» (Chemicals), «Industrial Construction Supplies» (Building Materials); группа «Specialized Equipment» (Equipment); industries.html — карточка «Industrial Projects» | Empty industrial hall with steel columns | 800 | https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80&fm=jpg&fit=crop | `empty-industrial-hall.jpg` |
| 26 | `construction` | sectors.html — hero сектора Building Materials (фон); forms.html — карточка «I Am a Buyer»; категория «Structural Materials» (Iron & Metal); industries.html — карточка «Construction» | Construction site with workers and structural works | 1600 | https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&fm=jpg&fit=crop | `construction-site-workers.jpg` |
| 27 | `architecture` | sectors.html — карточка сектора Building Materials; категория «Commercial Electrical Products» (Electrical); industries.html — карточка «Commercial Development» | Exterior of a modern commercial building | 800 | https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80&fm=jpg&fit=crop | `modern-commercial-building.jpg` |
| 28 | `building` | sectors.html — плашка сектора Building Materials | Finished building facade | 800 | https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fm=jpg&fit=crop | `finished-building-facade.jpg` |
| 29 | `welding` | industries.html — hero всей страницы (фон); sectors.html — hero сектора Iron & Metal (фон); категория «Structural Materials» (Building Materials) | Steel reinforcement mat laid on a construction site | 1600 | https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&fm=jpg&fit=crop | `steel-reinforcement-mat.jpg` |
| 30 | `welder` | sectors.html — карточка сектора Iron & Metal; категория «Iron Products» | Welder joining steel, sparks visible | 800 | https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&fm=jpg&fit=crop | `welder-sparks.jpg` |
| 31 | `metalStructure` | sectors.html — плашка сектора Iron & Metal (тот же снимок, что и `industrialHall`, см. примечание выше) | Exposed steel columns and roof trusses in an industrial hall | 800 | https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80&fm=jpg&fit=crop | `steel-columns-roof-trusses.jpg` |
| 32 | `factory` | forms.html — hero Become a Supplier (фон); sectors.html — плашка сектора Chemicals; категории «Industrial Electrical Products» (Electrical), «Steel Products» (Iron & Metal); industries.html — карточка «Manufacturing» | Interior of a manufacturing facility | 1600 | https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&fm=jpg&fit=crop | `manufacturing-facility-interior.jpg` |
| 33 | `engineer` | industries.html — карточка «Engineering» | Engineer reviewing technical drawings | 800 | https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&fm=jpg&fit=crop | `engineer-technical-drawings.jpg` |
| 34 | `turbines` | sectors.html — категория «Power Equipment» (Electrical); industries.html — карточка «Energy» | Wind turbines against the sky | 800 | https://images.unsplash.com/photo-1487875961445-47a00398c267?w=800&q=80&fm=jpg&fit=crop | `wind-turbines.jpg` |
| 35 | `solar` | sectors.html — категория «Electrical Equipment» (Electrical) | Rows of solar panels in an array | 800 | https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&fm=jpg&fit=crop | `solar-panel-array.jpg` |
| 36 | `aerialYard` | sectors.html — плашка сектора Equipment; категория «Infrastructure Materials» (Building Materials) | Construction crew erecting formwork on a civil works site | 800 | https://images.unsplash.com/photo-1516216628859-9bccecab13ca?w=800&q=80&fm=jpg&fit=crop | `formwork-civil-works-site.jpg` |
| 37 | `notebook` | insights.html — плашка «Publication pending» | Notebook and pen on a desk | 800 | https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=800&q=80&fm=jpg&fit=crop | `notebook-pen-desk.jpg` |

## Что дальше

Ничего в `tools/` или `dist/` этим коммитом не менялось — пути в шаблонах
по-прежнему указывают на `images.unsplash.com`. Как только файлы из таблицы
будут в `dist/images/`, следующим шагом можно:

1. Пережать/убедиться, что каждый файл ≤300 КБ (при `q=80` на этих
   разрешениях обычно укладывается сам; если нет — пережать `cwebp`/`jpegoptim`).
2. Сгенерировать `.webp`-версии рядом с `.jpg`.
3. Переписать `D.img.*`/`s.hero`/`s.card`/`s.plate`/категорийные `img` в
   `content.js` (или прямо ссылки в `tools/pages/*.js`) на `./images/<имя>.jpg`
   и обернуть в `<picture>` с `<source type="image/webp">`.
4. Заполнить `dist/images/CREDITS.txt` — по одному имени фотографа на файл,
   со страницы `unsplash.com/photos/<id>`.
5. Пересобрать (`node tools/generate.js`) и проверить в headless-браузере
   офлайн, что обращений к `images.unsplash.com` не осталось.
