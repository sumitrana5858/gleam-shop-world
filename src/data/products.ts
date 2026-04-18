// Mock catalog — 56 products across sneakers, apparel, accessories, watches, bags.
// Images use Unsplash source URLs (royalty-free).

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "sneakers" | "apparel" | "accessories" | "watches" | "bags";
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
  description: string;
  features: string[];
  reviews: Review[];
  tags: string[];
};

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1400&q=80&sig=${seed}`;

// Curated Unsplash photo IDs by category
const SNEAKER_IMGS = [
  "photo-1542291026-7eec264c27ff",
  "photo-1606107557195-0e29a4b5b4aa",
  "photo-1595950653106-6c9ebd614d3a",
  "photo-1600185365483-26d7a4cc7519",
  "photo-1539185441755-769473a23570",
  "photo-1551107696-a4b0c5a0d9a2",
  "photo-1460353581641-37baddab0fa2",
  "photo-1491553895911-0055eca6402d",
  "photo-1552346154-21d32810aba3",
  "photo-1543508282-6319a3e2621f",
  "photo-1606753459329-b08f2f59e84c",
  "photo-1556906781-9a412961c28c",
];
const APPAREL_IMGS = [
  "photo-1521572163474-6864f9cf17ab",
  "photo-1620799140408-edc6dcb6d633",
  "photo-1564584217132-2271feaeb3c5",
  "photo-1576566588028-4147f3842f27",
  "photo-1591047139829-d91aecb6caea",
  "photo-1551028719-00167b16eac5",
  "photo-1542272604-787c3835535d",
  "photo-1503341504253-dff4815485f1",
  "photo-1544022613-e87ca75a784a",
  "photo-1434389677669-e08b4cac3105",
];
const WATCH_IMGS = [
  "photo-1523275335684-37898b6baf30",
  "photo-1524805444758-089113d48a6d",
  "photo-1547996160-81dfa63595aa",
  "photo-1622434641406-a158123450f9",
  "photo-1611591437281-460bfbe1220a",
  "photo-1539874754764-5a96559165b0",
];
const BAG_IMGS = [
  "photo-1548036328-c9fa89d128fa",
  "photo-1584917865442-de89df76afd3",
  "photo-1590874103328-eac38a683ce7",
  "photo-1547949003-9792a18a2601",
  "photo-1581605405669-fcdf81165afa",
  "photo-1622560480605-d83c853bc5c3",
];
const ACC_IMGS = [
  "photo-1572635196237-14b3f281503f",
  "photo-1611923134239-b9be5816e23d",
  "photo-1556306535-0f09a537f0a3",
  "photo-1601924994987-69e26d50dc26",
  "photo-1577803645773-f96470509666",
  "photo-1511499767150-a48a237f0083",
];

const BRANDS = ["Aurelia", "Noctis", "Maison Blanc", "Vantage", "Orris", "Kairo", "Lumen", "Halden"];

const reviewSamples: Omit<Review, "id" | "date">[] = [
  { author: "Sasha M.", rating: 5, title: "Better than expected", body: "Quality is unreal. Fits true to size and looks even better in person." },
  { author: "Daniel K.", rating: 4, title: "Solid pickup", body: "Beautiful build. Shipping took a bit longer than I'd like but worth it." },
  { author: "Priya R.", rating: 5, title: "My new favorite", body: "Wearing it daily. Pairs with everything in my closet." },
  { author: "Marco V.", rating: 4, title: "Premium feel", body: "Materials feel high-end. Stitching is clean. Subtle branding done right." },
  { author: "Hannah L.", rating: 5, title: "Worth every dollar", body: "Was on the fence but no regrets. The detailing is next level." },
];

const buildReviews = (count: number, seed: number): Review[] =>
  Array.from({ length: Math.min(count, 5) }, (_, i) => {
    const r = reviewSamples[(seed + i) % reviewSamples.length];
    return {
      ...r,
      id: `r-${seed}-${i}`,
      date: new Date(Date.now() - (i + 1) * seed * 86400000).toISOString().slice(0, 10),
    };
  });

type Seed = {
  name: string;
  brand: string;
  category: Product["category"];
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  imgs: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  features: string[];
  tags: string[];
};

const SNEAKER_COLORS = [
  { name: "Bone", hex: "#E8E1D5" },
  { name: "Onyx", hex: "#1C1C1E" },
  { name: "Sand", hex: "#C9B89A" },
  { name: "Olive", hex: "#5A6049" },
];
const APPAREL_COLORS = [
  { name: "Charcoal", hex: "#2A2A2D" },
  { name: "Cream", hex: "#F2EBDD" },
  { name: "Cocoa", hex: "#5C3A24" },
];
const SHOE_SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const ACC_SIZES = ["One Size"];

const seeds: Seed[] = [
  // Sneakers (16)
  { name: "Aero Runner LX", brand: "Aurelia", category: "sneakers", subcategory: "Runners", price: 189, compareAtPrice: 240, imgs: [SNEAKER_IMGS[0], SNEAKER_IMGS[1], SNEAKER_IMGS[2]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Featherlight running silhouette with a sculpted EVA midsole and recycled mesh upper. Built for daily wear, designed to last.", features: ["Recycled mesh upper", "EVA cushioning", "Rubber traction outsole", "Reflective heel"], tags: ["new", "running", "lightweight"] },
  { name: "Court Classic 92", brand: "Noctis", category: "sneakers", subcategory: "Court", price: 145, imgs: [SNEAKER_IMGS[3], SNEAKER_IMGS[4], SNEAKER_IMGS[5]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Heritage tennis silhouette reimagined in premium nappa leather with subtle perforation.", features: ["Nappa leather upper", "Cushioned footbed", "Vintage rubber sole"], tags: ["classic", "leather"] },
  { name: "Trail Phantom", brand: "Vantage", category: "sneakers", subcategory: "Trail", price: 215, imgs: [SNEAKER_IMGS[6], SNEAKER_IMGS[7], SNEAKER_IMGS[0]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Aggressive lugged outsole and water-resistant ripstop upper for any terrain.", features: ["Water-resistant", "5mm trail lugs", "Toe protection cap"], tags: ["trail", "outdoor"] },
  { name: "Studio Slip", brand: "Maison Blanc", category: "sneakers", subcategory: "Slip-on", price: 110, imgs: [SNEAKER_IMGS[8], SNEAKER_IMGS[9], SNEAKER_IMGS[10]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Minimal slip-on in soft canvas with a memory foam insole.", features: ["Soft canvas", "Memory foam insole", "Elastic gore"], tags: ["minimal", "casual"] },
  { name: "Halden High", brand: "Halden", category: "sneakers", subcategory: "High-top", price: 198, imgs: [SNEAKER_IMGS[11], SNEAKER_IMGS[2], SNEAKER_IMGS[4]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Sculpted high-top with padded ankle collar and tonal branding.", features: ["Padded collar", "Premium suede", "Cup sole construction"], tags: ["hightop", "suede"] },
  { name: "Atmos Pro", brand: "Lumen", category: "sneakers", subcategory: "Performance", price: 230, compareAtPrice: 280, imgs: [SNEAKER_IMGS[1], SNEAKER_IMGS[3], SNEAKER_IMGS[6]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Carbon-plate performance trainer engineered for race day.", features: ["Carbon plate", "PEBA foam", "Engineered knit"], tags: ["performance", "racing"] },
  { name: "Kairo Low", brand: "Kairo", category: "sneakers", subcategory: "Lifestyle", price: 165, imgs: [SNEAKER_IMGS[5], SNEAKER_IMGS[7], SNEAKER_IMGS[9]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Sculptural lifestyle low with chunky midsole and tonal stitching.", features: ["Chunky EVA midsole", "Tonal leather", "Foam tongue"], tags: ["lifestyle", "trending"] },
  { name: "Orris Mesh 01", brand: "Orris", category: "sneakers", subcategory: "Lifestyle", price: 175, imgs: [SNEAKER_IMGS[8], SNEAKER_IMGS[10], SNEAKER_IMGS[0]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Breathable engineered mesh upper over a sculpted speed midsole.", features: ["Engineered mesh", "Speed midsole", "TPU heel clip"], tags: ["mesh", "trending"] },
  { name: "Aero Runner Carbon", brand: "Aurelia", category: "sneakers", subcategory: "Runners", price: 260, imgs: [SNEAKER_IMGS[2], SNEAKER_IMGS[5], SNEAKER_IMGS[8]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Limited carbon edition of our flagship runner.", features: ["Carbon plate", "Recycled materials", "Reflective hits"], tags: ["limited", "carbon"] },
  { name: "Noctis Court Mid", brand: "Noctis", category: "sneakers", subcategory: "Court", price: 159, imgs: [SNEAKER_IMGS[4], SNEAKER_IMGS[6], SNEAKER_IMGS[1]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Mid-cut court silhouette with embossed branding.", features: ["Embossed leather", "Mid collar", "Leather lining"], tags: ["mid", "leather"] },
  { name: "Vantage Field", brand: "Vantage", category: "sneakers", subcategory: "Trail", price: 195, imgs: [SNEAKER_IMGS[7], SNEAKER_IMGS[9], SNEAKER_IMGS[11]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Field boot crossover with grippy trail-ready outsole.", features: ["Field-ready upper", "Trail outsole", "Speed lacing"], tags: ["outdoor", "boot"] },
  { name: "Maison Blanc Mono", brand: "Maison Blanc", category: "sneakers", subcategory: "Lifestyle", price: 220, imgs: [SNEAKER_IMGS[10], SNEAKER_IMGS[3], SNEAKER_IMGS[5]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Monochromatic lifestyle silhouette with hidden lacing system.", features: ["Hidden lacing", "Tonal everything", "Soft leather"], tags: ["mono", "premium"] },
  { name: "Halden Strap", brand: "Halden", category: "sneakers", subcategory: "Lifestyle", price: 180, imgs: [SNEAKER_IMGS[0], SNEAKER_IMGS[8], SNEAKER_IMGS[2]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Strap-detail low-top with sculpted profile.", features: ["Velcro strap", "Padded collar", "Rubber cup sole"], tags: ["strap", "modern"] },
  { name: "Lumen Glide", brand: "Lumen", category: "sneakers", subcategory: "Runners", price: 170, compareAtPrice: 199, imgs: [SNEAKER_IMGS[6], SNEAKER_IMGS[1], SNEAKER_IMGS[10]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Daily glider with plush foam stack and breathable knit.", features: ["Plush foam", "Breathable knit", "Heel cup"], tags: ["daily", "deal"] },
  { name: "Kairo High Mono", brand: "Kairo", category: "sneakers", subcategory: "High-top", price: 210, imgs: [SNEAKER_IMGS[11], SNEAKER_IMGS[4], SNEAKER_IMGS[7]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Monochromatic high-top with extended collar and tonal sole.", features: ["Extended collar", "Tonal sole", "Premium leather"], tags: ["mono", "hightop"] },
  { name: "Orris Trail Pro", brand: "Orris", category: "sneakers", subcategory: "Trail", price: 240, imgs: [SNEAKER_IMGS[3], SNEAKER_IMGS[9], SNEAKER_IMGS[0]], colors: SNEAKER_COLORS, sizes: SHOE_SIZES, description: "Pro-grade trail runner with rock plate and waterproof bootie.", features: ["Rock plate", "Waterproof bootie", "Aggressive lugs"], tags: ["pro", "trail"] },

  // Apparel (16)
  { name: "Heavyweight Tee", brand: "Aurelia", category: "apparel", subcategory: "Tees", price: 65, imgs: [APPAREL_IMGS[0], APPAREL_IMGS[1], APPAREL_IMGS[2]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "12oz boxy-fit tee in long-staple cotton with garment-dyed finish.", features: ["12oz cotton", "Garment dyed", "Boxy fit"], tags: ["essential", "tee"] },
  { name: "Cashmere Crew", brand: "Maison Blanc", category: "apparel", subcategory: "Knitwear", price: 295, compareAtPrice: 380, imgs: [APPAREL_IMGS[3], APPAREL_IMGS[4], APPAREL_IMGS[5]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Mongolian cashmere crewneck with ribbed trims.", features: ["100% cashmere", "Ribbed trims", "Soft hand"], tags: ["cashmere", "premium"] },
  { name: "Pleated Trouser", brand: "Noctis", category: "apparel", subcategory: "Bottoms", price: 215, imgs: [APPAREL_IMGS[6], APPAREL_IMGS[7], APPAREL_IMGS[0]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Single-pleat trouser in Italian wool blend with tapered leg.", features: ["Italian wool blend", "Single pleat", "Tapered leg"], tags: ["tailored", "trouser"] },
  { name: "Field Overshirt", brand: "Vantage", category: "apparel", subcategory: "Outerwear", price: 245, imgs: [APPAREL_IMGS[8], APPAREL_IMGS[9], APPAREL_IMGS[1]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Heavy moleskin overshirt with utility pockets and horn buttons.", features: ["Moleskin", "Horn buttons", "4 pockets"], tags: ["overshirt", "field"] },
  { name: "Wool Topcoat", brand: "Maison Blanc", category: "apparel", subcategory: "Outerwear", price: 695, imgs: [APPAREL_IMGS[2], APPAREL_IMGS[3], APPAREL_IMGS[6]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Double-faced wool topcoat with raglan sleeves.", features: ["Double-faced wool", "Raglan sleeves", "Half lining"], tags: ["topcoat", "premium"] },
  { name: "Loop Hoodie", brand: "Kairo", category: "apparel", subcategory: "Sweats", price: 145, imgs: [APPAREL_IMGS[4], APPAREL_IMGS[5], APPAREL_IMGS[7]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Loopback heavyweight hoodie with reinforced cuffs.", features: ["Loopback cotton", "Reinforced cuffs", "Brushed interior"], tags: ["hoodie", "heavyweight"] },
  { name: "Loop Sweatpant", brand: "Kairo", category: "apparel", subcategory: "Sweats", price: 125, imgs: [APPAREL_IMGS[9], APPAREL_IMGS[8], APPAREL_IMGS[0]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Matching loopback sweatpant with tapered leg.", features: ["Loopback cotton", "Tapered leg", "Drawcord"], tags: ["sweat", "match"] },
  { name: "Linen Shirt", brand: "Lumen", category: "apparel", subcategory: "Shirts", price: 135, imgs: [APPAREL_IMGS[1], APPAREL_IMGS[2], APPAREL_IMGS[5]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Pure linen camp-collar shirt with mother-of-pearl buttons.", features: ["Pure linen", "MOP buttons", "Camp collar"], tags: ["linen", "summer"] },
  { name: "Selvedge Denim", brand: "Halden", category: "apparel", subcategory: "Bottoms", price: 225, imgs: [APPAREL_IMGS[6], APPAREL_IMGS[3], APPAREL_IMGS[8]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "14oz Japanese selvedge denim with straight leg.", features: ["14oz selvedge", "Straight leg", "Copper rivets"], tags: ["denim", "selvedge"] },
  { name: "Boxy Polo", brand: "Orris", category: "apparel", subcategory: "Tees", price: 95, imgs: [APPAREL_IMGS[7], APPAREL_IMGS[4], APPAREL_IMGS[1]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Cotton-piqué polo with boxy fit and ribbed collar.", features: ["Cotton piqué", "Boxy fit", "Ribbed collar"], tags: ["polo", "essential"] },
  { name: "Tech Jacket", brand: "Vantage", category: "apparel", subcategory: "Outerwear", price: 385, imgs: [APPAREL_IMGS[5], APPAREL_IMGS[9], APPAREL_IMGS[2]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Three-layer waterproof tech shell with welded seams.", features: ["3L waterproof", "Welded seams", "Pit zips"], tags: ["tech", "outerwear"] },
  { name: "Merino Beanie", brand: "Aurelia", category: "apparel", subcategory: "Headwear", price: 55, imgs: [APPAREL_IMGS[0], APPAREL_IMGS[6], APPAREL_IMGS[3]], colors: APPAREL_COLORS, sizes: ACC_SIZES, description: "Fine-gauge merino beanie with cuffed hem.", features: ["Merino wool", "Cuffed hem", "Tonal label"], tags: ["beanie", "merino"] },
  { name: "Pleated Short", brand: "Noctis", category: "apparel", subcategory: "Bottoms", price: 110, imgs: [APPAREL_IMGS[8], APPAREL_IMGS[5], APPAREL_IMGS[0]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Single-pleat short in Italian cotton.", features: ["Italian cotton", "Single pleat", "9-inch inseam"], tags: ["short", "summer"] },
  { name: "Crew Sweater", brand: "Halden", category: "apparel", subcategory: "Knitwear", price: 175, imgs: [APPAREL_IMGS[2], APPAREL_IMGS[7], APPAREL_IMGS[9]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Lambswool crew sweater with raglan sleeves.", features: ["Lambswool", "Raglan sleeves", "Ribbed trims"], tags: ["sweater", "lambswool"] },
  { name: "Pocket Tee 2-Pack", brand: "Aurelia", category: "apparel", subcategory: "Tees", price: 95, compareAtPrice: 130, imgs: [APPAREL_IMGS[4], APPAREL_IMGS[1], APPAREL_IMGS[6]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Two pocket tees in our signature heavyweight cotton.", features: ["12oz cotton", "Reinforced pocket", "Garment dyed"], tags: ["bundle", "tee"] },
  { name: "Chore Coat", brand: "Vantage", category: "apparel", subcategory: "Outerwear", price: 285, imgs: [APPAREL_IMGS[3], APPAREL_IMGS[8], APPAREL_IMGS[5]], colors: APPAREL_COLORS, sizes: APPAREL_SIZES, description: "Classic French chore coat in waxed canvas.", features: ["Waxed canvas", "Triple pockets", "Corozo buttons"], tags: ["chore", "workwear"] },

  // Watches (8)
  { name: "Atelier Automatic", brand: "Maison Blanc", category: "watches", subcategory: "Automatic", price: 1295, compareAtPrice: 1495, imgs: [WATCH_IMGS[0], WATCH_IMGS[1], WATCH_IMGS[2]], colors: [{ name: "Steel", hex: "#C0C0C5" }, { name: "Onyx", hex: "#1C1C1E" }], sizes: ACC_SIZES, description: "Swiss-made automatic with sapphire crystal and exhibition caseback.", features: ["Swiss automatic", "Sapphire crystal", "100m water resistance", "Exhibition caseback"], tags: ["automatic", "swiss"] },
  { name: "Field Mechanical", brand: "Vantage", category: "watches", subcategory: "Mechanical", price: 595, imgs: [WATCH_IMGS[3], WATCH_IMGS[4], WATCH_IMGS[5]], colors: [{ name: "Olive", hex: "#5A6049" }, { name: "Charcoal", hex: "#2A2A2D" }], sizes: ACC_SIZES, description: "Hand-wound field watch with tritium markers.", features: ["Hand-wound", "Tritium markers", "Sapphire crystal"], tags: ["field", "mechanical"] },
  { name: "Diver 300", brand: "Aurelia", category: "watches", subcategory: "Dive", price: 895, imgs: [WATCH_IMGS[1], WATCH_IMGS[3], WATCH_IMGS[0]], colors: [{ name: "Steel", hex: "#C0C0C5" }, { name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "ISO-certified dive watch with unidirectional bezel.", features: ["300m WR", "Unidirectional bezel", "Lume-filled hands"], tags: ["dive", "tool"] },
  { name: "Dress Quartz", brand: "Maison Blanc", category: "watches", subcategory: "Dress", price: 395, imgs: [WATCH_IMGS[2], WATCH_IMGS[5], WATCH_IMGS[1]], colors: [{ name: "Gold", hex: "#C9A56B" }, { name: "Steel", hex: "#C0C0C5" }], sizes: ACC_SIZES, description: "Slim dress watch with applied indices and leather strap.", features: ["Quartz movement", "Applied indices", "Italian leather"], tags: ["dress", "slim"] },
  { name: "Chronograph 70", brand: "Noctis", category: "watches", subcategory: "Chronograph", price: 1095, imgs: [WATCH_IMGS[4], WATCH_IMGS[0], WATCH_IMGS[2]], colors: [{ name: "Panda", hex: "#F4F0E6" }, { name: "Reverse Panda", hex: "#1C1C1E" }], sizes: ACC_SIZES, description: "Vintage-inspired chronograph with tachymeter and pump pushers.", features: ["Mechanical chronograph", "Tachymeter", "Pump pushers"], tags: ["chrono", "vintage"] },
  { name: "GMT Worldtime", brand: "Aurelia", category: "watches", subcategory: "GMT", price: 1495, imgs: [WATCH_IMGS[5], WATCH_IMGS[2], WATCH_IMGS[3]], colors: [{ name: "Steel", hex: "#C0C0C5" }], sizes: ACC_SIZES, description: "True GMT with 24-city worldtime ring.", features: ["True GMT", "Worldtime ring", "Ceramic bezel"], tags: ["gmt", "travel"] },
  { name: "Skeleton Auto", brand: "Maison Blanc", category: "watches", subcategory: "Automatic", price: 1895, imgs: [WATCH_IMGS[0], WATCH_IMGS[4], WATCH_IMGS[5]], colors: [{ name: "Rose Gold", hex: "#B76E5A" }, { name: "Steel", hex: "#C0C0C5" }], sizes: ACC_SIZES, description: "Open-heart skeleton dial showcases the mechanical movement.", features: ["Skeleton dial", "Automatic movement", "Sapphire front and back"], tags: ["skeleton", "luxury"] },
  { name: "Pilot Type B", brand: "Vantage", category: "watches", subcategory: "Pilot", price: 745, imgs: [WATCH_IMGS[3], WATCH_IMGS[1], WATCH_IMGS[4]], colors: [{ name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "Classic Type B pilot dial with oversized crown.", features: ["Type B dial", "Oversized crown", "Anti-magnetic"], tags: ["pilot", "tool"] },

  // Bags (8)
  { name: "Weekender Holdall", brand: "Maison Blanc", category: "bags", subcategory: "Travel", price: 595, imgs: [BAG_IMGS[0], BAG_IMGS[1], BAG_IMGS[2]], colors: [{ name: "Cognac", hex: "#965A3E" }, { name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "Full-grain leather weekender with brass hardware.", features: ["Full-grain leather", "Brass hardware", "Suede lining"], tags: ["leather", "travel"] },
  { name: "Daily Tote", brand: "Aurelia", category: "bags", subcategory: "Tote", price: 245, imgs: [BAG_IMGS[3], BAG_IMGS[4], BAG_IMGS[5]], colors: [{ name: "Tan", hex: "#C2A07A" }, { name: "Onyx", hex: "#1C1C1E" }], sizes: ACC_SIZES, description: "Structured tote in vegetable-tanned leather.", features: ["Veg-tan leather", "Magnetic closure", "Inside zip pocket"], tags: ["tote", "leather"] },
  { name: "Tech Backpack", brand: "Vantage", category: "bags", subcategory: "Backpack", price: 285, compareAtPrice: 340, imgs: [BAG_IMGS[1], BAG_IMGS[3], BAG_IMGS[0]], colors: [{ name: "Charcoal", hex: "#2A2A2D" }, { name: "Olive", hex: "#5A6049" }], sizes: ACC_SIZES, description: "Waterproof technical backpack with 16-inch laptop sleeve.", features: ["Waterproof", "16in laptop sleeve", "AirMesh straps"], tags: ["tech", "backpack"] },
  { name: "Cardholder", brand: "Maison Blanc", category: "bags", subcategory: "Small Goods", price: 95, imgs: [BAG_IMGS[2], BAG_IMGS[5], BAG_IMGS[4]], colors: [{ name: "Black", hex: "#0A0A0B" }, { name: "Cognac", hex: "#965A3E" }], sizes: ACC_SIZES, description: "Slim cardholder in saffiano leather.", features: ["Saffiano leather", "6 card slots", "Center pocket"], tags: ["wallet", "small"] },
  { name: "Bifold Wallet", brand: "Halden", category: "bags", subcategory: "Small Goods", price: 145, imgs: [BAG_IMGS[4], BAG_IMGS[0], BAG_IMGS[3]], colors: [{ name: "Brown", hex: "#5C3A24" }, { name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "Classic bifold in shell cordovan.", features: ["Shell cordovan", "8 card slots", "Bill compartment"], tags: ["wallet", "cordovan"] },
  { name: "Crossbody Sling", brand: "Kairo", category: "bags", subcategory: "Sling", price: 165, imgs: [BAG_IMGS[5], BAG_IMGS[2], BAG_IMGS[1]], colors: [{ name: "Black", hex: "#0A0A0B" }, { name: "Sand", hex: "#C9B89A" }], sizes: ACC_SIZES, description: "Minimal crossbody sling with magnetic closure.", features: ["Water-resistant", "Magnetic closure", "Adjustable strap"], tags: ["sling", "minimal"] },
  { name: "Briefcase Roll", brand: "Maison Blanc", category: "bags", subcategory: "Briefcase", price: 745, imgs: [BAG_IMGS[0], BAG_IMGS[4], BAG_IMGS[2]], colors: [{ name: "Cognac", hex: "#965A3E" }], sizes: ACC_SIZES, description: "Roll-top briefcase in bridle leather.", features: ["Bridle leather", "Roll-top", "Padded laptop sleeve"], tags: ["briefcase", "leather"] },
  { name: "Duffel Mini", brand: "Vantage", category: "bags", subcategory: "Travel", price: 195, imgs: [BAG_IMGS[3], BAG_IMGS[5], BAG_IMGS[0]], colors: [{ name: "Olive", hex: "#5A6049" }, { name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "Carry-on sized duffel in waxed cotton canvas.", features: ["Waxed canvas", "Leather handles", "Carry-on size"], tags: ["duffel", "travel"] },

  // Accessories (8)
  { name: "Aviator Sunglasses", brand: "Lumen", category: "accessories", subcategory: "Eyewear", price: 195, imgs: [ACC_IMGS[0], ACC_IMGS[1], ACC_IMGS[2]], colors: [{ name: "Gold/Brown", hex: "#C9A56B" }, { name: "Silver/Black", hex: "#C0C0C5" }], sizes: ACC_SIZES, description: "Titanium aviators with polarized lenses.", features: ["Titanium frame", "Polarized", "100% UV"], tags: ["sunglasses", "titanium"] },
  { name: "Round Acetate", brand: "Orris", category: "accessories", subcategory: "Eyewear", price: 165, imgs: [ACC_IMGS[3], ACC_IMGS[4], ACC_IMGS[5]], colors: [{ name: "Tortoise", hex: "#7A4A2E" }, { name: "Black", hex: "#0A0A0B" }], sizes: ACC_SIZES, description: "Round acetate sunglasses with mineral-glass lenses.", features: ["Italian acetate", "Mineral glass", "Spring hinges"], tags: ["sunglasses", "acetate"] },
  { name: "Leather Belt", brand: "Maison Blanc", category: "accessories", subcategory: "Belts", price: 145, imgs: [ACC_IMGS[1], ACC_IMGS[3], ACC_IMGS[0]], colors: [{ name: "Cognac", hex: "#965A3E" }, { name: "Black", hex: "#0A0A0B" }], sizes: ["28", "30", "32", "34", "36", "38"], description: "Single-piece bridle leather belt with brass buckle.", features: ["Bridle leather", "Brass buckle", "Edge dressed"], tags: ["belt", "leather"] },
  { name: "Silk Scarf", brand: "Maison Blanc", category: "accessories", subcategory: "Scarves", price: 195, imgs: [ACC_IMGS[2], ACC_IMGS[5], ACC_IMGS[4]], colors: [{ name: "Ivory", hex: "#F2EBDD" }, { name: "Charcoal", hex: "#2A2A2D" }], sizes: ACC_SIZES, description: "Hand-rolled twill silk scarf.", features: ["100% silk twill", "Hand rolled", "Made in Italy"], tags: ["silk", "scarf"] },
  { name: "Knit Tie", brand: "Aurelia", category: "accessories", subcategory: "Ties", price: 85, imgs: [ACC_IMGS[4], ACC_IMGS[0], ACC_IMGS[3]], colors: [{ name: "Navy", hex: "#1C2A4A" }, { name: "Charcoal", hex: "#2A2A2D" }], sizes: ACC_SIZES, description: "Knitted silk tie with squared bottom.", features: ["Knit silk", "Squared bottom", "Untipped"], tags: ["tie", "silk"] },
  { name: "Leather Gloves", brand: "Halden", category: "accessories", subcategory: "Gloves", price: 165, imgs: [ACC_IMGS[5], ACC_IMGS[1], ACC_IMGS[2]], colors: [{ name: "Cognac", hex: "#965A3E" }, { name: "Black", hex: "#0A0A0B" }], sizes: ["S", "M", "L", "XL"], description: "Cashmere-lined nappa gloves.", features: ["Nappa leather", "Cashmere lined", "Touchscreen tips"], tags: ["gloves", "leather"] },
  { name: "Cap Heritage", brand: "Kairo", category: "accessories", subcategory: "Headwear", price: 65, imgs: [ACC_IMGS[0], ACC_IMGS[4], ACC_IMGS[1]], colors: [{ name: "Stone", hex: "#A09684" }, { name: "Black", hex: "#0A0A0B" }, { name: "Cocoa", hex: "#5C3A24" }], sizes: ACC_SIZES, description: "Washed cotton 6-panel cap with leather strap closure.", features: ["Washed cotton", "Leather strap", "Brass buckle"], tags: ["cap", "essential"] },
  { name: "Wool Socks 3-Pack", brand: "Aurelia", category: "accessories", subcategory: "Socks", price: 45, imgs: [ACC_IMGS[3], ACC_IMGS[5], ACC_IMGS[2]], colors: [{ name: "Mixed", hex: "#888" }], sizes: ["S/M", "L/XL"], description: "Three pairs of merino wool blend crew socks.", features: ["Merino blend", "Cushioned sole", "Reinforced heel/toe"], tags: ["socks", "bundle"] },
];

export const products: Product[] = seeds.map((s, i) => {
  const id = `prod-${(i + 1).toString().padStart(3, "0")}`;
  const slug = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const reviewCount = 12 + ((i * 17) % 380);
  const rating = Number((3.7 + ((i * 13) % 13) / 10).toFixed(1));
  const stock = 3 + ((i * 7) % 40);
  const tagSet = new Set(s.tags);
  return {
    id,
    slug,
    name: s.name,
    brand: s.brand,
    category: s.category,
    subcategory: s.subcategory,
    price: s.price,
    compareAtPrice: s.compareAtPrice,
    currency: "USD",
    images: s.imgs.map((p, j) => img(p, i * 10 + j)),
    colors: s.colors,
    sizes: s.sizes,
    rating,
    reviewCount,
    stock,
    isNew: tagSet.has("new") || i % 11 === 0,
    isTrending: tagSet.has("trending") || i % 7 === 0,
    isFeatured: i % 5 === 0,
    isLimited: tagSet.has("limited") || tagSet.has("premium"),
    description: s.description,
    features: s.features,
    reviews: buildReviews(reviewCount, i + 1),
    tags: s.tags,
  };
});

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
export const categories: { key: Product["category"]; label: string; image: string }[] = [
  { key: "sneakers", label: "Sneakers", image: img(SNEAKER_IMGS[0], 1001) },
  { key: "apparel", label: "Apparel", image: img(APPAREL_IMGS[0], 1002) },
  { key: "watches", label: "Watches", image: img(WATCH_IMGS[0], 1003) },
  { key: "bags", label: "Bags", image: img(BAG_IMGS[0], 1004) },
  { key: "accessories", label: "Accessories", image: img(ACC_IMGS[0], 1005) },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getRelated = (p: Product, n = 4) =>
  products.filter((x) => x.id !== p.id && x.category === p.category).slice(0, n);

export { BRANDS };
