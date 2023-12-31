import React, { Key } from "react";

export type Info = {
  id: Key;
  stats: number;
  title: string;
};

const infoCard: Info[] = [
  {
    id: 1,
    stats: 2023,
    title: "founded",
  },
  {
    id: 2,
    stats: 10,
    title: "workers",
  },
  {
    id: 3,
    stats: 200,
    title: "projects",
  },
];

const Informations = () => {
  return (
    <div className="relative block bottom-0 translate-y-1/2 bg-white shadow-xl w-[60%] mx-auto rounded-xl py-10">
      <div className="flex  flex-wrap items-center justify-around h-full">
        {infoCard.map((info) => (
          <div key={info.id} className="flex flex-col items-center gap-y-3">
            <h3 className="text-4xl text-primary font-extrabold">
              {info.stats}
            </h3>
            <p className="font-extrabold uppercase opacity-30 tracking-wider">
              {info.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Informations;
