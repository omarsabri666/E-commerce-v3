import { Link } from "react-router-dom";

function Modal({setIsOpen,isOpen}) {
    if(!isOpen) return null
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto relative">
          <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 mt-4 mr-4 text-black text-2xl">
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Sign In Required</h2>
          <p className="mb-4">You need to sign in to add items to the cart.</p>
          {/* <button
            className="py-2 px-4 bg-blue-500 text-white rounded"
            onClick={onClose}
          >
            OK
          </button> */}
          
          <Link
            to={"/signIn"}
            className="py-2 px-4 bg-omar text-white rounded"
          >
            Sign In 
          </Link>
        </div>
      </div>
    );
}

export default Modal
