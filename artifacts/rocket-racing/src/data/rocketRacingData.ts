export interface GuideItem {
  id: string;
  title: string;
  description: string;
  tip?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  reward?: string;
  category: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  items: GuideItem[];
}

export interface Section {
  id: string;
  title: string;
  categories: string[];
}

const mk = (
  id: string,
  title: string,
  description: string,
  category: string,
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert',
  reward?: string,
  tip?: string
): GuideItem => ({ id, title, description, category, difficulty, reward, tip });

// ==================== GAME MODES ====================
const gameModes: Category = {
  id: 'game_modes',
  title: 'Game Modes',
  subtitle: 'All racing modes explained',
  icon: 'Trophy',
  color: '#E63946',
  items: [
    mk('gm_1', 'Ranked Racing', 'Competitive 8-player races with skill-based matchmaking. Rank up from Bronze to Champion.', 'game_modes', 'Easy', 'Season rewards & exclusive cosmetics', 'Consistency matters more than one win. Finish top 4 to gain points.'),
    mk('gm_2', 'Casual Racing', 'Relaxed 8-player races with no rank pressure. Perfect for learning new tracks.', 'game_modes', 'Easy', 'XP & basic cosmetics', 'Great for practicing tracks without losing rank.'),
    mk('gm_3', 'Time Trials', 'Race alone against the clock to set your best lap times on any track.', 'game_modes', 'Medium', 'Track medals & bragging rights', 'Watch ghost replays of your best times to find improvements.'),
    mk('gm_4', 'Private Lobbies', 'Create custom races with friends. Choose any track, mode, and vehicle.', 'game_modes', 'Easy', 'Fun with friends', 'Use for organized tournaments or practice sessions.'),
    mk('gm_5', 'Weekly Challenges', 'Special limited-time races with unique rules and rewards each week.', 'game_modes', 'Medium', 'Exclusive weekly rewards', 'Check every Monday for new challenges.'),
    mk('gm_6', 'Tournament Mode', 'Bracket-style elimination tournaments. Win 3 consecutive races to claim the trophy.', 'game_modes', 'Hard', 'Tournament-exclusive vehicle skins', 'Save your best boosts for the final round.'),
    mk('gm_7', 'Team Racing', '4v4 team races where team score determines the winner.', 'game_modes', 'Medium', 'Team XP bonus', 'Coordinate with teammates to block opponents.'),
  ],
};

// ==================== VEHICLES ====================
const vehicles: Category = {
  id: 'vehicles',
  title: 'Vehicles',
  subtitle: 'All cars and their stats',
  icon: 'Car',
  color: '#457B9D',
  items: [
    mk('v_1', 'Raptor X', 'Balanced starter vehicle with good acceleration and decent top speed. Perfect for beginners.', 'vehicles', 'Easy', 'Unlocked by default', 'Upgrade acceleration first for tight tracks.'),
    mk('v_2', 'Venom GT', 'High top speed, low acceleration. Best for long straight tracks.', 'vehicles', 'Medium', 'Unlock at Rank Silver', 'Avoid on tracks with many sharp turns.'),
    mk('v_3', 'Thunderbolt', 'Extreme acceleration, moderate speed. Dominates on twisty tracks.', 'vehicles', 'Medium', 'Unlock at 50 races played', 'Brake early into corners, then boost out.'),
    mk('v_4', 'Phantom', 'Excellent handling and drift. The choice for technical racers.', 'vehicles', 'Hard', 'Unlock at Rank Gold', 'Master drift-boost chains to dominate.'),
    mk('v_5', 'Titan', 'Heavy armor, slow but can ram opponents off-track. Aggressive playstyle.', 'vehicles', 'Medium', 'Complete "Brawler" challenge', 'Use in team races to disrupt opponents.'),
    mk('v_6', 'Streaker', 'Lightweight with unmatched boost recovery. Aerial control specialist.', 'vehicles', 'Hard', 'Unlock at Rank Platinum', 'Hit every boost pad for maximum speed.'),
    mk('v_7', 'Nitro Burner', 'Fastest vehicle in the game. Nearly uncontrollable at top speed.', 'vehicles', 'Expert', 'Unlock at Rank Champion', 'Only for elite players. Tiny mistakes = disaster.'),
    mk('v_8', 'Classic Cruiser', 'Nostalgic design with balanced stats. No major weaknesses.', 'vehicles', 'Easy', 'Purchase from store', 'Great all-rounder for any track.'),
    mk('v_9', 'Storm Rider', 'Electric vehicle with instant torque. Silent but deadly.', 'vehicles', 'Medium', 'Season 3 Battle Pass', 'Regenerates boost faster than gas vehicles.'),
    mk('v_10', 'Lunar Rover', 'Low gravity vehicle. Unique physics for aerial tracks.', 'vehicles', 'Hard', 'Complete all Moon tracks', 'Air time is your friend. Maximize jumps.'),
  ],
};

