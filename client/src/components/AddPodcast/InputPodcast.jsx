import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [dragging, setDragging] = useState(false);
  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFrontImage(file);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const dropImage = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  };
  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAudioFile(file);
  }
  const changeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('title', inputs.title)
    data.append('description', inputs.description)
    data.append('category', inputs.category)
    data.append('frontImage', frontImage)
    data.append('audioFile', audioFile)
    try {
      const response = await axios.post("https://podcaster-server.vercel.app/api/v1/podcasts/add", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setFrontImage(null)
      setAudioFile(null)
      setInputs({
        title: "",
        description: "",
        category: ""
      })
    }
  }
  return (
    <div className="my-4 px-4 lg:px-12">
      <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[20vh] lg:size-[60vh] flex items-center hover:bg-slate-50 transition-all duration-300"
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={dropImage}
          >
            <input
              type="file"
              accept="image/*"
              name="frontImage"
              id="file"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="frontImage"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <>
                <label
                  htmlFor="file"
                  className={`text-xl h-[100%] w-[100%] p-4 hover:cursor-pointer flex items-center justify-center ${
                    dragging ? "bg-blue-200" : ""
                  } hover:bg-zinc-200 transition-all duration-300`}
                >
                  <div className="text-center">
                    Drag & Drop an Image or Click to Upload
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Podcast Title"
              onChange={changeInputs}
              value={inputs.title}
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              onChange={changeInputs}
              value={inputs.description}
              placeholder="Podcast Description"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded"
              rows={4}
            />
          </div>
          <div className="flex mt-4">
            <div className="flex flex-col w-2/6">
              <label htmlFor="audioFile">Audio File</label>
              <input
                type="file"
                accept="audio/*"
                id="audioFile"
                name="audioFile"
                className="mt-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                onChange={changeInputs}
                value={inputs.category}
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button type="submit" onClick={handleSubmit} className="bg-zinc-900 text-white w-full rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300">
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
