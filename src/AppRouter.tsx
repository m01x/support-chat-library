import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { sleep } from "./lib/sleep"
import { checkAuth } from "./fake/fake-data"
import AuthLayout from "./auth/layout/AuthLayout"
import { PrivateRoutes } from "./auth/components/PrivateRoutes"
import { LoginPage } from "./auth/pages/LoginPage"
import { RegisterPage } from "./auth/pages/RegisterPage"

//import ChatLayout from "./chat/layout/ChatLayout"
const ChatLayout = lazy( async() => {
    await sleep(1500);
    return import("./chat/layout/ChatLayout");
});

const ChatPage = lazy( async() => import("./chat/pages/ChatPage"));
const NoChatSelected = lazy( async() => import("./chat/pages/NoChatSelected"));
export const AppRouter = () => {

    const { data: user, isLoading , isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => {
            const token = localStorage.getItem("token");
            if(!token){
                throw new Error("No token found");
            }
            return checkAuth(token);
        }
    });

    if(isLoading){
        return (
            <div className="h-screen w-full flex items-center justify-center">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce"></div>
              </div>
            </div>
          );
    }
    
    
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
                            <PrivateRoutes isAuthenticated={!!user}>

                            <ChatLayout />
                            </PrivateRoutes>
                        </Suspense>
                } >
                    <Route index element={<NoChatSelected />} />
                    <Route path="/chat/:clientId" element={<ChatPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route path="*" element={<Navigate to="/auth" />} />

            </Routes>

        </BrowserRouter>
    )
}
