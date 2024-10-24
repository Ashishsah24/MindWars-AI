import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
      <footer className="p-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2 h-[20vw] sm:h-[15vw] md:h-[10vw] lg:h-[8vw]">
          <div className="flex flex-col gap-3 ">
              <div className="flex items-center gap-2">
                  <img src="./images/mindwars.png" className='h-[5vw] sm:h-[4vw] md:h-[3vw] lg:h-[2vw]' alt="" />
                  <img className='h-[3vw] sm:h-[2.5vw] md:h-[2vw] lg:h-[1.5vw]' src="https://see.fontimg.com/api/rf5/DGRW/MTNmYjZiN2U1NjRlNDM1MGE1OTgzOWRiZGFmMzgxNTIudHRm/TWluZFdhcnMgQWk/star-jedi.png?r=fs&h=81&w=1250&fg=0C0B0B&bg=FFFFFF&tb=1&s=65" alt="Star Wars fonts" />
              </div>
              <h2 className="text-black opacity-90 text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw]">Copyright © 2024 - All rights reserved</h2>
          </div>

          <div className="flex flex-col gap-3">
              <h2 className="font-bold text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw]">Creators</h2>
              <div className="flex flex-col gap-1 text-center ">
                  <div>
                      <HoverCard>
                          <HoverCardTrigger className="hover:underline flex gap-2 items-center">
                              <a className="flex flex-row gap-[0.5vw] items-center text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw]" href='https://github.com/PYIArun' target="_blank"><FaGithub />Arun Chandra</a>
                          </HoverCardTrigger>
                          <HoverCardContent>
                              A creative thinker who loves coming up with solutions to tricky tech challenges.
                          </HoverCardContent>
                      </HoverCard>
                  </div>
                  <div>
                      <HoverCard>
                          <HoverCardTrigger className="hover:underline flex gap-2 items-center">
                              <a className="flex flex-row gap-[0.5vw] items-center text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw]" href='https://github.com/ashishsah24' target="_blank"><FaGithub />Ashish Sah</a>
                          </HoverCardTrigger>
                          <HoverCardContent>
                              An explorer in the tech world who loves taking on challenges and learning along the way.
                          </HoverCardContent>
                      </HoverCard>
                  </div>
              </div>
          </div>
      </footer>
  );
};

export default Footer;
