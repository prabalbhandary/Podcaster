import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DescriptionPage = () => {
  const { id } = useParams();
  const [podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetchPodcastById = async () => {
      try {
        const response = await axios.get(
          `https://podcaster-lime-seven.vercel.app/api/v1/podcasts/get-podcasts/${id}`,
          { withCredentials: true }
        );
        setPodcasts(response.data.podcast);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchPodcastById();
  }, [id]);
  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4">
      {podcasts && (
        <>
          <div className="w-2/6 items-center justify-center md:justify-start md:items-start">
            <img
              src={`https://podcaster-lime-seven.vercel.app/${podcasts.frontImage}`}
              alt="Image"
              className="rounded w-full h-[50vh] object-cover"
            />
          </div>
          <div className="w-4/6">
            <div className="text-4xl font-semibold">{podcasts.title}</div>
            <h4 className="mt-4">{podcasts.description}</h4>
            <div className="mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
              {podcasts.category.categoryName}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionPage;
