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
  //  CHAPTER 4
  // ═══════════════════════════════════════════

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
      'Travel to Annesburg in northeastern New Hanover and find Edith Downes -- Thomas Downes\'s widow.',
      'She is working in the Annesburg brothel, forced into prostitution to survive after her husband\'s death.',
      'Speak with Edith -- she is hostile and blames Arthur for her husband\'s fate.',
      'Give her money to help cover her and her son Archie\'s debts. This begins the redemption arc.',
    ],
    goldTips: ['This quest is only available if you previously collected the Downes debt in Chapter 2. It is one of the most emotionally significant stranger missions in the game.'],
    missables: ['Must visit Edith before the end of Chapter 6.'],
    honorImpact: 'High honor gain -- a key redemption moment for Arthur.',
  },

  c4_sq3: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Do Not Seek Absolution II',
    isSideQuest: true,
    steps: [
      'Return to Annesburg after completing Part I to check on Edith and Archie Downes.',
      'Find that Edith has used the money to get out of the brothel -- she and Archie are preparing to leave.',
      'Speak with Edith one final time. She acknowledges Arthur\'s help despite everything.',
      'Watch Edith and Archie board a train and leave Annesburg for a new life.',
    ],
    goldTips: ['This conclusion is only unlocked if you gave Edith money in Part I. One of the most moving moments in the game.'],
    honorImpact: 'Significant honor gain. Arthur\'s illness makes this especially poignant.',
  },

  c4_sq4: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'A Bright Bouncing Boy I',
    isSideQuest: true,
    steps: [
      'Find inventor Marko Dragic at his demonstration tent near the Saint Denis fairground.',
      'Watch his remote-controlled boat demonstration -- help him prove it works by guiding decoys.',
      'After the demonstration, Dragic invites you to his lab near Doverhill for the next phase.',
      'Travel to his laboratory workshop northeast of Saint Denis near Doverhill.',
    ],
    goldTips: ['The boat demonstration requires moving decoy boats to distract the military observers -- follow Dragic\'s instructions precisely.'],
    missables: ['Must complete before end of Chapter 6.'],
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
      'Find the mayor\'s assistant, Lemieux, in Saint Denis -- he approaches Arthur about helping a political campaign.',
      'Help Lemieux deal with rival political supporters by intimidating or confronting them.',
      'Complete the task and return to Lemieux for payment.',
    ],
    goldTips: ['This is a 3-part stranger chain. Complete all 3 for the full reward.'],
    honorImpact: 'Slight honor loss for intimidation tactics.',
  },

  c4_sq7: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Idealism and Pragmatism for Beginners II',
    isSideQuest: true,
    steps: [
      'Return to Lemieux in Saint Denis for the second political errand.',
      'Deal with a more aggressive group of political rivals -- this time violence may be unavoidable.',
      'Complete the confrontation and report back to Lemieux.',
    ],
    honorImpact: 'Slight honor loss.',
  },

  c4_sq8: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Idealism and Pragmatism for Beginners III',
    isSideQuest: true,
    steps: [
      'Return to Lemieux for the final job in the chain.',
      'The final task involves eliminating a key rival permanently -- a morally darker errand.',
      'Complete the task for a final cash payment from Lemieux.',
    ],
    goldTips: ['The payout across all 3 parts is significant. The jobs escalate from intimidation to assassination.'],
    honorImpact: 'Honor loss for completing the final task.',
  },

  c4_sq9: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Mercies of Knowledge',
    isSideQuest: true,
    steps: [
      'Find Dr. Joseph Hadley in the wilderness -- he is a traveling scientist studying "human resilience."',
      'Speak with him and agree to let him conduct a harmless experiment on Arthur.',
      'Follow Dr. Hadley\'s experiment -- it involves a mild electric shock device.',
      'React to the experiment and collect payment from the amused but honest doctor.',
    ],
    goldTips: ['A short and humorous stranger quest. Easy money and a memorable interaction. Dr. Hadley can be found at multiple locations in New Hanover.'],
    honorImpact: 'Neutral.',
  },

  c4_sq10: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Iniquities of History I',
    isSideQuest: true,
    steps: [
      'Find the historical society researcher near Flatneck Station or in the Saint Denis area.',
      'He wants help locating a specific historical artifact or site -- follow his directions.',
      'Help him find or authenticate the artifact and receive payment.',
    ],
    goldTips: ['A 2-part chain. The second part unlocks after returning a day or two later.'],
    honorImpact: 'Neutral.',
  },

  c4_sq11: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Iniquities of History II',
    isSideQuest: true,
    steps: [
      'Return to the historical society researcher after completing Part I.',
      'He has discovered his first artifact was a fake -- he needs help tracking down the forger.',
      'Confront the forger and resolve the situation -- through intimidation or peaceful means.',
      'Return to the researcher for the final payment.',
    ],
    honorImpact: 'Positive if resolved peacefully, slight loss if violent.',
  },

  c4_sq12: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'The Veteran I',
    isSideQuest: true,
    steps: [
      'Find Hamish Sinclair, a one-legged Civil War veteran, fishing at Ambarino near Cattail Pond.',
      'Speak with him -- he is friendly and invites Arthur to fish with him.',
      'Fish with Hamish at the pond. He tells stories of the war and his life after it.',
      'This begins a multi-chapter friendship with Hamish that spans the rest of the game.',
    ],
    goldTips: ['Hamish Sinclair\'s quest chain is one of the most beloved in the game -- spanning 5 meetings across multiple chapters. Do not skip it.'],
    missables: ['Must meet Hamish before Chapter 6 ends to complete the full chain.'],
    honorImpact: 'Positive honor for spending time with Hamish.',
  },

  c4_sq13: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Duchesses and Other Animals',
    isSideQuest: true,
    steps: [
      'Find Miss Hobbs\'s advertisement posted in Saint Denis or Valentine -- she is collecting rare animal parts.',
      'Visit Miss Hobbs at her home in Saint Denis -- she commissions you to hunt specific rare birds and animals.',
      'Hunt the requested animals: the Roseate Spoonbill, the Snowy Egret, and the Little Heron.',
      'Return the carcasses or feathers to Miss Hobbs for payment after each hunt.',
      'Repeat visits unlock new hunting targets including the Warbler and Woodpecker species.',
    ],
    goldTips: ['Miss Hobbs pays very well for rare bird parts. The Snowy Egret is found in the Flat Iron Lake bayou area. Use a Varmint Rifle with Small Game Arrows for clean kills.'],
    missables: ['Must complete before Chapter 6 ends. Miss Hobbs leaves Saint Denis permanently after the story progresses.'],
    honorImpact: 'Neutral -- hunting quest chain.',
  },

  c4_sq14: {
    chapter: 'Chapter 4', chapterKey: 'ch4',
    title: 'Of Men and Angels I',
    isSideQuest: true,
    steps: [
      'Find the nun Sister Calderón near the Saint Denis train station -- she is ministering to the sick and poor.',
      'Speak with her -- she asks for a donation to fund her medical mission among the poor of Saint Denis.',
      'Donate money to Sister Calderón. She thanks you and shares her faith.',
      'This begins a multi-encounter stranger chain that follows Arthur\'s personal journey.',
    ],
    goldTips: ['Sister Calderón appears multiple times throughout Chapters 4-6. Each encounter is brief but emotionally significant -- especially as Arthur\'s illness progresses.'],
    missables: ['Must donate on first meeting to continue the chain.'],
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
      'Follow Dutch and Hercule along the riverside path — this route avoids the main garrison roads.',
      'Navigate through the ambush in the sugar cane fields; fire spreads quickly through the crop rows.',
      'Use the burning cane as cover, moving from gap to gap to advance.',
      'Fight through the final jungle section and reach the coastal rendezvous point.',
    ],
    goldTips: ['Use the fire strategically — enemies caught in burning cane cannot shoot accurately; crouch-run between cover points.'],
  },

  c5_4: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Savagery Unleashed',
    steps: [
      'The rebel camp is under surprise attack — immediately take cover in the nearest structure.',
      'Use Molotov cocktails on the clusters of soldiers attacking across the open ground.',
      'Push through the jungle trail in sequence — clear each defensive pocket before advancing.',
      'Fight through to the mission objective before time expires.',
    ],
    goldTips: ['Shotgun and fire bottles dominate close-quarters jungle combat; do not rush — clear each position methodically before moving forward.'],
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
      'Follow Dutch through the burning fort aftermath to the harbor.',
      'Fight through the final group of soldiers pursuing from the fort ruins.',
      'Reach the escape boat with as many gang members intact as possible.',
      'Watch the final cutscene — Guarma is behind you. Arthur says goodbye to this strange chapter.',
    ],
    goldTips: ['Keep all surviving gang members alive during the harbor fight; the cutscene that follows is significant.'],
  },

  c5_7: {
    chapter: 'Chapter 5', chapterKey: 'ch5',
    title: 'Icarus and Friends',
    steps: [
      'Reunite with John, Charles, and Sadie near Annesburg after arriving back on the mainland.',
      'The Pinkertons have been waiting — navigate out of the ambush zone on horseback immediately.',
      'Use forest paths and ravines to avoid large Pinkerton forces; this is an escape, not a fight.',
      'Reach the safe house location and regroup with whoever made it.',
    ],
    goldTips: ['Don\'t engage Pinkerton forces in a stand-up fight — outrun them using forest paths; taking the mountain trail is faster than the road.'],
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
      'Find Sister Calderón near her mission church in the Saint Denis waterfront district.',
      'Sit with her on the steps and hear her account of her charitable work among the city\'s poor.',
      'Listen carefully to her description of the people she serves — the contrast to Arthur\'s life is intentional.',
      'Accept the follow-up request and make note of the next meeting location for Part II.',
    ],
    goldTips: ['Primarily a dialogue mission; take time to absorb it — the people Sister Calderón describes become important; this mission chain has one of the most quietly powerful endings in the game.'],
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
      'Speak to Leopold Strauss at camp for the debt assignment. Arthur\'s tuberculosis is visibly worsening — notice the physical changes.',
      'Ride to the debtor\'s location near Annesburg in the damp northeast.',
      'The debtor is in genuine hardship — choose how much pressure to apply based on your honor.',
      'Collect what you can and return to Strauss. The mission\'s emotional weight comes from Arthur, not the target.',
    ],
    goldTips: ['High honor: be lenient and spare the debtor additional suffering; Arthur\'s internal conflict is at the surface here.'],
    honorNote: 'High honor gives a lenient collection option.',
  },

  c6_10: {
    chapter: 'Chapter 6', chapterKey: 'ch6',
    title: 'Money Lending and Other Sins VII',
    isSideQuest: true,
    steps: [
      'Approach Strauss at camp when Arthur has had enough — this conversation cannot be avoided.',
      'Deliver Arthur\'s confrontation speech clearly and let the scene play out without rushing.',
      'Throw Strauss out of the camp — this is Arthur drawing his final moral line.',
      'Watch the camp\'s reaction in the aftermath. Dutch says nothing. That silence is its own answer.',
    ],
    goldTips: ['No combat in this mission; high honor delivers the most powerful version of Arthur\'s speech; this is a turning point — Strauss\'s departure matters for what comes next.'],
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

  // ═══════════════════════════════════════════
  //  EPILOGUE — PART 1
  // ═══════════════════════════════════════════

  ep1_1: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'The Wheel',
    steps: [
      'Arrive at Pronghorn Ranch in West Elizabeth as John Marston, using the alias "Jim Milton."',
      'Introduce yourself to the ranch foreman and receive your first legitimate work assignment.',
      'Complete the initial stable chores and evening duties — do them properly, this is a new life.',
      'Sit with the Pronghorn Ranch crew over supper and establish your cover identity.',
    ],
    goldTips: ['Explore the entire Pronghorn Ranch area; the West Elizabeth landscape has unique collectibles; the quietness of this mission is intentional — absorb the contrast to Arthur\'s story.'],
  },

  ep1_2: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Simple Pleasures',
    steps: [
      'Begin the morning ranch routine — this is honest work and John is trying.',
      'Complete all ranch chores as directed: feeding, mending fences, and patrol duties.',
      'Spend the evening with the ranch crew without breaking cover.',
    ],
    goldTips: ['Use this mission\'s downtime to explore West Elizabeth fully; there are unique animals and plants in this region.'],
  },

  ep1_3: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Farming, For Beginners',
    steps: [
      'Assist with crops and field work at Pronghorn Ranch.',
      'Complete the physical labor tasks with the other hands.',
      'Observe John\'s growing comfort with this quieter life.',
    ],
    goldTips: ['Brief mission — absorb the contrast between John\'s old violent life and this new one; the character development is in the details.'],
  },

  ep1_4: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Fatherhood, For Beginners',
    steps: [
      'Take over care for Jack while Abigail handles other matters at the ranch.',
      'Keep Jack safe and engaged — find appropriate activities for him around the property.',
      'Have extended conversations with Jack whenever the option appears — all dialogue is worth hearing.',
      'Complete the day without incident and return Jack to Abigail safely.',
    ],
    goldTips: ['Listen to every conversation option Jack offers; his questions and observations reveal a great deal about both characters; don\'t rush through the dialogue.'],
  },

  ep1_5: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Old Habits',
    steps: [
      'Go about ranch business when enemies from John\'s past ride in looking for "Jim Milton."',
      'Warn the ranch hands before engaging — they\'ll fight alongside you if alerted.',
      'Fight through multiple waves of attackers using the barn and fence lines for cover.',
      'Clear all attackers and confirm the ranch is secure before the mission ends.',
    ],
    goldTips: ['Alert the ranch hands early; use the barn\'s loft for elevation advantage; complete without any ranch property being destroyed.'],
  },

  ep1_6: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Fatherhood, For Idiots',
    steps: [
      'Begin attempting to teach Jack a practical life skill — this immediately goes sideways.',
      'Chase after Jack as the lesson escalates into comic chaos around the ranch.',
      'Retrieve Jack and manage the unexpected situation he has gotten himself into.',
      'Return to the ranch with a clearer understanding of what fatherhood actually involves.',
    ],
    goldTips: ['Funny and brief; follow wherever the chaos leads; this is one of the lighter moments of the epilogue.'],
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
      'A brief mission following Abigail at the ranch while John is away.',
      'Abigail handles the ranch challenges on her own terms.',
      'The mission fills in crucial context about what the Marston family is trying to build and why.',
    ],
    goldTips: ['Short but important; Abigail\'s dialogue here reveals the weight she has been carrying through the entire story.'],
  },

  ep1_9: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'Gainful Employment',
    steps: [
      'Ride to Armadillo in New Austin to find legitimate paid work.',
      'Speak to the work-giver and accept the available contract.',
      'Complete the job tasks diligently and professionally.',
      'Collect fair payment and return — this mission opens New Austin properly for exploration.',
    ],
    goldTips: ['Excellent anchor mission for New Austin exploration; Armadillo has unique shops and NPCs; the desert region has specific legendary animals and collectibles not found elsewhere.'],
  },

  ep1_10: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: 'The Landowning Classes',
    steps: [
      'Investigate the land-purchase process and understand the financial requirements for buying Beecher\'s Hope.',
      'Complete all necessary financial steps — this requires the money earned from ranch and bounty work.',
      'View the Beecher\'s Hope property and begin to see what could be built there.',
      'Finalize the paperwork and make the commitment to the land.',
    ],
    goldTips: ['Complete all available ranch and bounty jobs before this mission for maximum funds; the Beecher\'s Hope property walk is worth doing slowly.'],
  },

  ep1_11: {
    chapter: 'Epilogue I', chapterKey: 'ep1',
    title: "Home of the Gentry?",
    steps: [
      'Ride to Beecher\'s Hope and survey the land John has secured for his family.',
      'Walk the full property boundaries slowly — understand the scale of what John intends to build.',
      'Set up the initial camp and make the first preparations.',
      'Watch the cutscene showing John\'s vision. This is what everything has been for.',
    ],
    goldTips: ['Walk every corner of the property; this transitions directly into Epilogue 2 and the building missions — the contrast between this empty land and what it becomes is the whole point.'],
  },

  // ═══════════════════════════════════════════
  //  EPILOGUE — PART 2
  // ═══════════════════════════════════════════

  ep2_1: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Bare Knuckle Friendships',
    steps: [
      'Ride to Blackwater and locate John\'s old contacts in the saloons and boarding houses.',
      'Work through bar fights and reconnections — some familiar faces have changed significantly.',
      'Establish new commitments from contacts who will help with the Beecher\'s Hope build.',
      'Return to the ranch with allies ready to commit to the project.',
    ],
    goldTips: ['Explore Blackwater fully — it is completely safe now; visit the tailor and gunsmith; old story contacts yield unique dialogue about what happened after the gang disbanded.'],
  },

  ep2_2: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: "An Honest Day's Labors",
    steps: [
      'Accept a legitimate work contract from an employer in the Beecher\'s Hope area.',
      'Complete the assigned labor tasks over the work period.',
      'Collect fair payment and return to the ranch.',
    ],
    goldTips: ['Short but earns good money for construction costs; complete before the main building missions to have maximum funds available.'],
  },

  ep2_3: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Home Improvement for Beginners',
    steps: [
      'Begin construction on the Beecher\'s Hope main house with John and Uncle.',
      'Complete each construction task in proper sequence — foundations first, then framing.',
      'Work alongside the visiting labor crew on the heavier structural elements.',
      'Explore every corner of the property during the construction — the detail is remarkable.',
    ],
    goldTips: ['This is one of the game\'s most joyful missions; the building sequence is earned after everything John has been through — take it in fully.'],
  },

  ep2_4: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'The Tool Box',
    steps: [
      'Make a list of needed tools and construction supplies for the ranch build.',
      'Ride to the Blackwater supplier and gather absolutely everything in a single trip.',
      'Transport all materials back to Beecher\'s Hope without losing any.',
    ],
    goldTips: ['Short errand mission; gather everything in one run to avoid multiple trips; the nearby general store in Blackwater stocks everything needed.'],
  },

  ep2_5: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A New Jerusalem',
    steps: [
      'Return to Beecher\'s Hope as the construction crew makes major structural progress.',
      'Supervise and assist with the main house roof, walls, and windows.',
      'Work alongside the full crew as the house takes real shape.',
      'Stand back and appreciate the building — it looks like something now.',
    ],
    goldTips: ['Another building montage; watch every stage; the moment the house becomes recognizable as a home is one of the epilogue\'s best beats.'],
  },

  ep2_6: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: "Uncle's Bad Day",
    steps: [
      'Discover that Uncle has created a significant problem at Beecher\'s Hope.',
      'Deal with the immediate fallout from Uncle\'s mistake.',
      'Handle the armed conflict that arrives at the ranch as a result.',
      'Keep weapons loaded and ready — this transitions directly into The Bullet at Work without warning.',
    ],
    goldTips: ['Keep guns loaded and health full; this transitions directly into The Bullet at Work with no break — stay prepared throughout.'],
  },

  ep2_7: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A Quick Favor for an Old Friend',
    steps: [
      'Sadie contacts John for one last dangerous job before she rides south for good.',
      'Ride to Tumbleweed in New Austin with Sadie and track the dangerous target she has been hunting.',
      'Close in on the target through the desert terrain — Sadie provides tactical support.',
      'Complete the job together and take a moment before saying goodbye to Sadie.',
    ],
    goldTips: ['One of the most satisfying missions in the epilogue; the farewell scene at the end is genuinely moving — don\'t rush it; Sadie\'s send-off is perfectly written.'],
  },

  ep2_8: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'A Really Big Bastard',
    steps: [
      'The largest armed action sequence in Epilogue 2 begins at Beecher\'s Hope.',
      'Use the ranch buildings, fences, and terrain for cover throughout — never stand in the open yard.',
      'Fight through the multiple enemy waves that attack the property.',
      'Secure and confirm Beecher\'s Hope is protected. This is your home. Defend it.',
    ],
    goldTips: ['Biggest action set piece of Epilogue 2; stay in hard cover at all times; the ranch outbuildings provide excellent defensive positions — use them.'],
  },

  ep2_9: {
    chapter: 'Epilogue II', chapterKey: 'ep2',
    title: 'Trying Again',
    steps: [
      'Approach Abigail and speak honestly about the future and what John wants to be.',
      'Work through the conversation without deflecting or minimizing — she deserves straight answers.',
      'Make the commitment that the story has been building toward.',
    ],
    goldTips: ['No combat; pure dialogue; pick the honest answers consistently; this is the emotional payoff of John\'s entire arc and one of the most human scenes in the game.'],
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
      'Return to Beecher\'s Hope and find Abigail.',
      'Ride together to Valentine for a quiet evening — sit with it and don\'t rush anything.',
      'When the moment presents itself, ask the question.',
      'Ride back to Beecher\'s Hope together as the Marston family\'s future finally begins.',
    ],
    goldTips: ['The perfect ending; take every conversation at the slowest possible pace; this is one of the best epilogues in gaming — it earns every second of its quiet happiness.'],
  },
};

export const WALKTHROUGH_CHAPTERS = [
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
