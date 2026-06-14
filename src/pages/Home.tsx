import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Learning } from '@/components/sections/Learning'
import { Contact } from '@/components/sections/Contact'
import { SectionTransition } from '@/components/common/SectionTransition'

export function Home() {
  return (
    <main>
      <Hero />
      <SectionTransition variant="gradient" />
      <About />
      <SectionTransition variant="wave" />
      <Skills />
      <SectionTransition variant="gradient" />
      <Projects />
      <SectionTransition variant="wave" />
      <Learning />
      <SectionTransition variant="gradient" />
      <Contact />
    </main>
  )
}
