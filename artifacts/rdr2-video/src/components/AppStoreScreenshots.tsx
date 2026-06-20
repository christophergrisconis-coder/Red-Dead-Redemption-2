import React from 'react';

const W = 390;
const H = 844;

const colors = {
  bg: '#0D0800',
  card: '#1A1205',
  gold: '#C8901A',
  goldDim: '#7A5510',
  cream: '#EDD9A3',
  muted: '#907558',
  border: '#2A1C08',
  red: '#8A2A1A',
  green: '#2A6A3A',
};

function PhoneFrame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{
      width: W,
      height: H,
      background: colors.bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, sans-serif',
      flexShrink: 0,
    }}>
      {/* Sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #02010A 0%, #0F0608 35%, #1A0A04 60%, #251206 80%, #1A0A04 100%)',
      }} />
      {/* Campfire horizon glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, #7A280088 0%, #3A120044 60%, transparent 100%)',
      }} />
      {/* Stars */}
      {[
        [42,60],[110,30],[200,55],[320,25],[360,70],[80,100],[290,90],[150,40],[250,75],[330,110],
        [60,130],[180,20],[240,50],[370,95],[100,80],[300,45],[200,110],[140,65],[50,90],[310,30],
      ].map(([x,y],i) => (
        <div key={i} style={{
          position: 'absolute', left: x, top: y,
          width: i%3===0?2:1, height: i%3===0?2:1,
          borderRadius: '50%',
          background: '#EDD9A3',
          opacity: 0.15 + (i%5)*0.07,
        }} />
      ))}
      {/* Status bar */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px 8px',
        color: colors.cream, fontSize: 12, fontWeight: 600,
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <span>▐▐▐▐</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        {children}
      </div>
      {/* Label badge at bottom */}
      <div style={{
        position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        background: '#00000088', border: `1px solid ${colors.goldDim}`,
        padding: '6px 18px', borderRadius: 20, zIndex: 20,
        color: colors.gold, fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
        textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {title}
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 32px', margin: '8px 0' }}>
      <div style={{ flex: 1, height: 1, background: colors.goldDim, opacity: 0.4 }} />
      <span style={{ color: colors.goldDim, fontSize: 9 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: colors.goldDim, opacity: 0.4 }} />
    </div>
  );
}

function Screen1() {
  return (
    <PhoneFrame title="Welcome Screen">
      <div style={{ textAlign: 'center', padding: '40px 32px 0' }}>
        <Divider />
        <div style={{ color: colors.muted, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', marginTop: 28, marginBottom: 14 }}>
          RED DEAD REDEMPTION II
        </div>
        <div style={{ color: colors.cream, fontSize: 32, fontWeight: 700, lineHeight: 1.25, letterSpacing: 1.5, marginBottom: 18 }}>
          The Outlaw's<br />Complete Guide
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', margin: '0 auto 18px', width: '75%' }}>
          <div style={{ flex: 1, height: 1, background: colors.gold, opacity: 0.6 }} />
          <span style={{ color: colors.gold, fontSize: 10 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: colors.gold, opacity: 0.6 }} />
          <span style={{ color: colors.gold, fontSize: 10 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: colors.gold, opacity: 0.6 }} />
        </div>
        <div style={{ color: colors.muted, fontSize: 12, lineHeight: 1.8, letterSpacing: 0.5, marginBottom: 22 }}>
          Missions · Walkthroughs · Collectibles<br />
          Progress Tracking · Treasure Hunts
        </div>
        <div style={{
          border: `1px solid #3A2010`, padding: '5px 16px', display: 'inline-block', marginBottom: 36,
        }}>
          <span style={{ color: colors.gold, fontSize: 10, fontWeight: 600, letterSpacing: 2 }}>
            ✦  PlayStation 5 Edition  ✦
          </span>
        </div>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: `1px solid ${colors.gold}`, padding: '12px 24px', marginBottom: 10,
          }}>
            <span style={{ color: colors.gold, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
              BEGIN YOUR JOURNEY
            </span>
            <span style={{ color: colors.gold, fontSize: 16 }}> →</span>
          </div>
          <div style={{ color: '#4A3010', fontSize: 10, letterSpacing: 1 }}>tap anywhere to enter</div>
        </div>
        <Divider />
        {/* Ember dots */}
        {[[195,320],[210,290],[185,340],[220,305],[175,325]].map(([x,y],i) => (
          <div key={i} style={{
            position: 'absolute', left: x, top: y,
            width: 3, height: 3, borderRadius: '50%',
            background: i%2===0 ? '#FF6820' : '#FFB830',
            opacity: 0.7,
          }} />
        ))}
      </div>
    </PhoneFrame>
  );
}

function Screen2() {
  const sections = [
    { label: 'Main Story', icon: '📖', done: 12, total: 42, pct: 28 },
    { label: 'Side Quests', icon: '🗡', done: 4, total: 28, pct: 14 },
    { label: 'Collectibles', icon: '⬡', done: 0, total: 144, pct: 0 },
    { label: 'Challenges', icon: '🏆', done: 3, total: 90, pct: 3 },
    { label: 'Hunting', icon: '🎯', done: 2, total: 30, pct: 6 },
    { label: 'Activities', icon: '🃏', done: 1, total: 24, pct: 4 },
  ];
  return (
    <PhoneFrame title="Progress Tracker">
      <div style={{ padding: '0 16px' }}>
        {/* Rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, marginTop: 4 }}>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
          <span style={{ color: colors.goldDim, fontSize: 9 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: colors.border }} />
        </div>
        <div style={{ color: colors.muted, fontSize: 11, fontStyle: 'italic', textAlign: 'center', marginBottom: 12 }}>
          "Be loyal to what matters." — Arthur Morgan
        </div>
        {/* Hero card */}
        <div style={{
          background: colors.card, border: `1px solid ${colors.border}`,
          borderRadius: 12, overflow: 'hidden', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.gold, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, marginBottom: 4 }}>RED DEAD REDEMPTION II</div>
              <div style={{ color: colors.cream, fontSize: 13, fontWeight: 600, marginBottom: 2 }}>The Outlaw's Complete Guide</div>
              <div style={{ color: colors.muted, fontSize: 11 }}>PlayStation 5 Edition</div>
            </div>
            {/* Ring */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%', position: 'relative',
              background: `conic-gradient(${colors.gold} 0% 22%, ${colors.border} 22% 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: colors.card,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: colors.gold, fontSize: 14, fontWeight: 700 }}>22%</span>
                <span style={{ color: colors.muted, fontSize: 9 }}>done</span>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex', borderTop: `1px solid ${colors.border}`, padding: '10px 0',
          }}>
            {[['22','Completed'],['78','Remaining'],['100','Total']].map(([n,l],i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: 1, background: colors.border, margin: '2px 0' }} />}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ color: i===0?colors.gold:colors.cream, fontSize: 18, fontWeight: 700 }}>{n}</div>
                  <div style={{ color: colors.muted, fontSize: 10 }}>{l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Section grid */}
        <div style={{ color: colors.cream, fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>
          Browse by Category
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sections.map((s,i) => (
            <div key={i} style={{
              width: 'calc(50% - 4px)', background: colors.card,
              border: `1px solid ${s.pct===100?colors.gold:colors.border}`, borderRadius: 10, padding: 10,
            }}>
              <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: colors.cream, fontSize: 11, fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
              <div style={{ height: 3, borderRadius: 2, background: colors.border, marginBottom: 4, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: colors.gold, borderRadius: 2 }} />
              </div>
              <div style={{ color: colors.muted, fontSize: 10 }}>{s.done}/{s.total}</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function Screen3() {
  const items = [
    { name: 'Legendary Bharati Grizzly', loc: 'Grizzlies East — north of O\'Creagh\'s Run', tip: 'Use Heavy Rifle + Cover Scent Lotion', done: true },
    { name: 'Legendary Buck', loc: 'Big Valley — northwest of Strawberry', tip: 'Varmint Rifle, approach from downwind', done: true },
    { name: 'Legendary Bullgator', loc: 'Bayou Nwa — Ch. 4+ only', tip: 'Stay mounted — he charges fast', done: false },
    { name: 'Legendary White Bison', loc: 'Lake Isabella — frozen northwest', tip: 'Dress warmly — extreme cold zone', done: false },
    { name: 'Legendary Wolf', loc: 'Cotorra Springs, Ambarino', tip: 'Kill alpha first — pack follows', done: false },
    { name: 'Legendary Giaguaro Panther', loc: 'Roanoke Ridge east coast', tip: '⚠️ Unlock Master Hunter 9 first', done: false },
  ];
  return (
    <PhoneFrame title="Legendary Animals">
      <div style={{ padding: '0 16px' }}>
        {/* Header */}
        <div style={{
          background: '#2A1205', border: `1px solid ${colors.border}`,
          borderRadius: 10, padding: '10px 14px', marginBottom: 12, marginTop: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ color: colors.gold, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>🎯 Legendary Animals</div>
            <div style={{ color: colors.muted, fontSize: 10 }}>All 16 — sell pelts to the Trapper</div>
          </div>
          <div style={{
            background: colors.gold + '22', border: `1px solid ${colors.gold}`,
            borderRadius: 8, padding: '4px 10px',
            color: colors.gold, fontSize: 11, fontWeight: 700,
          }}>2 / 16</div>
        </div>
        {/* Items */}
        {items.map((item, i) => (
          <div key={i} style={{
            background: colors.card, border: `1px solid ${item.done ? colors.gold + '44' : colors.border}`,
            borderRadius: 8, padding: '10px 12px', marginBottom: 8,
            display: 'flex', alignItems: 'flex-start', gap: 10,
            opacity: item.done ? 1 : 0.9,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4,
              border: `1.5px solid ${item.done ? colors.gold : colors.goldDim}`,
              background: item.done ? colors.gold : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 1,
            }}>
              {item.done && <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: item.done ? colors.muted : colors.cream, fontSize: 12, fontWeight: 600, marginBottom: 2, textDecoration: item.done ? 'line-through' : 'none' }}>
                {item.name}
              </div>
              <div style={{ color: colors.gold, fontSize: 10, marginBottom: 2 }}>📍 {item.loc}</div>
              <div style={{ color: colors.muted, fontSize: 10 }}>💡 {item.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function Screen4() {
  const bars = [
    { name: 'Limpany Sheriff\'s Office safe', loc: 'Limpany ruins — north of Flatneck Station', tip: 'Lockpick or dynamite the safe', done: true, val: '$500' },
    { name: 'Braithwaite Manor vault (1/3)', loc: 'Braithwaite Manor — south of Rhodes', tip: 'Available Ch. 3+ after Blood Feuds', done: true, val: '$500' },
    { name: 'Braithwaite Manor vault (2/3)', loc: 'Same underground room as above', tip: 'Take all 3 bars in one visit', done: false, val: '$500' },
    { name: 'Braithwaite Manor vault (3/3)', loc: 'Same underground room as above', tip: '3 bars = $1,500 total', done: false, val: '$500' },
    { name: 'Jack Hall Gang treasure (1/3)', loc: 'O\'Creagh\'s Run island — swim to it', tip: 'Complete full map chain first', done: false, val: '$500' },
    { name: 'Elysian Pool waterfall cave', loc: 'Behind the falls — swim through', tip: 'Bar on a ledge inside the alcove', done: false, val: '$500' },
  ];
  return (
    <PhoneFrame title="Gold Bars — 24 Total">
      <div style={{ padding: '0 16px' }}>
        <div style={{
          background: '#2A1A05', border: `1px solid ${colors.goldDim}`,
          borderRadius: 10, padding: '10px 14px', marginBottom: 12, marginTop: 4,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ color: colors.gold, fontSize: 12, fontWeight: 700 }}>⭐ Gold Bars</div>
            <div style={{ color: colors.gold, fontSize: 12, fontWeight: 700 }}>$500 each at any fence</div>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: colors.border, overflow: 'hidden' }}>
            <div style={{ width: '8%', height: '100%', background: colors.gold, borderRadius: 2 }} />
          </div>
          <div style={{ color: colors.muted, fontSize: 10, marginTop: 4 }}>2 of 24 collected · $12,000 total value</div>
        </div>
        {bars.map((bar, i) => (
          <div key={i} style={{
            background: colors.card, border: `1px solid ${bar.done ? colors.gold + '55' : colors.border}`,
            borderRadius: 8, padding: '9px 12px', marginBottom: 8,
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4,
              border: `1.5px solid ${bar.done ? colors.gold : colors.goldDim}`,
              background: bar.done ? colors.gold : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 1,
            }}>
              {bar.done && <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ color: bar.done ? colors.muted : colors.cream, fontSize: 11, fontWeight: 600, flex: 1, textDecoration: bar.done ? 'line-through' : 'none' }}>
                  {bar.name}
                </div>
                <div style={{ color: colors.gold, fontSize: 10, fontWeight: 700, marginLeft: 8 }}>{bar.val}</div>
              </div>
              <div style={{ color: colors.gold, fontSize: 10, marginBottom: 2 }}>📍 {bar.loc}</div>
              <div style={{ color: colors.muted, fontSize: 10 }}>💡 {bar.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function Screen5() {
  const cards = [
    { set: 'Set 1', name: 'Birds of America', progress: '12/12', done: true },
    { set: 'Set 2', name: 'Notorious Criminals', progress: '8/12', done: false },
    { set: 'Set 3', name: 'Champions of Sport', progress: '3/12', done: false },
    { set: 'Set 4', name: 'Masterworks of Art', progress: '0/12', done: false },
    { set: 'Set 5', name: 'Guns of the West', progress: '0/12', done: false },
    { set: 'Set 6', name: 'Central American Fauna', progress: '0/12', done: false },
  ];
  return (
    <PhoneFrame title="Cigarette Card Sets">
      <div style={{ padding: '0 16px' }}>
        <div style={{
          background: '#1A1005', border: `1px solid ${colors.border}`,
          borderRadius: 10, padding: '10px 14px', marginBottom: 12, marginTop: 4,
        }}>
          <div style={{ color: colors.gold, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>🃏 Cigarette Cards</div>
          <div style={{ color: colors.muted, fontSize: 10, marginBottom: 6 }}>
            Buy Premium Cigarettes ($2.50/pack) at any general store. Complete all 12 sets (144 cards) for unique rewards.
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{
              background: colors.gold + '22', border: `1px solid ${colors.gold}44`, borderRadius: 6,
              padding: '4px 10px', color: colors.gold, fontSize: 10, fontWeight: 700,
            }}>1 Set Complete</div>
            <div style={{
              background: colors.border, borderRadius: 6,
              padding: '4px 10px', color: colors.muted, fontSize: 10,
            }}>23/144 Cards</div>
          </div>
        </div>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: colors.card, border: `1px solid ${c.done ? colors.gold + '55' : colors.border}`,
            borderRadius: 8, padding: '10px 12px', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: c.done ? colors.gold + '22' : colors.border,
              border: `1px solid ${c.done ? colors.gold : colors.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              {c.done ? '✅' : '🃏'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: colors.muted, fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5 }}>{c.set}</div>
                <div style={{
                  color: c.done ? colors.gold : colors.muted,
                  fontSize: 10, fontWeight: c.done ? 700 : 400,
                }}>{c.progress}</div>
              </div>
              <div style={{ color: c.done ? colors.muted : colors.cream, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
              <div style={{ height: 3, borderRadius: 2, background: colors.border, overflow: 'hidden' }}>
                <div style={{
                  width: c.done ? '100%' : (parseInt(c.progress) / 12 * 100) + '%',
                  height: '100%',
                  background: c.done ? colors.gold : '#C8922A',
                  borderRadius: 2,
                }} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ color: colors.muted, fontSize: 10, textAlign: 'center', marginTop: 4 }}>
          Trade completed sets at the Emerald Ranch fence ✦
        </div>
      </div>
    </PhoneFrame>
  );
}

export function AppStoreScreenshots() {
  const screens = [
    { id: 'screen1', component: <Screen1 /> },
    { id: 'screen2', component: <Screen2 /> },
    { id: 'screen3', component: <Screen3 /> },
    { id: 'screen4', component: <Screen4 /> },
    { id: 'screen5', component: <Screen5 /> },
  ];

  return (
    <div style={{
      background: '#111', minHeight: '100vh', padding: 40,
      display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <h1 style={{ width: '100%', color: '#C8901A', fontFamily: 'sans-serif', textAlign: 'center', marginBottom: 8 }}>
        App Store Screenshots — RDR2 Interactive Guide
      </h1>
      <p style={{ width: '100%', color: '#666', fontFamily: 'sans-serif', textAlign: 'center', marginTop: 0, marginBottom: 24 }}>
        5 screens · 390×844px each · Ready for App Store submission
      </p>
      {screens.map(({ id, component }) => (
        <div key={id} id={id} style={{
          boxShadow: '0 20px 60px #000a, 0 0 0 1px #333',
          borderRadius: 8, overflow: 'hidden',
        }}>
          {component}
        </div>
      ))}
    </div>
  );
}
