import { useState } from "react";
import { useParams } from "react-router-dom";
import menue from "../../../menue.json";
import rest from "../../../dishes.json";

const Restaurantmenue = () => {
    const { id } = useParams(); // get dynamic restaurant ID from URL

    const [menuItems] = useState(
        menue.filter((item) => item.restaurantId === Number(id)) // filter by restaurant
    );

    const restaurant = rest.find((r) => r.id === Number(id)) || {};

    return (
        <div className="menu-page">
            <header className="menu-header">
                <div className="menu-title-row">
                    <h2 className="restaurant-name">{restaurant.name || "Restaurant"}</h2>
                    <div className="restaurant-meta">
                        {restaurant.cuisine && <span className="cuisine">{restaurant.cuisine}</span>}
                        <span className="rating">{restaurant.rating ? `⭐ ${restaurant.rating}` : ""}</span>
                    </div>
                </div>
                {restaurant.description && (
                    <p className="restaurant-desc">{restaurant.description}</p>
                )}
            </header>

            <h3 className="section-title">Menu</h3>

            {menuItems.length === 0 ? (
                <p className="empty">No menu available for this restaurant.</p>
            ) : (
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <article className="menu-card" key={item.id}>
                            <div
                                className="menu-image"
                                style={{ backgroundImage: `url(${item.image})` }}
                                aria-hidden="true"
                            />
                            <div className="menu-content">
                                <div className="menu-top">
                                    <h4 className="menu-name">{item.name}</h4>
                                    <div className="menu-category">{item.category}</div>
                                </div>
                                <div className="menu-desc">
                                    <span className={item.isVeg ? "veg-badge" : "nonveg-badge"}>
                                        {item.isVeg ? "VEG" : "NON-VEG"}
                                    </span>
                                </div>
                                <div className="menu-bottom">
                                    <span className="menu-price">₹{item.price*100}</span>
                                    <button className="add-btn">Add</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Restaurantmenue;
