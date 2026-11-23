import { useEffect, useRef, useState } from 'react'
import { Check, Code2, ExternalLink, LockKeyhole, Monitor, Moon, Play, Search, Sparkles, Sun, X, ZoomIn } from 'lucide-react'
import { profile, projects, type Project, type ProjectMedia } from './projects'

type Theme = 'light' | 'dark'
const categories = ['All projects', ...new Set(projects.map(project => project.category))]

function Github({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.49 0-1.21.44-2.2 1.14-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.43 3.05-1.14 3.05-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.26-2.61 5.2-5.09 5.48.4.35.75 1.02.75 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" /></svg>
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const explicitChoice = useRef(false)

  useEffect(() => {
    try { explicitChoice.current = ['light', 'dark'].includes(localStorage.getItem('tigerbook-theme') ?? '') } catch { /* Storage can be disabled. */ }
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystem = () => { if (!explicitChoice.current) setTheme(preference.matches ? 'dark' : 'light') }
    preference.addEventListener('change', followSystem)
    const syncTabs = (event: StorageEvent) => {
      if (event.key !== 'tigerbook-theme') return
      explicitChoice.current = event.newValue === 'dark' || event.newValue === 'light'
      setTheme(explicitChoice.current ? event.newValue as Theme : preference.matches ? 'dark' : 'light')
    }
    window.addEventListener('storage', syncTabs)
    return () => { preference.removeEventListener('change', followSystem); window.removeEventListener('storage', syncTabs) }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111315' : '#f7f8fa')
  }, [theme])

  function toggle() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    explicitChoice.current = true
    setTheme(nextTheme)
    try { localStorage.setItem('tigerbook-theme', nextTheme) } catch { /* Keep the toggle functional without storage. */ }
  }

  return <button className="icon-button theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
    {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
  </button>
}

function MediaContent({ media, expanded = false }: { media: ProjectMedia; expanded?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="media-fallback"><Monitor size={36} /><span>Preview unavailable</span></div>
  if (media.kind === 'video') {
    if (!expanded && media.poster) return <img src={media.poster} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />
    return <video src={media.src} poster={media.poster} controls={expanded} muted={!expanded} playsInline preload="metadata" aria-label={media.alt} onError={() => setFailed(true)} />
  }
  return <img src={media.src} alt={media.alt} loading={expanded ? 'eager' : 'lazy'} width={1200} height={750} onError={() => setFailed(true)} />
}

function ProjectCard({ project, onPreview }: { project: Project; onPreview: (project: Project) => void }) {
  return <article className={`project-card ${project.featured ? 'featured-card' : ''}`} aria-labelledby={`${project.id}-title`}>
    <button className={`project-visual visual-${project.id}`} onClick={() => onPreview(project)} aria-label={`Open ${project.title} ${project.media.kind === 'video' ? 'video' : 'preview'}`}>
      <MediaContent media={project.media} />
      <span className="preview-control">{project.media.kind === 'video' ? <Play size={15} /> : <ZoomIn size={15} />}<span>{project.media.kind === 'video' ? 'Watch demo' : 'View preview'}</span></span>
    </button>
    <div className="project-body">
      <div className="project-meta"><span>{project.category}</span>{project.featured && <span className="featured-label"><Sparkles size={12} /> Featured</span>}</div>
      <h3 id={`${project.id}-title`}>{project.title}</h3>
      <p className="project-tagline">{project.tagline}</p>
      <p className="project-description">{project.description}</p>
      <ul className="stack-list" aria-label="Technology stack">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
      {project.packages && <ul className="package-links" aria-label="Published npm packages">{project.packages.map(pkg => <li key={pkg.url}><a href={pkg.url} target="_blank" rel="noopener noreferrer" aria-label={`${pkg.name} on npm (opens in new tab)`}><span className="npm-label">npm</span><span className="package-name">{pkg.name}</span><ExternalLink size={14} /></a></li>)}</ul>}
      <div className="project-actions">
        {project.github
          ? <a className="code-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub (opens in new tab)`}><Github size={16} /> GitHub</a>
          : <span className="local-label"><LockKeyhole size={14} />Private source</span>}
        {project.website
          ? <a className="visit-link" href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} (opens in new tab)`}>{project.websiteLabel ?? 'Visit site'}<ExternalLink size={14} /></a>
          : <span className="local-label"><Code2 size={14} />{project.websiteNote ?? 'No demo linked'}</span>}
      </div>
    </div>
  </article>
}

function PreviewDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const element = dialog.current
    if (!element || !project) return
    element.showModal()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { element.close(); document.body.style.overflow = oldOverflow }
  }, [project])

  return <dialog ref={dialog} className="preview-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-labelledby="preview-title" aria-describedby="preview-caption">
    {project && <div className="dialog-content">
      <div className="dialog-heading"><div><span className="eyebrow">PROJECT PREVIEW</span><h2 id="preview-title">{project.title}</h2></div><button autoFocus onClick={onClose} className="icon-button" aria-label="Close preview"><X size={22} /></button></div>
      <div className="expanded-media"><MediaContent key={project.id} media={project.media} expanded /></div>
      <div className="dialog-footer"><p id="preview-caption">{project.media.caption ?? project.media.alt}</p>{project.website && <a href={project.website} className="code-link" target="_blank" rel="noopener noreferrer">Visit site <ExternalLink size={14} /></a>}</div>
    </div>}
  </dialog>
}

export default function App() {
  const [category, setCategory] = useState<string>('All projects')
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState<Project | null>(null)
  const filtered = projects.filter(project => (category === 'All projects' || project.category === category) && [project.title, project.description, project.tagline, ...project.stack].join(' ').toLowerCase().includes(query.toLowerCase().trim()))
  const hasFilter = category !== 'All projects' || query.trim() !== ''

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="page-width header-inner">
        <a href="#" className="brand" aria-label="Tigerbook home"><span className="brand-mark" aria-hidden="true">tb<span>.</span></span><span>Tigerbook<span className="brand-suffix"> / projects</span></span></a>
        <nav className="header-nav" aria-label="Main navigation"><a className="nav-work" href="#projects">Projects</a><a className="nav-about" href="#about">About</a><a className="header-github" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Tigerbook on GitHub (opens in new tab)"><Github size={18} /><span>GitHub</span></a><span className="nav-divider" /><ThemeToggle /></nav>
      </div>
    </header>

    <main id="main" className="page-width">
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy"><p className="hero-eyebrow"><span className="eyebrow-line" /> A PERSONAL CORNER OF THE INTERNET</p><h1 id="page-title">Tigerbook's<br /><span>Projects Page<span className="heading-period">.</span></span></h1><p className="hero-description">Small ideas, useful tools, and things built out of curiosity.<br className="desktop-break" /> A collection of what I've been working on.</p><a href="#projects" className="hero-link"><span className="little-grid" aria-hidden="true"><i /><i /><i /><i /></span>Explore the projects<span className="count-pill">{projects.length}</span></a></div>
        <div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-cross cross-one">+</div><div className="art-cross cross-two">+</div><div className="art-window"><div className="art-window-top"><span /><span /><span /><div>ideas → reality</div></div><div className="art-code"><span className="code-comment">// always a work in progress</span><p><span className="code-keyword">const</span> project = {'{'}</p><p className="code-indent">curiosity: <span className="code-string">"endless"</span>,</p><p className="code-indent">coffee: <span className="code-string">true</span>,</p><p className="code-indent">possibilities: <span className="code-value">Infinity</span></p><p>{'}'}<span className="code-cursor" /></p></div><div className="art-window-bottom"><Code2 size={13} /><span>build. learn. repeat.</span><Check size={13} /></div></div><div className="art-sticker"><Sparkles size={17} /><span>Made with curiosity</span></div></div>
      </section>

      <section id="projects" className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading"><div className="section-title"><h2 id="projects-title">Selected projects</h2><span className="section-count">{String(projects.length).padStart(2, '0')}</span></div><p>A few things from my workbench.</p></div>
        <div className="project-toolbar"><div className="category-filters" role="group" aria-label="Filter projects by category">{categories.map(item => <button key={item} className={`filter-button ${category === item ? 'is-active' : ''}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === 'All projects' && <span>{projects.length}</span>}</button>)}</div><div className="search-field"><Search size={16} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a project..." aria-label="Search projects" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</div></div>
        <p className="sr-only" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'} found</p>
        <div className={`project-grid ${hasFilter ? 'is-filtered' : ''}`}>{filtered.map(project => <ProjectCard key={project.id} project={project} onPreview={setPreview} />)}</div>
        {filtered.length === 0 && <div className="empty-state"><Search size={30} /><h3>No projects found</h3><p>Try another keyword or explore all the projects.</p><button className="reset-button" onClick={() => { setQuery(''); setCategory('All projects') }}>Show all projects</button></div>}
        <div className="collection-end"><span /><p>There's always another idea in the works.</p><span /></div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title"><div className="about-mark" aria-hidden="true"><Code2 size={25} /></div><div><h2 id="about-title">A little about this space.</h2><p>I'm Tigerbook. This is where my projects find a home — a place to share useful tools, explore ideas, and keep learning by building.</p></div><a href={profile.github} className="about-link" target="_blank" rel="noopener noreferrer"><Github size={17} />More on GitHub<ExternalLink size={14} /></a></section>
    </main>

    <footer className="site-footer page-width"><p>© {new Date().getFullYear()} Tigerbook<span className="footer-separator">/</span>Built with a little curiosity.</p><a href="https://www.tigerbook.top">www.tigerbook.top</a></footer>
    <PreviewDialog project={preview} onClose={() => setPreview(null)} />
  </>
}
