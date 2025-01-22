import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PodcastCard from "../components/PodcastCard/PodcastCard";

const CategoriesPage = () => {
  const { cat } = useParams();
  const [podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetchPodcastByCategory = async() => {
      try {
        const response = await axios.get(`https://podcaster-lime-seven.vercel.app/api/v1/podcasts/category/${cat}`, {withCredentials: true})
        setPodcasts(response.data.podcasts)
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchPodcastByCategory()
  }, [cat])
  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="text-xl font-semibold">{cat}</h1>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {podcasts &&
          podcasts.map((item, index) => (
            <div key={index}>
              <PodcastCard item={item} />
            </div>
          ))}
          {
            podcasts && podcasts.length === 0 && (
              <div className="text-3xl font-bold h-screen w-[100%] text-zinc-700 flex items-center justify-center">
                No Podcast Found
              </div>
            )
          }
      </div>
    </div>
  );
};

export default CategoriesPage;