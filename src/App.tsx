import { Button } from "./components/ui/button"
import AuthLayout from "./auth/layout/AuthLayout"
import ChatLayout from "./chat/layout/ChatLayout"
import ChatPage from "./auth/pages/ChatPage"

function App() {

  return (
    <>
      {/* <AuthLayout /> */}
      <ChatLayout>
        <ChatPage />
      </ChatLayout>
    </>
  )
}

export default App
