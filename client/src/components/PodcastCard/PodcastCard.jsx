import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { audioPlayerActions } from "../../store/AudioPlayer/AudioPlayer";

const PodcastCard = ({ item }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handlePlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(audioPlayerActions.setDiv());
      dispatch(
        audioPlayerActions.changeImg(`http://localhost:4000/${item.frontImage}`)
      );
      dispatch(
        audioPlayerActions.changeSong(`http://localhost:4000/${item.audioFile}`)
      );
    }
  };
  return (
    <div>
      <Link
        to={`/description/${item._id}`}
        className="border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div>
          <img
            src={`http://localhost:4000/${item.frontImage}`}
            alt=""
            className="rounded size-[42vh] object-cover"
          />
        </div>
        <div className="mt-2 text-xl font-bold">{item.title.slice(0, 20)}</div>
        <div className="mt-2 leading-5 text-slate-500">
          {item.description.slice(0, 50)}
        </div>
        <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {item.category.categoryName}
        </div>
        <div className="mt-2">
          <Link
            onClick={handlePlay}
            to={isLoggedIn ? "#" : "/login"}
            className="bg-green-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center hover:bg-green-800 transition-all duration-300"
          >
            Play Now
            <FaPlay className="ms-2" />
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;
