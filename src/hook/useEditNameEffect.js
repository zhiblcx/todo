import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editName } from '@/components/features/user/userSlice.js'

function useEditNameEffect(props) {
  const { userName } = props
  const inputFocus = useSelector((state) => state.userInfo.visible)
  const currentName = useSelector((state) => state.userInfo.name)
  const dispatch = useDispatch()

  useEffect(() => {
    userName.current.setAttribute('placeholder', 'update name')
    if (inputFocus == true) {
      userName.current.focus()
      const current = currentName
      userName.current.value = current
    } else {
      if (userName.current.value.trim() == '') {
        return
      }
      if (userName.current.value.length < 11) {
        dispatch(editName({ name: userName.current.value }))
      }
    }
  }, [inputFocus])
}

export default useEditNameEffect
