'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CloudUpload,
  FileText,
  Filter,
  FolderOpen,
  GraduationCap,
  Grid2X2,
  Heart,
  Layers3,
  ListFilter,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Users,
  X,
} from 'lucide-react'

const categories = [
  { name: 'Lecture Notes', count: '128 resources', icon: FileText, tone: 'blue' },
  { name: 'Previous Year Papers', count: '84 resources', icon: BookOpen, tone: 'indigo' },
  { name: 'Practicals', count: '56 resources', icon: Layers3, tone: 'mint' },
  { name: 'Question Banks', count: '42 resources', icon: ListFilter, tone: 'amber' },
]

const resources = [
  { id: 1, title: 'Operating Systems — Unit 3 Notes', category: 'Lecture Notes', subject: 'Operating Systems', type: 'PDF', size: '2.4 MB', views: '1.2k', author: 'Aarav Mehta', time: '2 days ago', tone: 'blue', featured: true },
  { id: 2, title: 'Data Structures End-Sem 2024', category: 'Previous Year Papers', subject: 'Data Structures', type: 'PDF', size: '1.8 MB', views: '986', author: 'Riya Shah', time: '4 days ago', tone: 'indigo', featured: true },
  { id: 3, title: 'Microprocessors Lab Manual', category: 'Practicals', subject: 'Microprocessors', type: 'PDF', size: '4.1 MB', views: '743', author: 'Kabir Jain', time: '1 week ago', tone: 'mint', featured: true },
  { id: 4, title: 'Computer Networks Question Bank', category: 'Question Banks', subject: 'Computer Networks', type: 'DOCX', size: '820 KB', views: '618', author: 'Ananya Rao', time: '1 week ago', tone: 'amber' },
  { id: 5, title: 'DBMS Complete Syllabus Guide', category: 'Study Material', subject: 'Database Systems', type: 'PDF', size: '1.1 MB', views: '502', author: 'Dev Patel', time: '2 weeks ago', tone: 'blue' },
  { id: 6, title: 'Digital Logic Design PYQ Set', category: 'Previous Year Papers', subject: 'Digital Logic', type: 'PDF', size: '2.0 MB', views: '431', author: 'Mira Joshi', time: '2 weeks ago', tone: 'indigo' },
]

const toneClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  mint: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All resources')
  const [sort, setSort] = useState('Most popular')
  const [bookmarked, setBookmarked] = useState<number[]>([2])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const filteredResources = useMemo(() => {
    const filtered = resources.filter((resource) => {
      const matchesQuery = `${resource.title} ${resource.subject} ${resource.category}`.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All resources' || resource.category === category
      return matchesQuery && matchesCategory
    })
    return [...filtered].sort((a, b) => sort === 'Most popular' ? Number.parseFloat(b.views) - Number.parseFloat(a.views) : a.title.localeCompare(b.title))
  }, [category, query, sort])

  const toggleBookmark = (id: number) => {
    setBookmarked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    showToast(bookmarked.includes(id) ? 'Removed from bookmarks' : 'Saved to your bookmarks')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="CampusVault home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"><GraduationCap /></span>
            <span className="text-lg font-semibold tracking-tight">Campus<span className="text-primary">Vault</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">
            <a className="text-foreground" href="#resources">Browse resources</a>
            <a href="#categories" className="transition-colors hover:text-foreground">Categories</a>
            <a href="#about" className="transition-colors hover:text-foreground">How it works</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Notifications"><Bell /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-emerald-500" /></button>
            <button onClick={() => setUploadOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"><Plus /> Upload resource</button>
            <button className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-label="Open profile">AM</button>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 md:hidden" aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="flex flex-col gap-4 border-t border-border px-5 py-4 text-sm md:hidden"><a href="#resources">Browse resources</a><a href="#categories">Categories</a><a href="#about">How it works</a><button onClick={() => setUploadOpen(true)} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground"><Upload /> Upload resource</button></div>}
      </header>

      <section id="top" className="relative overflow-hidden border-b border-border/60 bg-secondary/45">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-sm"><Sparkles /> Built for curious minds</div>
            <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">Your campus knowledge, <span className="text-primary">organized.</span></h1>
            <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Find notes, papers, practicals, and study material shared by students across your department.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#resources" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">Explore resources <ArrowRight /></a><button onClick={() => setUploadOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold transition hover:bg-muted"><CloudUpload /> Share a resource</button></div>
            <div className="mt-9 flex items-center gap-5 text-sm text-muted-foreground"><div className="flex -space-x-2"><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-blue-100 text-xs font-semibold text-blue-700">RS</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-xs font-semibold text-emerald-700">AK</span><span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-amber-100 text-xs font-semibold text-amber-700">MJ</span></div><span><strong className="text-foreground">2,400+</strong> students contributing</span></div>
          </div>
          <div className="relative hidden w-full max-w-md lg:block"><div className="rounded-2xl border border-border bg-background p-5 shadow-xl shadow-primary/5"><div className="flex items-center justify-between border-b border-border pb-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">This semester</p><p className="mt-1 text-2xl font-semibold">Computer Engineering</p></div><span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen /></span></div><div className="grid grid-cols-2 gap-3 pt-4"><div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30"><p className="text-2xl font-semibold text-blue-700 dark:text-blue-300">310</p><p className="mt-1 text-xs text-blue-700/70 dark:text-blue-300/70">Resources shared</p></div><div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30"><p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">94%</p><p className="mt-1 text-xs text-emerald-700/70 dark:text-emerald-300/70">Course coverage</p></div></div><div className="mt-4 flex items-center gap-3 rounded-xl border border-border p-3"><div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"><Clock3 /></div><div className="flex-1"><p className="text-sm font-medium">Most active today</p><p className="text-xs text-muted-foreground">Data Structures · 18 uploads</p></div><ChevronRight className="text-muted-foreground" /></div></div><div className="absolute -bottom-5 -left-6 rounded-xl border border-border bg-background p-3 shadow-lg"><div className="flex items-center gap-2 text-sm font-medium"><span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><Users /></span> Shared by your peers</div></div></div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <section id="categories"><div className="flex items-end justify-between"><div><p className="text-sm font-semibold text-primary">Explore by type</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">What are you looking for?</h2></div><a href="#resources" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:flex">View all <ArrowRight /></a></div><div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{categories.map((item) => { const Icon = item.icon; return <button key={item.name} onClick={() => { setCategory(item.name); document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' }) }} className="group rounded-xl border border-border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:p-5"><span className={`flex size-10 items-center justify-center rounded-lg ${toneClasses[item.tone]}`}><Icon /></span><p className="mt-4 text-sm font-semibold group-hover:text-primary">{item.name}</p><p className="mt-1 text-xs text-muted-foreground">{item.count}</p></button> })}</div></section>

        <section id="resources" className="mt-16 scroll-mt-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-semibold text-primary">The resource library</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Popular resources</h2><p className="mt-1 text-sm text-muted-foreground">Fresh study material from your campus community.</p></div><button onClick={() => { setCategory('All resources'); setQuery('') }} className="self-start text-sm font-semibold text-primary">Clear filters</button></div>
          <div className="mt-7 flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row sm:items-center"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes, subjects, or keywords..." className="h-10 w-full rounded-lg border-0 bg-muted/60 pl-10 pr-4 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2" /></div><div className="flex gap-2"><div className="relative"><Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring"><option>All resources</option>{[...new Set(resources.map((r) => r.category))].map((name) => <option key={name}>{name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></div><div className="relative hidden sm:block"><SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 appearance-none rounded-lg border border-border bg-background pl-9 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Most popular</option><option>Alphabetical</option></select><ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /></div></div></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{filteredResources.map((resource) => <article key={resource.id} className="group rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"><div className="flex items-start justify-between"><span className={`flex size-10 items-center justify-center rounded-lg ${toneClasses[resource.tone]}`}><FileText /></span><button onClick={() => toggleBookmark(resource.id)} className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary" aria-label={`${bookmarked.includes(resource.id) ? 'Remove' : 'Add'} ${resource.title} ${bookmarked.includes(resource.id) ? 'from' : 'to'} bookmarks`}>{bookmarked.includes(resource.id) ? <BookmarkCheck className="text-primary" /> : <Bookmark />}</button></div><div className="mt-4"><span className="text-xs font-medium text-muted-foreground">{resource.category}</span><h3 className="mt-1 line-clamp-2 min-h-12 text-base font-semibold leading-6 group-hover:text-primary">{resource.title}</h3><p className="mt-2 text-xs text-muted-foreground">{resource.subject} · {resource.type} · {resource.size}</p></div><div className="mt-5 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground"><span>{resource.views} views</span><span>{resource.time}</span></div></article>)}</div>{filteredResources.length === 0 && <div className="rounded-xl border border-dashed border-border py-16 text-center"><FolderOpen className="mx-auto text-muted-foreground" /><p className="mt-3 font-medium">No resources found</p><p className="mt-1 text-sm text-muted-foreground">Try a different keyword or category.</p></div>}<div className="mt-7 flex items-center justify-between border-t border-border pt-5"><p className="text-sm text-muted-foreground">Showing <strong className="text-foreground">{filteredResources.length}</strong> of 310 resources</p><div className="flex gap-1"><button className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50" disabled aria-label="Previous page"><ChevronLeft /></button><button className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">1</button><button className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">2</button><button className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">3</button><button className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted" aria-label="Next page"><ChevronRight /></button></div></div></section>

        <section id="about" className="mt-16 rounded-2xl bg-primary px-6 py-9 text-primary-foreground sm:px-10 lg:flex lg:items-center lg:justify-between"><div><p className="text-sm font-semibold text-primary-foreground/70">Make studying a little easier</p><h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">Have something useful? Share it with your campus.</h2></div><button onClick={() => setUploadOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-background/90 lg:mt-0"><Upload /> Upload a resource</button></section>
      </div>

      <footer className="border-t border-border bg-secondary/30"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-semibold text-foreground"><span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"><GraduationCap /></span>CampusVault</div><p>Built by students, for students.</p><div className="flex gap-5"><a href="#about" className="hover:text-foreground">About</a><a href="#resources" className="hover:text-foreground">Feedback</a><a href="#top" className="hover:text-foreground">Back to top</a></div></div></footer>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background shadow-xl"><Heart className="size-4 text-emerald-400" />{toast}</div>}
      {uploadOpen && <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/35 p-5" role="dialog" aria-modal="true" aria-labelledby="upload-title"><div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h2 id="upload-title" className="text-xl font-semibold">Share a resource</h2><p className="mt-1 text-sm text-muted-foreground">Help a classmate find what they need.</p></div><button onClick={() => setUploadOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close upload dialog"><X /></button></div><label htmlFor="resource-file" className="mt-6 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-primary/30 bg-primary/5 px-5 py-10 text-center transition hover:bg-primary/10"><span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><CloudUpload /></span><span className="mt-3 text-sm font-semibold">Drop a file here or browse</span><span className="mt-1 text-xs text-muted-foreground">PDF, DOCX, PPTX up to 10 MB</span><input id="resource-file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" className="sr-only" onChange={(event) => { if (event.target.files?.[0]) showToast(`${event.target.files[0].name} ready to upload`) }} /></label><div className="mt-5 flex justify-end gap-2"><button onClick={() => setUploadOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button><button onClick={() => { setUploadOpen(false); showToast('Upload flow started') }} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Continue</button></div></div></div>}
    </main>
  )
}
