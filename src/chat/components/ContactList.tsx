import { NavLink, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { getClients } from "@/fake/fake-data"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"


export const ContactList = () => {

  const { clientId } = useParams();

  const { data: clients , isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="space-y-4 p-4">
            <div className="space-y-1">
              <h3 className="px-2 text-sm font-semibold">Contacts</h3>
              <div className="space-y-1">

                { isLoading && (
                  
                    <div className="flex items-center mt-3">
                      <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse mr-2" />
                      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                    </div>
                  
                )}

                {clients?.map((client) => (
                  <NavLink
                    key={client.id}
                    to={`/chat/${client.id}`}
                    className={({isActive}) => `w-full flex items-center mt-3 duration-300 transition-all ${ isActive && 'bg-primary/20 rounded-2xl'}`}
                  >
                    <div className={`h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center  text-xs
                      ${clientId === client.id ? 'bg-primary/10 text-blue-500 font-medium': 'text-blue-300'}
                      `}>
                      {client.name.charAt(0)}{client.name.charAt(1)}
                    </div>
                    <span className={`transition-all duration-300 ${clientId === client.id ? 'text-blue-600 font-medium': 'text-gray-600'}`}>{client.name}</span>
                  </NavLink>
                ))}

                {/* {
                  clients?.map((client) => (
                    <NavLink to={`/chat/${client.id}`} className="w-full flex items-center mt-3">
                      <div className={({isActive}) => 'h-6 w-6 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs'}>
                        {client.name.charAt(0)}
                      </div>
                      <span className="text-gray-600">{client.name}</span>
                    </NavLink>

                  ))                    
                } */}
                
                
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
              <Button variant="ghost" className="w-full justify-start">
                <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  TM
                </div>
                Thomas Miller
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                  SB
                </div>
                Sarah Brown
              </Button>
            </div>
          </div>
        </ScrollArea>
  )
}
