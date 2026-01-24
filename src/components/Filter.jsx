import { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function Filter({ items, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-auto" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-56 px-6 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white font-medium flex items-center justify-between hover:bg-black/30 transition-all shadow-lg text-left"
      >
        <span className="truncate mr-2">{selected}</span>
        <HiChevronDown className={`text-purple-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full md:w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                ${selected === item 
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white font-bold border border-purple-500/30" 
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
