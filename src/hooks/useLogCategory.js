import { useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { fetchAllLogCategoriesByUserId, insertLogCategory, insertLogCategoryAndFetchLast } from "../services/logCategories"
import { renderErrorToast, renderSuccessToast } from "../utils/toast"
import { useLogStore } from "../store/logs"

const useLogCategory = () => {
  const [addLogCategory, setLogCategories] = useLogStore((state) => [state.addLogCategory, state.setLogCategories])
  const [category, setCategory] = useState(null)

  const allUserLogCategoriesQuery = useQuery({
    queryKey: ['logCategories', 'all', 'user'],
    queryFn: fetchAllLogCategoriesByUserId,
    onSuccess: (data) => {
      setLogCategories(data)
    },
    enabled: false
  })
  const createLogCategory = useMutation(insertLogCategory)
  const createLogCategoryAndFetchLast = useMutation(insertLogCategoryAndFetchLast)

  const getAllUserLogCategories = () => allUserLogCategoriesQuery.refetch()

  const handleLogCategoryCreation = ({ onSuccess = () => {} }) => {
    createLogCategoryAndFetchLast.mutate({
      name: category
    }, {
      onSuccess: (data) => {
        addLogCategory(data[0])
        renderSuccessToast('Categoria creada con éxito')
        onSuccess(data[0])
      },
      onError: (error) => {
        renderErrorToast(error.message)
        console.log(error)
      }
    })
  }

  const handleChange = (e) => {
    setCategory(e.target.value)
  }

  const isLogCategoryCreating = useMemo(() => createLogCategoryAndFetchLast.isLoading, [createLogCategoryAndFetchLast.isLoading])

  return {
    handleLogCategoryCreation,
    getAllUserLogCategories,
    handleChange,
    isLogCategoryCreating
  }
}

export default useLogCategory