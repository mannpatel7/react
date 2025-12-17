import { useState } from "react";
import { useParams } from "react-router-dom";
import menue from "../../menue.json";
import rest from "../../dishes.json";
import CategoryAccordion from "./catagory";
import RestaurantMap from "./restaurantmap";

const Restaurantmenue = () => {
  const { id } = useParams();

  const [menuItems] = useState(
    menue.filter((item) => item.restaurantId === Number(id))
  );

  const restaurant = rest.find((r) => r.id === Number(id)) || {};

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="pt-6 pr-4 pb-12 pl-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <h2 className="font-bold text-lg mb-4">
        {restaurant.name}
      </h2>

      {menuItems.length === 0 ? (
        <p>No menu available for this restaurant.</p>
      ) : (
        Object.entries(groupedMenu).map(([category, items]) => (
          <CategoryAccordion
            key={category}
            category={category}
            items={items}
          />
        ))
      )}
      <RestaurantMap mapEmbed={restaurant.mapEmbed} />
      <footer className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Foodie's Paradise. All rights reserved.
      </footer>
    </div>
  );
};

export default Restaurantmenue;
