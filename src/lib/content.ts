// Single source of truth for site copy. Edit here, every page updates.

export const site = {
  name: 'Shedfactory',
  legalName: 'Shedfactory Limited',
  tagline: 'Bringing dreams to digital life',
  description:
    'Shedfactory is a digital creative agency and product studio. We build our own platforms — Shed.ng, Diner.ng, Glee.ng, Found.ng, Haulage.ng and 74 Tribe Studios — and help founders and companies turn ideas into brands, websites and products.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shedfactory.co',
  email: 'hello@shedfactory.co',
  phone: '+44 7526 801286',
  whatsapp: 'https://wa.me/447526801286',
  hours: ['Monday – Friday: 9am – 6pm GMT', 'Weekend consultations by appointment'],
  offices: [
    {
      label: 'UK Office',
      lines: ['Dinnington Business Centre', 'Dinnington, Sheffield, Worksop', 'South Yorkshire S25 3QX'],
    },
    {
      label: 'Nigeria Office',
      lines: ['Plot 1015 Frai Close', 'Gwandal Centre, Wuse 2', 'Abuja FCT'],
    },
  ],
  social: {
    facebook: 'https://facebook.com/shedfactorydotco',
    instagram: 'https://instagram.com/shedfactorydotco',
    linkedin: 'https://www.linkedin.com/company/shedfactory/',
  },
};

export const stats = [
  { value: '10', label: 'Years of excellence' },
  { value: '100+', label: 'Dreams brought to life' },
  { value: '25+', label: 'Industries served' },
  { value: '6', label: 'Platforms we own and run' },
];

export type Product = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  tagline: string;
  category: string;
  summary: string;
  accent: string; // brand accent used on cards/pages
  forUsers: { title: string; points: string[] };
  forBusiness: { title: string; points: string[] };
  cities?: string;
};

