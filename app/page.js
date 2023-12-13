"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCheckmark, IoMenu, IoSave, IoSwapHorizontal } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Credit from "@/components/Credit";

export default function Index() {
  const [loadState, setLoadState] = useState(0);
  const [days, setDays] = useState([]);
  const [backgrounds] = useState([
    {
      img: "anniespratt", // Image at /bg/<>.jpg
      text: "black",
      name: "Annie Spratt",
      unsplash: "@anniespratt",
      image: "https://images.unsplash.com/profile-1648828806223-1852f704c58aimage",
    },
    {
      img: "chadmadden",
      text: "white",
      name: "Chad Madden",
      unsplash: "@chadmadden",
      image: "https://images.unsplash.com/profile-1479493546391-c7a8f30d8f48",
    },
    {
      img: "tessarampersad",
      text: "white",
      name: "Tessa Rampersad",
      unsplash: "@t_rampersad",
      image: "https://images.unsplash.com/profile-1493621054700-9f69ec529fbd",
    },
    {
      img: "medpoole",
      text: "black",
      name: "Med Poole",
      unsplash: "@medpoole",
      image: "https://images.unsplash.com/profile-1580426429222-81d574542dbdimage",
    },
    {
      img: "nathananderson",
      text: "black",
      name: "Nathan Anderson",
      unsplash: "@nathananderson",
      image: "https://images.unsplash.com/profile-1676320214445-e3fec6f7b87cimage",
    },
  ]);
  const [currentBackground, setCurrentBackground] = useState("");
  const [backgroundSaved, setBackgroundSaved] = useState(false);
  const [colour, setColour] = useState("");

  function pickBackground() {
    const length = backgrounds.length;
    const bgNumber = Math.floor(Math.random() * length);
    setCurrentBackground(backgrounds[bgNumber].img);
    setColour(backgrounds[bgNumber].text);
  }

  function switchBackground() {
    setLoadState(3);
    const length = backgrounds.length;
    let bgNumber = Math.floor(Math.random() * length);
    while (backgrounds[bgNumber].img === currentBackground) {
      bgNumber = Math.floor(Math.random() * length);
    }
    setCurrentBackground(backgrounds[bgNumber].img);
    setColour(backgrounds[bgNumber].text);
    loadPage();
  }

  useEffect(() => {
    pickBackground();
  }, [backgrounds]);

  useEffect(() => {
    const savedBackground = localStorage.getItem("savedBackground");
    setBackgroundSaved(currentBackground === localStorage.getItem("savedBackground"));
    if (savedBackground && backgrounds.some((bg) => bg.img === savedBackground)) {
      setBackgroundSaved(currentBackground === localStorage.getItem("savedBackground"));
      setCurrentBackground(savedBackground);
      setColour(backgrounds.find((bg) => bg.img === savedBackground).text);
    }
  }, [currentBackground]);

  function saveBackground() {
    localStorage.setItem("savedBackground", currentBackground);
    setBackgroundSaved(currentBackground === localStorage.getItem("savedBackground"));
  }

  function unSaveBackground() {
    localStorage.removeItem("savedBackground");
    setBackgroundSaved(currentBackground === localStorage.getItem("savedBackground"));
  }

  useEffect(() => {
    function timeUntilChristmas() {
      let today = new Date();
      let christmasYear = today.getFullYear();

      if (today.getMonth() == 11 && today.getDate() > 25) {
        christmasYear = christmasYear + 1;
      }

      let christmasDate = new Date(christmasYear, 11, 25);
      let dayMilliseconds = 1000 * 60 * 60 * 24;
      let daysUntil = Math.ceil((christmasDate.getTime() - today.getTime()) / dayMilliseconds);
      setDays(daysUntil.toString().split(""));

      setLoadState(3);
    }
    timeUntilChristmas();
  }, [currentBackground]);

  function loadPage() {
    if (loadState === 3) {
      setLoadState(4);
      setInterval(() => {
        setLoadState(5);
      }, 500);
    }
  }
  return (
    <>
      <main className="w-screen h-screen overflow-hidden">
        <div
          className={`block w-screen h-screen relative transition duration-1000 overflow-hidden ${
            loadState === 5 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10 gap-5 font-serif">
            <section className="flex flex-row gap-8 select-none">
              {days.map((day) => (
                <div
                  key={day}
                  className={`text-[10rem] ${
                    colour === "white" ? "text-white" : "text-black"
                  } font-extrabold bg-black bg-opacity-30 rounded-xl w-36 text-center shadow-2xl backdrop-blur`}
                >
                  {day}
                </div>
              ))}
            </section>
            <p className={`leading-4 text-xl font-semibold ${colour === "white" ? "text-white" : "text-black"}`}>Days 'til Christmas</p>
          </div>
          <section className="absolute top-0 left-0 w-full z-0 h-fit">
            <Image
              src={`/bg/${currentBackground}.jpg`}
              width={1920}
              height={1080}
              className="w-full object-cover h-screen pointer-events-none select-none transition duration-300"
              quality={100}
              priority
              draggable={false}
              onLoad={() => {
                loadPage();
              }}
              alt=""
            />
          </section>
        </div>

        <section
          className={`absolute bottom-3 left-3 z-20 flex flex-row items-center gap-2 transition duration-500 ${
            loadState === 5 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className={`${colour === "white" ? "text-white bg-black" : "text-black bg-white"} bg-opacity-50 p-1 rounded`}>
                <IoMenu className="text-2xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 ml-3 mb-0.5">
                <DropdownMenuLabel className="pb-0.5">Christmas Countdown</DropdownMenuLabel>
                <DropdownMenuLabel className="text-neutral-300 text-xs pt-0 font-light">Time in UTC +0</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!backgroundSaved ? (
                  <button className="w-full" onClick={() => switchBackground()}>
                    <DropdownMenuItem className="cursor-pointer pb-0 flex-col items-start">
                      <div className="flex flex-row items-center gap-1">
                        <IoSwapHorizontal />
                        Switch Background
                      </div>
                      <p className="text-neutral-300 text-xs pt-0 pb-1.5 font-light">Get a new background</p>
                    </DropdownMenuItem>
                  </button>
                ) : (
                  <a title="You can't switch when you have a saved background.">
                    <DropdownMenuItem className="cursor-pointer pb-0 flex-col items-start" disabled>
                      <div className="flex flex-row items-center gap-1">
                        <IoSwapHorizontal />
                        Switch Background
                      </div>
                      <p className="text-neutral-300 text-xs pt-0 pb-1.5 font-light">Get a new background</p>
                    </DropdownMenuItem>
                  </a>
                )}
                {backgroundSaved ? (
                  <button className="w-full" onClick={() => unSaveBackground()}>
                    <DropdownMenuItem className={`cursor-pointer pb-0 flex-col items-start ${backgroundSaved ? "text-green-400" : ""}`}>
                      <div className="flex flex-row items-center gap-1">
                        <IoCheckmark />
                        Background Saved
                      </div>
                      <p className="text-neutral-300 text-xs pt-0 pb-1.5 font-light">You'll always get this background</p>
                    </DropdownMenuItem>
                  </button>
                ) : (
                  <button className="w-full" onClick={() => saveBackground()}>
                    <DropdownMenuItem className={`cursor-pointer pb-0 flex-col items-start ${backgroundSaved ? "text-green-400" : ""}`}>
                      <div className="flex flex-row items-center gap-1">
                        <IoSave />
                        Save Background
                      </div>
                      <p className="text-neutral-300 text-xs pt-0 pb-1.5 font-light">Always get this background</p>
                    </DropdownMenuItem>
                  </button>
                )}
                <DialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer">Image Credits</DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator />
                <Link href="https://github.com/tocularity/christmas-countdown" target="_blank" className="w-full">
                  <DropdownMenuItem className="cursor-pointer items-center gap-1.5">
                    By Tocularity on
                    <FaGithub />
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Images from Unsplash</DialogTitle>
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {backgrounds.map((credit) => (
                    <Credit name={credit.name} unsplash={credit.unsplash} image={credit.image} />
                  ))}
                </div>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2"></div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-center gap-5 transition duration-300 flex-col text-neutral-500 ${
            loadState > 3 ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          <Image src="/snowglobe.gif" width={64} height={64} className="animate-smooth-spin w-16 h-auto" alt="Snow globe with snowflakes" />
          Loading...
        </div>
      </main>
    </>
  );
}