// ==================== TRACKS ====================
const tracks: Category = {
  id: 'tracks',
  title: 'Tracks',
  subtitle: 'Every course with tips',
  icon: 'Map',
  color: '#2A9D8F',
  items: [
    mk('t_1', 'Neon City', 'Downtown track with sharp corners and boost shortcuts. Medium difficulty.', 'tracks', 'Medium', '1000 XP per win', 'Take the alleyway shortcut after the second bridge.'),
    mk('t_2', 'Volcano Circuit', 'Lava-filled track with narrow paths and a huge jump. High risk, high reward.', 'tracks', 'Hard', '1500 XP per win', 'The inside line on the volcano rim is faster but risky.'),
    mk('t_3', 'Frozen Valley', 'Icy track with slippery surfaces and hidden shortcuts. Patience wins.', 'tracks', 'Medium', '1200 XP per win', 'Drift on ice to maintain control. Do not brake hard.'),
    mk('t_4', 'Skyway Loop', 'Aerial track with corkscrew loops and gravity-defying sections. Epic visuals.', 'tracks', 'Expert', '2000 XP per win', 'Hold steady during the loop. Do not steer in the corkscrew.'),
    mk('t_5', 'Desert Dunes', 'Wide open track with massive dunes and secret underground paths.', 'tracks', 'Medium', '1200 XP per win', 'The underground tunnel saves 5 seconds if you hit the entrance.'),
    mk('t_6', 'Cyber Highway', 'Futuristic track with moving platforms and laser gates. Timing is everything.', 'tracks', 'Hard', '1500 XP per win', 'Wait for the laser gate to cycle before committing.'),
    mk('t_7', 'Jungle Rush', 'Dense jungle track with vine bridges and animal hazards. Unpredictable.', 'tracks', 'Medium', '1200 XP per win', 'Memorize the animal spawn patterns. They repeat every lap.'),
    mk('t_8', 'Ocean Drive', 'Coastal track with beach sections and wave tunnels. Beautiful but tricky.', 'tracks', 'Medium', '1300 XP per win', 'The wave tunnel is faster but you can get caught by the tide.'),
    mk('t_9', 'Factory Floor', 'Industrial track with conveyor belts and crushing hazards. Technical.', 'tracks', 'Hard', '1600 XP per win', 'Ride the conveyor belts in the same direction for speed boost.'),
    mk('t_10', 'Moon Base', 'Low gravity lunar track with crater jumps and oxygen stations. Unique physics.', 'tracks', 'Expert', '2500 XP per win', 'Double jump off crater edges for massive air.'),
    mk('t_11', 'Stormy Seas', 'Ship deck track with tilting platforms and rain-slicked surfaces. Dynamic.', 'tracks', 'Hard', '1500 XP per win', 'The deck tilts predictably. Anticipate the lean.'),
    mk('t_12', 'Crystal Caves', 'Underground track with glowing crystal paths and tight squeezes. Stunning.', 'tracks', 'Hard', '1700 XP per win', 'The glowing crystals mark the fastest line.'),
  ],
};

