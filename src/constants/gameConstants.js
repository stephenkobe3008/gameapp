export const seasons = ['春', '夏', '秋', '冬'];

export const initialGameState = {
  followers: 0,
  gold: 1000,
  influence: 0,
  happiness: 50,
  year: 1,
  season: 0,
  day: 0,
  buildings: [],
  missionaries: [],
  researches: [],
  income: 0,
  maintenanceCost: 0,
  isGameOver: false,
  totalFollowersGained: 0,
  totalGoldEarned: 0
};

export const achievements = [
  { id: 'first_building', name: '創始者', desc: '最初の建物を建設', check: (s) => s.buildings.length >= 1 },
  { id: 'ten_buildings', name: '建築王', desc: '10棟の建物を建設', check: (s) => s.buildings.length >= 10 },
  { id: 'hundred_followers', name: '小さな群れ', desc: '信者100人達成', check: (s) => s.followers >= 100 },
  { id: 'thousand_followers', name: '大きな群れ', desc: '信者1000人達成', check: (s) => s.followers >= 1000 },
  { id: 'rich', name: '富める者', desc: '資金10000到達', check: (s) => s.gold >= 10000 },
  { id: 'influential', name: '影響力の権化', desc: '影響力1000到達', check: (s) => s.influence >= 1000 },
  { id: 'ten_years', name: '10年の歩み', desc: '10年間生存', check: (s) => s.year >= 10 },
  { id: 'all_research', name: '究極の知識', desc: '全研究完了', check: (s) => s.researches.length >= 8 },
];
