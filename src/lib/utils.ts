import type { ClassValue } from 'react'

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map((input) => {
      if (typeof input === 'string') return input
      if (typeof input === 'object') {
        return Object.entries(input as object)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
}

export function getSkillCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    frontend: 'from-cyan-500 to-blue-500',
    backend: 'from-violet-500 to-purple-500',
    database: 'from-emerald-500 to-teal-500',
    tools: 'from-orange-500 to-amber-500',
    cloud: 'from-sky-500 to-indigo-500',
  }
  return colors[category] || 'from-gray-500 to-gray-400'
}

export function getSkillCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
