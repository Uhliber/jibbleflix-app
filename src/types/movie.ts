export interface Movie {
  Title: string
  Year: string
  imdbID: string
  isFavorite?: boolean
}

export interface Pagination {
  page: number
  per_page: number
  total: number
  total_pages: number
  pages: number[]
}

export interface MovieResponse extends Pagination {
  data: Movie[]
}
