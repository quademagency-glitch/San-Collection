export const collections = [
  { 
    id: 'c1', 
    name: 'Summer Elegance', 
    slug: 'summer-elegance', 
    description: 'Light, bright, and perfect for the sun. Handcrafted with premium lightweight materials.', 
    image: '/bag-mockup.jpeg' 
  },
  { 
    id: 'c2', 
    name: 'Midnight Collection', 
    slug: 'midnight-collection', 
    description: 'Deep tones and rich textures designed for the evening out.', 
    image: '/bag-mockup.jpeg' 
  },
];

export const products = [
  { 
    id: 'p1', 
    name: 'Golden Hour Tote', 
    slug: 'golden-hour-tote', 
    price: 350.00, 
    collectionSlug: 'summer-elegance', 
    description: 'A beautiful, spacious tote bag with signature gold accents and premium leather.', 
    image: '/bag-mockup.jpeg',
    features: ['100% Genuine Leather', 'Gold-plated hardware', 'Interior zip pocket']
  },
  { 
    id: 'p2', 
    name: 'Obsidian Clutch', 
    slug: 'obsidian-clutch', 
    price: 210.00, 
    collectionSlug: 'midnight-collection', 
    description: 'Sleek black clutch for formal events. Compact yet spacious enough for essentials.', 
    image: '/bag-mockup.jpeg',
    features: ['Matte black finish', 'Magnetic closure', 'Detachable chain strap']
  },
  { 
    id: 'p3', 
    name: 'Sunburst Crossbody', 
    slug: 'sunburst-crossbody', 
    price: 180.00, 
    collectionSlug: 'summer-elegance', 
    description: 'Compact and vibrant. The perfect companion for your weekend getaways.', 
    image: '/bag-mockup.jpeg',
    features: ['Adjustable strap', 'External slip pocket', 'Dust bag included']
  },
  { 
    id: 'p4', 
    name: 'Eclipse Satchel', 
    slug: 'eclipse-satchel', 
    price: 420.00, 
    collectionSlug: 'midnight-collection', 
    description: 'Our most premium offering. Crafted from the finest Italian leather with a structured silhouette.', 
    image: '/bag-mockup.jpeg',
    features: ['Structured base with metal feet', 'Signature "SB" embossed logo', 'Suede lining']
  },
];
