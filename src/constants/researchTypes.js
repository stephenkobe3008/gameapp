export const researchTypes = {
  charisma: {
    name: 'カリスマ向上',
    icon: '✨',
    cost: 500,
    effect: '伝道者の効率+20%',
    bonus: { missionaryBonus: 0.2 }
  },
  charity: {
    name: '慈善活動',
    icon: '❤️',
    cost: 800,
    effect: '満足度+10',
    bonus: { happiness: 10 }
  },
  healing: {
    name: '癒しの儀式',
    icon: '🙏',
    cost: 1200,
    effect: '影響力+30',
    bonus: { influence: 30 }
  },
  architecture: {
    name: '建築技術',
    icon: '🏗️',
    cost: 1500,
    effect: '建設コスト-20%',
    bonus: { buildingDiscount: 0.2 }
  },
  economy: {
    name: '経済学',
    icon: '💰',
    cost: 2000,
    effect: '維持費-15%',
    bonus: { maintenanceDiscount: 0.15 }
  },
  theology: {
    name: '神学研究',
    icon: '📖',
    cost: 3000,
    effect: '献金額+50%',
    bonus: { offeringBonus: 0.5 }
  },
  miracles: {
    name: '奇跡の力',
    icon: '⭐',
    cost: 5000,
    effect: '特別行事の効果+100%',
    bonus: { eventBonus: 1.0 }
  },
  meditation: {
    name: '瞑想の極意',
    icon: '🧘',
    cost: 4000,
    effect: '礼拝の効果+50%',
    bonus: { prayerBonus: 0.5 }
  }
};
