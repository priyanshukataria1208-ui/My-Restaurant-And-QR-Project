import React from "react";
import { Utensils, ArrowRight, Star, Clock, Award, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full">

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-orange-100">

        {/* Floating gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border rounded-full shadow-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700 text-sm">Rated 4.8 by 5k+ Customers</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Savor the Best
              <span className="block bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Vegetarian Delicacies
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-xl">
              Enjoy fresh, healthy, and delicious vegetarian dishes crafted by top chefs.
              Delivered hot & fast — straight to your table.
            </p>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-6 pt-2">
              <Feature icon={<Clock />} label="Fast Delivery" />
              <Feature icon={<Award />} label="Premium Quality" />
              <Feature icon={<Utensils />} label="100% Vegetarian" />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate("/menu")}
                className="group px-8 py-3 bg-yellow-500 text-white font-semibold rounded-xl shadow hover:bg-yellow-600 transition-all flex items-center gap-2"
              >
                Explore Menu
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              <button className="px-8 py-3 bg-black border rounded-xl shadow hover:bg-gray-100 transition-all">
                Reserve Table
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t pt-6 border-gray-300/50">
              <Stat number="50K+" label="Happy Customers" />
              <Stat number="3" label="Branches" />
              <Stat number="49+" label="Dishes" />
            </div>
          </div>

          {/* RIGHT IMAGE / CARDS */}
          <div className="relative hidden lg:block animate-slideUp">
            <div className="flex gap-4">
              <FoodCard color="yellow" />
              <FoodCard color="orange" />
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg">
              Free Delivery Above ₹500
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR DISHES */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Popular Dishes
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          <DishCard title="Starbucks" img="download.jpeg" />
          <DishCard title="Veg Burger" img="burger2.jpg" />
          <DishCard title="Masala Dosa" img="masaladosa.jpg" />
        </div>
      </div>

    </div>
  );
};

/* COMPONENTS */

const Feature = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-gray-700">
    <span className="w-5 h-5 text-yellow-500">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900">{number}</div>
    <div className="text-xs text-gray-500 tracking-wider">{label}</div>
  </div>
);

const FoodCard = ({ color }) => (
  <div className={`flex-1 bg-white border shadow-lg rounded-2xl p-6 hover:border-${color}-400 transition`}>
    <div className={`w-full h-48 bg-${color}-100 rounded-xl mb-4 flex items-center justify-center`}>
      <Flame className={`w-16 h-16 text-${color}-500`} />
    </div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const DishCard = ({ title, img }) => (
  <div className="
    group bg-white border rounded-2xl shadow-md 
    hover:shadow-2xl transition-all duration-300 
    overflow-hidden cursor-pointer hover:-translate-y-2
  ">
    
    {/* IMAGE */}
    <div className="relative w-full h-50 overflow-hidden">
      <img 
        src={img} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
      />

      {/* RATING BADGE */}
      <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs font-semibold rounded-full shadow">
        ⭐ 4.7
      </div>
    </div>

    {/* CONTENT */}
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mb-3">
        Fresh • Healthy • Hot
      </p>

      {/* PRICE */}
      <p className="text-lg font-bold text-yellow-600 mb-3">
        ₹199
      </p>

      {/* BUTTON */}
      <button className="
        w-full py-2 bg-yellow-500 text-white rounded-lg 
        hover:bg-yellow-600 transition-all shadow
      ">
        Order Now
      </button>
    </div>

  </div>
);


export default Homepage;
