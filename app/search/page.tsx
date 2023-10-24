'use client'
import Selection from 'components/Selection';
import { createPortal } from "react-dom";
import games from 'db/games.json'
import styles from './page.module.css'

import { useEffect, useMemo, useState } from "react"

export default function Page() {
  const [load, setLoad] = useState(false);
  const [stimulation, setStimulation] = useState("All");
  const [background, setBackground] = useState("All");
  const [ability, setAbility] = useState("All");
  const [stimulationList, setStimulationList] = useState(["All"]);
  const [backgroundList, setBackgroundList] = useState(["All"]);
  const [abilityList, setAbilityList] = useState(["All"]);
  useEffect(() => {
    let stm: string[] = [];
    let bac: string[] = [];
    let abl: string[] = [];
    games.forEach((item) => {
      item.stimulation.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!stm.includes(temp)) stm.push(temp);
      });
      item.background.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!bac.includes(temp)) bac.push(temp);
      });
      item.ability.forEach((item) => {
        const temp = item.charAt(0).toUpperCase() + item.slice(1);
        if (!abl.includes(temp)) abl.push(temp);
      });
    });

    stm.sort();
    bac.sort();
    abl.sort();
    stm.unshift("All");
    bac.unshift("All");
    abl.unshift("All");

    setStimulationList(stm);
    setBackgroundList(bac);
    setAbilityList(abl);
  }, []);

  type GameType = typeof games[0];
  const isRecommend = (game: GameType) => {
    let output = false;
    if ((game.stimulation.includes(stimulation) || stimulation == "All") &&
      (game.ability.includes(ability) || ability == "All") &&
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
  }, [stimulation, background, ability]);

  return (
    <main className="w-screen h-screen flex flex-col items-center ">
      <div className={styles.background}/>
      <div className="flex flex-col items-center gap-10 mt-64">
        <img className="w-64 h-auto" src='/symbol.svg' alt='symbol' />
        <p className="text-center text-4xl font-Pixeled">In search of</p>
        <p className="text-center text-4xl mb-20 font-Pixeled">the Missing Stimulus</p>
        <p className="text-center text-3xl mb-8">Find what you want</p>
        <div className="max-w-[1000px] w-[1000px] flex gap-[20px] flex-wrap justify-center mb-48">
          <Selection current={stimulation} stateHandler={setStimulation} title="Stimulation" list={stimulationList} />
          <Selection current={background} stateHandler={setBackground} title="Stimulation" list={backgroundList} />
          <Selection current={ability} stateHandler={setAbility} title="Stimulation" list={abilityList} />
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
    </main>
  )
}