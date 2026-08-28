/* United Assets Investments SPC — content layer.
   CMS-ready data model. Every field here maps 1:1 to a CMS content type
   (see /content-model in the handoff notes). No company facts are asserted
   beyond what the client brief supplied; unknown values are marked TBC. */
(function () {
  /* Local, self-hosted images — see IMAGES.md for provenance (each was
     originally sourced from images.unsplash.com; download-images.js
     fetched them into dist/images/, see dist/images/CREDITS.txt for
     photographer credit). Site no longer depends on any external image
     host. */
  var IMG = {
    heroPort: './images/hero-port-terminal.jpg',
    terminal: './images/aerial-container-terminal.jpg',
    portCranes: './images/gantry-cranes-vessel.jpg',
    truck: './images/freight-truck-highway.jpg',
    warehouseAisle: './images/warehouse-aisle-racking.jpg',
    warehouseWide: './images/warehouse-high-bay.jpg',
    racking: './images/cookware-pans-surface.jpg',
    boxes: './images/workers-packing-cartons.jpg',
    desk: './images/laptop-notebook-desk.jpg',
    office: './images/open-plan-office.jpg',
    meeting: './images/meeting-reviewing-documents.jpg',
    documents: './images/commercial-documents.jpg',
    handshake: './images/handshake-across-table.jpg',
    kitchen: './images/domestic-kitchen-cookware.jpg',
    hotelRoom: './images/hotel-guest-bedroom.jpg',
    interior: './images/cast-iron-cookware-pot.jpg',
    switchgear: './images/electrician-distribution-panel.jpg',
    electronics: './images/processor-mainboard.jpg',
    screens: './images/circuit-board-closeup.jpg',
    techHardware: './images/hard-disk-assembly.jpg',
    plant: './images/industrial-plant-pipework.jpg',
    lab: './images/laboratory-technicians.jpg',
    earthworks: './images/earthmoving-excavation-site.jpg',
    productionLine: './images/robotic-arm-production-line.jpg',
    industrialHall: './images/empty-industrial-hall.jpg',
    construction: './images/construction-site-workers.jpg',
    architecture: './images/modern-commercial-building.jpg',
    building: './images/finished-building-facade.jpg',
    welding: './images/steel-reinforcement-mat.jpg',
    welder: './images/welder-sparks.jpg',
    metalStructure: './images/steel-columns-roof-trusses.jpg',
    factory: './images/manufacturing-facility-interior.jpg',
    engineer: './images/engineer-technical-drawings.jpg',
    turbines: './images/wind-turbines.jpg',
    solar: './images/solar-panel-array.jpg',
    aerialYard: './images/formwork-civil-works-site.jpg',
    notebook: './images/notebook-pen-desk.jpg'
  };

  /* Alt text lives with the image, keyed identically to IMG, so a photo swap
     can never desynchronise its description. Resolve via UAI.altFor(url). */
  var IMG_ALT = {
    heroPort: 'Container terminal at a commercial seaport',
    terminal: 'Aerial view of a container terminal with stacked freight containers',
    portCranes: 'Gantry cranes loading containers onto a vessel',
    truck: 'Freight truck on a highway',
    warehouseAisle: 'Aisle between racking in a distribution warehouse',
    warehouseWide: 'Wide interior of a high-bay warehouse',
    racking: 'Cookware and pans arranged on a surface',
    boxes: 'Workers packing cartons for dispatch',
    desk: 'Laptop and notebook on a working desk',
    office: 'Open-plan commercial office interior',
    meeting: 'Colleagues reviewing documents in a meeting',
    documents: 'Printed commercial documents and paperwork',
    handshake: 'Two people shaking hands across a table',
    kitchen: 'Domestic kitchen with cookware on the range',
    hotelRoom: 'Made-up guest bedroom in a hotel',
    interior: 'Cast-iron cookware pot on a kitchen surface',
    switchgear: 'Electrician working on an electrical distribution panel',
    electronics: 'Processor seated on a computer mainboard',
    screens: 'Close-up of a populated circuit board',
    techHardware: 'Internal assembly of a hard disk drive',
    plant: 'Pipework at an industrial processing plant',
    lab: 'Technicians in coats working in a laboratory',
    earthworks: 'Heavy earthmoving machinery on an excavation site',
    productionLine: 'Robotic arm on an automated production line',
    industrialHall: 'Empty industrial hall with steel columns',
    construction: 'Construction site with workers and structural works',
    architecture: 'Exterior of a modern commercial building',
    building: 'Finished building facade',
    welding: 'Steel reinforcement mat laid on a construction site',
    welder: 'Welder joining steel, sparks visible',
    metalStructure: 'Exposed steel columns and roof trusses in an industrial hall',
    factory: 'Interior of a manufacturing facility',
    engineer: 'Engineer reviewing technical drawings',
    turbines: 'Wind turbines against the sky',
    solar: 'Rows of solar panels in an array',
    aerialYard: 'Construction crew erecting formwork on a civil works site',
    notebook: 'Notebook and pen on a desk'
  };

  var URL_ALT = {};
  Object.keys(IMG).forEach(function (k) { URL_ALT[IMG[k]] = IMG_ALT[k] || ''; });

  var SECTORS = [
    {
      num: '01', slug: 'administrative-services',
      title: 'Administrative Services',
      nav: 'Administrative Services',
      heroTitle: 'Administrative Services',
      kicker: 'Business & commercial support',
      blurb: 'Structured business and administrative support that keeps commercial processes moving between suppliers, customers and authorities.',
      intro: 'Trade runs on paperwork, follow-up and clear communication. Our administrative desk carries that weight for clients who would rather not build the function in-house — coordinating documentation, correspondence and supplier and client communication so a transaction progresses without gaps.',
      hero: IMG.desk, card: IMG.office,
      plate: IMG.documents,
      services: [
        { name: 'Business Administration', text: 'Day-to-day commercial administration for transactions, orders and supplier accounts.' },
        { name: 'Documentation Coordination', text: 'Preparation, review and tracking of commercial and shipping documentation.' },
        { name: 'Commercial Support', text: 'Quotation handling, order confirmation and commercial correspondence.' },
        { name: 'Supplier Coordination', text: 'A single point of contact across multiple suppliers and production timelines.' },
        { name: 'Client Coordination', text: 'Status reporting and structured follow-up on open requirements.' },
        { name: 'Operational Assistance', text: 'Support for recurring operational tasks that sit between departments.' },
        { name: 'Business Process Support', text: 'Documented, repeatable processes for procurement and supply routines.' }
      ],
      workflow: ['Requirement received', 'Documentation prepared', 'Suppliers coordinated', 'Approvals tracked', 'Status reported', 'File closed'],
      applications: ['Procurement teams', 'Trading operations', 'Project offices', 'Suppliers entering the region'],
      cta: 'Discuss Your Requirement',
      seo: { title: 'Administrative Services | United Assets Investments', description: 'Business administration, documentation coordination and commercial support for trading and procurement operations in Oman and the wider GCC.' }
    },
    {
      num: '02', slug: 'logistics-services',
      title: 'Logistics Services',
      nav: 'Logistics Services',
      heroTitle: 'Logistics That Connects Business',
      kicker: 'Freight, cargo & supply chain',
      blurb: 'Coordinated logistics supporting the movement of goods across commercial and international supply chains.',
      intro: 'A shipment is only as good as the coordination behind it. We work across freight, transport, customs and warehousing partners to keep cargo moving on an agreed plan — and to tell you early when that plan needs to change.',
      hero: IMG.portCranes, card: IMG.terminal,
      plate: IMG.truck,
      services: [
        { name: 'Freight Coordination', text: 'Sea, road and air freight arranged against the commercial terms of the order.' },
        { name: 'Cargo Coordination', text: 'Consolidation, documentation and handover between carriers.' },
        { name: 'Transportation', text: 'Inland movement to site, yard, warehouse or port.' },
        { name: 'Warehousing Coordination', text: 'Short and longer-term storage arranged with warehouse partners.' },
        { name: 'Import & Export Coordination', text: 'Coordination of customs formalities and clearance requirements.' },
        { name: 'Supply Chain Support', text: 'Planning support where several suppliers feed one delivery programme.' },
        { name: 'Regional Distribution', text: 'Onward distribution across Oman and neighbouring markets.' },
        { name: 'Delivery Coordination', text: 'Scheduled delivery windows and confirmed receipt at destination.' }
      ],
      chain: ['Supplier', 'Sourcing', 'Transportation', 'Customs', 'Warehousing', 'Distribution', 'Customer'],
      applications: ['Industrial supply', 'Project cargo', 'Retail and wholesale goods', 'Equipment movement'],
      cta: 'Discuss a Shipment',
      seo: { title: 'Logistics Services | United Assets Investments', description: 'Freight, cargo, warehousing and import-export coordination connecting international supply with Oman and regional markets.' }
    },
    {
      num: '03', slug: 'housewares',
      title: 'Housewares Trade',
      nav: 'Housewares Trade',
      heroTitle: 'Housewares Trade',
      kicker: 'Household & hospitality goods',
      blurb: 'Connecting quality household and hospitality products with commercial buyers across regional markets.',
      intro: 'Volume buyers judge housewares on three things: consistency between shipments, honest specification, and a landed price that holds. We source against those criteria for retailers, wholesalers, hospitality operators and facility suppliers.',
      hero: IMG.kitchen, card: IMG.interior,
      plate: IMG.boxes,
      categories: [
        { name: 'Kitchenware', text: 'Cookware, utensils, preparation and serving items.', img: IMG.interior },
        { name: 'Household Products', text: 'Everyday household goods for retail and wholesale channels.', img: IMG.racking },
        { name: 'Home Equipment', text: 'Small equipment and appliances for domestic use.', img: IMG.warehouseWide },
        { name: 'Hospitality Supplies', text: 'Guest room, housekeeping and food service supplies.', img: IMG.hotelRoom },
        { name: 'Consumer Goods', text: 'Fast-moving consumer lines for distribution.', img: IMG.warehouseAisle },
        { name: 'General Merchandise', text: 'Mixed-category sourcing for wholesale buyers.', img: IMG.truck }
      ],
      applications: ['Retail', 'Wholesale distribution', 'Hotels and hospitality', 'Facility management'],
      cta: 'Request Product Information',
      seo: { title: 'Housewares Trade | United Assets Investments', description: 'Sourcing and supply of kitchenware, household products, hospitality supplies and general merchandise for regional trade buyers.' }
    },
    {
      num: '04', slug: 'electrical-electronic',
      title: 'Electrical & Electronic Equipment',
      nav: 'Electrical & Electronic',
      heroTitle: 'Electrical & Electronic Equipment',
      kicker: 'Power, control & technology',
      blurb: 'Sourcing and supply of electrical and electronic equipment for commercial, industrial and infrastructure requirements.',
      intro: 'Electrical scope is unforgiving: the wrong rating, standard or certification stops a site. We work from the specification sheet outward — matching ratings, standards and lead times before a commercial offer is made.',
      hero: IMG.switchgear, card: IMG.electronics,
      plate: IMG.screens,
      categories: [
        { name: 'Electrical Equipment', text: 'Distribution, protection and switching equipment.', img: IMG.solar },
        { name: 'Electronic Equipment', text: 'Instrumentation and electronic assemblies.', img: IMG.electronics },
        { name: 'Industrial Electrical Products', text: 'Products specified for industrial environments and duty cycles.', img: IMG.factory },
        { name: 'Control Equipment', text: 'Control panels, starters and automation hardware.', img: IMG.productionLine },
        { name: 'Components', text: 'Component-level supply against drawings and part numbers.', img: IMG.techHardware },
        { name: 'Commercial Electrical Products', text: 'Equipment for commercial buildings and facilities.', img: IMG.architecture },
        { name: 'Power Equipment', text: 'Generation, conversion and power distribution equipment.', img: IMG.turbines },
        { name: 'Technology Hardware', text: 'IT and communications hardware for commercial use.', img: IMG.desk }
      ],
      applications: ['Industrial', 'Commercial', 'Infrastructure', 'Construction', 'Engineering'],
      cta: 'Send Your Specification',
      seo: { title: 'Electrical & Electronic Equipment | United Assets Investments', description: 'Sourcing and commercial supply of electrical equipment, control gear, components and technology hardware for industrial and infrastructure projects.' }
    },
    {
      num: '05', slug: 'chemicals',
      title: 'Chemicals Trading',
      nav: 'Chemicals Trading',
      heroTitle: 'Chemicals Trading',
      kicker: 'Industrial inputs & consumables',
      blurb: 'Connecting industrial requirements with reliable sourcing and commercial supply across chemical and manufacturing applications.',
      intro: 'Our role in chemicals is commercial, not technical. We identify qualified sources, confirm grade and documentation requirements with the buyer, and coordinate compliant handling and transport through to the receiving plant.',
      hero: IMG.plant, card: IMG.lab,
      plate: IMG.factory,
      categories: [
        { name: 'Industrial Chemicals', text: 'Bulk and packaged chemicals for industrial processes.', img: IMG.boxes },
        { name: 'Chemical Raw Materials', text: 'Input materials for manufacturing and blending.', img: IMG.lab },
        { name: 'Manufacturing Inputs', text: 'Process inputs supplied to an agreed specification.', img: IMG.productionLine },
        { name: 'Specialty Products', text: 'Application-specific products sourced to requirement.', img: IMG.industrialHall },
        { name: 'Industrial Consumables', text: 'Recurring consumable supply against forecast.', img: IMG.warehouseWide }
      ],
      steps: [
        { name: 'Source', text: 'Identify qualified producers and traders for the grade required.' },
        { name: 'Evaluate', text: 'Review specification, documentation and packing against the application.' },
        { name: 'Coordinate', text: 'Arrange compliant handling, transport and clearance.' },
        { name: 'Supply', text: 'Deliver on the agreed commercial terms and reporting.' }
      ],
      applications: ['Manufacturing', 'Processing industries', 'Water and utilities', 'Construction chemicals', 'Maintenance operations'],
      cta: 'Discuss a Requirement',
      seo: { title: 'Chemicals Trading | United Assets Investments', description: 'Commercial sourcing and supply of industrial chemicals, raw materials and consumables for manufacturing and processing operations.' }
    },
    {
      num: '06', slug: 'equipment-machinery',
      title: 'Equipment & Machinery Trading',
      nav: 'Equipment & Machinery',
      heroTitle: 'Equipment That Moves Industry',
      kicker: 'Construction & industrial plant',
      blurb: 'Sourcing, commercial supply and delivery coordination for construction, industrial and material handling equipment.',
      intro: 'Equipment decisions are capital decisions. We work through duty requirements, availability and delivery route before price — because the cheapest unit that arrives two months late is the expensive one.',
      hero: IMG.earthworks, card: IMG.productionLine,
      plate: IMG.aerialYard,
      groups: [
        { name: 'Construction Equipment', items: ['Excavators', 'Loaders', 'Cranes', 'Heavy Equipment'], img: IMG.construction },
        { name: 'Industrial Equipment', items: ['Production Machinery', 'Processing Equipment', 'Industrial Systems'], img: IMG.productionLine },
        { name: 'Material Handling', items: ['Warehouse Equipment', 'Handling Equipment'], img: IMG.warehouseWide },
        { name: 'Specialized Equipment', items: ['Application-specific machinery sourced to requirement'], img: IMG.industrialHall }
      ],
      applications: ['Construction', 'Infrastructure', 'Manufacturing', 'Warehousing', 'Industrial projects'],
      cta: 'Request a Quote',
      seo: { title: 'Equipment & Machinery Trading | United Assets Investments', description: 'Construction equipment, industrial machinery and material handling equipment sourced and supplied for projects in Oman and the GCC.' }
    },
    {
      num: '07', slug: 'building-materials',
      title: 'Building Materials Trading',
      nav: 'Building Materials',
      heroTitle: 'Building Materials for Growing Infrastructure',
      kicker: 'Project & construction supply',
      blurb: 'Material supply coordinated to construction programmes, from structural packages through finishing works.',
      intro: 'Construction supply is a scheduling discipline. We plan material packages against the build programme so deliveries arrive in sequence — structural first, finishes when the site is ready for them.',
      hero: IMG.construction, card: IMG.architecture,
      plate: IMG.building,
      categories: [
        { name: 'Construction Materials', text: 'General materials for building and civil works.', img: IMG.earthworks },
        { name: 'Structural Materials', text: 'Load-bearing and structural material packages.', img: IMG.welding },
        { name: 'Finishing Materials', text: 'Interior and exterior finishing supply.', img: IMG.hotelRoom },
        { name: 'Infrastructure Materials', text: 'Materials for roads, utilities and public works.', img: IMG.aerialYard },
        { name: 'Industrial Construction Supplies', text: 'Supply for industrial builds and plant works.', img: IMG.industrialHall },
        { name: 'Project Supplies', text: 'Consolidated project supply against a programme.', img: IMG.architecture }
      ],
      chain: ['Manufacturer', 'Sourcing', 'Coordination', 'Logistics', 'Project'],
      applications: ['Building construction', 'Civil works', 'Infrastructure', 'Industrial facilities', 'Fit-out'],
      cta: 'Plan a Material Package',
      seo: { title: 'Building Materials Trading | United Assets Investments', description: 'Construction, structural, finishing and infrastructure materials sourced and delivered to project programmes across Oman.' }
    },
    {
      num: '08', slug: 'iron-metal',
      title: 'Iron & Metal Industry',
      nav: 'Iron & Metal',
      heroTitle: 'Iron & Metal',
      kicker: 'Structural & industrial metals',
      blurb: 'Commercial sourcing and supply of iron and metal products for construction, infrastructure, manufacturing and industrial requirements.',
      intro: 'Metal is bought on grade, tolerance and timing. We source against the standard named in the drawing, confirm mill documentation, and coordinate transport for weights and lengths that ordinary freight will not take.',
      hero: IMG.welding, card: IMG.welder,
      plate: IMG.metalStructure,
      categories: [
        { name: 'Iron Products', text: 'Iron products for construction and industrial use.', img: IMG.welder },
        { name: 'Steel Products', text: 'Sections, plate, bar and coil supplied to standard.', img: IMG.factory },
        { name: 'Metal Materials', text: 'Ferrous and non-ferrous material supply.', img: IMG.productionLine },
        { name: 'Industrial Metals', text: 'Metals specified for industrial fabrication.', img: IMG.warehouseWide },
        { name: 'Structural Materials', text: 'Structural steel packages for building and civil works.', img: IMG.construction },
        { name: 'Metal Supply', text: 'Recurring supply programmes for fabricators.', img: IMG.warehouseAisle }
      ],
      applications: ['Construction', 'Infrastructure', 'Manufacturing', 'Engineering', 'Industrial projects'],
      cta: 'Request Metal Pricing',
      seo: { title: 'Iron & Metal | United Assets Investments', description: 'Iron and steel products, structural materials and industrial metals sourced and supplied for construction, infrastructure and manufacturing.' }
    }
  ];

  var SOLUTIONS = [
    { slug: 'strategic-sourcing', name: 'Strategic Sourcing', icon: 'search', img: IMG.meeting,
      short: 'Identify suitable products, suppliers and commercial opportunities.',
      text: 'Sourcing begins with the requirement, not the catalogue. We define what the specification actually demands, map who can supply it credibly, and bring back options that can be compared on the same terms.',
      process: ['Define requirement', 'Map supply options', 'Qualify sources', 'Compare offers', 'Recommend'] },
    { slug: 'international-trading', name: 'International Trading', icon: 'globe', img: IMG.terminal,
      short: 'Facilitate commercial connections between buyers and suppliers.',
      text: 'We act as the commercial bridge between an international supplier and a regional buyer — negotiating terms, holding both sides to an agreed sequence, and carrying the transaction through documentation and delivery.',
      process: ['Introduce', 'Agree terms', 'Contract', 'Ship', 'Settle'] },
    { slug: 'supply-chain-coordination', name: 'Supply Chain Coordination', icon: 'route', img: IMG.portCranes,
      short: 'Coordinate requirements from sourcing through delivery.',
      text: 'Where several suppliers feed one delivery date, someone has to own the critical path. We hold that role: consolidating schedules, flagging slippage early and re-planning around it.',
      process: ['Plan', 'Consolidate', 'Move', 'Clear', 'Deliver'] },
    { slug: 'procurement-support', name: 'Procurement Support', icon: 'clipboard', img: IMG.desk,
      short: 'Support supplier identification, quotations and commercial communication.',
      text: 'An extension of your procurement desk for categories or geographies where you have no established supply base — running enquiries, chasing quotations and normalising offers for comparison.',
      process: ['Enquiry', 'Quotation', 'Clarification', 'Comparison', 'Award'] },
    { slug: 'industrial-supply', name: 'Industrial Supply', icon: 'factory', img: IMG.factory,
      short: 'Support industrial and infrastructure requirements.',
      text: 'Recurring supply of equipment, materials and consumables to operating facilities, planned around production schedules and maintenance windows rather than one-off orders.',
      process: ['Forecast', 'Stock plan', 'Call-off', 'Replenish', 'Review'] },
    { slug: 'project-supply', name: 'Project Supply', icon: 'layers', img: IMG.construction,
      short: 'Coordinate material and equipment requirements for projects.',
      text: 'Project packages sequenced to the build programme, with material tracked by package rather than by invoice, so site knows what is arriving and when.',
      process: ['Take-off', 'Package', 'Procure', 'Schedule', 'Deliver to site'] },
    { slug: 'market-access', name: 'Market Access', icon: 'handshake', img: IMG.handshake,
      short: 'Connect international suppliers with regional commercial opportunities.',
      text: 'For manufacturers outside the region, we provide a commercial route in: local presence, buyer introductions and the administrative structure needed to trade here.',
      process: ['Assess fit', 'Position', 'Introduce', 'Support', 'Develop'] }
  ];

  var INDUSTRIES = [
    { slug: 'construction', name: 'Construction', img: IMG.construction, text: 'Material packages and equipment sequenced to build programmes.', sectors: ['building-materials', 'iron-metal', 'equipment-machinery'], seo: { title: 'Construction | United Assets Investments', description: 'Material packages, structural steel and equipment sourced and sequenced to construction programmes in Oman and the GCC.' } },
    { slug: 'infrastructure', name: 'Infrastructure', img: IMG.aerialYard, text: 'Supply for roads, utilities and public works programmes.', sectors: ['building-materials', 'iron-metal', 'electrical-electronic'], seo: { title: 'Infrastructure | United Assets Investments', description: 'Supply of materials and equipment for roads, utilities and public works programmes across Oman and neighbouring markets.' } },
    { slug: 'manufacturing', name: 'Manufacturing', img: IMG.factory, text: 'Process inputs, spares and equipment for operating plants.', sectors: ['chemicals', 'equipment-machinery', 'electrical-electronic'], seo: { title: 'Manufacturing | United Assets Investments', description: 'Process inputs, industrial consumables, spares and equipment supplied to operating manufacturing plants.' } },
    { slug: 'engineering', name: 'Engineering', img: IMG.engineer, text: 'Specification-led sourcing against drawings and standards.', sectors: ['electrical-electronic', 'iron-metal', 'equipment-machinery'], seo: { title: 'Engineering | United Assets Investments', description: 'Specification-led sourcing against drawings and named standards for engineering and fabrication requirements.' } },
    { slug: 'logistics', name: 'Logistics', img: IMG.terminal, text: 'Handling equipment, warehouse fit-out and movement coordination.', sectors: ['logistics-services', 'equipment-machinery'], seo: { title: 'Logistics | United Assets Investments', description: 'Handling equipment, warehouse fit-out and freight coordination for logistics and distribution operators.' } },
    { slug: 'hospitality', name: 'Hospitality', img: IMG.hotelRoom, text: 'Guest room, housekeeping and food service supply programmes.', sectors: ['housewares', 'electrical-electronic'], seo: { title: 'Hospitality | United Assets Investments', description: 'Guest room, housekeeping and food service supply programmes for hotels and hospitality operators.' } },
    { slug: 'energy', name: 'Energy', img: IMG.turbines, text: 'Equipment and consumable supply for energy operations.', sectors: ['electrical-electronic', 'chemicals', 'equipment-machinery'], seo: { title: 'Energy | United Assets Investments', description: 'Equipment, electrical hardware and consumable supply programmes for energy sector operations.' } },
    { slug: 'industrial-projects', name: 'Industrial Projects', img: IMG.industrialHall, text: 'Consolidated supply for plant construction and expansion.', sectors: ['equipment-machinery', 'iron-metal', 'building-materials'], seo: { title: 'Industrial Projects | United Assets Investments', description: 'Consolidated equipment and material supply for industrial plant construction and expansion projects.' } },
    { slug: 'commercial-development', name: 'Commercial Development', img: IMG.architecture, text: 'Fit-out, finishing and building services material supply.', sectors: ['building-materials', 'electrical-electronic', 'housewares'], seo: { title: 'Commercial Development | United Assets Investments', description: 'Fit-out, finishing and building services material supply for commercial development projects.' } },
    { slug: 'procurement', name: 'Procurement', img: IMG.meeting, text: 'Category support for teams sourcing into new markets.', sectors: ['administrative-services', 'logistics-services'], seo: { title: 'Procurement | United Assets Investments', description: 'Category and supplier support for procurement teams sourcing into Oman and the wider region.' } },
    { slug: 'trading', name: 'Trading', img: IMG.warehouseWide, text: 'Wholesale and distribution supply across mixed categories.', sectors: ['housewares', 'chemicals', 'iron-metal'], seo: { title: 'Trading | United Assets Investments', description: 'Wholesale and distribution supply across mixed product categories for regional trading companies.' } }
  ];

  var WHY = [
    { name: 'Diversified', text: 'Eight business sectors under one commercial platform, so a mixed requirement does not become a procurement exercise across five vendors.' },
    { name: 'Strategic', text: 'Focused on sourcing and commercial opportunity rather than holding stock for its own sake.' },
    { name: 'Connected', text: 'Built around working relationships between suppliers, customers and markets.' },
    { name: 'Flexible', text: 'Scope is shaped to the requirement — a single enquiry or a recurring supply programme.' },
    { name: 'International', text: 'Designed around cross-border trade: documentation, freight and clearance as part of the offer.' },
    { name: 'Partnership Driven', text: 'Measured on repeat business, not on the first transaction.' }
  ];

  var PROCESS = [
    { num: '01', name: 'Understand', text: 'We establish the requirement in commercial and technical terms before proposing anything.' },
    { num: '02', name: 'Source', text: 'We identify suitable products, suppliers or commercial opportunities.' },
    { num: '03', name: 'Evaluate', text: 'We review specifications, documentation and commercial conditions.' },
    { num: '04', name: 'Coordinate', text: 'We coordinate suppliers, documentation and logistics into one sequence.' },
    { num: '05', name: 'Supply', text: 'We support the agreed supply process through to delivery and closure.' },
    { num: '06', name: 'Develop', text: 'We build the relationship into a longer commercial programme.' }
  ];

  var FINDER = [
    { label: 'I need logistics', slug: 'logistics-services' },
    { label: 'I need machinery', slug: 'equipment-machinery' },
    { label: 'I need building materials', slug: 'building-materials' },
    { label: 'I need electrical equipment', slug: 'electrical-electronic' },
    { label: 'I need chemicals', slug: 'chemicals' },
    { label: 'I need metals', slug: 'iron-metal' },
    { label: 'I need housewares', slug: 'housewares' },
    { label: 'I need administrative support', slug: 'administrative-services' }
  ];

  var REGIONS = [
    { name: 'Oman', note: 'Home market and commercial base', x: 62, y: 52, home: true },
    { name: 'GCC', note: 'Gulf Cooperation Council markets', x: 52, y: 44 },
    { name: 'Middle East', note: 'Wider regional trade', x: 46, y: 38 },
    { name: 'Asia', note: 'Manufacturing and sourcing markets', x: 82, y: 44 },
    { name: 'Europe', note: 'Engineered and specialist supply', x: 34, y: 24 },
    { name: 'Africa', note: 'Emerging commercial corridors', x: 40, y: 66 }
  ];

  var INSIGHT_CATEGORIES = ['Company', 'Trade', 'Logistics', 'Industry', 'Procurement', 'Oman', 'GCC', 'Market Insights'];

  var LEGAL = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: TBC',
      sections: [
        { h: 'Information we collect', p: ['We collect the information you provide through the forms on this website — including contact and enquiry forms, requests for quotation and supplier registration — together with any files you choose to upload.', 'We also collect standard technical information such as browser type, device type and pages visited, where analytics tools are enabled.'] },
        { h: 'Contact forms', p: ['Information submitted through the contact form is used to respond to your message and to maintain a record of the correspondence.'] },
        { h: 'Requests for quotation', p: ['RFQ submissions are used to prepare a commercial response. Specifications and attachments may be shared with suppliers strictly for the purpose of obtaining pricing and availability.'] },
        { h: 'Supplier registration', p: ['Company profiles and catalogues submitted through supplier registration are retained for supplier evaluation and future sourcing enquiries.'] },
        { h: 'Cookies', p: ['This website may use cookies for essential functionality and, where enabled, for analytics. You can control cookies through your browser settings.'] },
        { h: 'Analytics', p: ['Where analytics services are enabled, they are used in aggregate to understand how the website is used and to improve it.'] },
        { h: 'Data security', p: ['We apply reasonable technical and organisational measures to protect the information submitted through this website. No transmission over the internet can be guaranteed as fully secure.'] },
        { h: 'Your rights', p: ['You may request access to, correction of, or deletion of the personal information you have provided to us, subject to applicable law.'] },
        { h: 'Contact', p: ['Questions about this policy can be sent to the company contact address listed on the Contact page.'] }
      ]
    },
    terms: {
      title: 'Terms of Use',
      updated: 'Last updated: TBC',
      sections: [
        { h: 'Acceptance', p: ['By accessing this website you agree to these terms of use. If you do not agree, please discontinue use of the website.'] },
        { h: 'Website content', p: ['Content on this website is provided for general information about the company and its business activities. It does not constitute a binding commercial offer.', 'Product categories, capabilities and descriptions are indicative. Specifications, availability and pricing are confirmed only in a written commercial offer.'] },
        { h: 'Enquiries and submissions', p: ['Submitting an enquiry, request for quotation or supplier registration does not create a contract. Any resulting engagement is governed by separately agreed commercial terms.'] },
        { h: 'Intellectual property', p: ['The trade name, logo, text, layout and design of this website are the property of the company or its licensors and may not be reproduced without written permission.', 'Photography on this website is used for illustrative purposes.'] },
        { h: 'Third-party links', p: ['Links to third-party websites are provided for convenience. We are not responsible for their content or practices.'] },
        { h: 'Limitation of liability', p: ['The website is provided on an "as available" basis. To the extent permitted by law, we accept no liability for loss arising from reliance on website content.'] },
        { h: 'Governing law', p: ['These terms are governed by the laws of the Sultanate of Oman.'] }
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      updated: 'Last updated: TBC',
      sections: [
        { h: 'What cookies are', p: ['Cookies are small text files placed on your device when you visit a website. They are used to enable functionality and to understand how a site is used.'] },
        { h: 'Categories we use', p: ['Essential cookies support core functionality such as navigation and form submission. Analytics cookies, where enabled, help us measure website usage in aggregate. Preference cookies remember choices such as recently viewed sectors.'] },
        { h: 'Managing cookies', p: ['You can accept or decline non-essential cookies through the consent notice, and delete or block cookies through your browser settings. Blocking essential cookies may affect website functionality.'] },
        { h: 'Third-party cookies', p: ['Where third-party analytics tools are enabled, those providers may set their own cookies. Their use is governed by their respective policies.'] }
      ]
    }
  };

  window.UAI = {
    brand: {
      name: 'United Assets Investments',
      legal: 'United Assets Investments SPC',
      short: 'United Assets',
      positioning: 'Trade. Logistics. Industrial Supply. Business Solutions.',
      promise: 'Connecting Markets. Moving Industries. Creating Value.',
      description: 'United Assets Investments is an Oman-based diversified business company connecting international markets, suppliers and commercial opportunities across trade, logistics, industrial supply and strategic business sectors.'
    },
    contact: {
      location: 'Muscat, Sultanate of Oman',
      address: 'Address to be confirmed — Muscat, Sultanate of Oman',
      email: 'email@to-be-confirmed',
      phone: '+968 — to be confirmed',
      whatsapp: '+968 — to be confirmed',
      hours: 'Sunday – Thursday, 08:00 – 17:00 (GST)'
    },
    img: IMG,
    altFor: function (url) { return URL_ALT[url] || ''; },
    sectors: SECTORS,
    solutions: SOLUTIONS,
    industries: INDUSTRIES,
    why: WHY,
    process: PROCESS,
    finder: FINDER,
    regions: REGIONS,
    insightCategories: INSIGHT_CATEGORIES,
    legal: LEGAL,
    sectorBySlug: function (slug) { return SECTORS.filter(function (s) { return s.slug === slug; })[0]; }
  };

  /* Search index — flattened from the content model above. A CMS build would
     generate this at build time from the same source. */
  var index = [];
  index.push({ t: 'Home', k: 'company overview trade logistics industrial supply oman', url: '#/', type: 'Page' });
  index.push({ t: 'About Us', k: 'company positioning approach oman diversified business', url: '#/about', type: 'Page' });
  index.push({ t: 'Global Reach', k: 'oman gcc asia europe international markets connectivity', url: '#/global-reach', type: 'Page' });
  index.push({ t: 'Insights', k: 'news articles trade market oman gcc procurement', url: '#/insights', type: 'Page' });
  index.push({ t: 'Contact', k: 'contact email phone whatsapp muscat oman enquiry', url: '#/contact', type: 'Page' });
  index.push({ t: 'Request a Quote', k: 'rfq quotation pricing enquiry specification', url: '#/request-a-quote', type: 'Conversion' });
  index.push({ t: 'Become a Supplier', k: 'supplier registration manufacturer distributor export', url: '#/become-a-supplier', type: 'Conversion' });
  index.push({ t: 'Partner With Us', k: 'partnership buyer supplier distributor logistics contractor', url: '#/partner-with-us', type: 'Conversion' });
  index.push({ t: 'Product Catalogue', k: 'catalogue categories products specifications', url: '#/catalogue', type: 'Page' });
  /* Search synonyms: headline trade terms buyers actually type, which the
     written copy does not always contain verbatim. */
  var SYNONYMS = {
    'iron-metal': 'steel rebar sections plate coil beams structural steel metals fabrication galvanised stainless',
    'equipment-machinery': 'machinery equipment excavator loader crane forklift plant heavy machines spare parts',
    'building-materials': 'cement concrete blocks aggregate timber tiles gypsum insulation pipes construction supply',
    'electrical-electronic': 'cables switchgear transformers panels lighting generators motors electronics',
    'chemicals': 'chemicals solvents polymers additives lubricants coatings raw materials',
    'logistics-services': 'freight shipping forwarding customs clearance warehouse trucking container sea air',
    'housewares': 'kitchenware cookware tableware homeware hotel supplies crockery appliances',
    'administrative-services': 'documentation paperwork back office administration correspondence coordination'
  };
  SECTORS.forEach(function (s) {
    index.push({ t: s.title, k: (s.blurb + ' ' + (s.applications || []).join(' ') + ' ' + (SYNONYMS[s.slug] || '')).toLowerCase(), url: '#/business-sectors/' + s.slug, type: 'Business Sector' });
    (s.categories || []).forEach(function (c) {
      index.push({ t: c.name, k: (c.text + ' ' + s.title).toLowerCase(), url: '#/catalogue/' + s.slug, type: 'Category · ' + s.title });
    });
    (s.groups || []).forEach(function (g) {
      index.push({ t: g.name, k: (g.items.join(' ') + ' ' + s.title).toLowerCase(), url: '#/catalogue/' + s.slug, type: 'Category · ' + s.title });
    });
    (s.services || []).forEach(function (v) {
      index.push({ t: v.name, k: (v.text + ' ' + s.title).toLowerCase(), url: '#/business-sectors/' + s.slug, type: 'Service · ' + s.title });
    });
  });
  SOLUTIONS.forEach(function (s) {
    index.push({ t: s.name, k: (s.short + ' ' + s.text).toLowerCase(), url: '#/solutions', type: 'Solution' });
  });
  INDUSTRIES.forEach(function (i) {
    index.push({ t: i.name, k: (i.text + ' industry').toLowerCase(), url: '#/industries/' + i.slug, type: 'Industry' });
  });
  window.UAI.searchIndex = index;
  window.dispatchEvent(new Event('uai:ready'));
})();
