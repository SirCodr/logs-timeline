export interface Log {
  id: number
  title: string
  date: string
  createdAt: string
  updatedAt: string
  categoryId: string
  categoryName: string
}

export interface LogCategory {
  id: number
  name: string
}

export type LogFilterKeyOption = 'date' | 'categoryName'