// ==================== POWER-UPS ====================
const powerups: Category = {
  id: 'powerups',
  title: 'Power-Ups',
  subtitle: 'Items and how to use them',
  icon: 'Zap',
  color: '#E9C46A',
  items: [
    mk('pu_1', 'Nitro Boost', 'Instant burst of speed. Best used on straight sections or after a corner.', 'powerups', 'Easy', 'Store refill', 'Do not use before a sharp turn. You will crash.'),
    mk('pu_2', 'Shield', 'Blocks one attack or hazard. Lasts 5 seconds. Defensive staple.', 'powerups', 'Easy', 'Store refill', 'Activate when you see a projectile coming.'),
    mk('pu_3', 'Missile', 'Homing projectile targeting the racer ahead. Can be dodged with sharp turns.', 'powerups', 'Medium', 'Store refill', 'Fire when the opponent is on a straight.'),
    mk('pu_4', 'Oil Slick', 'Leaves a slippery patch behind you. Great for blocking pursuers.', 'powerups', 'Medium', 'Store refill', 'Drop before corners to catch chasers off-guard.'),
    mk('pu_5', 'EMP Blast', 'Disables all nearby vehicles for 3 seconds. Area denial.', 'powerups', 'Hard', 'Store refill', 'Use in tight packs to disable multiple opponents.'),
    mk('pu_6', 'Magnet', 'Pulls you toward the racer ahead. Closing the gap fast.', 'powerups', 'Medium', 'Store refill', 'Combine with Nitro for devastating overtakes.'),
    mk('pu_7', 'Time Warp', 'Slows time for everyone except you for 4 seconds. Game changer.', 'powerups', 'Expert', 'Rare drop', 'Use in the final lap when you are close behind.'),
    mk('pu_8', 'Portal Gate', 'Creates a teleport gate. Drive through to skip ahead 50 meters.', 'powerups', 'Hard', 'Rare drop', 'Place on straight sections for maximum gain.'),
    mk('pu_9', 'Grapple Hook', 'Attach to the racer ahead and slingshot past them. Skill shot.', 'powerups', 'Hard', 'Store refill', 'Aim for the rear of the vehicle. Miss = wasted.'),
    mk('pu_10', 'Clone', 'Creates a decoy that drives your path. Confuses homing missiles.', 'powerups', 'Medium', 'Store refill', 'Activate when you hear a missile lock-on sound.'),
  ],
};

// ==================== ACHIEVEMENTS ====================
const achievements: Category = {
  id: 'achievements',
  title: 'Achievements',
  subtitle: 'All unlockable milestones',
  icon: 'Star',
  color: '#F4A261',
  items: [
    mk('a_1', 'First Win', 'Win your first race.', 'achievements', 'Easy', 'Bronze badge', 'Just finish first in any mode.'),
    mk('a_2', 'Speed Demon', 'Reach 300 km/h on any track.', 'achievements', 'Easy', 'Silver badge', 'Use Nitro Boost on a long straight.'),
    mk('a_3', 'Untouchable', 'Win a race without taking any damage.', 'achievements', 'Medium', 'Gold badge', 'Use Shield wisely and avoid collisions.'),
    mk('a_4', 'Drift King', 'Drift for a total of 100 kilometers.', 'achievements', 'Medium', 'Gold badge', 'Practice on Frozen Valley. Drift the entire track.'),
    mk('a_5', 'Road Warrior', 'Complete 100 races.', 'achievements', 'Medium', 'Platinum badge', 'Play consistently. Casual counts.'),
    mk('a_6', 'Ranked Grinder', 'Reach Gold rank in competitive.', 'achievements', 'Hard', 'Exclusive vehicle skin', 'Finish top 3 consistently. Avoid risky plays.'),
    mk('a_7', 'Collector', 'Unlock all vehicles.', 'achievements', 'Hard', 'Legendary badge', 'Grind ranked and complete challenges.'),
    mk('a_8', 'Track Master', 'Get gold medals on all 12 tracks.', 'achievements', 'Hard', 'Exclusive title', 'Master each track in Time Trial.'),
    mk('a_9', 'Comeback King', 'Win a race after being in last place on the final lap.', 'achievements', 'Expert', 'Champion badge', 'Save your best power-ups for the final lap.'),
    mk('a_10', 'Flawless', 'Win 10 consecutive races.', 'achievements', 'Expert', 'Ultimate title', 'Pick your best track and vehicle. No mistakes.'),
    mk('a_11', 'Aerial Ace', 'Spend 60 seconds total in air time.', 'achievements', 'Medium', 'Silver badge', 'Focus on tracks with jumps and loops.'),
    mk('a_12', 'Tournament Victor', 'Win 3 tournaments in a single week.', 'achievements', 'Hard', 'Tournament trophy', 'Enter every tournament you can.'),
    mk('a_13', 'Team Player', 'Win 20 team races.', 'achievements', 'Medium', 'Team badge', 'Coordinate with teammates.'),
    mk('a_14', 'Nitro Addict', 'Use 500 Nitro Boosts.', 'achievements', 'Easy', 'Bronze badge', 'Use boosts every race. They add up.'),
    mk('a_15', 'Brawler', 'Successfully ram 50 opponents off-track.', 'achievements', 'Hard', 'Aggressive badge', 'Use the Titan vehicle for maximum impact.'),
  ],
};

