import React, { useState, useEffect } from "react";
import Restaurantcard,{withpromoted} from "./restaurantcard copy";
import dishes from "../../dishes.json";
import Shimmer from "./shimmer";
import useOnlineStatus from "./useonlinestatus";

const Body = () => {
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleTopRated = () => {
        const topRated = dishes.filter(dish => dish.rating > 4.5);
        setFilteredDishes(topRated);
    };

    const handleAllDishes = () => {
        setFilteredDishes(dishes);
    };

    const handlePrefered = () => {
        const preferedDishes = dishes.filter(dish => dish.isPreferred);
        setFilteredDishes(preferedDishes);
    };

    useEffect(() => {
        setFilteredDishes(dishes);
    }, []);

    const onlinestatus=useOnlineStatus();

    if(onlinestatus===false)
        return(
            <h1>OOPs!! it seems You are offline</h1>
        )
        const Promotedrestro=withpromoted(Restaurantcard);
    return filteredDishes.length === 0 ? <Shimmer /> : (
        <div className="body bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen">
            
            <div className="flex justify-center items-center p-3 bg-gray-800 gap-4">

                <input 
                    type="text" 
                    placeholder="search for restaurants" 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                   className="w-[500px] py-3 px-8 text-xl rounded-lg"
                />

                <button onClick={() => {
                    const filtered = dishes.filter((dish) =>
                        dish.name.toLowerCase().includes(searchText.toLowerCase())
                    );
                    setFilteredDishes(filtered);
                }} className=" px-5 py-3  bg-blue-500 rounded-lg">
                    Search
                </button>

                <button  onClick={handleTopRated} className=" px-3 py-3 bg-blue-500 rounded-lg">Top Rated</button>
                <button  onClick={handlePrefered} className=" px-3 py-3  bg-blue-500 rounded-lg">Prefered</button>
                <button  onClick={handleAllDishes} className=" px-3 py-3 bg-blue-500 rounded-lg">All Restaurant</button>
            </div>
                
            <div className="grid grid-cols-4 gap-3 p-3">
    {filteredDishes.map((dish) => (
        dish.isPromoted ? (
            <Promotedrestro key={dish.id} restaurant={dish} />
        ) : (
            <Restaurantcard key={dish.id} restaurant={dish} />
        )
    ))}
</div>

        </div>
        
    );
};

export default Body;
