export function catBadgeClass(category: string): string {
  switch (category) {
    case 'match-report':
      return 'bg-bka-red text-white'
    case 'transfer':
    case 'academy':
    case 'interview':
      return 'bg-bka-gold text-black'
    case 'club-news':
    default:
      return 'bg-white/10 text-white'
  }
}
