interface SocialIconProps {
  name: string
  size?: number
}

const brandIcons: Record<string, string> = {
  github: 'fab fa-github',
  linkedin: 'fab fa-linkedin-in',
  twitter: 'fab fa-twitter',
  mail: 'fas fa-envelope',
  leetcode: 'fas fa-code',
  skillrack: 'fas fa-terminal',
  codechef: 'fas fa-utensils',
}

export function SocialIcon({ name, size = 20 }: SocialIconProps) {
  const icon = brandIcons[name] || 'fas fa-globe'
  return <i className={icon} style={{ fontSize: size, lineHeight: 1 }} />
}
