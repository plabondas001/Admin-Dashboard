
import Header from "./Components/Layout/Header"
import Sidebar from "./Components/Layout/Sidebar"

function App() {

  return (
   <div className="min-h-screen bg-blue-100/20 dark:from-slate-200 dark:via-slate-200 dark:to-slate-200 transition-all duration-500">
    <div className="flex h-screen overflow-hidden">
   <Sidebar></Sidebar>
   <div className="flex-1 flex flex-col overflow-hidden">
    <Header></Header>
   </div>
    </div>
   </div>
  )
}

export default App