export const products: Product[] = [
  {
    slug: 'shed',
    name: 'Shed',
    domain: 'shed.ng',
    url: 'https://shed.ng',
    tagline: 'Sell anywhere, manage everything.',
    category: 'Marketplace & business tools',
    summary:
      'A local marketplace and business toolkit in one — sellers get a free online store, inventory, point of sale and invoicing, while buyers shop local businesses across Nigeria and pay the seller directly.',
    accent: '#ff9f1c',
    forUsers: {
      title: 'For shoppers',
      points: [
        'Browse local stores in one place, by category, market or search',
        'Order in a few taps and pay the seller directly',
        'Chat with the seller on WhatsApp before you pay',
        'Get an emailed invoice for every order, and look for verified sellers',
      ],
    },
    forBusiness: {
      title: 'For sellers & businesses',
      points: [
        'Open a free online store in minutes',
        'Manage stock and inventory, with point of sale for in-person sales',
        'Send invoices and take orders online',
        'Separate logins for sellers, outlets and admins, plus an affiliate programme',
      ],
    },
  },
  {
    slug: 'diner',
    name: 'Diner',
    domain: 'diner.ng',
    url: 'https://diner.ng',
    tagline: "Nigeria's fun spots, one table away.",
    category: 'Restaurants, lounges & venues',
    summary:
      'A directory for restaurants, hotels, lounges, cafés and event hotspots across Nigeria — with live digital menus, QR codes at the table, reviews and reservations.',
    accent: '#ff6b4a',
    forUsers: {
      title: 'For guests',
      points: [
        'Browse venues by type and city, with photos and ratings',
        'See menus and prices before you go',
        'Scan the table QR code for the full menu',
        'Rate your visit and book a table at participating venues',
      ],
    },
    forBusiness: {
      title: 'For venue owners',
      points: [
        'A public listing with photos, hours, location and contacts',
        'A digital menu with its own QR code — update specials or sold-out items anytime',
        'Guest ratings and feedback, with public replies',
        'Table management, online reservations and per-table QR codes',
      ],
    },
  },
  {
    slug: 'glee',
    name: 'Glee',
    domain: 'glee.ng',
    url: 'https://glee.ng',
    tagline: 'Beauty, beautifully booked.',
    category: 'Beauty & grooming marketplace',
    summary:
      'A marketplace where clients find and book stylists, makeup artists, nail studios, barbers, spas and lash & brow specialists — in-salon or at home.',
    accent: '#e879a8',
    cities: 'Lagos, Abuja, Port Harcourt, Ibadan, Enugu and Benin City',
    forUsers: {
      title: 'For clients',
      points: [
        'Filter professionals by city, service and price',
        'Compare portfolios, durations and guest reviews',
        'Pick a live time slot for in-salon or at-home appointments',
        'Get reminders, plus the Glee Journal on hair, skin and bridal beauty',
      ],
    },
    forBusiness: {
      title: 'For beauty businesses',
      points: [
        'A free listing with a profile, priced services and booking requests',
        'Featured placement, automatic reminders and booking deposits to cut no-shows',
        'Glee Store for selling beauty products, with order management',
        'A dashboard and reviews that grow your reputation',
      ],
    },
  },
  {
    slug: 'found',
    name: 'Found',
    domain: 'found.ng',
    url: 'https://found.ng',
    tagline: 'Find the right property in Nigeria, without the runaround.',
    category: 'Property marketplace',
    summary:
      'A property marketplace for homes, land, shortlets, shops and business complexes across all 36 states and the FCT — every listing reviewed, every realtor verified.',
    accent: '#3ccf91',
    forUsers: {
      title: 'For buyers & renters',
      points: [
        'Search by state, property type and buy, rent, shortlet or lease',
        'Listings reviewed before they go live, with verified realtors',
        'Agency fees capped and disclosed upfront',
        'Deals facilitated so buyers and sellers are both protected',
      ],
    },
    forBusiness: {
      title: 'For realtors & developers',
      points: [
        'List properties free, with one inbox for every enquiry',
        'Track how your listings perform',
        'Referral links and QR codes that earn agents commission',
        'Projects and Found Fractional for developers and investors',
      ],
    },
  },
  {
    slug: 'haulage',
    name: 'Haulage',
    domain: 'haulage.ng',
    url: 'https://haulage.ng',
    tagline: "Nigeria's logistics operating system.",
    category: 'Haulage & logistics marketplace',
    summary:
      'A platform for finding and booking goods transport across Nigeria — from same-day dispatch bikes to container and refrigerated trucks — with verified operators, online payment and live GPS tracking.',
    accent: '#4f8cff',
    forUsers: {
      title: 'For shippers',
      points: [
        'Search operators by route and vehicle type, and compare prices',
        'Book consignments and pay online, with a waybill for every shipment',
        'Add goods-in-transit insurance at checkout',
        'Track shipments on a live GPS map',
      ],
    },
    forBusiness: {
      title: 'For logistics operators',
      points: [
        'Register your business and fleet, from motorcycles to container trucks',
        'Set your own routes and pricing, including per-kg rates and weight limits',
        'Store compliance documents with expiry tracking',
        'Verified-operator status that builds trust with shippers',
      ],
    },
  },
  {
    slug: '74-tribe',
    name: '74 Tribe Studios',
    domain: '74triberecords.com',
    url: 'https://74triberecords.com',
    tagline: 'Watch the shows. Book the studio.',
    category: 'Media & studio hire',
    summary:
      'A home for podcast-style video shows and reels — and a production space where creators can book sets, a recording studio and meeting rooms for their own podcast or show.',
    accent: '#a37bff',
    forUsers: {
      title: 'For viewers',
      points: [
        'Stream full episodes and short reels',
        'Browse the archive of past episodes',
        'Save episodes to playlists and your library',
      ],
    },
    forBusiness: {
      title: 'For creators & brands',
      points: [
        'Book lounge, coffee-table, news and full sets for your show',
        'Hire the recording studio and meeting rooms',
        'Take a studio tour before you book',
      ],
    },
  },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  intro: string[];
  offerings: string[];
  benefits: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: 'brand-strategy',
    title: 'Brand Strategy & Identity',
    short:
      'Brand narratives and visual identities that connect with your audience and set you apart in the marketplace.',
    image: '/assets/images/services/brand-strategy.jpg',
    intro: [
      'A brand is the promise you make every time someone meets your business. We help you find what makes you different, then express it consistently — in your name, logo, voice and every touchpoint.',
      'From startups naming their first product to established companies ready for a refresh, we build brands that are clear, memorable and built to last.',
    ],
    offerings: [
      'Brand discovery & positioning workshops',
      'Naming, logo and visual identity systems',
      'Tone of voice and messaging frameworks',
      'Brand guidelines your whole team can use',
    ],
    benefits: [
      { title: 'Clarity', text: 'Customers understand what you do and why it matters, fast.' },
      { title: 'Consistency', text: 'One recognisable look and voice across every channel.' },
      { title: 'Premium perception', text: 'A strong brand lets you compete on value, not just price.' },
    ],
  },
  {
    slug: 'web-development',
    title: 'Web & App Development',
    short:
      'Custom websites, platforms and mobile apps built with modern technology, optimised for speed and great user experience.',
    image: '/assets/images/services/web-development.jpg',
    intro: [
      'Your website or app is often the first interaction customers have with your brand. It needs to be fast, intuitive and beautiful — a true reflection of your dream.',
      'From brochure sites to booking engines, marketplaces and recruitment portals, we design, build, host and maintain digital products that scale with your business. We build and run our own platforms, so we know what production really takes.',
    ],
    offerings: [
      'Custom website design & development',
      'Web applications, portals and marketplaces',
      'E-commerce and booking engines',
      'Mobile apps for iOS & Android',
      'Cloud hosting, maintenance and support',
    ],
    benefits: [
      { title: 'Speed & performance', text: 'Fast pages improve experience and search rankings.' },
      { title: 'Engagement', text: 'Intuitive design keeps visitors around and turns them into customers.' },
      { title: 'Scalability', text: 'Built to grow with more traffic, more features and more markets.' },
    ],
  },
  {
    slug: 'ui-ux',
    title: 'UI/UX Design',
    short:
      'Intuitive, beautiful interfaces that engage users and drive conversions through thoughtful experience design.',
    image: '/assets/images/services/ui-ux.jpg',
    intro: [
      'Good design is invisible: people simply get what they came for. We research how your users think, then design flows and interfaces that feel effortless.',
      'We prototype early and test often, so decisions are made with real feedback — before a single line of production code is written.',
    ],
    offerings: [
      'User research and journey mapping',
      'Wireframes and interactive prototypes',
      'Interface design and design systems',
      'Usability testing and iteration',
    ],
    benefits: [
      { title: 'Higher conversion', text: 'Fewer drop-offs between interest and action.' },
      { title: 'Lower build cost', text: 'Problems are solved in design, not in rework.' },
      { title: 'Loyal users', text: 'People return to products that respect their time.' },
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    short:
      'Data-driven marketing that increases visibility, drives engagement and converts visitors into loyal customers.',
    image: '/assets/images/services/digital-marketing.jpg',
    intro: [
      'Being online is not the same as being found. We plan and run campaigns across search, social and email that reach the right people with the right message.',
      'Every campaign is measured, so you can see exactly what your marketing returns — and we keep improving what works.',
    ],
    offerings: [
      'Social media strategy and management',
      'Search engine optimisation (SEO)',
      'Paid campaigns on social and search',
      'Email marketing and newsletters',
      'Analytics and performance reporting',
    ],
    benefits: [
      { title: 'Visibility', text: 'Show up where your customers are already looking.' },
      { title: 'Measurable growth', text: 'Clear reporting on reach, leads and sales.' },
      { title: 'Community', text: 'Build relationships, not just impressions.' },
    ],
  },
  {
    slug: 'content',
    title: 'Content Creation',
    short:
      'Compelling content that tells your story, engages your audience and establishes your brand as an authority.',
    image: '/assets/images/services/content-creation.jpg',
    intro: [
      'Content is how your brand speaks when you are not in the room. We write, design and produce content that informs, persuades and stays memorable.',
      'From website copy and blog articles to campaign graphics and video, we create content that fits your voice and serves a clear goal.',
    ],
    offerings: [
      'Website and product copywriting',
      'Blog articles and thought leadership',
      'Social graphics, flyers and campaign creative',
      'Photo and video content direction',
    ],
    benefits: [
      { title: 'Authority', text: 'Become the brand people trust on your subject.' },
      { title: 'Search traffic', text: 'Useful content keeps bringing visitors for years.' },
      { title: 'Consistency', text: 'A steady flow of on-brand content without the stress.' },
    ],
  },
];

