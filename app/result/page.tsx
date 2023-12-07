'use client'
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import styles from './page.module.css'

export default function Result() {
  const [load, setLoad] = useState(false);
  const delay = 3 + Math.random() * 3
  const params = useSearchParams();
  let result = params.get("result");
  let games: string[] = [];
  if (result != null) {
    games = JSON.parse(result);
  } else {
    console.log("error");
  }
  let select = params.get("select");
  let sticker = Math.floor(Math.random() * 9);
  let select_: string[] = [];
  if (select != null) {
    select_ = JSON.parse(select);
  } else {
    console.log("error");
  }
  if (select_[1] == "픽셀") sticker = 10;
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, delay * 1000);
  })
  return (
    <div>
      <div className={styles.background} />
      {
        load ?
          <div className="flex flex-col items-center gap-20 fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <img className="w-[35%]" src={`/sticker/${sticker}.png`} />
            <div className="flex gap-20">
              {
                games.map((item, idx) => (
                  <div key={idx} className="text-2xl">{idx + 1 + ". " + item}</div>
                ))
              }
            </div>
          </div>
          :
          <div>
            <video className="w-[30%] h-auto fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" src='/loading_1.mp4' autoPlay muted loop />
          </div>
      }
    </div>
  )
}