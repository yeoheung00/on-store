'use client'
import Selection from 'components/Selection';
import { createPortal } from "react-dom";
import games from 'db/games.json'
import styles from './page.module.css'

import { useEffect, useMemo, useState } from "react"

export default function Page() {
  const [load, setLoad] = useState(false);
  const [stimulation, setStimulation] = useState("All");
  const [type, setType] = useState("All");
  const [background, setBackground] = useState("All");

  const stimulationList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (type !== "All") {
      filteredGames = filteredGames.filter(item => item.type.includes(type))
    }
    if (background !== "All") {
      filteredGames = filteredGames.filter(item => item.background.includes(background))
    }
    filteredGames.forEach(game => {
      game.stimulation.forEach(stimulation => {
        if (!list.includes(stimulation)) list.push(stimulation)
      })
    })
    list.sort();
    list.unshift("All");
    return list;
  }, [type, background]);

  const typeList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (stimulation !== "All") {
      filteredGames = filteredGames.filter(item => item.stimulation.includes(stimulation))
    }
    if (background !== "All") {
      filteredGames = filteredGames.filter(item => item.background.includes(background))
    }
    filteredGames.forEach(game => {
      game.type.forEach(type => {
        if (!list.includes(type)) list.push(type)
      })
    })
    list.sort();
    list.unshift("All");
    return list;
  }, [stimulation, background]);

  const backgroundList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (stimulation !== "All") {
      filteredGames = filteredGames.filter(item => item.stimulation.includes(stimulation))
    }
    if (type !== "All") {
      filteredGames = filteredGames.filter(item => item.type.includes(type))
    }
    filteredGames.forEach(game => {
      game.background.forEach(background => {
        if (!list.includes(background)) list.push(background)
      })
    })
    list.sort();
    list.unshift("All");
    return list;
  }, [stimulation, type])

  // useEffect(() => {
  //   console.log(stimulationList);
  //   console.log(typeList);
  //   console.log(backgroundList);
  //   console.log('-----------------------------')
  // }, [stimulation, type, background])

  // const [stimulationList, setStimulationList] = useState(["All"]);
  // const [typeList, setTypeList] = useState(["All"]);
  // const [backgroundList, setBackgroundList] = useState(["All"]);
  // useEffect(() => {
  //   let stm: string[] = [];
  //   let typ: string[] = [];
  //   let bac: string[] = [];
  //   games.forEach((item) => {
  //     item.stimulation.forEach((item) => {
  //       const temp = item.charAt(0).toUpperCase() + item.slice(1);
  //       if (!stm.includes(temp)) stm.push(temp);
  //     });
  //     item.type.forEach((item) => {
  //       const temp = item.charAt(0).toUpperCase() + item.slice(1);
  //       if (!typ.includes(temp)) typ.push(temp);
  //     });
  //     item.background.forEach((item) => {
  //       const temp = item.charAt(0).toUpperCase() + item.slice(1);
  //       if (!bac.includes(temp)) bac.push(temp);
  //     });
  //   });

  //   stm.sort();
  //   typ.sort();
  //   bac.sort();
  //   stm.unshift("All");
  //   typ.unshift("All");
  //   bac.unshift("All");

  //   setStimulationList(stm);
  //   setTypeList(typ);
  //   setBackgroundList(bac);
  // }, []);


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
      <div className={styles.background} />
      <div className="flex flex-col items-center gap-10 mt-64">
        <img className="w-64 h-auto" src='/symbol.svg' alt='symbol' />
        <p className="text-center text-4xl font-Pixeled leading-[60px]">In search of<br />the Missing Stimulus</p>
        <p className="text-center text-3xl mb-8">Find what you want</p>
        <div className="max-w-[1000px] w-[1000px] flex gap-[20px] flex-wrap justify-center mb-48">
          <Selection current={stimulation} stateHandler={setStimulation} title="Stimulation" list={stimulationList} />
          <Selection current={type} stateHandler={setType} title="Type" list={typeList} />
          <Selection current={background} stateHandler={setBackground} title="Background" list={backgroundList} />
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