export type MapCategory = 'towns' | 'legendary' | 'hideouts';

export type GuideRef =
  | { type: 'category'; categoryId: string; label: string }
  | { type: 'walkthrough'; label: string };

export interface MapPoint {
  x: number;
  y: number;
  label: string;
  category: MapCategory;
  region: string;
  description: string;
  services?: string[];
  chapter?: string;
  tip?: string;
  guideRef?: GuideRef;
}

export const LAYER_META: Record<MapCategory, { label: string; color: string; icon: string }> = {
  towns:    { label: 'Towns',             color: '#9B2226', icon: 'home' },
  legendary: { label: 'Legendary Animals', color: '#C9A227', icon: 'feather' },
  hideouts:  { label: 'Gang Hideouts',     color: '#4A7A9B', icon: 'shield' },
};

export const MARKERS: MapPoint[] = [

  // ── TOWNS ──────────────────────────────────────────────────────────────────

  {
    x: 598, y: 108,
    label: 'Colter',
    category: 'towns',
    region: 'Ambarino — Grizzlies West',
    description: 'An abandoned mining settlement deep in the snow-blanketed Grizzlies. After the Blackwater massacre the Van der Linde gang takes shelter here at the start of the story, surviving the blizzard while the law closes in.',
    services: ['Abandoned Shelter', 'Supply Cache'],
    chapter: 'Prologue & Chapter 1',
    tip: 'Loot every cabin before the gang moves on — there are provisions and ammo caches you will not find again.',
    guideRef: { type: 'walkthrough', label: 'View Walkthrough' },
  },

  {
    x: 566, y: 248,
    label: 'Valentine',
    category: 'towns',
    region: 'New Hanover — Heartlands',
    description: 'A rough-and-tumble frontier cattle town that serves as the gang\'s primary hub during Chapter 2. The saloon, hotel, general store, gunsmith and doctor are all in easy reach. Expect brawls.',
    services: ['Saloon', 'Doctor', 'Gunsmith', 'General Store', 'Hotel', 'Stables', 'Post Office', 'Barber'],
    chapter: 'Chapter 2 hub',
    tip: 'Complete all Chapter 2 side quests based here before A Strange Kindness — they expire when the camp moves.',
    guideRef: { type: 'category', categoryId: 'chapter2', label: 'View Chapter 2 Checklist' },
  },

  {
    x: 452, y: 300,
    label: 'Wallace Station',
    category: 'towns',
    region: 'West Elizabeth — Big Valley',
    description: 'A small but important rail stop on the Cumberland & Western line. Primarily a staging point for train robberies and supply runs rather than a full town.',
    services: ['General Store', 'Train Station'],
    chapter: 'Chapters 2–4',
    tip: 'A fence and telegram operator work here — useful for offloading stolen goods between missions.',
    guideRef: { type: 'walkthrough', label: 'View Walkthrough' },
  },

  {
    x: 470, y: 350,
    label: 'Strawberry',
    category: 'towns',
    region: 'West Elizabeth — Big Valley',
    description: 'A picturesque mountain town with a more refined character than Valentine. Micah Bell is arrested and jailed here after a post-Blackwater altercation.',
    services: ['Hotel', 'General Store', 'Doctor', 'Post Office', 'Barber', 'Gunsmith'],
    chapter: 'Chapters 2 & 4',
    tip: 'Blessed Are the Meek? — sneak in via the back alley of the sheriff\'s office to break Micah out quietly.',
    guideRef: { type: 'category', categoryId: 'chapter2', label: 'View Chapter 2 Checklist' },
  },

  {
    x: 545, y: 420,
    label: 'Blackwater',
    category: 'towns',
    region: 'West Elizabeth — Flat Iron Lake',
    description: 'A prosperous modern city on the shores of Flat Iron Lake. The gang\'s botched ferry job here is what sets the whole story in motion. Blackwater carries a massive bounty for Arthur and is off-limits until the Epilogue.',
    services: ['Bank', 'Hotel', 'Doctor', 'Gunsmith', 'General Store', 'Tailor', 'Stables', 'Post Office', 'Barber'],
    chapter: 'Epilogue (off-limits before)',
    tip: 'Do NOT enter Blackwater as Arthur — the $300+ bounty triggers an instant five-star wanted level. Safe for John in the Epilogue.',
    guideRef: { type: 'category', categoryId: 'epilogue1', label: 'View Epilogue Checklist' },
  },

  {
    x: 350, y: 527,
    label: 'Armadillo',
    category: 'towns',
    region: 'New Austin — Cholla Springs',
    description: 'Once a bustling trading post, Armadillo is now a cholera-ravaged ghost of itself. Most residents have fled or perished. John Marston passes through here on his way to finding work in the Epilogue.',
    services: ['Saloon', 'General Store', 'Doctor'],
    chapter: 'Epilogue',
    tip: 'Avoid drinking from the well or barrels inside town — some trigger a cholera sickness debuff early in the Epilogue.',
    guideRef: { type: 'category', categoryId: 'epilogue1', label: 'View Epilogue Checklist' },
  },

  {
    x: 160, y: 568,
    label: 'Tumbleweed',
    category: 'towns',
    region: 'New Austin — Gaptooth Ridge',
    description: 'A desolate frontier town at the far western edge of the map, abandoned by most of its population. Del Lobo gang members occupy the old sheriff\'s office. Rich with collectibles and stranger encounters.',
    services: ['Abandoned Saloon', 'Post Office'],
    chapter: 'Epilogue',
    tip: 'The sheriff\'s office contains Del Lobo gang members — clear them out to safely explore for cigarette cards and treasure map clues.',
    guideRef: { type: 'category', categoryId: 'points_of_interest', label: 'View Points of Interest' },
  },

  {
    x: 690, y: 282,
    label: 'Emerald Ranch',
    category: 'towns',
    region: 'New Hanover — Roanoke',
    description: 'A prosperous working ranch east of Valentine where the Emerald family operate a tight-lipped operation with a dark secret. The local fence buys stolen goods, and horse trading happens near the barn.',
    services: ['Fence', 'General Store', 'Stables'],
    chapter: 'Chapters 2–4',
    tip: 'The fence here is one of the earliest available — sell stolen horses and looted goods before heading to Saint Denis.',
    guideRef: { type: 'category', categoryId: 'chapter2', label: 'View Chapter 2 Checklist' },
  },

  {
    x: 800, y: 425,
    label: 'Rhodes',
    category: 'towns',
    region: 'Lemoyne — Scarlett Meadows',
    description: 'A tense, powder-keg southern town caught between the Gray and Braithwaite families\' bitter feud. The local law is in the Grays\' pocket. The gang gets deep into this feud during Chapter 3.',
    services: ['General Store', 'Doctor', 'Gunsmith', 'Post Office', 'Stables', 'Saloon'],
    chapter: 'Chapter 3 hub',
    tip: 'The feud escalates rapidly — complete all Rhodes stranger missions before A Short Walk in a Pretty Town triggers the point of no return.',
    guideRef: { type: 'category', categoryId: 'chapter3', label: 'View Chapter 3 Checklist' },
  },

  {
    x: 882, y: 405,
    label: 'Saint Denis',
    category: 'towns',
    region: 'Lemoyne — Bayou Nwa',
    description: 'The largest and most sophisticated city in the game. A cosmopolitan hub of commerce, crime, and corruption. The gang\'s Chapter 4 operations center around Angelo Bronte and the city\'s powerful crime networks.',
    services: ['Bank', 'Hotel', 'Doctor', 'Gunsmith', 'General Store', 'Tailor', 'Trapper', 'Fence', 'Theatre', 'Post Office', 'Barber', 'Stables'],
    chapter: 'Chapter 4 hub',
    tip: 'Wear clean, formal clothes when entering high society events — dirty or bloodied outfits cause NPCs to react negatively and can fail some missions.',
    guideRef: { type: 'category', categoryId: 'chapter4', label: 'View Chapter 4 Checklist' },
  },

  {
    x: 912, y: 258,
    label: 'Van Horn',
    category: 'towns',
    region: 'Roanoke Ridge — Northeastern Territories',
    description: 'A grimy, lawless trading post perched on the northeastern coast. Populated by smugglers, sailors and outlaws. Key to several Chapter 6 missions as Arthur\'s story darkens.',
    services: ['General Store', 'Gunsmith', 'Saloon', 'Post Office'],
    chapter: 'Chapter 6',
    tip: 'The Delights of Van Horn stranger mission starts here — one of the funniest in the game. Look for the drunken Englishman near the docks.',
    guideRef: { type: 'category', categoryId: 'chapter6', label: 'View Chapter 6 Checklist' },
  },

  {
    x: 888, y: 188,
    label: 'Annesburg',
    category: 'towns',
    region: 'Roanoke Ridge — Northeastern Territories',
    description: 'A coal-mining town on the northeastern shore, owned by Leviticus Cornwall\'s mining company. Workers live in debt to the company store. Central to the Wapiti storyline in Chapters 5 and 6.',
    services: ['General Store', 'Doctor', 'Post Office', 'Gunsmith'],
    chapter: 'Chapter 6',
    tip: 'Cornwall\'s influence means Pinkerton agents patrol regularly — stay out of the mine foreman\'s sight if your bounty is active.',
    guideRef: { type: 'category', categoryId: 'chapter6', label: 'View Chapter 6 Checklist' },
  },

  // ── LEGENDARY ANIMALS ──────────────────────────────────────────────────────

  {
    x: 618, y: 165,
    label: 'Legendary Grizzly Bear',
    category: 'legendary',
    region: 'Ambarino — Grizzlies East',
    description: 'One of the most dangerous legendary hunts in the game. The massive Grizzly Bear roams the dense forests east of O\'Creagh\'s Run. Its pelt and claw craft the Legendary Bear Head Hat and Bear Coat at the Trapper.',
    chapter: 'Chapters 2–6',
    tip: 'Use Improved Arrows or a high-caliber rifle. The bear charges at close range — keep your distance and use Dead Eye to land shots on the head.',
    guideRef: { type: 'category', categoryId: 'legendary_animals', label: 'View Hunting Checklist' },
  },

  {
    x: 340, y: 128,
    label: 'Legendary White Bison',
    category: 'legendary',
    region: 'Ambarino — Lake Isabella',
    description: 'A ghostly white bison roaming the frozen shores of Lake Isabella in the far northwest. Extremely rare and found only in the harshest conditions. Its pelt and horn craft the rare Legendary White Bison Coat.',
    chapter: 'Chapters 2–6',
    tip: 'Lake Isabella is bitterly cold — equip the Trapper\'s warm outfit before hunting here or Arthur\'s cores will drain rapidly.',
    guideRef: { type: 'category', categoryId: 'legendary_animals', label: 'View Hunting Checklist' },
  },

  {
    x: 474, y: 158,
    label: 'Legendary Wolf',
    category: 'legendary',
    region: 'Ambarino — Cotorra Springs',
    description: 'The Legendary Wolf prowls the thermal spring fields of Cotorra Springs. It is cunning and fast, often circling prey before attacking. Its pelt and fang craft the Legendary Wolf Coat and Mountain Hat.',
    chapter: 'Chapters 2–6',
    tip: 'The wolf uses pack hunting behavior even alone — watch all directions. Poison arrows slow it down dramatically before the killing shot.',
    guideRef: { type: 'category', categoryId: 'legendary_animals', label: 'View Hunting Checklist' },
  },

  {
    x: 820, y: 192,
    label: 'Legendary Moose',
    category: 'legendary',
    region: 'Roanoke Ridge — Brandywine Drop',
    description: 'The largest legendary animal in the game, a massive bull moose found near Brandywine Drop. Its antlers are extraordinary. The pelt and antler craft the Legendary Moose Coat and Flop Hat.',
    chapter: 'Chapters 2–6',
    tip: 'The moose is surprisingly fast when spooked — track using Eagle Eye and position upwind. A single well-placed headshot with a rifle is most effective.',
    guideRef: { type: 'category', categoryId: 'legendary_animals', label: 'View Hunting Checklist' },
  },

  {
    x: 876, y: 512,
    label: 'Legendary Alligator',
    category: 'legendary',
    region: 'Lemoyne — Bayou Nwa',
    description: 'The largest legendary predator in the game, an enormous alligator lurking in the deep bayou southeast of Saint Denis. Its thick hide is almost impossible to penetrate with standard ammo.',
    chapter: 'Chapters 3–6',
    tip: 'Use Special Improved Arrows or high-velocity rifle rounds — anything weaker will bounce off. Approach from the bank and never enter the water while hunting.',
    guideRef: { type: 'category', categoryId: 'legendary_animals', label: 'View Hunting Checklist' },
  },

  {
    x: 773, y: 498,
    label: 'Legendary Panther',
    category: 'legendary',
    region: 'Lemoyne — Scarlett Meadows',
    description: 'The rarest and most deadly legendary predator. The Panther stalks the dense undergrowth of the Scarlett Meadows and can kill Arthur in a single pounce if underestimated. Only available after completing at least 9 Master Hunter Challenges.',
    chapter: 'Chapters 4–6 (unlocks after 9 Hunter Challenges)',
    tip: 'Complete at least 9 Master Hunter Challenges first or the Panther will not spawn. Move slowly through the area — it will ambush from vegetation.',
    guideRef: { type: 'category', categoryId: 'hunter', label: 'View Hunter Challenges' },
  },

  // ── GANG HIDEOUTS ──────────────────────────────────────────────────────────

  {
    x: 430, y: 232,
    label: 'Hanging Dog Ranch',
    category: 'hideouts',
    region: 'New Hanover — West Grizzlies',
    description: 'An abandoned ranch occupied by the O\'Driscoll Boys, the Van der Linde gang\'s chief rivals. Micah and Arthur raid this hideout in Chapter 2 to gather intelligence on the Blackwater situation.',
    chapter: 'Chapter 2',
    tip: 'Approach from the treeline east of the ranch to avoid the front sentry. The cabin interior holds story items and weapons worth looting.',
    guideRef: { type: 'category', categoryId: 'gang_hideouts', label: 'View Hideouts Checklist' },
  },

  {
    x: 544, y: 218,
    label: 'Six Point Cabin',
    category: 'hideouts',
    region: 'New Hanover — Grizzlies',
    description: 'A remote O\'Driscoll stronghold in the New Hanover highlands. A key target during the gang\'s war with Colm O\'Driscoll\'s crew. Multiple ambush positions surround the cabin.',
    chapter: 'Chapters 2–3',
    tip: 'Scout from the ridge to the north before approaching — O\'Driscoll lookouts will alert the cabin if spotted. Take out the exterior guards silently first.',
    guideRef: { type: 'category', categoryId: 'gang_hideouts', label: 'View Hideouts Checklist' },
  },

  {
    x: 858, y: 456,
    label: 'Shady Belle',
    category: 'hideouts',
    region: 'Lemoyne — Bayou Nwa',
    description: 'A grand but decrepit antebellum estate deep in the Lemoyne bayou, overrun by the Lemoyne Raiders. Dutch orders the gang to clear it out as their new Chapter 3 camp. A memorable assault mission with molotovs and bayou atmosphere.',
    chapter: 'Chapter 3',
    tip: 'Molotovs are extremely effective on the Raiders clustered around the estate entrance. Clear the exterior before pushing inside to avoid being flanked.',
    guideRef: { type: 'category', categoryId: 'gang_hideouts', label: 'View Hideouts Checklist' },
  },

  {
    x: 558, y: 462,
    label: 'Thieves\' Landing',
    category: 'hideouts',
    region: 'West Elizabeth — Flat Iron Lake',
    description: 'A lawless river shantytown on the south shore of Flat Iron Lake run by smugglers and outlaws. Home to one of the earliest available fences and a notorious hub for stolen goods and shady dealings.',
    chapter: 'Chapters 2–4',
    tip: 'The fence here carries unique items not found elsewhere early in the game. Keep your bounty low — the local gang turns hostile if you cause trouble.',
    guideRef: { type: 'category', categoryId: 'gang_hideouts', label: 'View Hideouts Checklist' },
  },

  {
    x: 585, y: 360,
    label: 'Flat Iron Lake O\'Driscoll Camp',
    category: 'hideouts',
    region: 'New Hanover — Flat Iron Lake Shore',
    description: 'An O\'Driscoll Boys encampment on the northern shore of Flat Iron Lake near Flatneck Station. Used as a staging area for their operations in the Heartlands during the gang\'s war with the Van der Linde crew in Chapters 2 and 3.',
    chapter: 'Chapters 2–3',
    tip: 'The camp overlooks the Flatneck Station train line — loot the tents for weapons and supplies before clearing the remaining O\'Driscolls.',
    guideRef: { type: 'category', categoryId: 'gang_hideouts', label: 'View Hideouts Checklist' },
  },
];
