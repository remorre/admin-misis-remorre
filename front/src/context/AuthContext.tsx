import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  user: unknown | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<unknown | null>(null)

  const login = async (email: string, password: string) => {
    // Здесь должна быть реальная логика аутентификации
    console.log("Logging in with:", email, password)
    setUser({ email })
  }

  const register = async (email: string, password: string) => {
    // Здесь должна быть реальная логика регистрации
    console.log("Registering with:", email, password)
    setUser({ email })
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

