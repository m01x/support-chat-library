import { useState } from "react"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { getClientMessages } from "@/fake/fake-data"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from "lucide-react"
// Una de las ventajas de tanstack es que no necesitas definir interfaces, 
// puedes usar el tipo de dato que te devuelve la API. 
// interface Message {        
//   role: "agent" | "user"
//   content: string
//   timestamp: string
// }

export default function ChatPage() {

  const { clientId } = useParams();
  
  
  const [input, setInput] = useState("");

  const { data: messages=[], isLoading } = useQuery({
    queryKey: ['messages', clientId],
    queryFn: () => getClientMessages(clientId ?? ''),
  });

  if (isLoading) return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center">
        <span className="text-cyan-400">Cargando</span>
        <div className="flex">
          <span className="text-cyan-400 animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="text-cyan-400 animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="text-cyan-400 animate-bounce">.</span>
        </div>
      </div>
    </div>
  );



  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "agent" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">{message.createdAt.toLocaleString()}</span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground opacity-50"
              >
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
                <path d="M9 16h6" />
              </svg>
              <p className="text-muted-foreground text-sm">No hay mensajes</p>
              <p className="text-muted-foreground text-xs">Envía un mensaje para empezar la conversación</p>
            </div>
          </div>

        </div>
      )}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