export const work: { client: string; tags: string; image: string; summary: string; url?: string }[] = [
  {
    client: 'Full Moon Hotels',
    tags: 'Brand Strategy · Web Development · Booking Engine',
    image: '/assets/images/portfolio/fullmoon.png',
    summary: 'A website and booking engine that transformed how reservations are managed and grew direct bookings.',
  },
  {
    client: 'Motown Electrical Services',
    tags: 'Website Design · Development · Hosting',
    image: '/assets/images/portfolio/motown.jpg',
    summary: 'A corporate website for an Abuja electrical engineering company — wiring, power distribution, solar and maintenance services.',
    url: 'https://motownelectricals.com',
  },
  {
    client: 'Emetoni',
    tags: 'Website Design · Development',
    image: '/assets/images/portfolio/emetoni.png',
    summary: 'A clean, confident website for a logistics company offering clearing, equipment leasing and sales.',
  },
  {
    client: 'Radiant Life Day Centre',
    tags: 'Brand Architecture · Website · Social Media',
    image: '/assets/images/portfolio/radiant.jpg',
    summary: 'A website and ongoing social media management that helped the centre connect with its community.',
  },
  {
    client: 'Serinity Healthkare',
    tags: 'Brand Identity · Web Application · Recruitment Portal',
    image: '/assets/images/portfolio/serinity.jpg',
    summary: 'A brand identity, website and complete recruitment portal that streamlines hiring.',
  },
];