// ==================== STRATEGIES ====================
const strategies: Category = {
  id: 'strategies',
  title: 'Strategies',
  subtitle: 'Advanced racing tactics',
  icon: 'Target',
  color: '#264653',
  items: [
    mk('s_1', 'The Perfect Start', 'Time your launch at the exact moment the light turns green for a boost start.', 'strategies', 'Easy', 'Better race position', 'Watch the countdown lights. Launch at green, not before.'),
    mk('s_2', 'Racing Line', 'Take the shortest, fastest path through every corner. Inside line is usually best.', 'strategies', 'Medium', 'Faster lap times', 'Memorize each track\'s ideal line. Practice in Time Trial.'),
    mk('s_3', 'Drift Boost Chaining', 'Drift around corners, then tap boost immediately after exit for a speed surge.', 'strategies', 'Medium', 'Faster corner exits', 'The boost window after a drift is 1 second. Be quick.'),
    mk('s_4', 'Boost Conservation', 'Save your Nitro for straight sections and the final lap. Do not waste on corners.', 'strategies', 'Medium', 'More wins', 'Patience wins races. A saved boost = a late overtake.'),
    mk('s_5', 'Defensive Driving', 'Block opponents by taking the racing line and forcing them into slower paths.', 'strategies', 'Hard', 'Better defense', 'Only works when you are ahead. Be predictable.'),
    mk('s_6', 'Power-Up Cycling', 'Drive over power-up pads even when you have an item. It refreshes to a new one.', 'strategies', 'Easy', 'Better power-ups', 'If you have a bad item, grab another pad.'),
    mk('s_7', 'Shortcut Risk Assessment', 'Some shortcuts save time but are risky. Know when to commit.', 'strategies', 'Hard', 'Faster times', 'Practice shortcuts in Time Trial before using in ranked.'),
    mk('s_8', 'Final Lap Psychology', 'The final lap is where races are won. Save your best moves.', 'strategies', 'Hard', 'More wins', 'Hold your best power-up and boost for the last lap.'),
    mk('s_9', 'Vehicle-Track Matching', 'Pick the right vehicle for each track. Speed for straights, handling for twists.', 'strategies', 'Medium', 'Track advantage', 'Venom GT for Desert Dunes. Phantom for Neon City.'),
    mk('s_10', 'Air Control', 'In mid-air, tilt your vehicle forward or back to control landing angle.', 'strategies', 'Hard', 'Better landings', 'Tilt forward for speed. Tilt back for stability.'),
    mk('s_11', 'Pack Racing', 'In the early laps, stay in the pack to collect power-ups from multiple pads.', 'strategies', 'Medium', 'More power-ups', 'Draft behind opponents for a small speed boost.'),
    mk('s_12', 'The Late Brake', 'Brake later than opponents into corners. Gain time on every turn.', 'strategies', 'Expert', 'Faster lap times', 'Risky. Practice in Time Trial until consistent.'),
  ],
};

