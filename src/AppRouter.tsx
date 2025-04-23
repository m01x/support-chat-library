import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import AuthLayout from "./auth/layout/AuthLayout"
import ChatPage from "./chat/pages/ChatPage"
import { LoginPage } from "./auth/pages/LoginPage"
import { RegisterPage } from "./auth/pages/RegisterPage"
import { sleep } from "./lib/sleep"

//import ChatLayout from "./chat/layout/ChatLayout"
const ChatLayout = lazy( async() => {
    await sleep(1500);
    return import("./chat/layout/ChatLayout");
});

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    {/* <Route path="login" element={<Login />} /> */}
                </Route>

                <Route path="/chat" element={
                    <Suspense
                        fallback={
                          <div className="h-screen w-full flex items-center justify-center">
                            <div className="flex gap-2">
                              <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce"></div>
                            </div>
                          </div>
                        }>
                            <ChatLayout />
                        </Suspense>
                } >
                    <Route index element={<ChatPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />

            </Routes>

        </BrowserRouter>
    )
}
