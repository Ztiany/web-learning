import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutsideDetector = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handleOutsideClick = (event: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = !elementRef.value.contains(event.target as HTMLElement)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
  })

  return isClickOutside
}

export default useClickOutsideDetector
