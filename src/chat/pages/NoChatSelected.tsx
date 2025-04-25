

export const NoChatSelected = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <div className="text-center">
        <h3 className="text-lg font-bold">No hay chat seleccionado</h3>
        <p>Por favor selecciona una nueva conversación</p>
      </div>
    </div>
  )
}
export default NoChatSelected;


