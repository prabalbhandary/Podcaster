import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PodcastCard from "../components/PodcastCard/PodcastCard";

const AllPodcasts = () => {
  const [podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "https://podcaster-lime-seven.vercel.app/api/v1/podcasts/get-podcasts",
          { withCredentials: true }
        );
        setPodcasts(response.data.podcasts);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

export default AllPodcasts;
