/**
 * Bu dosya, uygulamada kullanılan özel bir bildirim (Toast) yönetim sistemini içerir.
 * `@/components/ui/toast` bileşenlerini kullanarak bildirimleri yönetir ve gösterir.
 * Bu yönetim sistemi, react-hot-toast kütüphanesinden esinlenilerek tasarlanmıştır.
 */

import * as React from "react"

import { ToastActionElement, type ToastProps } from "@/components/ui/toast"

// Her kullanıcının aynı sayıda bildirim görebilmesi için bir sınırlama
const TOAST_LIMIT = 1
// Bildirimin otomatik olarak kaldırılması için gecikme süresi
const TOAST_REMOVE_DELAY = 1000000

// Her bir Toast bileşenini temsil eden veri yapısı
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Action türlerini ve ActionType konfigürasyonunu içeren bir nesne
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

// Her yeni Toast bileşeni için benzersiz bir ID oluşturan sayaç
let count = 0

// ID oluşturma işlevi
function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

// ActionType türündeki action'ları temsil eden bir tür
type ActionType = typeof actionTypes

// Reducer için action türlerini içeren Action türü
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// State türü, yönetilen bildirimlerin listesini içerir
interface State {
  toasts: ToasterToast[]
}

// Bildirimlerin otomatik kapatılması için kullanılan zaman aşımı işlemlerini yöneten harita
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Bildirim kuyruğuna ekleme işlevi
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    // Bildirimi kaldırmak için REMOVE_TOAST action'ını tetikleme
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Reducer işlevi, state'i güncellemek için action'ları işler
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // Yeni bir bildirim eklemek için ADD_TOAST action'ı
    case "ADD_TOAST":
      return {
        ...state,
        // Yeni bildirimi ekleyerek TOAST_LIMIT'e uygun bir liste oluşturun
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    // Bir bildirimi güncellemek için UPDATE_TOAST action'ı
    case "UPDATE_TOAST":
      return {
        ...state,
        // Belirli bir bildirimi güncelleyerek yeni bir liste oluşturun
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    // Bir bildirimi kapatmak için DISMISS_TOAST action'ı
    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Yan etki ! - Bu, dismissToast() action'ına çıkarılabilir,
      // ancak basitlik için burada tutuyorum
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        // Belirli bir bildirimi veya tüm bildirimleri kapatmak için open değerini güncelleyin
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    // Bir bildirimi kaldırmak için REMOVE_TOAST action'ı
    case "REMOVE_TOAST":
      // Eğer belirli bir bildirim yoksa, tüm bildirimleri temizle
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      // Belirli bir bildirimi kaldırarak yeni bir liste oluşturun
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Zaman aşımı işlemlerini yöneten bir dizi
const listeners: Array<(state: State) => void> = []

// Bellekteki mevcut durumu içeren bir nesne
let memoryState: State = { toasts: [] }

// State güncellendiğinde tüm dinleyicilere haber veren işlev
function dispatch(action: Action) {
  // Bellekteki durumu güncelleme
  memoryState = reducer(memoryState, action)
  // Tüm dinleyicilere yeni durumu iletme
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Bildirim bileşeninin özelliklerini içeren bir tür
interface Toast extends Omit<ToasterToast, "id"> {}

// Toast fonksiyonu, yeni bir bildirim oluşturur ve bunu gösterir
function toast({ ...props }: Toast) {
  // Her bildirim için benzersiz bir ID oluştur
  const id = genId()

  // Bildirimi güncelleme işlevi
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // Bildirimi kapatma işlevi
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // ADD_TOAST action'ı ile yeni bir bildirimi ekleyin
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      // Bildirimin kapatılma durumu değiştiğinde gerçekleşecek işlev
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // ID, kapatma ve güncelleme işlevlerini içeren bir nesne döndürme
  return {
    id: id,
    dismiss,
    update,
  }
}

// Bildirim kancası
function useToast() {
  // State ve state'i güncellemek için bir işlev
  const [state, setState] = React.useState<State>(memoryState)

  // Komponent demontaj edildiğinde dinleyiciyi temizleme
  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // State ve bazı işlevleri içeren bir nesne döndürme
  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Custom hook ve toast fonksiyonunu dışa aktarma
export { useToast, toast }
