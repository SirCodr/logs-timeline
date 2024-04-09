export interface Log {
  id: number
  title: string
  date: string
  createdAt: string
  updatedAt: string
  categoryId: string
  categoryName: string
}

export interface LogForServer {
  title: string
  date: string
  category_id: string
}

export interface LogCategory {
  id: number | null
  name: string
}