// ==================== CHALLENGES ====================
const challenges: Category = {
  id: 'challenges',
  title: 'Challenges',
  subtitle: 'Daily and weekly tasks',
  icon: 'Flag',
  color: '#9B2226',
  items: [
    mk('c_1', 'Daily Race', 'Complete 3 races today.', 'challenges', 'Easy', '500 XP', 'Play any mode. Casual counts.'),
    mk('c_2', 'Daily Drift', 'Drift for 5 minutes total today.', 'challenges', 'Easy', '500 XP', 'Choose a track with many corners.'),
    mk('c_3', 'Daily Winner', 'Win 1 race today.', 'challenges', 'Easy', '750 XP', 'Play Casual for easier wins.'),
    mk('c_4', 'Weekly Speedster', 'Set a top-100 Time Trial record on any track this week.', 'challenges', 'Hard', '5000 XP + exclusive cosmetic', 'Practice the same track. Optimize every corner.'),
    mk('c_5', 'Weekly Collector', 'Use 10 different power-ups in a single race.', 'challenges', 'Medium', '2000 XP', 'Drive over every pad. Use items immediately.'),
    mk('c_6', 'Weekly Veteran', 'Win 5 ranked races in a single week.', 'challenges', 'Hard', '3000 XP + ranked points boost', 'Play consistently. Ranked rewards are worth it.'),
    mk('c_7', 'Weekly Explorer', 'Race on every track at least once this week.', 'challenges', 'Medium', '1500 XP', 'Try a different track each race.'),
    mk('c_8', 'Weekly Team Player', 'Win 3 team races this week.', 'challenges', 'Medium', '2000 XP', 'Queue with friends for better coordination.'),
    mk('c_9', 'Weekly Aggressor', 'Successfully hit opponents with 20 projectiles.', 'challenges', 'Medium', '2000 XP', 'Use Missile and EMP Blast. Aim for packs.'),
    mk('c_10', 'Weekly Flawless', 'Finish 10 races without crashing.', 'challenges', 'Hard', '2500 XP', 'Drive defensively. Avoid risky shortcuts.'),
  ],
};

// ==================== SECRETS & EASTER EGGS ====================
const secrets: Category = {
  id: 'secrets',
  title: 'Secrets',
  subtitle: 'Hidden features and Easter eggs',
  icon: 'Eye',
  color: '#6B21A8',
  items: [
    mk('se_1', 'Konami Code', 'Enter the classic Konami code on the main menu for a secret screen.', 'secrets', 'Easy', 'Secret menu access', 'Up, Up, Down, Down, Left, Right, Left, Right, B, A.'),
    mk('se_2', 'Developer Room', 'A hidden room accessible only on the Moon Base track. Requires a specific jump.', 'secrets', 'Hard', 'Developer messages', 'At the second crater, jump off the left edge. Aim for the small platform.'),
    mk('se_3', 'Ghost Racer', 'Occasionally, a ghostly vehicle appears in Time Trial. Beat it for a bonus.', 'secrets', 'Medium', 'Bonus XP', 'The ghost appears randomly. Beat it for +50% XP.'),
    mk('se_4', 'Alternate Music', 'Hold a specific button combination at the track select screen for retro music.', 'secrets', 'Easy', 'Retro soundtrack', 'Hold L1 + R1 + Triangle while selecting a track.'),
    mk('se_5', 'Big Head Mode', 'A secret mode that makes all vehicles have oversized heads. Purely cosmetic.', 'secrets', 'Easy', 'Cosmetic fun', 'Enter the Konami code, then select Big Head in the secret menu.'),
    mk('se_6', 'Secret Vehicle', 'A hidden vehicle unlocked by completing a specific sequence of actions.', 'secrets', 'Expert', 'The "Specter" vehicle', 'Win 10 consecutive races on 10 different tracks. Order does not matter.'),
    mk('se_7', 'Developer Messages', 'Hidden messages scattered across tracks. Read them all for a badge.', 'secrets', 'Medium', 'Explorer badge', 'Look for glowing text on walls and hidden areas.'),
    mk('se_8', 'Inverted Colors', 'A secret visual filter that inverts all colors. Trippy racing.', 'secrets', 'Easy', 'Visual fun', 'Found in the secret menu after Konami code.'),
  ],
};