export const testimonials = [
  {
    quote:
      'Shedfactory built us a website and booking engine that transformed how we manage reservations. The system is intuitive, seamless, and has significantly increased our direct bookings.',
    name: 'Chike Okoroafor',
    org: 'Full Moon Hotels',
  },
  {
    quote:
      "The website Shedfactory created for Savoy Summerset Hotel perfectly captures the elegance and luxury of our property. It's visually stunning and has received wonderful feedback from our guests.",
    name: 'Lanre, Manager',
    org: 'Savoy Summerset Hotel',
  },
  {
    quote:
      "Shedfactory didn't just create our brand identity and website — they built us a complete recruitment portal that streamlines our hiring process.",
    name: 'Maureen, CEO',
    org: 'Serinity Healthkare',
  },
  {
    quote:
      'Shedfactory developed our website and manage our social media with exceptional strategic communication. They have helped us connect with our community in meaningful ways.',
    name: 'Ifedi',
    org: 'Radiant Life Day Centre',
  },
];

export const processSteps = [
  { step: '01', title: 'Discover', text: 'Workshops and research to understand your vision, users and market.' },
  { step: '02', title: 'Design', text: 'Brand, flows and prototypes you can see and react to early.' },
  { step: '03', title: 'Build', text: 'Modern engineering with continuous testing and weekly demos.' },
  { step: '04', title: 'Launch & grow', text: 'We ship, host, measure and keep improving with you.' },
];

export const studio = {
  headline: 'Got an idea? Let’s bring it to life.',
  intro:
    'We don’t just build for clients — we build our own products. Shed, Diner, Glee, Found, Haulage and 74 Tribe started as ideas on a whiteboard. Today they’re live platforms with real users and real businesses on them. We bring that same founder-side experience to startups and companies with an idea worth building.',
  stages: [
    {
      title: 'Shape the idea',
      text: 'Validate the problem, define your first users and decide what the first version must — and mustn’t — do.',
    },
    {
      title: 'Design the product',
      text: 'Name, brand, user journeys and clickable prototypes you can put in front of customers and investors.',
    },
    {
      title: 'Build the MVP',
      text: 'A production-ready web or mobile product, with payments, dashboards and admin tools where you need them.',
    },
    {
      title: 'Launch & scale',
      text: 'Hosting, analytics, marketing and ongoing development as your product finds its market.',
    },
  ],
  models: [
    {
      title: 'Build for you',
      text: 'A clearly scoped project with a fixed timeline. Ideal when you know what you need built.',
    },
    {
      title: 'Build with you',
      text: 'We act as your product and technology team from idea to launch, working alongside you every week.',
    },
    {
      title: 'Run it with you',
      text: 'Ongoing hosting, maintenance, features and growth support for products already in the market.',
    },
  ],
  audiences: [
    'First-time founders with an idea and no tech team',
    'Startups that need an MVP for customers or investors',
    'Established companies launching a new digital product',
    'Businesses digitising a manual process or service',
  ],
};

export const faqs = [
  {
    q: 'How do you approach new projects?',
    a: 'We start by understanding your vision and goals through workshops, research and planning before any design or development begins. The best results come from true partnership.',
  },
  {
    q: 'I only have an idea. Can you still help?',
    a: 'Yes — that’s often the best time to talk to us. We help you shape the idea, define a sensible first version and plan the build before you spend on development.',
  },
  {
    q: 'What’s your typical project timeline?',
    a: 'Most brand identity projects take 4–8 weeks and full website builds 8–16 weeks. MVPs depend on scope. You get a detailed timeline after our first consultation.',
  },
  {
    q: 'Do you work with clients outside the UK and Nigeria?',
    a: 'Yes. We have offices in the UK and Nigeria and work remotely with clients wherever they are.',
  },
];
