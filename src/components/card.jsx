import React from "react";

export default function Card({ name, temp, day }) {
  return (
    <>
      <div className="my-5">
        <a
          href="#"
          className="flex flex-col gap-y-1 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full  rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="src\assets\foto.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name} - {day}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {temp}°C
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
