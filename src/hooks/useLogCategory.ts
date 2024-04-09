import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  fetchAllLogCategoriesByUserId,
  insertLogCategory,
  insertLogCategoryAndFetchLast
} from '../services/logCategories'
import { renderErrorToast, renderSuccessToast } from '../utils/toast'
import { useLogStore } from '../store/logs'
import { LogCategory } from '../types/log'

const useLogCategory = () => {
  const [addLogCategory, setLogCategories] = useLogStore((state) => [
    state.addLogCategory,
    state.setLogCategories
  ])
  const [category, setCategory] = useState<string>('')

  const allUserLogCategoriesQuery = useQuery({
    queryKey: ['logCategories', 'all', 'user'],
    queryFn: fetchAllLogCategoriesByUserId<LogCategory>,
    onSuccess: (res) => {
      setLogCategories(res.data)
    },
    enabled: false
  })
  const createLogCategoryMutation = useMutation(insertLogCategory<LogCategory>)
  const createLogCategoryAndFetchLast = useMutation(
    insertLogCategoryAndFetchLast
  )

  const getAllUserLogCategories = () => allUserLogCategoriesQuery.refetch()

  const handleLogCategoryCreation = ({ onSuccess = () => {} }: { onSuccess?: (prop: string) => void } ) => {
    createLogCategoryAndFetchLast.mutate(
      {
        name: category
      },
      {
        onSuccess: ({ data }) => {
          addLogCategory(data[0])
          renderSuccessToast('Categoria creada con éxito')
          onSuccess(data[0])
        },
        onError: (error) => {
          renderErrorToast(error as string)
          console.log(error)
        }
      }
    )
  }

  const handleChange = (value: string) => {
    setCategory(value)
  }

  return {
    createLogCategoryMutation,
    handleLogCategoryCreation,
    getAllUserLogCategories,
    handleChange,
  }
}

export default useLogCategory
