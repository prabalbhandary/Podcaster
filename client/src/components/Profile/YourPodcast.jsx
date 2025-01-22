import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PodcastCard from "../PodcastCard/PodcastCard";
import { toast } from "react-toastify";

const YourPodcast = () => {
  const [podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://podcaster-server.vercel.app/api/v1/podcasts/get-user-podcast",
          { withCredentials: true }
        );
        setPodcasts(response.data.data);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetch();
  }, []);
  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
        <Link
          to="/add-podcast"
          className="px-4 py-2 bg-zinc-800 text-white rounded font-semibold"
        >
          Add Podcast
        </Link>
      </div>
      <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {podcasts &&
          podcasts.map((item, index) => (
            <div key={index}>
              <PodcastCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default YourPodcast;
