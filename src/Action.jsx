import { useContext } from "react"
import { Context } from "./Context"

export default function Action() {
    const { logout, setLogout } = useContext(Context);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLogout(false);
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <div className="bg-neutral-900 p-6 rounded-2xl shadow-2xl w-80 text-center border border-neutral-700">
    <h1 className="text-lg text-red-200 font-semibold mb-6">Confirm Logout</h1>
    
    <div className="w-full flex justify-between mt-4 gap-4">
      <button 
        className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200"
        onClick={handleLogout}
      >
        Logout
      </button>
      
      <button 
        className="flex-1 bg-gray-600 hover:bg-gray-700 active:scale-95 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200"
        onClick={() => setLogout(false)}
      >
        Cancel
      </button>
    </div>
  </div>
</div>

    )
}