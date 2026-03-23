import { useState, useEffect, useCallback } from 'react'

const GITHUB_USERNAME = 'masterharry9889'
const CACHE_KEY = 'github_repos_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function useGitHubRepos() {
  const [repos, setRepos] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    // Check cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          setRepos(data.repos)
          setProfile(data.profile)
          setLoading(false)
          return
        }
      }
    } catch {}

    setLoading(true)
    try {
      const [reposRes, profileRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      ])

      if (!reposRes.ok || !profileRes.ok) throw new Error('GitHub API error')

      const [reposData, profileData] = await Promise.all([
        reposRes.json(),
        profileRes.json(),
      ])

      // Filter out profile config repo
      const filtered = reposData.filter(r => r.name !== GITHUB_USERNAME)

      setRepos(filtered)
      setProfile(profileData)

      // Cache it
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { repos: filtered, profile: profileData },
        timestamp: Date.now(),
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, CACHE_TTL)
    return () => clearInterval(interval)
  }, [fetchData])

  return { repos, profile, loading, error, refetch: fetchData }
}

// Language color map
export const langColors = {
  Python: '#3572A5',
  'Jupyter Notebook': '#DA5B0B',
  JavaScript: '#F1E05A',
  TypeScript: '#3178C6',
  Java: '#B07219',
  HTML: '#E44B23',
  CSS: '#563D7C',
  C: '#555555',
  'C++': '#F34B7D',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Swift: '#FA7343',
  default: '#6c63ff',
}

export const getLangColor = (lang) => langColors[lang] || langColors.default
