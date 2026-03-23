import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa'
import { useGitHubRepos, getLangColor } from '../hooks/useGitHubRepos'
import { MagicBentoGrid, MagicBentoCard } from './reactbits/MagicBento'
import ScrollFloat from './reactbits/ScrollFloat'
import './Projects.css'

const repoDescriptions = {
  Natural_Language_Processing: 'Exploring NLP techniques including text classification, sentiment analysis, tokenization, and language modeling using Python and Jupyter Notebooks.',
  'Personal_._GPT': 'A custom personal GPT assistant built with Python — fine-tuned conversation AI that responds in a personalized way.',
  'Space_-mini-': 'An interactive space-themed mini web project built with HTML/CSS/JS, showcasing creative animations and space exploration visuals.',
  Automata: 'Implementations of Theory of Automata and Formal Languages — DFA, NFA, PDA, and Turing machines in Java.',
  Computer_Vision: 'Computer vision projects using OpenCV and Python — object detection, image processing, and visual recognition.',
}

function ProjectCard({ repo, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const langColor = getLangColor(repo.language)
  const desc = repoDescriptions[repo.name] || repo.description || 'No description available.'

  // Dynamic spans based on index to create a varied bento layout
  const colSpan = index === 0 || index === 3 ? 2 : 1;
  const rowSpan = index === 0 ? 2 : 1;

  return (
    <MagicBentoCard 
      colSpan={colSpan} 
      rowSpan={rowSpan} 
      delay={index * 0.1}
      color={langColor}
    >
      <div className="project-card__header">
        <FaGithub className="project-card__icon" />
        <div className="project-card__badges">
          {repo.stargazers_count > 0 && (
            <span className="project-card__badge project-card__badge--star">
              <FaStar /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="project-card__badge">
              <FaCodeBranch /> {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      <h3 className="project-card__name">
        {repo.name.replace(/_/g, ' ').replace(/-/g, ' ')}
      </h3>

      <p className="project-card__desc">{desc}</p>

      <div className="project-card__footer" style={{ marginTop: 'auto', paddingTop: '16px' }}>
        {repo.language && (
          <span className="project-card__lang">
            <span className="project-card__lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="project-card__link"
        >
          View <FaExternalLinkAlt size={10} />
        </a>
      </div>
    </MagicBentoCard>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { repos, loading, error, refetch } = useGitHubRepos()

  // Filter out profile readme repo
  const displayRepos = repos.filter(r => r.name !== 'masterharry9889')

  return (
    <section id="projects" ref={ref}>
      <div className="section-container">
        <div className="projects__header">
          <span className="section-tag">
            ✦ Projects
          </span>
          <ScrollFloat 
            tag="h2" 
            className="section-title" 
            text="GitHub Repositories" 
          />
          <ScrollFloat 
            tag="p" 
            className="section-subtitle" 
            text="Live-fetched from GitHub — always up to date as I push new work." 
            delayOffset={0.2} 
          />
        </div>

        {loading && (
          <div className="projects__loading">
            <FaSpinner className="projects__spinner" />
            <span>Fetching repositories from GitHub...</span>
          </div>
        )}

        {error && (
          <div className="projects__error">
            <span>⚠️ Could not load repos: {error}</span>
            <button onClick={refetch} className="btn btn-outline">Retry</button>
          </div>
        )}

        {!loading && !error && (
          <MagicBentoGrid>
            {displayRepos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </MagicBentoGrid>
        )}

        <motion.div
          className="projects__cta"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
        >
          <a href="https://github.com/masterharry9889" target="_blank" rel="noreferrer" className="btn btn-outline">
            <FaGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
