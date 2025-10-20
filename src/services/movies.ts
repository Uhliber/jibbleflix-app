import type { MovieResponse } from '@/types/movie'

const baseUrl = import.meta.env.VITE_API_URL

export async function fetchMovies(title?: string, page = 1): Promise<MovieResponse> {
  const params = new URLSearchParams()
  if (title) params.append('Title', title)
  params.append('page', page.toString())

  const response = await fetch(`${baseUrl}/movies/search/?${params.toString()}`)

  if (!response.ok) throw new Error(`Failed to fetch movies: ${response.statusText}`)

  return response.json()
}
