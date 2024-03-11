import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import {
  fetchAllLogCategoriesByUserId,
  insertLogCategory,
  insertLogCategoryAndFetchLast
} from '../services/logCategories'
import { renderErrorToast, renderSuccessToast } from '../utils/toast'
import { useLogStore } from '../store/logs'

const useLogCategory = () => {
  const [addLogCategory, setLogCategories] = useLogStore((state) => [
    state.addLogCategory,
    state.setLogCategories
  ])
  const [category, setCategory] = useState(null)

  const allUserLogCategoriesQuery = useQuery({
    queryKey: ['logCategories', 'all', 'user'],
    queryFn: fetchAllLogCategoriesByUserId,
    onSuccess: (res) => {
      setLogCategories(res.data)
    },
    enabled: false
  })
  const createLogCategoryMutation = useMutation(insertLogCategory)
  const createLogCategoryAndFetchLast = useMutation(
    insertLogCategoryAndFetchLast
  )

  const getAllUserLogCategories = () => allUserLogCategoriesQuery.refetch()

  const handleLogCategoryCreation = ({ onSuccess = () => {} }) => {
    createLogCategoryAndFetchLast.mutate(
      {
        name: category
      },
      {
        onSuccess: (data) => {
          addLogCategory(data[0])
          renderSuccessToast('Categoria creada con éxito')
          onSuccess(data[0])
        },
        onError: (error) => {
          renderErrorToast(error.message)
          console.log(error)
        }
      }
    )
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  return {
    createLogCategoryMutation,
    handleLogCategoryCreation,
    getAllUserLogCategories,
    handleChange,
  }
}

export default useLogCategory