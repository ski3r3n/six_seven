"use client";
import { UPGRADES } from "./constants/upgrades";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
  const [counter, setCounter] = useState(0);
  const [ips, setIps] = useState(0);
  const [ipc, setIpc] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      if (ips > 0) {
        setCounter((prev) => prev + 1);
      }
    }, 1000 / ips); 
    return () => clearInterval(interval);
  }, [ips]);
  return (
    <div className="flex min-h-screen flex-col items-center p-10">
      <h1 className="text-7xl font-bold m-5">67s:{counter}</h1>
      <div className="flex gap-10">
        <h3 className="text-3xl font-semibold">67s/s: {ips}</h3>
        <h3 className="text-3xl font-semibold">67s/67: {ipc}</h3>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button
          onMouseDown={addSixSeven}
          className="text-7xl rounded bg-gray-900 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 h-100 w-xl cursor-pointer">
          67
        </button>
        <div className="rounded overflow-auto bg-gray-900 font-semibold text-white transition-all h-100 w-xl flex p-5 flex-col gap-5">
          {Object.entries(UPGRADES).map(([upgradeKey, upgrade]) => (
            <button
              onClick={() => buyUpgrade(parseInt(upgradeKey))}
              key={upgradeKey}
              className="h-fit w-full rounded bg-gray-800 p-5 transition-all hover:bg-slate-700 active:scale-95 flex items-center justify-around gap-5 cursor-pointer">
              <span className="text-4xl">{upgrade.name}</span>
              <span className="text-2xl">
                <span>{upgrade.cost}</span> 67s
              </span>
              {upgrade.ipc && (
                <span className="text-2xl">
                  <span>+{upgrade.ipc}</span> 67/67
                </span>
              )}
              {upgrade.ips && (
                <span className="text-2xl">
                  <span>+{upgrade.ips}</span> 67/s
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  function addSixSeven() {
    setCounter((prev: number) => prev + ipc);
  }

  function buyUpgrade(upgradeKey: number) {
    const upgrade = UPGRADES[upgradeKey];
    if (upgrade && counter >= upgrade.cost) {
      setCounter((prev: number) => prev - upgrade.cost);
      if (upgrade.ipc) {
        setIpc((prev: number) => prev + upgrade.ipc);
      }
      if (upgrade.ips) {
        setIps((prev: number) => prev + upgrade.ips);
      }
    }
  }
}