// ==================== RANKING SYSTEM ====================
const ranks: Category = {
  id: 'ranks',
  title: 'Ranks',
  subtitle: 'Competitive ranking explained',
  icon: 'TrendingUp',
  color: '#1D3557',
  items: [
    mk('r_1', 'Bronze', 'Starting rank. 0-500 points. Learn the basics here.', 'ranks', 'Easy', 'Bronze rewards', 'No point loss for finishing last. Safe zone.'),
    mk('r_2', 'Silver', '500-1000 points. Basic racers. Consistency is key.', 'ranks', 'Medium', 'Silver rewards', 'Finish top 4 to gain points. Last place loses a few.'),
    mk('r_3', 'Gold', '1000-1500 points. Good racers. Mechanical skill matters.', 'ranks', 'Medium', 'Gold rewards', 'Phantom vehicle unlocks here.'),
    mk('r_4', 'Platinum', '1500-2000 points. Strong racers. Strategy becomes critical.', 'ranks', 'Hard', 'Platinum rewards', 'Streaker vehicle unlocks here.'),
    mk('r_5', 'Diamond', '2000-2500 points. Elite racers. Every mistake costs you.', 'ranks', 'Hard', 'Diamond rewards', 'Season-exclusive cosmetics.'),
    mk('r_6', 'Champion', '2500+ points. The best of the best. Top 1% of players.', 'ranks', 'Expert', 'Champion rewards + Nitro Burner', 'Win streaks are essential. One loss = big point drop.'),
    mk('r_7', 'Season Reset', 'Ranks reset every season. Higher ranks get a head start.', 'ranks', 'Medium', 'Season rewards', 'Champions start at Platinum. Bronze stays Bronze.'),
    mk('r_8', 'Rank Decay', 'Inactive players lose points over time. Play at least once a week.', 'ranks', 'Easy', 'Maintain rank', 'One race per week prevents decay.'),
  ],
};

// ==================== CUSTOMIZATION ====================
const customization: Category = {
  id: 'customization',
  title: 'Customization',
  subtitle: 'Skins, decals, and cosmetics',
  icon: 'Palette',
  color: '#A8DADC',
  items: [
    mk('cu_1', 'Vehicle Skins', 'Change your vehicle\'s appearance. Some are earned, some are purchased.', 'customization', 'Easy', 'Visual change', 'Ranked rewards give the best skins.'),
    mk('cu_2', 'Decals', 'Apply decals and stickers to your vehicle. Mix and match.', 'customization', 'Easy', 'Visual change', 'Complete challenges for unique decals.'),
    mk('cu_3', 'Underglow', 'Colored lights under your vehicle. Purely cosmetic.', 'customization', 'Easy', 'Visual change', 'Purchase with in-game currency.'),
    mk('cu_4', 'Trail Effects', 'Custom particle trails behind your vehicle when boosting.', 'customization', 'Medium', 'Visual change', 'Season pass rewards include legendary trails.'),
    mk('cu_5', 'Horns', 'Custom horn sounds. Annoy your opponents.', 'customization', 'Easy', 'Audio fun', 'Unlock by completing the "Annoying" achievement.'),
    mk('cu_6', 'Nameplates', 'Custom banners displayed above your vehicle in races.', 'customization', 'Easy', 'Visual change', 'Earned through ranked milestones.'),
    mk('cu_7', 'Victory Poses', 'Custom animations for the podium screen. Show off.', 'customization', 'Medium', 'Visual change', 'Tournament winners get exclusive poses.'),
    mk('cu_8', 'HUD Themes', 'Change the appearance of your in-race HUD. Minimal to flashy.', 'customization', 'Easy', 'UI change', 'Purchase in the store.'),
  ],
};

export const categories: Category[] = [
  gameModes,
  vehicles,
  tracks,
  powerups,
  achievements,
  strategies,
  challenges,
  secrets,
  ranks,
  customization,
];

export const sections: Section[] = [
  {
    id: 'basics',
    title: 'Getting Started',
    categories: ['game_modes', 'ranks', 'vehicles'],
  },
  {
    id: 'tracks',
    title: 'Tracks & Power-Ups',
    categories: ['tracks', 'powerups'],
  },
  {
    id: 'advanced',
    title: 'Advanced Play',
    categories: ['strategies', 'secrets'],
  },
  {
    id: 'progression',
    title: 'Progression',
    categories: ['achievements', 'challenges', 'customization'],
  },
];

export const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getItemById(id: string): GuideItem | undefined {
  for (const cat of categories) {
    const item = cat.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}

export function getSectionCategories(sectionId: string): Category[] {
  const section = sections.find((s) => s.id === sectionId);
  if (!section) return [];
  return categories.filter((c) => section.categories.includes(c.id));
}

export function getCompletionPercent(completedIds: Set<string>): number {
  if (totalItems === 0) return 0;
  return Math.round((completedIds.size / totalItems) * 100);
}

export function getCategoryPercent(category: Category, completedIds: Set<string>): number {
  if (category.items.length === 0) return 0;
  const completed = category.items.filter((i) => completedIds.has(i.id)).length;
  return Math.round((completed / category.items.length) * 100);
}
