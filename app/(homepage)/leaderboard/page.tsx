export default function Leader() {

    
   
  return (
    <div className="p-4">
      {/* Hide button during print */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
         
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Print PDF
        </button>
      </div>

    </div>
  );
}