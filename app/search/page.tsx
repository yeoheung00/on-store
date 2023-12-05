'use client'
import Selection from 'components/Selection';
import { createPortal } from "react-dom";
import games from 'db/games.json'
import styles from './page.module.css'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import { useEffect, useMemo, useState } from "react"

export default function Page() {
  const handle = useFullScreenHandle();

  const [load, setLoad] = useState(false);
  const [stimulation, setStimulation] = useState("All");
  const [type, setType] = useState("All");
  const [background, setBackground] = useState("All");
  const [stimulationList, setStimulationList] = useState(["All"]);
  const [typeList, setTypeList] = useState(["All"]);
  const [backgroundList, setBackgroundList] = useState(["All"]);
  useEffect(() => {

    let stm: string[] = [];
    let bac: string[] = [];
    let typ: string[] = [];
    games.forEach((item) => {
      item.stimulation.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!stm.includes(temp)) stm.push(temp);
      });
      item.background.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!bac.includes(temp)) bac.push(temp);
      });
      item.type.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!typ.includes(temp)) typ.push(temp);
      });
    });

    stm.sort();
    bac.sort();
    typ.sort();
    stm.unshift("All");
    bac.unshift("All");
    typ.unshift("All");

    setStimulationList(stm);
    setBackgroundList(bac);
    setTypeList(typ);
  }, []);


  type GameType = typeof games[0];
  const isRecommend = (game: GameType) => {
    let output = false;
    if ((game.stimulation.includes(stimulation) || stimulation == "All") &&
      (game.type.includes(type) || type == "All") &&
      (game.background.includes(background) || background == "All")) {
      output = true;
    }
    return output;
  }

  const filtered = useMemo(() => {
    let filter_temp: GameType[] = [];
    games.map((item) => {
      if (isRecommend(item)) filter_temp.push(item);
    })
    return filter_temp;
  }, [stimulation, background, type]);

  return (
    <main className="w-screen h-screen flex flex-col items-center ">
      <FullScreen className="full-screen bg-white" handle={handle}>
        <button className='absolute top-0 left-0' onClick={handle.enter}>full</button>
        <div className={styles.background} />
        <div className="flex flex-col items-center gap-10 mt-64">
          <img className="w-64 h-auto" src='/symbol.svg' alt='symbol' />
          <p className="text-center text-4xl font-Pixeled leading-[60px]">In search of<br />the Missing Stimulus</p>
          <p className="text-center text-3xl mb-8">Find what you want</p>
          <div className="max-w-[1000px] w-[1000px] flex gap-[20px] flex-wrap justify-center mb-48">
            <Selection current={{ stimulation: stimulation, background: background, type: type }} stateHandler={setStimulation} selection="stimulation" />
            <Selection current={{ stimulation: stimulation, background: background, type: type }} stateHandler={setBackground} selection="background" />
            <Selection current={{ stimulation: stimulation, background: background, type: type }} stateHandler={setType} selection="type" />
          </div>
        </div>
        <div className={styles.linewrap}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.wrap}>
          {filtered.map((item, idx) => (
            <div key={idx} className={styles.item}>
              <div className='w-3 h-3 bg-main' />
              <div className='text-main'>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </FullScreen>
    </main>
  )
}