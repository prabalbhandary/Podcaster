import React from "react";
import { Link } from "react-router-dom";
import Comedy from "../assets/comedy.jpg";
import Business from "../assets/business.jpg";
import Education from "../assets/education.jpg";
import Hobbies from "../assets/hobbies.jpg";
import Government from "../assets/government.svg";

const Categories = () => {
  const cat = [
    {
      name: "Comedy",
      color: "bg-purple-200",
      to: "/categories/Comedy",
      img: Comedy,
    },
    {
      name: "Business",
      color: "bg-green-200",
      to: "/categories/Business",
      img: Business,
    },
    {
      name: "Education",
      color: "bg-red-200",
      to: "/categories/Education",
      img: Education,
    },
    {
      name: "Hobbies",
      color: "bg-zinc-200",
      to: "/categories/Hobbies",
      img: Hobbies,
    },
    {
      name: "Government",
      color: "bg-indigo-200",
      to: "/categories/Government",
      img: Government,
    },
  ];
  return (
    <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cat.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`rounded px-8 py-4 text-xl font-semibold ${item.color} hover:scale-105 shadow-xl transition-all duration-300 flex items-center justify-between relative h-20`}
        >
          <div>{item.name}</div>
          <div className="absolute right-2 bottom-2">
            <img
              src={item.img}
              alt={item.name}
              className="h-12 w-12 rotate-12 object-cover rounded"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
