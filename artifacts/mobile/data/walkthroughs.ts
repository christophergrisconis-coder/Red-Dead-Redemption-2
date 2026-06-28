export interface MissionWalkthrough {
  chapter: string;
  chapterKey: string;
  title: string;
  isSideQuest?: boolean;
  steps: string[];
  goldTips?: string[];
  honorNote?: string;
  missables?: string[];
  honorImpact?: string;
}

export const walkthroughData: Record<string, MissionWalkthrough> = {

  // ═══════════════════════════════════════════
  //  CHAPTER 1 — COLTER
  // ═══════════════════════════════════════════

  c1_1: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'Outlaws from the West',
    steps: [
      'The game opens in a blizzard at Colter, an abandoned mining town in the Grizzlies. Follow Dutch and the gang inside.',
      'Listen to the tense situation — the Blackwater job went wrong and the law is closing in.',
      'Follow Micah outside to investigate the farmhouse across the frozen field.',
      'Clear the O\'Driscoll threat at the farmhouse — this is the tutorial for combat and cover.',
      'Return to the Colter cabin with the information and supplies recovered from the farmhouse.',
    ],
    goldTips: ['This is the tutorial — take time learning Dead Eye, cover mechanics, and Eagle Eye before anything else; the snowstorm also teaches navigation by sound and landmark.'],
  },

  c1_2: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'Enter, Pursued by a Memory',
    steps: [
      'Follow Arthur\'s task to find food for the starving gang in the frozen wilderness.',
      'Head into the snowfield east of Colter and track deer using Eagle Eye on the frozen ground.',
      'Hunt at least one deer — a clean headshot preserves the meat.',
      'Skin the deer completely before carrying the meat back; partial skins mean less food.',
      'Return to Colter and give the meat to Pearson at the cook\'s wagon.',
      'Speak with Dutch and Hosea about the plan going forward — Blackwater is behind them.',
    ],
    goldTips: ['Use Eagle Eye to track prints in the snow; a single well-placed rifle shot is more efficient than chasing a wounded animal through a blizzard; this mission teaches hunting fundamentals.'],
  },

  c1_3: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'Old Friends',
    steps: [
      'Colm O\'Driscoll\'s men have found the gang at Colter. Grab a weapon and take a defensive position on the ridge above town.',
      'Use the snow-covered ridgeline as cover — the O\'Driscolls are advancing from the eastern tree line.',
      'Pick off the advance scouts with the rifle before they reach the cabin cluster.',
      'When the second wave pushes up the main path, use Dead Eye to thin them out quickly.',
      'Pursue the fleeing O\'Driscoll leader on horseback across the frozen valley.',
      'Close the distance and confront him — this exchange sets up a rivalry that runs through the whole game.',
    ],
    goldTips: ['Headshot at least three O\'Driscolls from cover for the gold medal; the horseback chase requires a healthy horse — feed it a hay bale before leaving camp.'],
  },

  c1_4: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'The Aftermath of Genesis',
    steps: [
      'Help Pearson and the gang set up Colter camp properly — complete the requested chores.',
      'Contribute money and supplies to the camp ledger (Dutch\'s box) to upgrade camp facilities.',
      'Speak with gang members around camp — these conversations reveal backstory and character.',
      'Help Davey Callander — his wound from Blackwater is serious and his time is short.',
      'Assist with the camp\'s immediate supply needs before the gang can consider moving.',
    ],
    goldTips: ['Donate generously to the camp ledger early — upgrades to the medical and food supplies unlock faster travel; speak to every gang member in Colter for unique backstory dialogue.'],
  },

  c1_5: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'Who the Hell is Leviticus Cornwall?',
    steps: [
      'Ride out with Dutch, Bill, and Micah to intercept a Cornwall Kerosene & Tar train near Flatneck Station.',
      'Take a firing position on the ridge above the railroad tracks and wait for the train to approach.',
      'When the train slows, jump aboard from horseback — time your approach to the caboose ladder.',
      'Fight through the train cars toward the money car at the front, using the car walls as cover.',
      'Crack the safe in the money car and extract the cash.',
      'Escape as Cornwall\'s private security forces converge — jump from the slowing train and ride hard north.',
    ],
    goldTips: ['Board the train from horseback at full gallop — timing the jump is the tricky part; fight forward car by car rather than letting enemies push back at you; this introduces Leviticus Cornwall as the main antagonist.'],
  },

  c1_6: {
    chapter: 'Chapter 1', chapterKey: 'ch1',
    title: 'Eastward Bound',
    steps: [
      'The gang breaks camp at Colter — the snow is too deep and the law too close.',
      'Assist with packing the wagons and loading essential supplies for the journey east.',
      'Ride with the convoy as it descends from the Grizzlies toward the warmer lowlands.',
      'Keep the wagon convoy together through the mountain pass — do not ride ahead.',
      'Arrive at Horseshoe Overlook in New Hanover and help establish the new camp.',
      'Explore the new camp location and speak to Dutch about what comes next.',
    ],
    goldTips: ['The journey from Colter to Horseshoe Overlook is one of the most atmospheric sequences in the game — ride slowly and take it in; the contrast between the frozen mountains and the green valley is striking.'],
  },

  // ═══════════════════════════════════════════
  //  CHAPTER 2 — HORSESHOE OVERLOOK
  // ═══════════════════════════════════════════

  c2_1: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Who is Not Without Sin',
    steps: [
      'Meet Dutch at the Horseshoe Overlook camp after settling in — he wants to ride.',
      'Follow Dutch to the nearby river and sit with him as he talks philosophically about the gang and their plans.',
      'Listen carefully to Dutch\'s vision for what the money will buy — this conversation establishes his character.',
      'Return to camp with Dutch when the conversation concludes.',
      'This mission is primarily about Dutch\'s mindset and sets the tone for Chapter 2.',
    ],
    goldTips: ['Let all dialogue play out fully — Dutch\'s philosophy here becomes increasingly hollow as the story progresses; understanding his worldview now makes his later behavior more devastating.'],
  },

  c2_2: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'A Quiet Time',
    steps: [
      'Head to the Valentine saloon with Lenny to blow off steam after the hard road from Colter.',
      'Buy rounds of drinks at the bar and enjoy the evening — do not draw a weapon.',
      'When things escalate at the bar, use hand-to-hand fighting only. No guns inside.',
      'Manage the brawl through multiple rounds without getting knocked out.',
      'Exit the saloon with Lenny and escape before the Sheriff arrives.',
      'Ride out of Valentine clean and return to camp.',
    ],
    goldTips: ['This is one of the most fun missions in the game — lean into the comedy; win the brawl without being knocked down for gold; the Valentine saloon is now open for gambling and socializing after this.'],
  },

  c2_3: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Paying a Social Call',
    steps: [
      'Ride with Micah west to the O\'Driscoll camp at Hanging Dog Ranch.',
      'Scout the ranch from the treeline above — identify the O\'Driscoll positions before engaging.',
      'Approach the barn from the east side to avoid the front sentries.',
      'Clear the barn and the main cabin systematically — use stealth where possible.',
      'Find the information Micah is looking for inside the main cabin.',
      'Escape Hanging Dog Ranch as surviving O\'Driscolls respond and ride back to camp.',
    ],
    goldTips: ['Approach from the east treeline for the stealth approach; clear guards silently before entering any building; loot the cabin thoroughly — it contains early story clues about the Blackwater job.'],
  },

  c2_4: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Americans at Rest',
    steps: [
      'Find Lenny in Valentine who has gotten into serious trouble after the previous night.',
      'Track Lenny through Valentine using Eagle Eye on his footprints and the locals\' reactions.',
      'Locate him in an embarrassing situation — handle it with minimum chaos.',
      'Get Lenny safely out of Valentine before the local law notices either of you.',
      'Ride back to camp with Lenny and hear his side of the previous evening\'s events.',
    ],
    goldTips: ['Keep Lenny\'s identity hidden from the Valentine sheriff; humor and diplomacy over violence in this mission — a wanted level makes extraction much harder.'],
  },

  c2_5: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'The First Shall Be Last',
    steps: [
      'Ride with Javier to find Sean MacGuire who was captured by bounty hunters after the Blackwater job.',
      'Track the bounty hunters\' camp south along the Flat Iron Lake shore using Eagle Eye.',
      'Scout the camp from high ground — Sean is guarded by four or more armed men.',
      'Start the assault from range with a rifle, taking out the far sentry first.',
      'Close in and eliminate remaining guards; find Sean tied up in the camp.',
      'Cut Sean free and escape the area before reinforcements arrive from the nearby town.',
      'Ride back to Horseshoe Overlook for Sean\'s triumphant return to camp.',
    ],
    goldTips: ['Headshot all bounty hunters without being detected during approach for the gold medal; use the high ridge position east of camp for the opening shots; Sean\'s return triggers one of the best camp celebration scenes.'],
  },

  c2_6: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Pouring Forth Oil I',
    steps: [
      'Meet Dutch and the crew at the train tracks north of Flatneck Station for the Cornwall oil heist.',
      'Stop the Cornwall oil train by placing obstructions on the track — use the supplies in the cart.',
      'When the train stops, board it quickly and neutralize Cornwall\'s security in the first car.',
      'Uncouple the oil cars from the locomotive to isolate them.',
      'Take the driver\'s seat of the detached oil cars and drive them to Dutch\'s designated location.',
    ],
    goldTips: ['Work fast on the track obstruction — the train approaches quickly; get to the locomotive before the security team recovers; this is the first of four connected oil missions.'],
  },

  c2_7: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Pouring Forth Oil II',
    steps: [
      'Return to the oil site following up on Part I — there is still product to move.',
      'Guard the oil wagon convoy as it moves through the eastern roads toward the buyer.',
      'Deal with Cornwall\'s private security forces pursuing the convoy.',
      'Keep the lead wagon intact through multiple ambush points.',
      'Deliver the oil to the fence contact and collect payment for Dutch.',
    ],
    goldTips: ['Ride slightly ahead of the convoy and pre-clear ambush points rather than reacting; the second ambush is larger than the first — use the terrain on the right side of the road for cover.'],
  },

  c2_8: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Pouring Forth Oil III',
    steps: [
      'The Cornwall situation requires one more extraction — ride with Bill and Sean.',
      'Locate the next oil asset at its storage point near Flatneck Station.',
      'Deal with the security detail before accessing the asset.',
      'Move the oil using the designated route while avoiding Cornwall\'s response.',
      'Deliver to the extraction point and report back to Dutch.',
    ],
    goldTips: ['Take the back road south of the station to avoid the patrol — they respond quickly if they spot you on the main road.'],
  },

  c2_9: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Pouring Forth Oil IV',
    steps: [
      'The final Cornwall oil operation — Dutch leads this one personally.',
      'Board the moving Cornwall freight train near Annesburg at speed from horseback.',
      'Fight through the armed car guards toward the target compartment.',
      'Locate and secure the final asset Cornwall has been moving east.',
      'Jump from the train as it approaches Annesburg and ride hard before Cornwall\'s people respond.',
    ],
    goldTips: ['Board the rear car first and fight forward — boarding the front puts you in a crossfire; use Dead Eye in the narrow car corridors; this ends the Cornwall oil storyline and raises the stakes significantly.'],
  },

  c2_10: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Blessed Are the Meek?',
    steps: [
      'Micah has been arrested in Strawberry after the Blackwater job and is awaiting hanging.',
      'Ride to Strawberry in West Elizabeth and scout the sheriff\'s office location.',
      'Create a distraction to draw guards away from the jail — knocking over a supply wagon works.',
      'Enter through the back of the jail while guards are occupied and find Micah\'s cell.',
      'Break Micah out and retrieve his weapons from the lockbox near the sheriff\'s desk.',
      'Fight through Strawberry as the alarm is raised — Micah is aggressive and makes the escape louder.',
      'Ride north out of Strawberry\'s jurisdiction and lose the pursuit in the West Elizabeth forests.',
    ],
    goldTips: ['The quiet approach — distract, sneak in, break out — is far cleaner than a full assault; Micah will escalate everything regardless, so get his guns fast and run; complete without being downed for gold.'],
  },

  c2_11: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'An American Pastoral Scene',
    steps: [
      'Ride with Strauss to collect a debt at Emerald Ranch from a local farmer who borrowed money.',
      'Meet the debtor — he is struggling but owes a genuine debt.',
      'Choose how to handle the collection: firm but fair, or aggressive.',
      'If the debtor cannot pay in full, accept partial payment or establish a new arrangement.',
      'Return to Strauss with what was collected and hear his cold assessment of the situation.',
    ],
    goldTips: ['High honor: accept partial payment or work arrangement; low honor: take everything; this introduces the debt-collection side missions and sets up Arthur\'s later moral crisis about the Strauss arrangement.'],
    honorNote: 'Being lenient earns honor; being brutal loses it.',
  },

  c2_12: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Exit Pursued by a Bruised Ego',
    steps: [
      'Meet Hosea at the train station and help him run an elaborate con on Leviticus Cornwall himself.',
      'Take your position as Hosea\'s "associate" and play your part in the scheme without breaking character.',
      'When Cornwall boards the train, maintain the con through a series of escalating complications.',
      'The con goes sideways — improvise and get Hosea off the train safely.',
      'Ride hard away from the station before Cornwall\'s private security identifies you.',
    ],
    goldTips: ['Stay in character throughout — breaking the script early collapses the con; this is the most Hosea-focused mission in the game and one of the funniest sequences; let all Hosea dialogue play fully.'],
  },

  c2_13: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Magicians for Sport',
    steps: [
      'Josiah Trelawny has been captured by bounty hunters operating out of Emerald Ranch.',
      'Ride to Emerald Ranch and scout the bounty hunter camp near the barn.',
      'The hunters have split into two groups — one guards Trelawny, one patrols the perimeter.',
      'Eliminate the patrol group first before approaching Trelawny\'s location.',
      'Free Trelawny and cover his escape through the ranch back to the road.',
      'Ride back toward Horseshoe Overlook with Trelawny — he is grateful but evasive about his recent activities.',
    ],
    goldTips: ['Take out the perimeter patrol silently before engaging the main group; loot the camp leader for bounty hunter notes — they contain useful information about the area.'],
  },

  c2_14: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'The Spines of America',
    steps: [
      'Ride with Hosea to the Flat Iron Lake area to run a land grab con on a wealthy local rancher.',
      'Play your supporting role in Hosea\'s scheme — follow his signals and improvise naturally.',
      'When the scheme requires physical assistance, help Hosea manage the target.',
      'Escape with the proceeds when the con completes and the target realizes what happened.',
      'Ride back to camp with Hosea and listen to his analysis of the mark — he knows every type.',
    ],
    goldTips: ['Hosea is the best character in the game for scheming dialogue — let every conversation play; this mission also opens up more of the Flat Iron Lake region for free exploration.'],
  },

  c2_15: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'A Strange Kindness',
    steps: [
      'The situation at Horseshoe Overlook has become untenable — the law knows the camp location.',
      'Help break camp: pack the wagons, load supplies, and prepare the convoy.',
      'Ride with the convoy as it moves south toward Lemoyne.',
      'Deal with any threats on the road during the convoy move.',
      'Arrive at Clemens Point on the south shore of Flat Iron Lake and help establish the new camp.',
      'Speak with Dutch about the next phase of operations in Lemoyne.',
    ],
    goldTips: ['This ends Chapter 2 — complete ALL side quests in the Horseshoe Overlook region before triggering this mission; they disappear once the camp moves. Particularly: Money Lending missions, the Noblest of Men introduction, and fishing with Jack.'],
    missables: ['All Chapter 2 side missions expire when camp moves. Do them before A Strange Kindness.'],
  },

  // ─── Chapter 2 Side Quests ─────────────────────────────────────────────────

  c2_sq1: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Money Lending and Other Sins I',
    isSideQuest: true,
    steps: [
      'Speak to Leopold Strauss at camp and accept the first debt-collection assignment.',
      'Ride to the debtor\'s location in the Heartlands of New Hanover.',
      'The debtor is a homesteader who borrowed during hard times — choose your approach.',
      'Collect partial or full payment depending on your honor and how you handle the conversation.',
      'Return the funds to Strauss at camp.',
    ],
    goldTips: ['Being lenient earns honor; Strauss will judge you coldly either way.'],
    honorNote: 'Leniency earns honor; aggression loses it.',
  },

  c2_sq2: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Money Lending and Other Sins II',
    isSideQuest: true,
    steps: [
      'Collect the second debt assignment from Strauss at the Horseshoe Overlook camp ledger.',
      'Study the debtor profile: a small farmer near Flatneck Station who borrowed to save his failing crop.',
      'Ride to the marked farmhouse and approach the property; the debtor\'s wife intercepts you at the gate.',
      'Listen to her explanation — the husband is working a distant field and the family is down to their last stores.',
      'Choose your approach: accept a partial payment and promise to return, demand the full amount and search the house, or forgive the debt entirely.',
      'If searching, the house contains a small amount of cash hidden in the stove pipe and some canned goods.',
      'Return to Strauss and report the outcome — he marks the ledger differently depending on your choice.',
    ],
    goldTips: ['The hidden cash in the stove pipe is only visible if you search — look for the glint; forgiving the debt satisfies the quest for high-honor players and Arthur\'s dialogue with Strauss afterward is significantly different; listen to the wife\'s full story before acting.'],
    honorNote: 'Forgiving the debt earns significant honor and changes later Strauss dialogue.',
    missables: ['The wife\'s full story contains backstory about the Blackwater job\'s economic fallout; the hidden stove-pipe cash is a one-time find.'],
  },

  c2_sq3: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Money Lending and Other Sins III',
    isSideQuest: true,
    steps: [
      'Accept the third debt assignment from Strauss at camp — this is the most dangerous debtor yet.',
      'The debtor is in the Valentine area but has gone to ground — speak to the saloon keeper and the general store owner for leads.',
      'Track the debtor to a derelict cabin southwest of Valentine using Eagle Eye on fresh footprints and discarded items.',
      'Approach the cabin carefully — the debtor has set a trip-wire alarm at the front door and is armed with a shotgun.',
      'Disarm the trap or approach from the rear window; either way, the debtor will be hostile on first sight.',
      'Subdue the debtor non-lethally (fists or lasso) to keep options open, or eliminate him if the fight escalates.',
      'Search the cabin thoroughly — the debtor had more money than he claimed, hidden under a loose floorboard.',
      'Return to Strauss with the recovered funds or the news of the debtor\'s death; Arthur\'s journal entry differs based on outcome.',
    ],
    goldTips: ['The trip-wire at the front door is visible with Eagle Eye — disarm it for stealth approach options; the floorboard cash is only accessible after the confrontation, not before; using Dead Eye during the initial shotgun blast can disarm the debtor without killing him.'],
    honorImpact: 'High honor for non-lethal subdual; honor loss for killing an unarmed man after the fight ends.',
    missables: ['Arthur\'s journal sketch and entry for this mission are unique — three variants exist based on outcome; the saloon keeper and store owner have different hints depending on time of day.'],
  },

  c2_sq4: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Polite Society, Valentine Style',
    isSideQuest: true,
    steps: [
      'Find Karen, Mary-Beth, and Tilly in the Valentine general store — they have a con running.',
      'Play your supporting role as the women work their scheme on the Valentine store owner.',
      'When the scheme requires a distraction, provide it at exactly the right moment.',
      'Help the women escape with the proceeds when the target catches on.',
      'Ride back toward camp and hear the women\'s debrief of the operation.',
    ],
    goldTips: ['Time your distraction to Karen\'s signal exactly; this is one of the best gang member spotlight missions in the game — the three women are excellent together.'],
  },

  c2_sq5: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'A Fisher of Men',
    isSideQuest: true,
    steps: [
      'Find Jack Marston near the Horseshoe Overlook camp — he wants Arthur to take him fishing.',
      'Take Jack to the nearby river with fishing rods equipped.',
      'Teach Jack to fish: help him cast, read the water, and wait for a bite.',
      'When Jack hooks a fish, guide him through the reel-in process without losing it.',
      'Spend quiet time with Jack on the riverbank — listen to his questions about the gang\'s life.',
      'Return to camp with the catch. Abigail will be grateful.',
    ],
    goldTips: ['One of the most peaceful missions in the game — do not rush it; Jack\'s questions during the fishing are the most honest conversations Arthur has with anyone about the life they\'re living.'],
    honorNote: 'Spending time with Jack earns positive honor.',
  },

  c2_sq6: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'The Noblest of Men, and a Woman — Theodore Levin',
    isSideQuest: true,
    steps: [
      'Find journalist Theodore Levin in the Valentine saloon — he is writing a book about legendary gunfighters.',
      'Speak to Levin and hear his pitch. He gives Arthur four photographs of gunslingers he needs to interview.',
      'The four gunslingers are: Billy Midnight, Flaco Hernandez, Emmet Granger, and Black Belle.',
      'Each gunslinger must be tracked down separately across the map (see individual quest entries).',
      'This begins a multi-chapter stranger quest chain that runs through Chapters 2-4.',
    ],
    goldTips: ['Start this quest immediately in Chapter 2 so you have maximum time to complete all four gunslinger encounters before Chapter 4 ends; each gunslinger drops a unique, irreplaceable weapon.'],
    missables: ['All four gunslingers and their unique weapons must be found before end of Chapter 6.'],
  },

  c2_sq7: {
    chapter: 'Chapter 2', chapterKey: 'ch2',
    title: 'Further Questions of Female Suffrage',
    isSideQuest: true,
    steps: [
      'Find the suffragette campaigners near the Flatneck Station area handing out pamphlets.',
      'Speak to the lead campaigner — she asks for Arthur\'s help with a problem.',
      'A local rancher has been harassing the campaigners and threatening them off the road.',
      'Confront the rancher and persuade him to stop the harassment — peacefully or otherwise.',
      'Return to the campaigner and report the resolution.',
    ],
    goldTips: ['Peaceful resolution earns honor; this is the first of a multi-chapter encounter chain with the suffragette movement that reflects the changing times in 1899.'],
    honorNote: 'Peaceful resolution earns honor.',
  },

  // ═══════════════════════════════════════════
  //  CHAPTER 3 — CLEMENS POINT
  // ═══════════════════════════════════════════

  c3_1: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'The New South',
    steps: [
      'Arrive at Clemens Point camp on the south shore of Flat Iron Lake in Lemoyne.',
      'Help establish camp — place tents, organize supplies, and get the cook fire running.',
      'Speak to Dutch about the Lemoyne situation: the Gray and Braithwaite families control the region.',
      'Ride out with Dutch and survey the surrounding area — scout the nearby roads and landmarks.',
      'Meet a Gray family rider on the road and begin the careful double-dealing Dutch intends.',
    ],
    goldTips: ['Explore Clemens Point and the surrounding Lemoyne countryside thoroughly before advancing; the region has unique plants, animals, and collectibles; the dual-family political situation defines Chapter 3.'],
  },

  c3_2: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Advertising, the New American Art I',
    steps: [
      'Ride with Hosea to the Braithwaite estate for the first act of his long con against both families.',
      'Play the role of Hosea\'s business associate and help establish credibility with the Braithwaites.',
      'Gather intelligence on the Braithwaite operation while appearing cooperative.',
      'Deliver the first act of the con without breaking character — follow Hosea\'s lead entirely.',
      'Exit the estate with Hosea and debrief on what you learned about the Braithwaites\' real business.',
    ],
    goldTips: ['Do not improvise — follow Hosea\'s script exactly; any deviation alerts the Braithwaites; this begins a two-part con that eventually requires a significant sacrifice from the gang.'],
  },

  c3_3: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Advertising, the New American Art II',
    steps: [
      'Return to the Braithwaite estate with Hosea for the second act of the con.',
      'The Braithwaites are suspicious — adapt the pitch based on their specific questions.',
      'Complete the transaction that Hosea has arranged and exit cleanly.',
      'Ride away from the estate before they can reconsider or check the paperwork.',
      'Meet Hosea at the agreed point and collect your cut of the proceeds.',
    ],
    goldTips: ['This pays well — Hosea\'s cons are the highest-value low-risk jobs in the game; completing this chain unlocks further Hosea missions and deepens the Braithwaite storyline.'],
  },

  c3_4: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Blood Feuds, Ancient and Modern',
    steps: [
      'The Gray-Braithwaite feud has reached a crisis point — Dutch wants to exploit it.',
      'Ride with Dutch to the Gray family\'s Rhodes location and take their side officially.',
      'Help the Grays confront a group of Braithwaite men who have been raiding their property.',
      'Fight through the ambush at the bridge between the two estates.',
      'Escape with the Grays\' representative and receive payment from Sheriff Gray.',
      'Ride back to camp — Dutch is playing both families simultaneously and the danger is growing.',
    ],
    goldTips: ['This introduces Sheriff Gray as a recurring character; complete the mission without alerting the secondary Braithwaite patrol for the gold medal; the double-dealing with both families is one of Chapter 3\'s central tensions.'],
  },

  c3_5: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'A Short Walk in a Pretty Town',
    steps: [
      'Ride into Rhodes with Dutch and Bill for what appears to be a routine meeting with the Grays.',
      'Accompany Dutch through Rhodes town center and maintain a low profile during the meet.',
      'When the situation turns violent without warning, fight through the center of Rhodes.',
      'Keep Dutch covered as he reaches the extraction point on the far side of town.',
      'Escape Rhodes with Dutch and Bill as the entire town reacts to the gunfight.',
    ],
    goldTips: ['Stay within 10 meters of Dutch at all times for the gold medal; the gunfight in Rhodes town center is a classic ambush scenario — use the buildings\' facades as hard cover and move building to building.'],
  },

  c3_6: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Horse Flesh for Dinner',
    steps: [
      'Ride with the Gray boys to steal champion thoroughbred horses from the Braithwaite stables.',
      'Scout the Braithwaite estate stables using Eagle Eye to identify guard positions.',
      'Quietly enter the stables and lead the prize horses out — do not spook them or alert the grooms.',
      'If spotted, mount one horse and drive the others out at a gallop.',
      'Deliver the stolen thoroughbreds to the Grays\' stable master and collect payment.',
    ],
    goldTips: ['This can be done entirely without combat if you\'re quiet — approach from the south side of the stables; horses will follow if you lead the first one out; the Braithwaite horses are worth significant money to the Grays.'],
  },

  c3_7: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Gunpowder, Treason, and Plot',
    steps: [
      'Ride with Sean and other gang members on a Braithwaite moonshine warehouse raid.',
      'Approach the warehouse from the eastern road and scout the perimeter.',
      'Fight through the warehouse guards to reach the moonshine storage inside.',
      'Plant explosives at the marked structural points inside the warehouse.',
      'Escape the building before the explosives detonate — you have 60 seconds after the last charge.',
      'Ride hard north as the warehouse goes up and Braithwaite reinforcements respond.',
    ],
    goldTips: ['Place all charges before lighting the fuse — do not detonate early; this is Sean\'s spotlight mission and one of his best moments; his death later in the chapter hits harder after this.'],
  },

  c3_8: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Paint It, Black',
    steps: [
      'Help the Gray family with a sniper job near the Braithwaite estate boundary.',
      'Take position on the ridge above the Gray-controlled road and equip the bolt-action rifle.',
      'Wait for the Braithwaite convoy to enter the killing ground below.',
      'Eliminate the convoy\'s guards from the ridgeline before they can scatter into cover.',
      'Deal with the remaining convoy members who respond and extract from the ridge.',
    ],
    goldTips: ['Place all headshots from the initial ridge position before descending; the convoy bunches up at the bend in the road — use that moment; a scoped rifle with Dead Eye clears this cleanly.'],
  },

  c3_9: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Sodom? Back to Gomorrah',
    steps: [
      'Ride with Lenny, Bill, and Sean to rob the Lemoyne National Bank in Rhodes.',
      'Enter the bank with the crew and take control of the lobby immediately.',
      'Keep all hostages in place while Lenny works on the vault.',
      'Fight off the law response from the windows — the Rhodes sheriff and deputies arrive fast.',
      'When the vault opens, grab everything and begin the fighting retreat through Rhodes.',
      'Escape the pursuing law enforcement by riding into the Lemoyne back roads.',
    ],
    goldTips: ['Keep all hostages alive inside; headshot every lawman at the windows before they can shoot through; this is the Chapter 3 bank robbery — a smaller scale but essential preview of the Saint Denis heist.'],
  },

  c3_10: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'The Course of True Love I',
    isSideQuest: true,
    steps: [
      'Find Penelope Braithwaite near the Braithwaite estate — she is trying to escape a forced engagement.',
      'Listen to her situation: she loves Beau Gray, a member of the enemy family.',
      'Agree to carry a secret letter to Beau Gray at his family\'s property without the Grays knowing.',
      'Deliver the letter to Beau and wait for his reply.',
      'Carry Beau\'s response back to Penelope and help arrange their next secret meeting.',
    ],
    goldTips: ['This begins a beautiful 5-part love story that runs through Chapters 3 and 6; deliver each letter quickly and do not linger near either estate\'s guards; the Romeo and Juliet storyline is one of RDR2\'s finest subplots.'],
  },

  c3_11: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'The Course of True Love II',
    isSideQuest: true,
    steps: [
      'Return to Penelope at the arranged meeting point near Braithwaite Manor.',
      'Penelope needs Arthur\'s help to actually meet Beau in person for the first time in weeks.',
      'Escort Penelope safely past the Braithwaite family guards without being seen.',
      'Get her to the meeting point and cover the reunion while watching for pursuers.',
      'Escort Penelope home before her absence is noticed.',
    ],
    goldTips: ['Take the back road through the fields — the main road has regular Braithwaite patrols; this mission escalates the stakes and makes the finale in Chapter 6 more earned.'],
  },

  c3_12: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'The Course of True Love III',
    isSideQuest: true,
    steps: [
      'Both families have discovered the relationship — Beau has been taken by his family as punishment.',
      'Help Penelope locate where the Grays are holding Beau.',
      'Extract Beau from the Gray family\'s control without triggering a full confrontation.',
      'Get both Penelope and Beau to a safe location outside the immediate reach of both families.',
      'The couple needs a plan for what comes next — help them arrange their next step.',
    ],
    goldTips: ['Stealth extraction of Beau is faster than combat; this part of the story is the most tense — both families are actively watching; completing this unlocks Parts IV and V later in Chapter 6.'],
  },

  c3_13: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'We Loved Once and True I',
    isSideQuest: true,
    steps: [
      'Receive a letter from Mary Linton — Arthur\'s former love — at the Valentine post office.',
      'She is in trouble and needs Arthur\'s help with a specific problem related to her family.',
      'Ride to the arranged meeting point and hear Mary out.',
      'Help Mary with her request — it involves a difficult situation with her father.',
      'Part ways with Mary after the task is done. The feelings between them are unresolved.',
    ],
    goldTips: ['Medium or higher honor is required for this chain; the letters from Mary can be collected from any post office after Chapter 2; this is the most emotionally complex stranger chain in the game.'],
    honorNote: 'Medium or higher honor required to access this chain.',
  },

  c3_14: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'We Loved Once and True II',
    isSideQuest: true,
    steps: [
      'Mary writes again — her father has created a new crisis and she needs Arthur one more time.',
      'Meet Mary at the agreed location and listen to the details of her father\'s situation.',
      'Accompany Mary to deal with the problem directly.',
      'Navigate the emotionally charged reunion with her difficult father.',
      'See Mary off safely and hear her words about what could have been.',
    ],
    goldTips: ['Let all dialogue play — Mary\'s conversations with Arthur are the most honest interactions he has with anyone; her perspective on Arthur\'s life cuts deep.'],
  },

  c3_15: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'We Loved Once and True III',
    isSideQuest: true,
    steps: [
      'The final Mary Linton mission in this chapter — she needs one more thing from Arthur.',
      'Ride to Saint Denis and meet her at the theater.',
      'Spend the evening with Mary and watch a show together — this is a rare moment of peace.',
      'Walk with Mary afterward and have the conversation that has been building since their reunion.',
      'Say goodbye. This version of their relationship ends here.',
    ],
    goldTips: ['The theater visit is one of the most unique mission segments in the game — watch the entire performance; the conversation afterward is worth reading every word; their parting is one of Arthur\'s most painful moments.'],
  },

  c3_16: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Money Lending and Other Sins IV',
    isSideQuest: true,
    steps: [
      'Collect the Chapter 3 debt assignment from Strauss at the Clemens Point camp.',
      'The debtor is a Rhodes-area sharecropper south of town — ride directly to the marked property.',
      'Upon arrival, discover that the debtor is not alone: his landowner and a local merchant are also present, arguing over the debt.',
      'Listen to all three parties before intervening — the landowner claims the debt, the merchant wants collateral, and the sharecropper is caught between them.',
      'Choose who to side with: help the sharecropper by paying the debt from your own funds, back the landowner and seize the property, or negotiate a three-way split.',
      'If paying yourself, the amount is deducted from Arthur\'s wallet but the sharecropper offers a unique reward later in Chapter 4.',
      'Return to Strauss with the collected amount; Arthur\'s reaction to this job is notably more conflicted than previous collections.',
    ],
    goldTips: ['Paying the debt yourself unlocks a unique Rhodes merchant discount in Chapter 4; backing the landowner yields immediate cash but no future reward; the three-way split satisfies Strauss minimally but earns respect from all parties.'],
    honorNote: 'High honor for protecting the sharecropper; moderate loss for backing the landowner.',
    missables: ['The Chapter 4 merchant discount is only available if you paid the debt yourself in this mission; the landowner\'s seized property becomes a gang hideout in later chapters if you sided with him.'],
  },

  c3_17: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'Money Lending and Other Sins V',
    isSideQuest: true,
    steps: [
      'The fifth Strauss debt collection — this one is in the Lemoyne back country.',
      'The debtor has been hiding from Strauss for months and is not willing to be found.',
      'Track him using Eagle Eye and local knowledge to his hiding spot.',
      'Confront him and resolve the debt in whatever manner you judge appropriate.',
      'Return to Strauss. Arthur\'s discomfort with this work is growing visibly.',
    ],
    goldTips: ['This and the Chapter 6 collections set up Arthur\'s eventual rejection of Strauss; playing high honor throughout these makes the Chapter 6 confrontation with Strauss feel fully earned.'],
    honorImpact: 'High honor release earns significant honor.',
  },

  c3_18: {
    chapter: 'Chapter 3', chapterKey: 'ch3',
    title: 'The Battle of Shady Belle',
    steps: [
      'The Lemoyne Raiders have taken over Shady Belle — the gang needs it as a new camp location.',
      'Approach Shady Belle from the bayou side and scout the Raider positions using Eagle Eye.',
      'The Raiders have set up in the main house, the outbuildings, and along the bayou bank.',
      'Clear the outbuildings first from a distance with a rifle before moving toward the main house.',
      'Storm the main house with the gang and eliminate all remaining Raiders.',
      'Secure Shady Belle and help the gang begin converting it into a camp.',
    ],
    goldTips: ['Snipe the outlying Raiders from the treeline before closing in — there are more inside than it appears; headshot all without taking damage for gold; this ends Chapter 3 and transitions the gang to Shady Belle.'],
  },

  c4_1: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Joys of Civilization',
    steps: [
      'Follow Dutch through Saint Denis on foot to the hotel after the opening cutscene.',
      'Speak with Dutch in the hotel room and listen to his plans for one last score in the city.',
      'Take time to fully explore Saint Denis — visit the tailor on the main boulevard, the gunsmith near the docks, and the fence in the back alleys.',
      'Browse the catalogue at the gunsmith; several exclusive weapons and off-hands are unlocked in Chapter 4.',
      'Return to Dutch at the hotel when you are ready to trigger the next mission.',
    ],
    goldTips: ['Explore Saint Denis thoroughly before advancing — the fence and gunsmith here carry items unavailable elsewhere.'],
  },

  c4_2: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Angelo Bronte, a Man of Honor',
    steps: [
      'Mount up and ride with Dutch and John through the Italian Quarter to Angelo Bronte\'s mansion.',
      'Enter the mansion, meet Bronte, and agree to his terms — he promises Jack\'s return in exchange for clearing his cemetery.',
      'Ride to the cemetery in the Italian Quarter and activate Eagle Eye to locate the grave-robbing gang hiding among the mausoleums.',
      'Eliminate all grave robbers systematically — use the tall grave markers for cover and pick off enemies from distance.',
      'Loot the gang leader\'s body for the item Bronte wants before leaving.',
      'Return to the mansion to collect Jack Marston. Watch Dutch\'s reaction closely — something is shifting in him.',
    ],
    goldTips: ['Use a bolt-action rifle for long headshots from cover; clear all enemies without being downed for the gold medal.'],
  },

  c4_3: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Gilded Cage',
    steps: [
      'Change into the Gentleman\'s outfit before attending the Mayor\'s party — you cannot enter otherwise.',
      'Follow Dutch and Hosea through the front entrance and begin mingling with the party guests.',
      'Speak to all marked NPCs around the ballroom and garden to gather political intelligence for Dutch.',
      'Follow Dutch when he signals and observe the tense confrontation with the Mayor.',
      'Locate Bronte at the party and stay close as the evening\'s events take a dramatic turn.',
      'Escape the mansion with Dutch when chaos breaks out; follow his route through the servant passages.',
    ],
    goldTips: ['Speak to every NPC before leaving the party; wear the Gentleman\'s outfit; don\'t alert the guards.'],
  },

  c4_4: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Brothers and Sisters, One and All',
    isSideQuest: true,
    steps: [
      'Locate the destitute family in their camp near the Shady Belle bayou area — look for them south of the main road.',
      'Speak to the mother and hear their desperate circumstances. Respond respectfully to maintain honor.',
      'Complete the requested task (varies by honor level): high-honor players can donate supplies, low-honor players collect what little is owed.',
      'Return to the family with the result and witness the emotional outcome.',
      'Complete this mission BEFORE Banking, the Old American Art — it disappears forever once Chapter 4 ends.',
    ],
    goldTips: ['Must be done before the bank robbery; high honor gives more mission options; one of the most morally weighted encounters in Chapter 4.'],
    honorNote: 'High honor gives you a donate option; low honor forces a harder collection.',
  },

  c4_5: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'No, No and Thrice, No',
    isSideQuest: true,
    steps: [
      'Speak to Leopold Strauss at camp to receive two debt-collection assignments near Saint Denis.',
      'Ride to the first debtor (Algie Davison) at his home on the outskirts of Saint Denis.',
      'The first debtor is cooperative but his situation leads to unexpected complications — handle them however you choose.',
      'Ride to the second debtor who is in hiding; tracking him leads to genuine danger.',
      'Deal with the resulting violent confrontation and return the collected funds to Strauss.',
    ],
    goldTips: ['Complete this before Chapter 4 advances too far; the second debtor encounter is the more memorable of the two.'],
  },

  c4_6: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Horsemen, Apocalypses',
    steps: [
      'Meet Rain Falls and Charles at the Wapiti Indian Reservation and hear the situation from Rain Falls.',
      'Ride hard with Rain Falls and Charles toward the Army\'s position; maintain formation and stay mounted.',
      'Watch for the soldiers\' ambush signal and react immediately — use Dead Eye to thin out the first wave.',
      'Fight the running engagement on horseback, picking off soldiers from cover positions along the way.',
      'Escort the surviving Wapiti warriors to safety and complete the escape from the Army patrol.',
    ],
    goldTips: ['Use Dead Eye throughout; keep your horse at full health with tonics; don\'t get dismounted.'],
  },

  c4_7: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Urban Pleasures',
    steps: [
      'Meet the gang at the Italian Quarter and receive the plan from Dutch for robbing Bronte\'s crew.',
      'Follow the gang into the neighborhood and hold position until Dutch gives the signal.',
      'When the shooting starts, use the narrow alleyways as kill-zones — funnel enemies toward you.',
      'Watch for Bronte\'s men flanking from the rooftops and deal with snipers first.',
      'Fight through to the collection point and extract the money with the gang.',
      'Escape the subsequent police pursuit through Saint Denis and regroup with Dutch.',
    ],
    goldTips: ['Headshot the roof snipers first; use Dead Eye in the alley firefights; don\'t break from cover.'],
  },

  c4_8: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'A Fine Night of Debauchery',
    steps: [
      'Dress in appropriate riverboat attire and board the Clemens Point gambling boat with Trelawny.',
      'Mingle with passengers in the gambling hall and identify the target using Trelawny\'s cues.',
      'Take a seat at the high-stakes poker tournament and play your opening hand conservatively.',
      'Watch carefully for Trelawny\'s hidden signals — each signal tells you whether to raise, call, or fold. Follow them exactly.',
      'Win the tournament by trusting Trelawny\'s system; do not deviate even when you have a strong hand.',
      'When everything goes wrong, fight your way off the riverboat and swim or ride to safety.',
    ],
    goldTips: ['Never ignore Trelawny\'s signals; keep your weapon loaded for the escape sequence; complete the boat fight without being downed.'],
  },

  c4_9: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Country Pursuits',
    steps: [
      'Meet Dutch at camp and ride with him to the Flat Iron Lake docks at dusk.',
      'Locate the moored boat using Eagle Eye — it is at the far end of the dock.',
      'Approach by swimming alongside the hull rather than walking the dock to avoid noise.',
      'Eliminate or knock out each crew member starting from the stern and moving forward.',
      'Secure the helm and sail the boat to the designated cove for Dutch\'s escape plan.',
    ],
    goldTips: ['Approach by swimming rather than the dock; melee kills are silent; complete without alerting the nearby police boat.'],
  },

  c4_10: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'American Fathers I',
    steps: [
      'Ride with Rain Falls and Eagle Flies to the Army\'s encampment near the Reservation boundary.',
      'Approach the fort entrance as part of the delegation and attempt peaceful negotiation — let Rain Falls lead.',
      'When the soldiers respond with hostility, intervene carefully to prevent the situation from becoming a massacre.',
      'Guide Eagle Flies away from confrontation without starting a full battle — your priority is keeping him alive.',
      'Escape the soldiers\' response and regroup back at the Reservation.',
    ],
    goldTips: ['Avoid killing soldiers if possible for a better honor outcome; use your horse to create distance quickly when things break down.'],
    honorNote: 'Non-lethal approach earns honor; killing soldiers loses it.',
  },

  c4_11: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'American Fathers II',
    steps: [
      'Return to the Reservation to find the situation has escalated dangerously.',
      'Mount up immediately with Eagle Flies and Rain Falls as soldiers advance on the camp.',
      'Fight the cavalry pursuit on horseback — stay mounted at all costs throughout.',
      'Use the terrain and forested hillsides around the Reservation to create distance between you and pursuers.',
      'Pick off lead riders with Dead Eye to break the formation, then gallop hard to the safe zone.',
      'Reach safety and witness the painful exchange between Rain Falls and Eagle Flies.',
    ],
    goldTips: ['Prioritize keeping your horse healthy over Arthur\'s health; use Dead Eye for the cavalry pursuit to keep momentum.'],
  },

  c4_12: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Revenge Is a Dish Best Eaten',
    steps: [
      'Join Dutch and John at the rendezvous point after dark and receive the plan.',
      'Follow Dutch through Saint Denis toward Bronte\'s waterfront estate; stay close.',
      'Clear the estate guards room by room — use stealth as long as possible.',
      'Locate Bronte in his private quarters and subdue him as Dutch instructs.',
      'Escape the estate with Bronte as the alarm is raised and his men converge; fight your way to the docks.',
      'Follow Dutch by boat into the bayou for the mission\'s dark and irreversible conclusion.',
    ],
    goldTips: ['Headshot all guards in sequence before the alarm triggers; stay within reach of Dutch throughout; this is a major turning point — watch Dutch carefully.'],
  },

  c4_13: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Banking, the Old American Art',
    steps: [
      'Meet the full gang at the rendezvous. This is the most ambitious job in the story — everyone is here.',
      'Enter the Saint Denis bank with Dutch\'s crew and take control of the lobby immediately.',
      'Direct all hostages to the vault corridor and keep them calm while the safe-cracking team works.',
      'When police arrive, take defensive positions at windows and the main entrance.',
      'Fight off wave after wave of police and Pinkertons — the vault must hold.',
      'Fight your way out of the bank through the chaos; follow your assigned group through Saint Denis streets.',
      'Reach the docks for the final desperate escape sequence. Something goes very, very wrong here.',
    ],
    goldTips: ['Keep all hostages alive in the lobby — if one dies, you lose the gold medal. Take high ground inside the bank. Save Dead Eye for the escape sequence in the streets.'],
  },

  c4_14: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Bleeding Love',
    isSideQuest: true,
    steps: [
      'Check for a letter from Mary Linton at the camp mailbox or the nearest post office.',
      'Ride to Saint Denis and locate Mary at the hotel she has written from.',
      'Hear Mary\'s request — her father is gravely ill and needs escorting safely out of the city.',
      'Escort Mary and Mr. Linton through Saint Denis on foot; deal with any trouble that arises.',
      'See them safely to their carriage at the edge of the city and say goodbye to Mary.',
    ],
    goldTips: ['Keep honor at medium or higher for the best and most honest dialogue; this is one of the most emotionally complete Arthur missions.'],
    honorNote: 'Medium or higher honor required to access; higher honor yields more dialogue.',
  },

  c4_15: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Thin Blue Line',
    isSideQuest: true,
    steps: [
      'Receive word from Trelawny or find the note at camp — he has been arrested by Saint Denis police.',
      'Ride to the Saint Denis police district and scout the station to identify guard positions and Trelawny\'s cell.',
      'Choose your approach: bribe a guard at the back entrance, create a distraction to draw officers away, or go in loud.',
      'Reach Trelawny\'s cell and get him out before reinforcements arrive.',
      'Cover Trelawny\'s retreat through the streets — he is unarmed and cannot defend himself.',
      'Escape the police district and part ways safely on the outskirts of Saint Denis.',
    ],
    goldTips: ['The bribe or distraction approach avoids triggering the full-city pursuit; loud entry works but makes the escape far harder through dense streets.'],
  },

  // ─── Chapter 4 Side Quests ─────────────────────────────────────────────────

  c4_sq1: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Smell of the Grease Paint',
    isSideQuest: true,
    steps: [
      'Find Bertram, the tiny strongman, near the Saint Denis circus tent in the north of the city.',
      'Speak with him -- he needs help finding his missing partner, the circus ringmaster.',
      'Follow Bertram through Saint Denis to locate the ringmaster at a bar.',
      'Convince or intimidate the ringmaster to return to the circus.',
      'Escort them both back to the circus tent to complete the encounter.',
    ],
    goldTips: ['Keep the interaction peaceful if possible -- no wanted level means easier completion.'],
    missables: ['Must be completed before Chapter 6 -- the circus leaves Saint Denis permanently.'],
    honorImpact: 'Positive honor for helping Bertram.',
  },

  c4_sq2: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Do Not Seek Absolution I',
    isSideQuest: true,
    steps: [
      'Travel to Annesburg in northeastern New Hanover and find the brothel near the center of town.',
      'Speak to the brothel\'s front attendant and ask about Edith Downes -- Thomas Downes\'s widow.',
      'Find Edith working in the back rooms; she is hostile the moment she recognizes Arthur and blames him for her husband\'s death.',
      'Listen to Edith\'s full account of what happened after Thomas died -- the bank took their farm and she had no other options.',
      'Edith explains that Archie, her son, is now working in the mines to help pay off the family\'s remaining debts.',
      'Offer Edith a substantial sum to cover the debts and give her a path out of the brothel; she is initially suspicious of your motives.',
      'Convince Edith to accept the help by acknowledging your role in Thomas\'s fate and expressing genuine remorse.',
      'Edith reluctantly takes the money and tells Arthur where to find Archie -- this begins the redemption arc.',
    ],
    goldTips: ['This quest is only available if you previously collected the Downes debt in Chapter 2; Edith\'s dialogue changes based on your honor level -- high-honor Arthur gets a more receptive reception; the amount you give Edith affects Part II\'s outcome; this is one of the most emotionally significant stranger missions in the game.'],
    missables: ['Must visit Edith before the end of Chapter 6; Edith\'s full dialogue about Thomas\'s death is only available if you let her finish every line.'],
    honorImpact: 'High honor gain -- a key redemption moment for Arthur.',
  },

  c4_sq3: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Do Not Seek Absolution II',
    isSideQuest: true,
    steps: [
      'Return to Annesburg after completing Part I and head to the train station near the center of town.',
      'Find Edith and Archie waiting on the platform with a small satchel of belongings -- they are preparing to leave for a new city.',
      'Edith explains that the money covered the last of their debts and bought two one-way tickets to a town where no one knows them.',
      'Archie is quiet at first; speak to him and he reveals he has been working twelve-hour shifts in the mines since his father died.',
      'Arthur offers Archie advice about starting over in a new place; the dialogue changes based on Arthur\'s honor level.',
      'Speak with Edith one final time. She acknowledges Arthur\'s help despite everything and says she will pray for him.',
      'Watch the train pull into the station and Edith and Archie board together, holding hands as they find their seats.',
      'The train departs and Arthur stands on the platform alone. In his journal, he writes about what redemption might actually mean.',
    ],
    goldTips: ['This conclusion is only unlocked if you gave Edith money in Part I; Archie\'s dialogue changes based on Arthur\'s honor -- high-honor Arthur gets a warmer, more hopeful exchange; the journal entry after the train departs is unique to this mission and worth reading; one of the most moving moments in the game.'],
    missables: ['Archie\'s unique dialogue about the mines is only available if you speak to him before Edith boards; the journal entry is missable if you leave the station too quickly after the train departs.'],
    honorImpact: 'Significant honor gain. Arthur\'s illness makes this especially poignant.',
  },

  c4_sq4: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'A Bright Bouncing Boy I',
    isSideQuest: true,
    steps: [
      'Find inventor Marko Dragic at his demonstration tent near the Saint Denis fairground, just north of the theater district.',
      'Approach Dragic and listen to his pitch about remote-controlled naval warfare; he is enthusiastic but the crowd is skeptical.',
      'Watch his remote-controlled boat demonstration and help him prove it works by guiding the decoy boats to distract military observers.',
      'The demonstration mini-game requires steering the decoys in a figure-eight pattern around the pond markers.',
      'After a successful demonstration, Dragic is ecstatic and invites you to his laboratory near Doverhill for the next phase of his work.',
      'Travel northeast of Saint Denis to the Doverhill area and locate Dragic\'s laboratory workshop on a hillside near the coast.',
      'Enter the lab and Dragic shows you his larger project: an electric automaton powered by lightning rods.',
      'Dragic asks you to return during a storm to help activate the machine -- this sets up Part II of the quest.',
    ],
    goldTips: ['The boat demonstration requires moving decoy boats in a figure-eight pattern -- follow Dragic\'s instructions precisely; failing the demonstration three times triggers unique frustrated dialogue from Dragic; the lab contains unique notes about his work that are worth reading.'],
    missables: ['Must complete before end of Chapter 6; Dragic\'s frustrated dialogue on the third failed attempt is unique and missable; the laboratory notes contain a reference to Nikola Tesla that is easy to overlook.'],
    honorImpact: 'Neutral.',
  },

  c4_sq5: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'A Bright Bouncing Boy II',
    isSideQuest: true,
    steps: [
      'Return to Marko Dragic\'s lab near Doverhill after completing Part I.',
      'Help Dragic assemble and activate his electric robot creation in the lab courtyard.',
      'Place the lightning rods and activate the generator during a storm to power the robot.',
      'Watch the robot come to life -- Dragic\'s triumph. Return to the lab days later to find the tragic aftermath.',
      'Explore the lab -- Dragic has been killed. Find the robot in the forest nearby, sitting peacefully.',
      'Loot Dragic\'s body for the Electric Lantern -- a unique collectible item.',
    ],
    goldTips: ['The Electric Lantern found on Dragic\'s body is a unique inventory item. The robot in the forest is one of the most memorable Easter eggs in the game.'],
    missables: ['The Electric Lantern is missable if you do not loot Dragic\'s body.'],
    honorImpact: 'Neutral -- sad conclusion to a memorable stranger quest.',
  },

  c4_sq6: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Idealism and Pragmatism for Beginners I',
    isSideQuest: true,
    steps: [
      'Find Mayor Lemieux\'s assistant in the Saint Denis town square near the gazebo — he is handing out campaign pamphlets.',
      'Speak with the assistant and agree to help the mayor\'s re-election campaign against his political rival.',
      'Ride to the rival\'s rally location north of Saint Denis and observe the crowd from the treeline.',
      'Choose your approach: intimidate the rally supporters by firing warning shots near their banners, or physically confront the rally organizer.',
      'If intimidating, fire three shots into the air near the banner poles — the crowd scatters without bloodshed.',
      'If confronting, approach the organizer directly and deliver Lemieux\'s threat verbally; a fistfight may ensue.',
      'Return to the assistant in Saint Denis and report the outcome; he pays based on how effectively you disrupted the rally.',
    ],
    goldTips: ['Warning shots preserve honor and still satisfy the quest; the fistfight option is faster but carries a small honor penalty; the assistant pays more for the non-violent disruption because it leaves no witnesses.'],
    honorImpact: 'Warning shots: neutral. Fistfight: slight honor loss.',
    missables: ['The rally organizer has unique dialogue if you approach him before firing any shots; the assistant\'s payment varies by approach and is not visible in the mission summary.'],
  },

  c4_sq7: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Idealism and Pragmatism for Beginners II',
    isSideQuest: true,
    steps: [
      'Return to Mayor Lemieux\'s assistant in Saint Denis, who now has a more serious problem.',
      'The rival campaign has hired armed men to protect their next rally — simple intimidation will not work this time.',
      'Ride to the new rally site, an open field west of Saint Denis, and scout the three armed guards posted around the perimeter.',
      'Choose your approach: eliminate the guards silently using throwing knives or stealth takedowns, or engage them directly in a firefight.',
      'If using stealth, approach from the tall grass at dusk — the guards patrol predictable routes with blind spots.',
      'If fighting directly, use cover behind the stone wall at the field\'s edge; the guards have no long-range weapons.',
      'Destroy the rally banner and podium after neutralizing the guards to send a clear message.',
      'Return to the assistant and collect payment; he is noticeably more nervous than after the first job.',
    ],
    goldTips: ['Stealth approach preserves honor and earns a higher payout; the guards patrol clockwise with a 20-second gap at the northeast corner — use that window; the stone wall provides full cover for a direct assault but triggers a wanted level in Saint Denis afterward.'],
    honorImpact: 'Stealth: neutral. Direct firefight: moderate honor loss.',
    missables: ['The assistant has a unique nervous animation after this mission that disappears after Part III; one of the guards carries a rare pocket watch that is missable if you do not loot the bodies.'],
  },

  c4_sq8: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Idealism and Pragmatism for Beginners III',
    isSideQuest: true,
    steps: [
      'Return to the assistant for the final job in the chain — his tone is now openly desperate.',
      'The mayor\'s main rival, a city councilman, is preparing a scandalous speech that could end Lemieux\'s career.',
      'Ride to the councilman\'s estate south of Saint Denis and approach through the garden after dark.',
      'The councilman is in his study with a bodyguard in the hallway; you must reach him without alerting the household.',
      'Choose your approach: sneak through the servant\'s entrance and confront the councilman non-lethally, or assassinate him in his study.',
      'If choosing confrontation, the councilman offers a bribe to walk away — accepting it fails the mission for Lemieux but earns you money.',
      'If assassinating, use a silent weapon and escape through the garden before the guard discovers the body.',
      'Return to the assistant and collect the final payment; Lemieux himself sends a letter of thanks afterward.',
    ],
    goldTips: ['The councilman\'s bribe is higher than Lemieux\'s payment — but accepting it ends the chain early; silent assassination preserves a clean wanted level; the servant\'s entrance is marked by a laundry basket near the garden gate.'],
    honorImpact: 'Non-lethal confrontation: slight honor loss. Assassination: significant honor loss. Accepting bribe: no honor change but chain ends.',
    missables: ['The councilman\'s bribe offer is a one-time choice — reloading allows you to see both outcomes; Lemieux\'s thank-you letter appears in Arthur\'s satchel only if you complete the assassination; the bodyguard carries a unique cigarette card.'],
  },

  c4_sq9: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Mercies of Knowledge',
    isSideQuest: true,
    steps: [
      'Find Dr. Joseph Hadley camped along the roads of New Hanover — he is a traveling scientist studying "human resilience and the limits of endurance."',
      'Approach his camp and listen to his enthusiastic explanation of his research on electrical stimulation of muscle response.',
      'Agree to participate in his experiment; Hadley assures you the device delivers only "the mildest of shocks."',
      'Stand between the two copper rods Hadley sets up and hold still while he activates the hand-crank generator.',
      'The first shock is genuinely mild; Hadley takes notes on your reaction and increases the intensity for a second test.',
      'The second shock is significantly stronger — Arthur\'s reaction is involuntary and genuinely painful; Hadley is delighted by the data.',
      'A third shock is optional; accepting it yields double payment but drains a small amount of health core.',
      'Collect payment from Dr. Hadley, who is genuinely grateful for your contribution to science and promises to publish his findings.',
    ],
    goldTips: ['Accept all three shocks for maximum payment ($50 total); the third shock reduces your health core by 20% for one in-game hour; Hadley appears at three different roadside locations in New Hanover — if you miss him at one, try the next.'],
    honorImpact: 'Neutral.',
    missables: ['Dr. Hadley\'s three possible camp locations are: south of Emerald Ranch, east of Valentine, and north of Flatneck Station; he only appears at one location per chapter cycle.'],
  },

  c4_sq10: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Iniquities of History I',
    isSideQuest: true,
    steps: [
      'Find Jeremiah Compson, a historical society researcher, sitting on a bench near Flatneck Station looking distressed.',
      'Speak with Compson and learn that he has spent his life studying the history of a local plantation family — the Bolters.',
      'He asks you to locate the Bolter family\'s original deed documents, which he believes are hidden in the ruins of their old estate.',
      'Ride to the Bolter estate ruins north of Rhodes and search the collapsed manor house using Eagle Eye.',
      'The deed is hidden inside a locked strongbox in the basement level — shoot the lock or use a lock-breaker if you have one.',
      'Bring the deed back to Compson, who authenticates it immediately and pays you for the recovery.',
      'Compson mentions that the deed\'s story is incomplete and asks you to return in a few days for Part II.',
    ],
    goldTips: ['The basement strongbox is in the northeast corner of the ruined house — Eagle Eye highlights it; the lock can be shot with any revolver; Compson\'s payment is modest but Part II pays significantly more.'],
    honorImpact: 'Neutral.',
    missables: ['The Bolter estate ruins contain a unique antique compass on a windowsill that is missable if you leave without exploring the upper floor; Compson only appears at Flatneck Station during daylight hours.'],
  },

  c4_sq11: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Iniquities of History II',
    isSideQuest: true,
    steps: [
      'Return to the Saint Denis historical society researcher after completing Part I and speak with him at his desk.',
      'He reveals that an expert in New Orleans confirmed his first artifact was a modern forgery -- someone has been deceiving him.',
      'The researcher provides the name and last known address of the forger: a man named Jeremiah Compson living near Rhodes.',
      'Ride to the address near Rhodes and confront Jeremiah Compson in his small shack; he is initially evasive and defensive.',
      'Compson admits he created the fake but claims he was paid by a third party to deceive the researcher; ask about who hired him.',
      'Resolve the situation: peacefully convince Compson to confess to the researcher (honor-positive) or intimidate him into returning the money (faster but slight honor loss).',
      'Return to the historical society researcher in Saint Denis and report the outcome; he adjusts his exhibition accordingly.',
    ],
    goldTips: ['Jeremiah Compson has a unique backstory about his own disgraced family -- listen to it before resolving the confrontation; peaceful resolution yields a higher payment from the researcher and a unique museum exhibit credit; the researcher\'s exhibition is updated in-game after this mission completes.'],
    missables: ['Jeremiah Compson\'s backstory dialogue is only available if you do not immediately threaten him; the museum exhibit credit in Saint Denis only appears after peaceful resolution.'],
    honorImpact: 'Positive if resolved peacefully, slight loss if violent.',
  },

  c4_sq12: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Veteran I',
    isSideQuest: true,
    steps: [
      'Ride to Ambarino near Cattail Pond and look for a one-legged man fishing from the shoreline.',
      'Approach Hamish Sinclair and introduce yourself; he is immediately warm and invites Arthur to join him.',
      'Accept the fishing invitation and select any bait from your satchel — Hamish is patient and will wait while you prepare.',
      'Fish alongside Hamish at the pond; the fishing mini-game proceeds normally and he comments on your technique.',
      'Between catches, Hamish tells detailed stories of his Civil War service, his injury, and how he adapted to life afterward.',
      'He mentions a giant fish he has been trying to catch for months — this becomes the thread that connects all future meetings.',
      'When the sun begins to set, Hamish packs his gear and says he will be at the pond again soon; this is your cue to leave.',
    ],
    goldTips: ['Hamish Sinclair\'s quest chain spans 5 meetings across Chapters 4-6 and is one of the most beloved in the game; use any bait — Hamish does not judge your gear; listen to every story segment — his dialogue changes slightly based on Arthur\'s honor level.'],
    missables: ['Must meet Hamish before Chapter 6 ends to complete the full chain; Arthur\'s journal contains a unique sketch of Hamish only after this first meeting; low-honor Arthur gets a different opening line with Hamish than high-honor Arthur.'],
    honorImpact: 'Positive honor for spending time with Hamish.',
  },

  c4_sq13: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Duchesses and Other Animals',
    isSideQuest: true,
    steps: [
      'Find Miss Hobbs\'s advertisement posted on a Saint Denis or Valentine notice board — she is a taxidermist collecting rare bird specimens.',
      'Visit Miss Hobbs at her home in the Saint Denis garden district; she greets you warmly and shows her current collection.',
      'Accept her first commission: collect perfect carcasses or pristine feathers from three specific birds.',
      'Hunt the Roseate Spoonbill in the Bluewater Marsh — they congregate near the water\'s edge at dawn and dusk; use a Varmint Rifle for clean kills.',
      'Track the Snowy Egret along the Kamassa River banks south of Saint Denis; study the bird first to confirm it is a three-star specimen.',
      'Find the Little Heron in the Flat Iron Lake shallows near the bayou edge — use Small Game Arrows to avoid damaging the feathers.',
      'Return each specimen to Miss Hobbs individually; she pays premium rates and offers increasingly enthusiastic commentary.',
      'After the first three, Miss Hobbs adds the Warbler and Woodpecker to the list — these require forest-edge habitats north of Rhodes.',
    ],
    goldTips: ['Miss Hobbs pays roughly triple the standard market rate for perfect specimens; study each bird with binoculars before shooting — only three-star specimens satisfy her; the Snowy Egret is easiest at the Kamassa River bend south of the "N" in "Lemoyne" on the map.'],
    missables: ['Must complete before Chapter 6 ends — Miss Hobbs leaves Saint Denis permanently after the story progresses; her house contains a unique cigarette card on the mantle that is only accessible during visits.'],
    honorImpact: 'Neutral — hunting quest chain.',
  },

  c4_sq14: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Of Men and Angels I',
    isSideQuest: true,
    steps: [
      'Find Sister Calderón near the Saint Denis train station — she is tending to a sick beggar on the platform steps.',
      'Approach quietly and wait for her to finish her prayer before initiating conversation.',
      'Sister Calderón explains her medical mission among the city\'s poor and asks for a donation to buy medicine and bandages.',
      'Choose a donation amount: modest ($5), generous ($20), or substantial ($50). Each tier triggers different dialogue.',
      'After donating, Sister Calderón thanks Arthur and briefly shares her personal history — she left a comfortable family for this work.',
      'She gives Arthur a small blessing before returning to her patient; the encounter lingers in Arthur\'s journal.',
      'This first meeting establishes a chain that continues through Chapters 5 and 6 with increasing emotional weight.',
    ],
    goldTips: ['Donate at least $20 on the first meeting to unlock the full chain; Sister Calderón\'s dialogue in later meetings references your initial donation size; the substantial donation triggers a unique journal entry about Arthur\'s unexpected generosity.'],
    missables: ['Must donate on first meeting to continue the chain; failing to donate removes Sister Calderón from all future encounters; Arthur\'s journal contains three different sketches of Sister Calderón based on donation tier.'],
    honorImpact: 'Positive honor for donating.',
  },

  c4_sq15: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Noblest of Men, and a Woman — Billy Midnight',
    isSideQuest: true,
    steps: [
      'After getting the photograph from journalist Theodore Levin in Valentine (must start main quest chain), track down Billy Midnight.',
      'Billy Midnight is a passenger on a train -- board any train and find him in the rear compartment.',
      'Confront Billy Midnight. He is a nervous, trembling man -- very different from his legend.',
      'He flees to the roof of the moving train. Follow him and engage in a duel on the train roof.',
      'Win the duel and loot Midnight\'s Pistol -- a unique semi-automatic pistol -- from his body.',
    ],
    goldTips: ['This is one of the most cinematic duels in the game -- fighting on a moving train roof. Pull your gun at the last possible moment for the gold medal duel time.'],
    missables: ['Midnight\'s Pistol is missable if you do not loot his body immediately after the duel -- it disappears if you leave the train without picking it up.'],
    honorImpact: 'Neutral.',
  },

  c4_sq16: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Noblest of Men, and a Woman — Flaco Hernandez',
    isSideQuest: true,
    steps: [
      'Start this quest chain by speaking to journalist Theodore Levin in the Valentine saloon -- he is writing a book about legendary gunslingers and gives Arthur four photographs.',
      'Flaco Hernandez is found at Cairn Lake in the Grizzlies West region -- travel north into the mountains.',
      'His gang of outlaws guards the camp. Fight through them or use stealth to reach Flaco directly.',
      'Confront Flaco outside his cabin. He agrees to the duel immediately -- no prolonged conversation.',
      'Win the duel against Flaco Hernandez. He is fast -- use Dead Eye and draw at the last possible moment.',
      'Loot Flaco\'s Revolver from his body -- a unique, ornate revolver with exceptional damage.',
    ],
    goldTips: ['Clear the gang members before initiating the duel -- they will shoot you mid-duel if left standing. Flaco\'s Revolver is one of the best unique sidearms in the game.'],
    missables: ['Flaco\'s Revolver is missable -- loot it immediately or it is gone forever.'],
    honorImpact: 'Neutral.',
  },

  c4_sq17: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Noblest of Men, and a Woman — Emmet Granger',
    isSideQuest: true,
    steps: [
      'Emmet Granger is found at his pig farm in Scarlett Meadows, Lemoyne -- south of the Flat Iron Lake region near Emerald Ranch.',
      'Approach the farm. Granger is an arrogant braggart who immediately insults Arthur.',
      'He refuses to duel until you shovel pig manure for him -- degrade yourself and do the chore to trigger the duel.',
      'After the task, Granger draws without warning from behind. React immediately to win.',
      'Loot Emmet Granger\'s Shotgun from his body -- a rare double-barrel shotgun with custom engravings.',
    ],
    goldTips: ['Granger draws from behind as a surprise -- be ready to enter Dead Eye the moment the duel prompt appears. His shotgun is the reward, not a pistol -- it is worth the humiliation.'],
    missables: ['Granger\'s Shotgun is missable -- loot immediately after the duel.'],
    honorImpact: 'Neutral.',
  },

  c4_sq18: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Noblest of Men, and a Woman — Black Belle',
    isSideQuest: true,
    steps: [
      'Black Belle is located in the Bluewater Marsh area of Lemoyne, north of Saint Denis -- find her remote cabin in the bayou.',
      'Unlike the other gunslingers, Black Belle is alive, sharp, and very much in control of the situation.',
      'As you arrive, bounty hunters ambush the location. Black Belle immediately joins the fight -- cover her.',
      'Fight off multiple waves of bounty hunters attacking from multiple directions through the marsh.',
      'After the fight, Black Belle sits for the interview and photo. She is the only gunslinger who survives with dignity.',
      'She gives Arthur advice about living free -- one of the most memorable NPC conversations in the game.',
    ],
    goldTips: ['Black Belle fights alongside you -- keep her alive during the bounty hunter waves or the mission fails. Use the cabin structure and trees as cover positions.'],
    missables: ['No unique weapon reward from Black Belle, but her photograph is required for the quest completion.'],
    honorImpact: 'Neutral -- but her dialogue is worth listening to fully.',
  },

  c4_sq19: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Noblest of Men, and a Woman — Final Confrontation',
    isSideQuest: true,
    steps: [
      'After tracking down all four gunslingers (Billy Midnight, Flaco Hernandez, Emmet Granger, Black Belle), return to Theodore Levin in Valentine.',
      'Find Levin at the saloon -- he is alarmed and tells Arthur that Jim "Boy" Calloway, the most famous gunslinger, wants to duel Arthur himself.',
      'Calloway confronts Arthur outside the saloon -- he is drunk, mean, and paranoid about his own legend.',
      'The situation escalates. Calloway draws first in a rage.',
      'Win the final duel against Jim "Boy" Calloway -- he is the most dangerous of the chain despite his age and drunkenness.',
      'Loot Calloway\'s Revolver -- the finest unique revolver in the game -- from his body.',
      'Speak to Levin one final time. He is horrified by how his book research ended.',
    ],
    goldTips: ['Calloway\'s Revolver has exceptional stats and unique engravings -- do not miss it. This is the best unique revolver available before Chapter 6. Draw at the absolute last moment for the gold medal.'],
    missables: ['Calloway\'s Revolver is missable if you do not loot immediately. This entire chain must be completed before the end of Chapter 6.'],
    honorImpact: 'Neutral.',
  },

  c4_sq20: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Veteran II',
    isSideQuest: true,
    steps: [
      'Return to Hamish Sinclair at Cattail Pond in Ambarino -- he will be in distress when you arrive.',
      'A wolf has been stalking the area and attacked Hamish\'s horse. He needs help tracking and eliminating it.',
      'Follow the wolf tracks using Eagle Eye through the treeline north of the pond.',
      'The wolf ambushes from cover -- react quickly when it charges. Kill it before it can do further damage.',
      'Return to Hamish and help him tend to his injured horse. He thanks Arthur with quiet dignity.',
      'Hamish invites Arthur to return again -- the friendship between them deepens.',
    ],
    goldTips: ['The wolf attacks fast -- have your weapon drawn and Dead Eye ready before following the final set of tracks. Completing this unlocks The Veteran III.'],
    missables: ['Must complete before Chapter 6 ends to access the full Hamish Sinclair story chain.'],
    honorImpact: 'Positive honor for helping Hamish.',
  },

  c4_sq21: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Veteran III',
    isSideQuest: true,
    steps: [
      'Return to Hamish Sinclair near Cattail Pond after completing The Veteran II.',
      'Hamish\'s prized horse, an Ohio Draught Horse, has been stolen by a gang of horse thieves.',
      'Ride hard after the thieves -- they are heading toward Annesburg with the horse in tow.',
      'Intercept the thieves before they reach their hideout. Shoot the riders but do not harm the horse.',
      'Retrieve Hamish\'s horse and lead it back to him at Cattail Pond.',
      'Hamish is deeply grateful -- he talks more openly about his past and his life after the Civil War.',
    ],
    goldTips: ['Use a rifle to pick off horse thieves at range -- getting into a close melee risks hitting Hamish\'s horse. Return the horse before exploring the area.'],
    missables: ['Must complete the full Hamish chain before end of Chapter 6 for the emotional conclusion.'],
    honorImpact: 'Positive honor.',
  },

  c4_sq22: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Of Men and Angels II',
    isSideQuest: true,
    steps: [
      'Return to Sister Calderón in Saint Denis after donating to her mission in Part I -- she is near the Saint Denis train station or the church.',
      'She has fallen ill from exhaustion and overwork among the city\'s poor. She is resting but still working.',
      'Donate more money to her mission to help fund medical supplies.',
      'Sit with her and listen to her speak about faith, suffering, and redemption -- the conversation is one of the most quietly moving in the game.',
      'She tells Arthur that the work she does is not about reward but about the doing of it. These words resonate differently depending on how far Arthur\'s illness has progressed.',
    ],
    goldTips: ['This encounter hits hardest if Arthur\'s tuberculosis diagnosis has occurred -- her words about mortality and meaning feel directed at him personally. Take your time with the dialogue.'],
    missables: ['Must donate in Part I to unlock this second encounter. Complete before end of Chapter 6.'],
    honorImpact: 'High honor gain for donating again.',
  },

  c4_sq23: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'He\'s British, of Course',
    isSideQuest: true,
    steps: [
      'Find a frantic British man named Ridgewood near the Saint Denis circus tent or just outside the city -- he approaches Arthur in a panic.',
      'His exotic animals have escaped from his traveling menagerie. He needs help rounding them up.',
      'Track and lasso the escaped animals -- a lion is the main priority. Use Eagle Eye to track them through the bayou.',
      'The lion is dangerous and will attack on sight. Approach carefully with your lasso ready -- do not shoot it or Ridgewood will not pay.',
      'Return each animal safely to Ridgewood. He rewards you with cash and entertains you with absurd British composure throughout the ordeal.',
    ],
    goldTips: ['Lasso the lion from horseback at a safe distance -- it can kill Arthur in one swipe if you approach on foot. This is one of the funniest stranger encounters in the game.'],
    missables: ['Available throughout Chapters 4 and 5 near Saint Denis.'],
    honorImpact: 'Neutral.',
  },

  c4_sq24: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Mercies of Knowledge — Dr. Joseph Hadley',
    isSideQuest: true,
    steps: [
      'Find Dr. Joseph Hadley traveling in New Hanover -- he is usually near the roads around Emerald Ranch or north of Flatneck Station.',
      'Dr. Hadley is a scientist studying pain tolerance and human resilience. He asks Arthur to participate in an experiment for pay.',
      'Agree to the experiment. Hadley straps Arthur into a rudimentary electric shock chair -- a wooden frame with copper wires and a hand-cranked generator.',
      'Hadley cranks the generator and delivers a mild shock. Arthur\'s reaction depends on your button input.',
      'Collect the payment from Dr. Hadley -- he thanks you with scientific detachment.',
      'Dr. Hadley can be found a second time at a different location -- he remembers Arthur and offers another experiment at higher voltage for more pay.',
    ],
    goldTips: ['This is a short, humorous two-part stranger encounter. Easy money. The electric chair device is Dr. Hadley\'s invention -- crude but memorable. Both encounters pay well.'],
    missables: ['Both Hadley encounters must be completed before end of Chapter 6.'],
    honorImpact: 'Neutral.',
  },

  c4_sq25: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Widow of Willard\'s Rest',
    isSideQuest: true,
    steps: [
      'Find Eleanor Toward at Willard\'s Rest, a remote homestead northeast of Annesburg in New Hanover.',
      'She is an elderly widow living entirely alone after her husband\'s recent death. She asks Arthur to help with farm tasks she can no longer manage.',
      'Chop firewood at the woodpile beside the cabin -- complete the task fully.',
      'Check the root cellar and repair the broken latch she points out.',
      'Sit with Eleanor and have a brief conversation over coffee. She reflects on her long life with quiet dignity.',
      'Leave her a donation of supplies or money before departing -- she will not ask for it.',
    ],
    goldTips: ['A gentle, unhurried encounter that rewards patience. Leave a donation even though she doesn\'t ask -- it earns honor and feels right. One of the most human moments in the game.'],
    honorImpact: 'Positive honor for donating and helping fully.',
  },

  c4_sq26: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Smoking and Other Hobbies — Cigarette Card Collector',
    isSideQuest: true,
    steps: [
      'Find Phineas Ramsbottom\'s advertisement posted in Saint Denis or Valentine -- he is a passionate cigarette card collector.',
      'Purchase premium cigarettes from any general store or gunsmith -- each pack contains one collectible card.',
      'Open packs to reveal cards. There are 144 unique cards across 12 sets. Cards are also found in the world at campsites, buildings, and lootable locations.',
      'Bring full completed sets to Phineas Ramsbottom -- he pays handsomely for each completed set.',
      'Completing all 12 sets and exchanging them earns a unique reward item and significant cash.',
    ],
    goldTips: ['Premium cigarettes are expensive if bought individually. Craft cigarettes using tobacco at camp for cheaper access to cards. Some rare cards only appear in specific locations -- check Saint Denis saloons, manor houses, and Annesburg buildings carefully.'],
    missables: ['Ramsbottom leaves after Chapter 6 -- complete the exchange before the end of the story.'],
    honorImpact: 'Neutral -- collection quest.',
  },

  // ═══════════════════════════════════════════
  //  CHAPTER 5
  // ═══════════════════════════════════════════

  c5_1: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Welcome to the New World',
    steps: [
      'Arthur wakes alone on a Guarma beach, unarmed and disoriented — search the immediate area for supplies.',
      'Follow the sounds of conflict inland and navigate carefully through unfamiliar jungle terrain.',
      'Encounter local civilians and soldiers; observe the conflict before committing to any side.',
      'Work your way toward Dutch\'s last known position through the sugar plantation roads.',
      'Find Dutch and reconnect with the remnants of the gang — learn what happened after Saint Denis.',
    ],
    goldTips: ['Guarma is a one-time location — explore every inch of it. Look for the Green Iguana and other animals needed for the Compendium; you cannot return after Chapter 5.'],
  },

  c5_2: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'A Kind and Benevolent Despot',
    steps: [
      'Follow Hercule Fontaine away from the beach; listen to his explanation of the Guarma conflict.',
      'Collect weapons and supplies from the hidden rebel cache Hercule shows you.',
      'Push through the first wave of Colonel Fussar\'s soldiers — use the jungle cover and advance in short bursts.',
      'Secure the rebel stronghold position and hold it while Hercule\'s allies arrive.',
      'Defend the position against the counter-attack until the mission objective is fulfilled.',
    ],
    goldTips: ['Enemy snipers on elevated positions are the primary threat here — neutralize them first every time; craft fire bottles to clear clustered infantry.'],
  },

  c5_3: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Dear Uncle Tacitus',
    steps: [
      'Begin at the rebel safe house and follow Dutch and Hercule along the riverside jungle path.',
      'The route deliberately avoids the main garrison roads but runs through dense plantation territory — stay alert.',
      'Hercule signals a halt as mounted soldiers patrol the river bend; wait in the tall grass until they pass.',
      'Enter the sugar cane fields and trigger the ambush — soldiers were hidden among the rows.',
      'The cane fire starts immediately — use the burning gaps as moving cover, advancing only where flames have cleared visibility.',
      'Soldiers caught in the burning cane panic and fire inaccurately; use this to your advantage but do not stay near flames too long.',
      'Push through the second wave in the jungle trail beyond the fields; Hercule provides covering fire from the treeline.',
      'Reach the coastal rendezvous point where a small boat waits; board quickly as reinforcements arrive from the plantation house.',
    ],
    goldTips: ['Wait for the mounted patrol to fully clear the river bend — moving early triggers an additional fight; advance through burning cane only after the fire has spread past your position; Hercule\'s covering fire is limited — do not rely on it for more than suppressing one group at a time.'],
    honorNote: 'Neutral — this is a survival escape mission.',
    missables: ['Hercule has unique Guarma-specific dialogue only during Chapter 5 missions; the plantation house contains a hidden collectible visible only if you double back after the rendezvous.'],
  },

  c5_4: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Savagery Unleashed',
    steps: [
      'The rebel camp is under surprise dawn attack — soldiers emerge from the jungle tree line without warning.',
      'Immediately dive into the nearest palm-thatch structure for cover; the open ground is a killing field.',
      'Grab the Molotov cocktails from the supply crate near the campfire — fire is the most effective tool against clustered soldiers.',
      'Throw cocktails at the two main soldier clusters: one advancing from the east trail and one from the south ravine.',
      'Once the initial clusters are broken, advance through the east jungle trail using shotgun sweeps at close range.',
      'Clear three defensive pockets in sequence: the fallen log barricade, the creek crossing, and the ammunition cache hut.',
      'Secure the ammunition cache before the timer expires — this is the mission objective and the rebels need those supplies.',
      'Regroup with Dutch and Hercule at the trail\'s end and confirm the cache is intact.',
    ],
    goldTips: ['The Molotov crate has exactly four bottles — use them on the two largest soldier clusters for maximum effect; the shotgun near the supply crate is pre-loaded — grab it immediately; clear each defensive pocket fully before advancing — rushing triggers reinforcements from behind.'],
    honorNote: 'Neutral — guerrilla combat with no civilian presence.',
    missables: ['The ammunition cache hut contains a unique Guarma weapon mod; Dutch has a rare dialogue line about "civilized warfare" only if you clear all three pockets before he arrives.'],
  },

  c5_5: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Hell Hath No Fury',
    steps: [
      'Reach the clifftop with Dutch and Hercule and survey Fort Bolivar\'s wall defenses.',
      'Immediately target the cannon crew on the fort walls — the cannon will devastate you if it fires freely.',
      'Storm the gates while rebels provide covering suppression fire from the flanks.',
      'Fight through the interior courtyard; enemies on the upper walkways have the height advantage.',
      'Plant all explosive charges at the marked objective inside the fort.',
      'Escape through the fort\'s sea-facing gate before the charges detonate.',
    ],
    goldTips: ['Kill the cannon crew within the first 30 seconds; use Dead Eye for the wall guards; complete without being downed.'],
  },

  c5_6: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Paradise Mercifully Departed',
    steps: [
      'The fort is in ruins behind you — follow Dutch through the smoking aftermath toward the harbor.',
      'Soldiers are pursuing in organized squads from the fort\'s eastern barracks; Dutch moves fast and expects you to keep up.',
      'Fight through the first pursuit squad at the stone archway — use the arch for cover and headshot the officer first to break their coordination.',
      'Push through the warehouse district where the second squad has set up a barricade; flank through the side alley.',
      'Reach the harbor pier where the escape boat is anchored; Hercule\'s rebels are holding the dock against a third wave.',
      'Help the rebels repel the dock assault — the boat cannot launch until the pier is clear.',
      'Board the boat with all surviving gang members and watch the final Guarma cutscene as the island recedes.',
      'Arthur\'s voiceover as the boat pulls away marks the end of the Guarma chapter — absorb it.',
    ],
    goldTips: ['Headshot the officer at the stone archway first — his death causes the squad to lose coordination; the side alley around the warehouse barricade is marked with a white cloth — look for it; keep every gang member alive through the dock fight for the best ending variant.'],
    honorNote: 'Neutral — this is an escape sequence.',
    missables: ['If all gang members survive the dock fight, a unique post-mission campfire dialogue triggers at the mainland camp; Arthur\'s journal Guarma sketch is only complete if you explored the fort interior earlier.'],
  },

  c5_7: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Icarus and Friends',
    steps: [
      'Reunite with John, Charles, and Sadie at the agreed rendezvous point near Annesburg after the boat from Guarma.',
      'The reunion is brief — Pinkerton agents have been watching the rendezvous and move in immediately.',
      'Mount up instantly; the Pinkertons have cavalry and roadblocks on the main coastal road.',
      'Follow Charles\' lead onto the forest trails north of Annesburg — the dense woodland breaks line of sight.',
      'Navigate the ravine system carefully; the horses can handle the slopes but speed is essential.',
      'A Pinkerton forward squad blocks the first trail fork — dismount briefly and use Dead Eye to clear the path, then remount immediately.',
      'Cross the shallow river at the marked ford — the Pinkerton horses lose traction on the rocky bottom, giving you distance.',
      'Reach the safe house cabin in the hills and regroup; not everyone may have made it through clean.',
    ],
    goldTips: ['Never engage the main Pinkerton cavalry in a stand-up fight — they outnumber you heavily; the mountain trail north of the first fork is faster than the valley road by roughly 30 seconds; the river ford crossing is the critical escape point — do not hesitate at the water\'s edge.'],
    honorNote: 'Neutral — escape sequence with unavoidable combat at the trail fork.',
    missables: ['If all four gang members reach the safe house, Sadie reveals unique post-Guarma dialogue about her time away; losing any member changes the safe house conversation and removes some dialogue options.'],
  },

  c5_8: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: "That's Murfree Country",
    steps: [
      'Follow Sadie through Murfree Brood territory at night — light your torch immediately; it\'s very dark.',
      'Navigate the creek beds and ravines carefully; the Murfrees camp near every water source.',
      'Eliminate the Murfrees at each camp silently to preserve the atmosphere and avoid alerting ahead.',
      'Find the cave entrance hidden behind the waterfall along the eastern creek wall.',
      'Use the torch inside the cave to see enemies before they see you; the Murfrees inside are aggressive.',
      'Complete the cave objective and emerge to complete the mission.',
    ],
    goldTips: ['Throw the torch ahead to light enemies before engaging; use the knife for silent takedowns at each camp; one of the most atmospheric missions in the game.'],
  },

  c5_9: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Fleeting Joy',
    steps: [
      'Meet Sadie at the dockside staging point and finalize the plan to extract Jack from Sisika Penitentiary.',
      'Row to the island with Sadie quietly — paddle in shadow and avoid the guard boat\'s lantern.',
      'Scout the prison from the cover of the outer wall and identify Jack\'s location and guard rotations.',
      'Eliminate or distract guards systematically using Eagle Eye to track patrol patterns.',
      'Reach Jack and carry him immediately — he cannot move quickly on his own.',
      'Get back to the rowboat and row hard for the mainland before the island alarm brings reinforcements.',
    ],
    goldTips: ['Use Eagle Eye on the guard patrol patterns before moving; carry Jack the moment you reach him; do not stop to loot or fight — get off the island.'],
  },

  // ═══════════════════════════════════════════
  //  CHAPTER 6
  // ═══════════════════════════════════════════

  c6_1: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Honesty, Honor and Plentiful',
    steps: [
      'Meet Sadie near Rhodes and receive the assignment to recover stolen goods from a Lemoyne Raiders camp.',
      'Ride to the camp and scout from the ridge above — note how many Raiders guard the wagon.',
      'Engage from the high ground with a rifle, clearing the outer sentries before moving in.',
      'Load the recovered goods onto the wagon and take the driver\'s seat.',
      'Fight off the pursuing Raiders from the wagon seat on the road back to the delivery point.',
    ],
    goldTips: ['Use Dead Eye for the camp clearing; keep the wagon on the road for speed; complete the escort without letting the wagon be destroyed.'],
  },

  c6_2: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Just a Social Call',
    steps: [
      'Ride with Dutch and Micah to Annesburg mining town on a seemingly routine confrontation.',
      'Enter the saloon with Dutch and observe the tense exchange with Leviticus Cornwall.',
      'Note Dutch\'s behavior and demeanor throughout — something about him is different now.',
      'When violence breaks out, fight through Cornwall\'s armed guards in the saloon and street.',
      'Escape Annesburg with Dutch and Micah before the law and Cornwall\'s reinforcements arrive.',
    ],
    goldTips: ['This is a major narrative turning point; don\'t engage until Dutch signals; the conversation itself is the most important part of this mission.'],
  },

  c6_3: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Do Not Seek Absolution I',
    steps: [
      'Meet Eagle Flies at the Reservation and learn that Army soldiers have stolen Wapiti horses from the corral.',
      'Ride with Eagle Flies to the Army camp along the river and scout the horse corral location from cover.',
      'Approach the corral quietly from downwind and begin cutting the ropes to free horses one by one.',
      'If spotted, mount one of the freed horses immediately and drive the others out at a gallop.',
      'Guide all freed horses back across the river toward Wapiti territory with Eagle Flies.',
    ],
    goldTips: ['Complete the entire mission without firing a single shot for the gold medal; approach from downwind of the sentries; this is possible entirely in stealth.'],
  },

  c6_4: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Do Not Seek Absolution II',
    steps: [
      'Locate Eagle Flies being held at Fort Mercer and assess the guard strength from the ridge above.',
      'Create a loud distraction at the main gate — dynamite on the gate draws all guards to the front.',
      'Fight your way inside through the distracted garrison and find Eagle Flies in the rear holding cell.',
      'Free Eagle Flies and hand him a spare weapon.',
      'Fight through the fort exit together — Eagle Flies covers one side, you cover the other.',
      'Reach the horses outside the walls and ride hard; Army soldiers will pursue.',
    ],
    goldTips: ['Use dynamite on the main gate cluster of guards; provide Eagle Flies with a horse immediately on exit for a faster escape.'],
  },

  c6_5: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Of Men and Angels I',
    isSideQuest: true,
    steps: [
      'Find Sister Calderón near her mission church in the Saint Denis waterfront district, just south of the market.',
      'Approach her as she distributes bread and water to the dockworkers; she recognizes Arthur and invites him to sit.',
      'Sit with her on the church steps and hear her account of the charitable work among the city\'s poorest residents.',
      'Sister Calderón describes specific individuals she serves: a widow with three children, a man injured in a factory accident, and a young girl selling flowers near the train station.',
      'She speaks about the moral weight of helping others without judgment — the contrast to Arthur\'s life of violence is intentional and unspoken.',
      'Arthur asks why she continues this work despite the exhaustion; her answer is one of the most quietly devastating lines in the game.',
      'She asks Arthur to help with a supply delivery the following week and marks the meeting location on your map for Part II.',
    ],
    goldTips: ['Primarily a dialogue mission; do not skip or rush any line — Sister Calderón\'s description of the people she serves becomes important context for Part III; the moral contrast she draws is subtle but deliberate; this mission chain has one of the most quietly powerful endings in the game.'],
    missables: ['Sister Calderón\'s answer to "why do you continue" is unique and missable if you interrupt her; the dockworkers around her have unique ambient dialogue about her work.'],
    honorImpact: 'Positive honor for listening with patience and compassion.',
  },

  c6_6: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Of Men and Angels II',
    isSideQuest: true,
    steps: [
      'Meet Sister Calderón at her supply wagon near the Saint Denis market district.',
      'Take the driver\'s seat or ride alongside as mounted escort — your choice changes your firing position.',
      'When the first Lemoyne Raider ambush hits, position yourself between the attackers and the wagon.',
      'Headshot the lead riders first — if they reach the wagon it takes significant damage.',
      'A second ambush occurs farther down the road south of Lagras; handle it the same way.',
      'Escort the wagon safely to its destination and say farewell to Sister Calderón.',
    ],
    goldTips: ['Stay mounted throughout — dismounting exposes the wagon; headshot lead riders immediately each wave; complete without the wagon being destroyed.'],
  },

  c6_7: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Course of True Love IV',
    isSideQuest: true,
    steps: [
      'Receive word from Penelope or find the note at camp — the elopement is happening now.',
      'Escort both Penelope and Beau toward the train station; both families know and are in pursuit.',
      'Fight off the Braithwaite horsemen closing in from the northern road.',
      'Deal with Gray family riders coming from the south before they cut off the route.',
      'Keep both Penelope and Beau moving at all times — they cannot both be separated.',
      'See them safely onto the train platform as the final riders attempt to stop the departure.',
    ],
    goldTips: ['Both Penelope and Beau must survive; headshot lead pursuers\' horses to slow the chases rather than the riders.'],
  },

  c6_8: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Course of True Love V',
    isSideQuest: true,
    steps: [
      'Meet Penelope at the final station location — this is the last stand of both feuding families.',
      'Escort Penelope and Beau as both Braithwaite and Gray riders converge on the station.',
      'Fight off all attackers from both factions simultaneously — this is the largest engagement of this storyline.',
      'Hold the platform clear while the couple boards the train.',
      'Watch the train depart and sit with Arthur\'s quiet reflection as this story comes to its end.',
    ],
    goldTips: ['One of the few genuinely happy endings in RDR2 — protect both characters to the end; it\'s worth the difficulty.'],
  },

  c6_9: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Money Lending and Other Sins VI',
    isSideQuest: true,
    steps: [
      'Speak to Leopold Strauss at the Beaver Hollow camp for the final debt assignment.',
      'Notice Arthur\'s physical state — the tuberculosis cough is frequent now and his gait is slower; this is the last debt he will ever collect.',
      'The debtor is a dockworker near Annesburg who borrowed to pay for his daughter\'s medicine after a fever outbreak.',
      'Ride through the damp northeast wetlands and locate the debtor\'s shack near the docks — the area is foggy and oppressive.',
      'The debtor is not home; his young daughter answers the door and explains her father is working a double shift.',
      'Choose your approach: wait for the father and confront him, leave a threatening message with the child, or forgive the debt on the spot.',
      'If waiting, the father returns exhausted and begs for more time — Arthur\'s cough during the conversation changes the tone entirely.',
      'Return to Strauss with whatever outcome you chose; Arthur\'s final words to Strauss in this report foreshadow the confrontation to come.',
    ],
    goldTips: ['Forgiving the debt is the only option that satisfies the quest for high-honor players while also feeling narratively complete; Arthur\'s coughing fit during the confrontation is unavoidable — do not skip the cutscene; the debtor\'s daughter has unique dialogue if you wait for the father.'],
    honorNote: 'High honor for forgiving the debt; significant honor loss for threatening the child or taking the father\'s last wages.',
    missables: ['Arthur\'s journal entry after this mission is one of the most detailed in the game and has two variants based on outcome; the daughter will reference Arthur\'s kindness in a later ambient camp encounter only if the debt was forgiven.'],
  },

  c6_10: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Money Lending and Other Sins VII',
    isSideQuest: true,
    steps: [
      'Approach Leopold Strauss at the Beaver Hollow camp after completing the sixth debt collection.',
      'Arthur initiates the confrontation himself — this is not a mission prompt, it is Arthur\'s choice.',
      'Listen to Arthur\'s opening accusation: he calls the debt collections "soul-crushing" and names specific debtors by memory.',
      'Strauss attempts to justify the work as necessary camp finance; Arthur rejects every argument without hesitation.',
      'The confrontation escalates as Arthur connects the debt collections to his own declining health and conscience.',
      'Arthur physically throws Strauss out of the camp — this is the only violent act in the mission and it is not optional.',
      'Watch the camp\'s reaction: some members look away, others nod silently, and Dutch stands motionless saying nothing.',
      'The silence from Dutch is the most important part of the aftermath — he does not intervene, condemn, or acknowledge what just happened.',
    ],
    goldTips: ['No combat in this mission — the physical ejection of Strauss is a cutscene; high-honor Arthur delivers a longer, more detailed speech with specific debtor names; low-honor Arthur is shorter and more violent in tone; Dutch\'s silence is significant — it signals his withdrawal from camp moral leadership.'],
    honorNote: 'Major honor gain for expelling Strauss; this is one of Arthur\'s most important moral decisions.',
    missables: ['The speech has two full variants based on honor — high-honor players should experience both by reloading; several camp members have unique ambient dialogue about Strauss\'s expulsion for the next three in-game days only.'],
  },

  c6_11: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Delights of Van Horn',
    isSideQuest: true,
    steps: [
      'Arthur wakes up in Van Horn with no memory of the last 12 hours — explore the town for clues.',
      'Use Eagle Eye on environmental objects around the saloon and street to piece together last night\'s events.',
      'Follow the trail of evidence to the eccentric Englishman at the center of the chaos.',
      'Deal with the chain of absurd consequences that follows — this escalates in every direction.',
      'Get back to Beaver Hollow with both your wallet and your dignity roughly intact.',
    ],
    goldTips: ['Use Eagle Eye on everything in town; this is one of the funniest missions in the game — take it at a relaxed pace and enjoy the chaos.'],
  },

  c6_12: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Archeology for Beginners',
    steps: [
      'Meet Rain Falls at the Reservation and learn the Army has seized sacred Wapiti artifacts.',
      'Ride with Rain Falls to the Army storage facility and approach with a peaceful intent.',
      'Attempt diplomatic recovery first — choose the peaceful dialogue options when given the choice.',
      'If diplomacy fails, recover the artifacts by force and load them onto the pack horse.',
      'Escort Rain Falls and the artifacts safely back to the Reservation without further incidents.',
    ],
    goldTips: ['Use peaceful dialogue options throughout for honor gain; approach the soldiers without drawing a weapon first; you can complete this without firing a shot.'],
    honorNote: 'Peaceful dialogue options earn significant honor.',
  },

  c6_13: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Honor, Amongst Thieves',
    steps: [
      'Meet Dr. Monroe at his camp and learn that the Army has seized a critical Wapiti medicine shipment.',
      'Scout the Army supply road from the ridge above using Eagle Eye to find the target wagon.',
      'Plan an intercept approach from a hillside above the road — approach from the higher elevation blind spot.',
      'Neutralize the wagon\'s armed guards quietly — knock them out or use a silenced approach.',
      'Take the wagon\'s reins and drive it to Monroe\'s location, staying off the main road where possible.',
      'Deal with any Army pursuit on the return journey.',
    ],
    goldTips: ['Recover the vaccine without being detected for the gold medal; approach from the hillside above the road and knock out the guards from behind.'],
  },

  c6_14: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Fine Art of Conversation',
    isSideQuest: true,
    steps: [
      'Join Charles and Rain Falls for a ride through the New Hanover countryside.',
      'Listen to the extended conversation between them as Rain Falls shares his history — do not skip it.',
      'When armed pursuers appear, assist Charles in providing a covering retreat.',
      'During the escape, use your rifle to target the lead pursuer\'s horse — shoot the horse, not the rider.',
      'See Rain Falls safely away from the pursuit and part ways with Charles.',
    ],
    goldTips: ['Kill a pursuer\'s horse (not the rider) during the escape for the gold medal; listen to all of Rain Falls\' dialogue — it provides crucial context for his arc.'],
  },

  c6_15: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Mrs. Sadie Adler, Widow I',
    steps: [
      'Meet Sadie near Annesburg to plan the assault on the final O\'Driscoll stronghold.',
      'Scout the O\'Driscoll camp from the ridge with Eagle Eye; locate the barn with the sniper.',
      'Headshot the barn sniper the instant combat begins — he will cause serious damage if left alive.',
      'Charge the camp with Sadie while the sniper is down; clear the outer perimeter.',
      'Push through the barn with Sadie and eliminate the remaining O\'Driscolls inside.',
      'Pursue and deal with any escapees on horseback before they regroup.',
    ],
    goldTips: ['The barn sniper is the top priority — headshot him within seconds of combat starting; he\'s on the barn roof; once he\'s down the rest is manageable.'],
  },

  c6_16: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Mrs. Sadie Adler, Widow II',
    steps: [
      'Follow Sadie to the main O\'Driscoll barn compound where she has been captured.',
      'Approach from cover and use Eagle Eye to map all visible guard positions before engaging.',
      'Enter through the side window or secondary door — the main door is expected.',
      'Fight through the barn interior methodically; Dead Eye on every room entry.',
      'Reach Sadie and cover her as she recovers and arms herself.',
      'Extract together through the barn exit with Sadie providing rearguard.',
    ],
    goldTips: ['Secure the barn without taking any damage for the gold medal; use Dead Eye and fire through windows before entering each room.'],
  },

  c6_17: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'A Rage Unleashed',
    steps: [
      'Meet Eagle Flies and his warriors at the staging point above the oil fields.',
      'Ride hard with the Wapiti warriors toward the Army\'s oil supply installation.',
      'When the battle begins, focus on protecting Eagle Flies — he is the priority, not the soldier count.',
      'Suppress Army defenders around the target oil wagon while Eagle Flies deals with the objective.',
      'Once the wagon is handled, provide covering retreat fire and escape with Eagle Flies.',
    ],
    goldTips: ['Keep Eagle Flies alive at all costs; focus on the mission objective rather than kills; there is a loose time element here.'],
  },

  c6_18: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Goodbye, Dear Friend',
    steps: [
      'Ride with Dutch and Sadie to the Saint Denis gallows for Colm O\'Driscoll\'s public execution.',
      'Immediately take a rooftop position with a clear sightline to the gallows and surrounding crowd.',
      'When the execution sequence begins, you have 45 seconds — scan the crowd and rooftops for Colm\'s hidden backup shooter.',
      'Locate the backup (they will be at crowd level or an opposite rooftop) and eliminate them with the scoped rifle.',
      'Ensure Colm\'s execution completes successfully with no interference.',
      'Escape Saint Denis with Sadie before Pinkertons identify you in the crowd.',
    ],
    goldTips: ['You have exactly 45 seconds to find and eliminate Colm\'s backup; immediately equip the scoped rifle and scan rooftops first then crowd level; this is timed, so do not hesitate.'],
  },

  c6_19: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Favored Sons',
    steps: [
      'Follow Dutch and Eagle Flies deep into Cumberland Forest to prepare an Army ambush.',
      'Help lay wire trap obstacles across the main Army supply road through the trees.',
      'Take a firing position in the tree line and wait for the Army column to enter the kill zone.',
      'The instant the column halts, target and kill the cannon soldier within 45 seconds — the cannon will destroy everything if it fires.',
      'Fight off the Army reinforcements with Dutch and Eagle Flies from the tree line.',
    ],
    goldTips: ['The cannon soldier must be eliminated within 45 seconds of combat starting for the gold medal; use Dead Eye immediately when the column stops.'],
  },

  c6_20: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: "The King's Son",
    steps: [
      'Meet Charles at the Fort Wallace perimeter and review the entry plan — there is a blind spot in the northwest wall.',
      'Infiltrate the fort through Charles\'s identified entry point using stealth.',
      'Use Eagle Eye inside the fort to locate Eagle Flies in the detention wing; the guards rotate frequently.',
      'Free Eagle Flies, recover a weapon from a nearby guard for him.',
      'Fight through the garrison toward the river gate on the fort\'s east side.',
      'Launch canoes and paddle hard down the river with soldiers firing from both banks.',
      'Navigate the canoe through the rapids to the extraction point.',
    ],
    goldTips: ['Headshot every soldier on the escape path for the gold medal; use the canoe as moving cover rather than paddling into the open; Charles will flank and draw fire.'],
  },

  c6_21: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Bridge to Nowhere',
    steps: [
      'Meet the crew at Donner Falls and study the bridge structure — there are four charge points.',
      'Plant dynamite charges at each of the four marked detonation points on the bridge structure.',
      'Fight off Army soldiers who respond to the activity; protect all four charges from being disarmed.',
      'Ensure all four charges are planted before triggering any detonator.',
      'Trigger the charges and run — get clear of the bridge collapse zone immediately.',
    ],
    goldTips: ['Plant ALL charges before triggering the detonation; if a soldier reaches an unplanted charge point it can be disarmed; clear soldiers before planting rather than planting under fire.'],
  },

  c6_22: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'My Last Boy',
    steps: [
      'Ride to the Heartland Oil Fields with Dutch after Eagle Flies\' decision at the Reservation.',
      'The battle begins immediately — take cover and identify Eagle Flies\' position among the chaos.',
      'Locate Paytah (Eagle Flies\' companion) and save him first — he dies within the first minute if ignored.',
      'Fight through Army positions to reach Eagle Flies and provide cover fire.',
      'Support Eagle Flies through the most emotionally devastating sequence in the entire game.',
      'Carry Eagle Flies from the battlefield as the fight comes to its conclusion.',
    ],
    goldTips: ['Save Paytah within the first minute of combat starting or he dies; this is story-critical; once the action ends, let the cutscene breathe — do not skip it.'],
  },

  c6_23: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Our Best Selves',
    steps: [
      'Join Dutch for the military payroll train robbery near Annesburg. Something feels deeply wrong from the start.',
      'Board the moving train and fight through to the payroll car; the soldiers here are well-armed.',
      'Deal with the military guards protecting the strongbox in the armored car.',
      'Pay attention to Dutch\'s decisions during the robbery — his choices reveal who he has become.',
      'Escape the train with the payroll as law enforcement converges.',
      'The mission concludes with a revelation that changes everything. Watch every moment.',
    ],
    goldTips: ['Stay close to Dutch throughout — his behavior during this robbery is the culmination of his arc. The final scene foreshadows the last chapter completely.'],
  },

  c6_24: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Red Dead Redemption',
    steps: [
      'Return to Beaver Hollow after the robbery. The camp is in chaos. Confront Micah before leaving.',
      'Choose: help John escape first (high honor path) or go back for the money (low honor path). Both work.',
      'Help John reach his horse and provide covering fire through waves of attacking Pinkertons.',
      'Fight through Beaver Hollow toward the mountain path — Arthur\'s illness makes each fight harder.',
      'Make the long climb up the mountain at sunrise. Let it take the time it takes.',
      'Reach the summit. Face what comes. The ending depends on your honor level.',
    ],
    goldTips: ['High honor: Arthur watches the sunrise in peace. Low honor: a darker ending. If you want the high honor ending and honor is low, replay from a checkpoint. Take every step of the final climb slowly — this is the end of Arthur Morgan\'s story.'],
    honorNote: 'High honor earns a peaceful sunrise ending. Low honor earns a darker conclusion.',
  },

  c6_sq1: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Veteran IV',
    isSideQuest: true,
    steps: [
      'Return to Hamish Sinclair at Cattail Pond after completing The Veteran III — his camp is quieter than before.',
      'Approach the camp and notice that Hamish\'s fire is barely lit and his gear is scattered — he is not well.',
      'Hamish admits he has taken ill and cannot manage the physical work of his camp anymore.',
      'Help Hamish chop firewood by the tree line — his axe is worn but still sharp; stack the split wood by his tent.',
      'Carry two buckets of water from the pond to refill his canteens and cooking pot; the path is muddy and slippery.',
      'Mend his fishing rod and patch a tear in his tent canvas using the needle and thread in his supply crate.',
      'Sit with Hamish by the fire as evening falls and listen to his stories about the Civil War, his injury, and the men he lost.',
      'Before leaving, promise to return; Hamish smiles faintly and says you are one of the few people who has ever kept a promise to him.',
    ],
    goldTips: ['Complete every physical task Hamish asks for — skipping any reduces the emotional weight of Part V; the tent repair requires holding the action button at three tear points; Hamish\'s dialogue has additional lines if you sit with him for more than two minutes.'],
    missables: ['Must complete before Red Dead Redemption (the final mission) — Hamish\'s chain expires with Arthur; Arthur\'s journal contains a unique sketch of Hamish\'s camp only after this mission; Hamish mentions a "big boar" in the forest that becomes critically important in Part V.'],
  },

  c6_sq2: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Veteran V',
    isSideQuest: true,
    steps: [
      'Return to Cattail Pond one final time to find Hamish in desperate trouble.',
      'A massive boar has gored Hamish badly — he is losing blood fast.',
      'Hunt down and kill the boar before returning to Hamish.',
      'Return to find Hamish. His wound is fatal.',
      'Sit with Hamish in his final moments. Let him finish everything he wants to say.',
      'Hamish leaves Arthur his prized war horse — a unique silver dapple pinto that cannot be obtained any other way.',
    ],
    goldTips: ['One of the most emotionally powerful encounters in the game; kill the boar quickly with a rifle headshot so you can return to Hamish before he loses consciousness; his final words to Arthur land differently depending on how far Arthur\'s TB has progressed. Do not skip the farewell.'],
    missables: ['Complete before the final mission — Hamish and his unique horse are permanently lost after Arthur\'s story ends.'],
    honorImpact: 'Staying with Hamish until the end earns honor.',
  },

  c6_sq3: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Do Not Seek Absolution I — Edith Downes',
    isSideQuest: true,
    steps: [
      'Find Edith Downes near Annesburg — she is the widow of Thomas Downes, one of Strauss\'s debt victims whose life Arthur helped destroy in Chapter 2.',
      'Edith is working in the Annesburg mining camps, performing backbreaking labor in dangerous conditions to support her son.',
      'Approach her carefully; she recognizes Arthur immediately and her reaction shifts between fear and exhaustion.',
      'Listen to Edith\'s account of what happened after the debt collection: her husband\'s death, the loss of their home, and her descent into the camps.',
      'Edith explains that she needs two things to escape the camps: a reference letter from a respectable person and someone to speak to the mine foreman on her behalf.',
      'Ride to the Annesburg post office and ask the clerk to write a character reference for Edith; the clerk agrees if your honor is high enough.',
      'Speak to the mine foreman at the camp office and negotiate Edith\'s release from her contract; use the reference letter to persuade him.',
      'Return to Edith with the news and watch as she packs her few belongings — her relief is quiet but profound.',
    ],
    goldTips: ['High honor is required to access this chain — low-honor Arthur cannot initiate the conversation; the encounter lands significantly harder if you personally collected from Thomas Downes in Chapter 2; the mine foreman responds better to dialogue than threats — violence fails the mission.'],
    honorNote: 'High honor required. Major honor gain for helping Edith escape the camps.',
    missables: ['Must complete before the final Chapter 6 mission; Edith\'s dialogue changes if Arthur has tuberculosis — she notices his cough and her reaction softens; the reference letter is a unique document in Arthur\'s satchel.'],
  },

  c6_sq4: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Do Not Seek Absolution II — Edith Downes',
    isSideQuest: true,
    steps: [
      'Return to Edith Downes at her new lodging in Annesburg after completing Part I.',
      'Edith has found honest work as a laundress but a former mine foreman is threatening her, demanding payment for "protecting" her from the camps.',
      'Locate the foreman at his usual spot near the Annesburg saloon and observe him for a moment before approaching.',
      'Choose your approach: peacefully persuade the foreman to leave Edith alone by appealing to his reputation, intimidate him with implied threats, or handle the matter directly with your fists.',
      'If persuading, mention the reference letter and the legitimate employers who now vouch for Edith — the foreman has no leverage.',
      'If intimidating, stand close and speak softly; the foreman backs down quickly when confronted by someone unafraid of him.',
      'Return to Edith and confirm the foreman will not bother her again; she thanks you with words that carry more weight than any payment.',
      'Edith\'s final words to Arthur about redemption and the possibility of doing right are among the most quietly powerful lines in the game.',
    ],
    goldTips: ['The peaceful persuasion approach earns the highest honor and triggers Edith\'s most powerful final dialogue; intimidation works but reduces the emotional impact of her farewell; violence against the foreman fails the mission and removes Edith from future encounters.'],
    honorImpact: 'Significant positive honor for completing this chain with compassion.',
    missables: ['Edith\'s final words have two full variants based on approach — high-honor persuasion unlocks the version about redemption; Arthur\'s journal contains a unique entry about Edith that is only written after Part II.'],
  },

  c6_sq5: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'American Dreams — Serial Killer',
    isSideQuest: true,
    steps: [
      'Find the first piece of a dismembered human body near a road in New Hanover — it will be marked by crows.',
      'Use Eagle Eye to locate the note attached to the body part. It contains a coded message.',
      'Find the second body part in West Elizabeth, near the railroad tracks. Another coded note.',
      'Find the third body part south of Annesburg. Decode all three notes together — they reveal a map location.',
      'Ride to the marked location (a remote shack near Roanoke Ridge) and enter carefully.',
      'Confront the serial killer, Edmund Lowry Jr., inside his shack. He is armed and dangerous.',
      'Eliminate Lowry and bring the evidence to the Rhodes sheriff.',
    ],
    goldTips: ['The body parts and notes must be found in any order — check all three before going to the shack; the coded notes reference landmarks visible from the bodies\' locations; one of the darkest and most unsettling quests in the game — do not do this one late at night.'],
    missables: ['Must complete all three note locations and the shack confrontation before end of Chapter 6.'],
  },

  c6_sq6: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Arcadia for Amateurs — Francis Sinclair (Stranger)',
    isSideQuest: true,
    steps: [
      'Find Francis Sinclair at his cabin in the Grizzlies East — he is a mysterious stranger who wants Arthur to find rock carvings.',
      'There are 10 rock carvings scattered across the entire map. Each one must be found and sketched.',
      'Use Eagle Eye near known rock faces and canyon walls — the carvings glow faintly.',
      'Rock carving locations span New Hanover, Ambarino, Lemoyne, West Elizabeth, and New Austin.',
      'Return to Sinclair after finding all 10. He is not home. Something is very strange about him.',
      'Visit the cabin one final time after a long absence — the conclusion reveals something deeply unsettling about Sinclair\'s nature.',
    ],
    goldTips: ['Rock carvings can be found across chapters 2-6; check high canyon walls and cliff faces near water; Eagle Eye reveals them from horseback; the final revelation about Sinclair is one of the game\'s most mysterious and discussed endings — do not spoil it for yourself.'],
    missables: ['Must complete all 10 carvings and revisit the cabin before end of Chapter 6 for the full conclusion.'],
  },

  c6_sq7: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Of Men and Angels III — Sister Calderón',
    isSideQuest: true,
    steps: [
      'Find Sister Calderón one final time in Saint Denis — she has received word about her next posting.',
      'Sit with her near the church and hear where she is going next and why.',
      'She speaks with Arthur about his illness and what she has seen of his character.',
      'She gives Arthur a gift — a small item she has carried for years. Accept it.',
      'Say goodbye to Sister Calderón. She will not return.',
    ],
    goldTips: ['One of the most quietly devastating conversations in the game; Sister Calderón\'s final words to Arthur about his worth as a person are the most direct answer the game gives to whether Arthur finds peace; do not skip or rush this farewell.'],
    missables: ['Must complete Parts I and II first. This final encounter is available in Chapter 6 only.'],
    honorImpact: 'High honor required for this final encounter.',
  },

  c6_sq8: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'The Noblest of Men — Final Confrontation with Theodore Levin',
    isSideQuest: true,
    steps: [
      'Return to Theodore Levin in the Valentine saloon after finding all four gunslingers.',
      'Levin has published his book and the final chapter needs one last interview with Arthur.',
      'Arthur reflects on what he saw in each gunslinger — the cost of living by the gun.',
      'Levin pays Arthur for his time and adds him to the book\'s acknowledgments.',
      'The quest concludes. Arthur\'s reward includes the unique off-hand revolver from the chain.',
    ],
    goldTips: ['If you missed any gunslinger (Flaco, Emmet, Billy Midnight, or Black Belle) their unique weapon is gone permanently; complete all four before returning to Levin; the unique off-hand revolver granted here cannot be obtained any other way.'],
    missables: ['All four gunslingers must be completed before this final Levin meeting. Their unique weapons are permanently missable.'],
  },

  // ═══════════════════════════════════════════
  //  EPILOGUE — PART 1
  // ═══════════════════════════════════════════

  ep1_1: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'The Wheel',
    steps: [
      'Arrive at Pronghorn Ranch in West Elizabeth as John Marston, using the alias "Jim Milton."',
      'Approach the ranch house and introduce yourself to Mr. Geddes, the ranch owner; he is hiring honest hands.',
      'Mr. Geddes assigns you to the bunkhouse and gives you a simple task list for the first day.',
      'Head to the stable and muck out the horse stalls — use the pitchfork near the barn door and pile the manure in the designated corner.',
      'Fill the water troughs from the hand pump behind the stable; each trough requires three full pumps to reach the line.',
      'Deliver the evening hay to the paddock horses and return the empty cart to the barn.',
      'Wash up at the bunkhouse pump and join the ranch hands for supper at the long table outside.',
      'During supper, deflect any personal questions with vague answers — "Jim Milton" has a carefully constructed backstory.',
    ],
    goldTips: ['Explore the entire Pronghorn Ranch area before starting the mission — the West Elizabeth landscape has unique collectibles; the quietness of this mission is intentional — absorb the contrast to Arthur\'s story; muck every stall completely before moving to water troughs.'],
    honorNote: 'Honor gain for honest, thorough work.',
    missables: ['Mr. Geddes has unique dialogue if you arrive on horseback versus on foot; the bunkhouse contains a cigarette card on the nightstand that is missable.'],
  },

  ep1_2: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Simple Pleasures',
    steps: [
      'Wake at dawn in the Pronghorn Ranch bunkhouse and report to the foreman for the day\'s assignments.',
      'Feed the horses in the stable — measure the correct portions of oats and hay for each animal.',
      'Mend the split-rail fence along the northern pasture; collect replacement rails from the woodpile near the barn.',
      'Ride the perimeter patrol route on the ranch\'s western edge, checking for predator signs or loose cattle.',
      'Return to the main house for supper and sit with the ranch hands; listen to their stories without drawing suspicion.',
      'Turn in for the night and reflect on the contrast between this quiet routine and the life John left behind.',
    ],
    goldTips: ['Complete every chore task marker before moving on — skipping any reduces the completion rating; mending fences requires holding the action button at each break point; feed every horse in the stable, not just the marked ones.'],
    honorNote: 'Small honor gain for completing honest labor without complaint.',
  },

  ep1_3: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Farming, For Beginners',
    steps: [
      'Report to the field supervisor and receive your crop assignment for the day.',
      'Plow the unplanted rows along the eastern field using the ranch horse and plow rig.',
      'Plant seed potatoes in the prepared trenches — the foreman demonstrates the correct depth and spacing.',
      'Water the newly planted rows using the irrigation channels; clear any debris blocking the flow.',
      'Help the other hands haul fertilizer sacks from the barn to the field edge for the next planting cycle.',
      'Return to the bunkhouse as evening falls, exhausted but content — John is learning this life.',
    ],
    goldTips: ['Follow the foreman\'s instructions exactly — deviating from his demonstrated technique lowers the rating; plow every marked row completely before moving to planting; clear all three irrigation blockages for full credit.'],
    honorNote: 'Honor gain for diligent, honest work.',
  },

  ep1_4: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Fatherhood, For Beginners',
    steps: [
      'Abigail asks John to watch Jack while she helps with a difficult birth in the ranch\'s livestock pen.',
      'Take Jack to the Pronghorn Ranch stable and let him pet the gentle draft horses — the interaction builds their bond.',
      'Walk with Jack to the ranch\'s small garden plot and teach him how to identify edible herbs versus weeds.',
      'When Jack asks about Arthur — he has heard stories from the other ranch hands — choose honest but age-appropriate answers.',
      'Play a simple game of catch with Jack near the bunkhouse using a worn leather ball; the mini-game is forgiving.',
      'Prepare lunch together at the outdoor fire pit; the cooking is basic but Jack watches every move John makes.',
      'As the sun sets, carry a tired Jack back to the cabin and hand him to Abigail — the day ends quietly.',
    ],
    goldTips: ['Every conversation option with Jack is worth hearing — his questions reveal what he has absorbed from camp life and what he still does not understand; the Arthur question is a pivotal parenting moment — honesty builds trust; the herb identification game is a hidden mechanic that improves Jack\'s survival skill for a later mission.'],
    honorNote: 'Honor gain for patient, honest parenting.',
    missables: ['Jack\'s question about Arthur only appears if you have completed certain Chapter 6 missions — it is a continuity check; the herb identification game improves Jack\'s skill for a later mission and is missable if skipped.'],
  },

  ep1_5: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Old Habits',
    steps: [
      'Continue your ranch work when dust rises on the western trail — a group of armed riders approaches the property.',
      'The lead rider calls out for "Jim Milton" and reveals that the past has finally caught up with John\'s alias.',
      'Immediately run to the barn and warn the two ranch hands inside; if alerted, they will fight alongside you.',
      'Take position in the barn loft — the elevated angle covers the entire yard and gives a clear shot at the riders.',
      'The first wave charges the main yard; use the loft window to pick off the riders before they reach the buildings.',
      'The second wave dismounts and uses the fence lines for cover; flank them through the stable\'s rear door.',
      'A third wave attempts to set fire to the hay barn — eliminate the torch-bearer immediately to prevent property damage.',
      'Confirm all attackers are down and speak to the ranch foreman; he asks no questions but his look says everything.',
    ],
    goldTips: ['Alert both ranch hands in the barn before engaging — they provide crucial suppressing fire; the barn loft is the best defensive position in the entire mission; shoot the torch-bearer in the third wave first — a single fire arrow can destroy the hay barn and fail the mission objective.'],
    honorNote: 'Neutral — self-defense is justified.',
    missables: ['If the hay barn burns, the mission completes but a unique ranch hand dialogue line is lost; the lead rider has a letter on his body revealing who sent them — loot it before the mission ends.'],
  },

  ep1_6: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Fatherhood, For Idiots',
    steps: [
      'John decides to teach Jack horseback riding basics using a gentle pony from the Pronghorn Ranch stable.',
      'The initial lesson goes well — Jack mounts the pony and holds the reins correctly under John\'s guidance.',
      'A snake spooks the pony and it bolts, throwing Jack into a bush and galloping off toward the northern pasture.',
      'Chase the pony on horseback and lasso it before it reaches the creek — the water makes recovery much harder.',
      'Return to Jack, who is unhurt but shaken; calm him down with reassuring dialogue options.',
      'Jack asks to try again immediately — this is a key choice: encourage him or suggest resting first.',
      'If encouraging, the second attempt succeeds and Jack rides the pony in a small circle near the stable; Abigail watches from the cabin window.',
      'Return to the ranch with both Jack and the pony safe, having learned that fatherhood involves both chaos and persistence.',
    ],
    goldTips: ['Lasso the pony quickly — every second it runs makes the recovery harder; encourage Jack to try again for the best ending variant and a small honor bonus; Abigail\'s reaction from the cabin window changes based on whether Jack was hurt or encouraged.'],
    honorNote: 'Honor gain for encouraging Jack and keeping him safe.',
    missables: ['Abigail has unique dialogue about the riding lesson only if you encouraged Jack to try again; the pony becomes Jack\'s named horse in later missions if the second attempt succeeds.'],
  },

  ep1_7: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Jim Milton Rides, Again?',
    steps: [
      'Meet Sadie Adler near Cholla Springs in New Austin — she has a bounty target tracked to this area.',
      'Track the fugitive using Eagle Eye across the New Austin desert terrain.',
      'Close the distance carefully; the fugitive is well-armed and desperate.',
      'Subdue with a lasso for a live capture (better payment) or eliminate if preferred.',
      'Deliver the fugitive to the agreed point with Sadie and collect your share.',
    ],
    goldTips: ['Lasso and hogtie for a live capture bonus; New Austin is now fully accessible — use this mission as a launchpad to explore and complete all side content in the region.'],
  },

  ep1_8: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Motherhood',
    steps: [
      'Begin the morning as Abigail at the Pronghorn Ranch cabin — Jack is asleep and the day\'s work awaits.',
      'Prepare breakfast for Jack using the cabin\'s limited supplies; the cooking mini-game determines the quality.',
      'Walk Jack to the ranch schoolhouse and speak with the teacher about his progress and behavior.',
      'While Jack is at school, help the ranch women with the communal laundry by the creek — scrub, rinse, and hang the clothes.',
      'Collect Jack from the schoolhouse at midday and find a quiet spot to help him with his reading lesson.',
      'Return to the cabin as evening approaches and listen to Jack\'s questions about when "Papa Jim" will be home.',
      'Tuck Jack into bed and sit by the window, watching the sunset over West Elizabeth — the silence speaks volumes.',
    ],
    goldTips: ['Cook the breakfast perfectly for a small honor bonus; speak to every marked NPC at the schoolhouse and creek for full dialogue; the reading lesson with Jack has unique dialogue options — explore them all.'],
    honorNote: 'Honor gain for Abigail\'s patience and care.',
    missables: ['The teacher at the schoolhouse has unique dialogue only available during this mission; Jack\'s reading lesson contains a hidden book location clue.'],
  },

  ep1_9: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Gainful Employment',
    steps: [
      'Ride to Armadillo in New Austin and look for the employment board outside the general store.',
      'Study the available contracts: herd escort, stagecoach guard, and desert surveyor positions are all posted.',
      'Speak to the work-giver inside the general store and accept the stagecoach guard contract — it pays the most and is the safest option.',
      'Meet the stagecoach at the designated departure point on the eastern edge of town.',
      'Ride alongside the stagecoach for the full route, watching for bandit ambush points at the two canyon passes.',
      'When bandits attack at the second pass, dismount and take cover behind the coach; protect the driver and passengers.',
      'Escort the stagecoach safely to the destination depot and collect your payment from the station master.',
      'Return to Pronghorn Ranch with the earnings — this mission permanently unlocks New Austin for free exploration.',
    ],
    goldTips: ['The stagecoach guard contract is the highest-paying and safest option — accept it over the alternatives; the two canyon ambush points are predictable — keep Dead Eye ready after the first pass; completing this mission unlocks New Austin\'s legendary animals and unique shops.'],
    honorNote: 'Honor gain for professional contract completion.',
    missables: ['New Austin\'s legendary animals only spawn after this mission is complete; the stagecoach driver has unique post-mission dialogue if all passengers survive.'],
  },

  ep1_10: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'The Landowning Classes',
    steps: [
      'Ride to the land office in Blackwater and inquire about available properties for purchase.',
      'The clerk presents several options; specifically ask about the Beecher\'s Hope parcel near Great Plains.',
      'Review the financial requirements: the down payment requires all the money earned from ranch work and the Sadie bounty mission.',
      'If short on funds, the clerk suggests completing more contracts before returning — this is a soft gate.',
      'Once funds are sufficient, ride to the Beecher\'s Hope property with the land agent and walk the full boundary.',
      'The agent marks the corners with wooden stakes; walk between each stake to claim the full parcel.',
      'Return to the Blackwater land office and sign the purchase documents; John now owns Beecher\'s Hope.',
      'The final cutscene shows John holding the deed — this is the first time he has ever owned anything.',
    ],
    goldTips: ['Complete all available ranch and bounty jobs before this mission for maximum funds; walking the full property boundary with the agent is worth doing slowly — it sets the scale for the construction missions; the deed is a unique inventory item visible in John\'s satchel afterward.'],
    honorNote: 'Honor gain for legitimate land purchase.',
    missables: ['The land agent has unique dialogue if you arrive with exactly the minimum funds versus extra savings; the property boundary walk contains a hidden ginseng plant that only appears during this mission.'],
  },

  ep1_11: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: "Home of the Gentry?",
    steps: [
      'Ride to Beecher\'s Hope with Abigail and Jack for the first time as a family.',
      'Walk the property together: start at the northern ridge and look south over the Great Plains.',
      'Jack runs ahead to the creek bed and discovers a small fishing spot — this becomes a recurring location later.',
      'Abigail comments on where the house could sit and where a garden might grow; listen to all her suggestions.',
      'Set up the initial camp near the central flat area: pitch the tent, start a fire, and unpack the basic supplies.',
      'As evening falls, sit with Abigail by the fire and discuss the future; she asks what kind of home John wants to build.',
      'The final cutscene shows John lying awake in the tent, looking up at the stars, holding the deed close to his chest.',
    ],
    goldTips: ['Walk every corner of the property with Abigail and Jack — each family member has unique dialogue at different spots; the fishing spot Jack finds is marked on your map and usable later; this transitions directly into Epilogue 2 and the building missions — the contrast between this empty land and what it becomes is the whole point.'],
    honorNote: 'Honor gain for building a family home.',
    missables: ['Abigail\'s dialogue changes if you previously completed the "Fatherhood, For Beginners" mission — she references Jack\'s growth; the deed-holding animation in the final cutscene is unique to this mission.'],
  },

  // ═══════════════════════════════════════════
  //  EPILOGUE — PART 2
  // ═══════════════════════════════════════════

  ep2_1: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Bare Knuckle Friendships',
    steps: [
      'Ride to Blackwater and head to the Smithfield Saloon, where John\'s old construction contact is drinking at the bar.',
      'Speak with the contact and learn that he has sobered up since the gang days and now runs a legitimate crew.',
      'A local troublemaker overhears the conversation and challenges John to a bare-knuckle fight in the alley.',
      'Accept the fight and use the alley\'s limited space to your advantage — dodge backward and counter with hooks.',
      'Win the fight and the crowd disperses; your contact is impressed and agrees to bring his crew to Beecher\'s Hope.',
      'Visit the boarding house to find the second contact, an old carpenter who has retired but agrees to consult on the build.',
      'Return to Beecher\'s Hope with both contacts committed — the construction phase can now begin in earnest.',
    ],
    goldTips: ['The bare-knuckle fight uses a unique melee system — hold block and counter after the opponent\'s swing misses; winning the fight without being knocked down earns extra respect dialogue from the contact; explore Blackwater fully — it is completely safe now and old story contacts yield unique dialogue.'],
    honorNote: 'Honor gain for winning the fight fairly without weapons.',
    missables: ['The troublemaker has unique dialogue if you previously met him in Chapter 3; the carpenter at the boarding house only appears during this mission window.'],
  },

  ep2_2: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: "An Honest Day's Labors",
    steps: [
      'Ride into Blackwater and visit the employment board near the train station to find available contracts.',
      'Accept the cattle-drive contract from Mr. Geddes — it pays the highest rate and unlocks future work.',
      'Meet the herd at the designated pasture west of town and familiarize yourself with the route map.',
      'Drive the cattle along the marked trail, keeping strays in line with verbal commands and gentle herding.',
      'Defend the herd from a small wolf pack that attacks near the river crossing — use the cattle prod or quick shots.',
      'Deliver the full herd count to the buyer at the destination corral; missing cattle reduce your pay.',
      'Collect payment from Mr. Geddes at the Blackwater office and ride back to Beecher\'s Hope with the earnings.',
    ],
    goldTips: ['Accept only the Geddes contract — the other boards pay significantly less; keep the herd tight during the river crossing — this is where most strays occur; complete without losing a single head for maximum payment.'],
    honorNote: 'Honor gain for honest contract completion.',
    missables: ['Mr. Geddes remembers honest workers — completing this contract cleanly unlocks a higher-paying follow-up later.'],
  },

  ep2_3: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Home Improvement for Beginners',
    steps: [
      'John, Uncle, and a small crew of hired laborers gather at the Beecher\'s Hope construction site at dawn.',
      'The first task is laying the foundation posts — dig the marked holes to the correct depth and set the wooden pylons.',
      'Mix and pour the foundation concrete in the wheelbarrow, then fill each post hole and level the surface.',
      'Move to the framing stage: raise the wall studs in sequence, starting with the back wall and working around clockwise.',
      'Hammer each stud into place and secure it with cross-bracing; the crew helps with the heavier beams.',
      'Raise the roof trusses using a rope-and-pulley rig — John and Uncle operate the ropes while the crew guides the beams.',
      'Install the window frames and door jambs as the walls take shape; the house begins to look like a real structure.',
      'Stand back with John and Uncle as the sun sets on the first day of construction — the framing is complete and the house is recognizable.',
    ],
    goldTips: ['Complete every construction task in order — skipping stages breaks the mission; the rope-and-pulley roof stage is a unique mini-game — pull steadily, not in bursts; the sunset moment at the end is one of the most earned and joyful scenes in the game — do not skip it.'],
    honorNote: 'Neutral — honest construction work.',
    missables: ['Uncle tells a unique joke during the framing stage that only triggers if you let him finish every dialogue line; the house construction progress is permanent and visible in all future Beecher\'s Hope visits.'],
  },

  ep2_4: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'The Tool Box',
    steps: [
      'Speak with Uncle at Beecher\'s Hope to get the full list of construction supplies needed for the house build.',
      'Review the supply list: lumber framing, roofing shingles, nails (three sizes), window glass panes, door hinges, and a proper saw.',
      'Ride to Blackwater and visit the lumber yard first — negotiate the lumber bundle price or pay full rate.',
      'Stop at the general store for nails, hinges, and the hand saw; the shopkeeper offers a discount if you helped him earlier.',
      'Visit the glass supplier on the Blackwater outskirts for the window panes — handle them carefully, they are fragile cargo.',
      'Load everything onto the wagon carefully; stack heavier items at the bottom and secure the load with rope.',
      'Drive the wagon steadily back to Beecher\'s Hope — sharp turns or fast bumps can crack the glass panes.',
      'Unload all materials at the construction site and verify the delivery with Uncle before the mission ends.',
    ],
    goldTips: ['Negotiate at the lumber yard by choosing the dialogue option about bulk pricing; visit the general store in the same Blackwater trip to trigger the shopkeeper discount; drive the wagon slowly over rough terrain — broken glass means a return trip.'],
    honorNote: 'Neutral — this is a straightforward supply run.',
    missables: ['The shopkeeper discount is only available if you helped him in a previous encounter; the lumber yard negotiation only works if you have high honor.'],
  },

  ep2_5: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A New Jerusalem',
    steps: [
      'Return to Beecher\'s Hope to find the construction crew has completed the framing and is starting the roof.',
      'Help the crew hoist the roof shingles using the pulley system; the bundles are heavy and require two people.',
      'Work alongside the lead carpenter to install the window frames in the front wall — each frame must be level and square.',
      'Assist with hanging the front door; the hinges must be aligned perfectly or the door will not close cleanly.',
      'Install the interior wall studs that divide the main room from the bedroom area; measure twice before securing each stud.',
      'Mix and apply the exterior mud plaster to the walls; smooth it evenly with the wooden trowel for a clean finish.',
      'Stand back with Uncle and the crew as the house is revealed — it now looks like a real home, not just a frame.',
    ],
    goldTips: ['Complete every construction task in order — the door installation is a mini-game where alignment matters; the mud plaster stage is visually satisfying — smooth it completely for the best-looking house; the moment the house becomes recognizable as a home is one of the epilogue\'s best beats.'],
    honorNote: 'Neutral — honest construction work.',
    missables: ['Uncle makes a unique joke about "Jerusalem" during the plaster stage that only triggers if you let him finish every line; the house\'s final appearance is determined by how well you perform the construction mini-games.'],
  },

  ep2_6: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: "Uncle's Bad Day",
    steps: [
      'Return to Beecher\'s Hope to discover Uncle has gotten himself into serious trouble with a local loan shark.',
      'The loan shark and his enforcers have arrived at the ranch demanding payment; they are armed and aggressive.',
      'Uncle admits he borrowed money to "invest" in a failed venture and cannot repay it; the debt is now due in full.',
      'Negotiate with the loan shark: offer to pay the debt yourself (honor-positive but expensive) or intimidate the enforcers into leaving (faster but slight honor loss).',
      'If negotiation fails, the enforcers draw weapons and a firefight erupts around the ranch buildings.',
      'Use the barn, house frame, and fence line for cover; the open yard is a death trap during the firefight.',
      'Eliminate or drive off the enforcers, then check on Uncle — he is unharmed but deeply embarrassed.',
      'This mission transitions directly into The Bullet at Work with no break — keep weapons loaded and health full throughout.',
    ],
    goldTips: ['Paying the debt yourself is expensive but earns significant honor and prevents the firefight; if fighting, use the barn loft for an elevated position against the ground-level enforcers; Uncle\'s embarrassed apology afterward is worth hearing in full.'],
    missables: ['Uncle\'s full explanation of the "investment" is unique dialogue only available if you let him speak before interrupting; the loan shark has different dialogue if you pay versus intimidate.'],
    honorImpact: 'Honor gain if debt is paid honorably; slight loss if intimidation is used.',
  },

  ep2_7: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A Quick Favor for an Old Friend',
    steps: [
      'Sadie Adler contacts John at Beecher\'s Hope — she has one last bounty before she rides south for good and wants John\'s help.',
      'Ride with Sadie to Tumbleweed in New Austin, a crumbling ghost town near the Mexican border.',
      'Investigate the town for clues about the target\'s location; Sadie\'s tracking instincts lead you to a hidden campsite outside town.',
      'Sneak toward the campsite using the rocky desert terrain for cover; the target is a notorious outlaw with a small gang.',
      'When the gang spots you, Sadie flanks from the left while you engage from the front — coordinate your attack.',
      'Take down the target\'s guards first, then corner the bounty target in the ruins of an old church.',
      'Decide the target\'s fate: hogtie for a live capture (higher pay, honor-positive) or eliminate if they resist.',
      'Ride back toward Blackwater with Sadie and stop at a ridge overlooking the desert for the farewell scene — do not rush it.',
    ],
    goldTips: ['Sadie\'s farewell scene is one of the most moving in the game — let every line play out; hogtie the target for maximum payment and honor; Sadie\'s dialogue on the ridge changes based on John\'s honor level and which story missions have been completed.'],
    honorNote: 'Honor gain for live capture; neutral for elimination.',
    missables: ['Sadie\'s unique ridge dialogue references specific story events only if you completed them; the Tumbleweed church ruins contain a hidden cigarette card that is missable.'],
  },

  ep2_8: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A Really Big Bastard',
    steps: [
      'The largest armed action sequence in Epilogue 2 begins at Beecher\'s Hope as a heavily armed gang rides onto the property.',
      'John is caught outside the house frame when the first wave arrives; sprint to the barn for immediate cover.',
      'Use the barn, house frame, and split-rail fence line for cover throughout — the open yard is a death trap.',
      'First wave: six riders approach from the eastern ridge. Use a rifle from the barn loft to pick them off before they reach the yard.',
      'Second wave: three men on foot approach from the creek bed with shotguns. Move to the house frame and use the corners for cover.',
      'Third wave: a wagon carrying reinforcements arrives from the road. Destroy the wagon with dynamite or concentrated rifle fire to prevent dismount.',
      'Final confrontation: the gang leader challenges John to a duel in the yard. Use Dead Eye to win the draw.',
      'Secure the property and check on Abigail and Jack inside the house frame — they are safe but shaken.',
    ],
    goldTips: ['Biggest action set piece of Epilogue 2; the barn loft provides the best elevated position for the first wave; save Dead Eye for the final duel — the gang leader draws faster than standard enemies; the ranch outbuildings provide excellent defensive positions throughout.'],
    honorNote: 'Honor gain for protecting family and property.',
    missables: ['Abigail has unique post-fight dialogue if you check on her immediately after the duel; the gang leader drops a unique revolver that is missable if you do not loot his body.'],
  },

  ep2_9: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Trying Again',
    steps: [
      'Find Abigail at the partially built Beecher\'s Hope house after the most recent construction work.',
      'Initiate the conversation about the future — John must choose between honest openness or his old defensive habits.',
      'When Abigail asks about his plans, select responses that acknowledge his past mistakes rather than deflecting.',
      'Listen to Abigail\'s concerns about raising Jack in a world that still remembers "John Marston."',
      'Address each of her specific fears directly: the law, old enemies, money, and the kind of man Jack will see.',
      'Walk with Abigail to the spot where the house porch will be built — this is where the commitment happens.',
      'Make the honest promise that the entire story has been building toward; the dialogue choice here is permanent.',
    ],
    goldTips: ['Select only the honest, vulnerable dialogue options throughout — deflecting or minimizing answers will result in an incomplete scene; there are no retries on this conversation; the final promise choice determines the tone of the ending sequence.'],
    honorNote: 'Major honor gain for complete honesty with Abigail.',
    missables: ['This conversation has a hidden "regret" dialogue branch if John has low honor — it is substantially darker and changes the ending tone; high-honor players get the optimistic version.'],
  },

  ep2_10: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'American Venom',
    steps: [
      'Receive the location of Micah Bell — Mount Hagen in the Grizzlies. Ride there. The journey is significant.',
      'Ascend the mountain with John through Micah\'s outer defenses; the fortress is heavily guarded.',
      'Fight through the defenders on the mountainside — use the rocky terrain for cover.',
      'Reach the summit compound and encounter unexpected company. This conversation is earned.',
      'The final showdown with Micah Bell. This is what the Epilogue has been building toward.',
      'Pull the trigger. Justice arrives at Mount Hagen.',
    ],
    goldTips: ['Take the long ride to Mount Hagen seriously — look at the landscape one final time; use every cover rock on the ascent; the final scene is the most earned moment in the game.'],
  },

  ep2_11: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A New Future Imagined',
    steps: [
      'Return to the fully built Beecher\'s Hope house and find Abigail in the kitchen preparing supper.',
      'She mentions that Jack has been asking about going to town for a photograph — this plants the seed for the evening.',
      'Suggest a ride to Valentine together; Abigail agrees and changes into her traveling clothes.',
      'Ride with Abigail to Valentine at a leisurely pace — take the scenic route along the Dakota River and stop at the overlook.',
      'In Valentine, visit the photographer\'s studio and have a family portrait taken; the photo appears in your inventory afterward.',
      'Walk to the Valentine saloon and share a quiet drink at the corner table; Abigail reflects on how much has changed.',
      'Ride back to Beecher\'s Hope under the stars; Abigail rests her head on John\'s shoulder during the ride.',
      'Arrive home to find Jack asleep by the fire; tuck him in and sit with Abigail on the porch as the Marston family\'s future finally begins.',
    ],
    goldTips: ['The perfect ending; take every conversation at the slowest possible pace; the family portrait is a unique inventory item visible in John\'s satchel; the ride back at night with Abigail resting against John is one of the most earned moments in gaming — it earns every second of its quiet happiness.'],
    honorNote: 'Major honor gain for building a peaceful family life.',
    missables: ['The family portrait is a unique item that only appears if you visit the photographer; Jack has unique pre-sleep dialogue if you talk to him before tucking him in; the porch conversation with Abigail has a hidden branch if John has high honor.'],
  },
};

export const WALKTHROUGH_CHAPTERS = [
  { key: 'ch1', label: 'Chapter 1', subtitle: 'Colter' },
  { key: 'ch2', label: 'Chapter 2', subtitle: 'Horseshoe Overlook' },
  { key: 'ch3', label: 'Chapter 3', subtitle: 'Clemens Point' },
  { key: 'ch4', label: 'Chapter 4', subtitle: 'Saint Denis' },
  { key: 'ch5', label: 'Chapter 5', subtitle: 'Guarma' },
  { key: 'ch6', label: 'Chapter 6', subtitle: 'The Final Act' },
  { key: 'ep1', label: 'Epilogue I', subtitle: 'Starting Over' },
  { key: 'ep2', label: 'Epilogue II', subtitle: 'American Venom' },
];

export function getWalkthroughsByChapter(chapterKey: string): Array<{ id: string; wt: MissionWalkthrough }> {
  return Object.entries(walkthroughData)
    .filter(([, wt]) => wt.chapterKey === chapterKey)
    .map(([id, wt]) => ({ id, wt }));
}
