import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = async () => {
    setIsLoading(true);
    await axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Delete successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar("Failed to delete data", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleClick}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
