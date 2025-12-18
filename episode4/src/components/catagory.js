import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartslice";

const CategoryAccordion = ({ category, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="rounded-lg mb-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">

      {/*Accordion Header */}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg"
      >
        <span className="text-lg font-bold">{category}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      
      

      {/* Accordion Body */}
      
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out
        ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-slate-700">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="bg-white dark:bg-slate-800 rounded-lg shadow p-3 border border-gray-100 dark:border-slate-700"
            >
              <div
                className="h-32 bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <h4 className="font-bold mt-2">{item.name}</h4>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded text-white
                  ${item.isVeg ? "bg-green-700" : "bg-red-700"}`}
                >
                  {item.isVeg ? "VEG" : "NON-VEG"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">₹{item.price*100}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAddItems(item)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
          
    </div>
    
  );
};

export default CategoryAccordion;
