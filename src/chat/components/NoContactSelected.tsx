export const NoContactSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
      <div className="h-20 w-20 rounded-full border-2 border-dashed mb-4 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <p className="text-lg">Por favor selecciona un cliente para comenzar el chat</p>
    </div>
  )
}


