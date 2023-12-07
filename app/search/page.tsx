'use client'
import Selection from 'components/Selection';
import { createPortal } from "react-dom";
import games from 'db/games.json'
import styles from './page.module.css'

import { useEffect, useMemo, useState } from "react"
import Link from 'next/link';

export default function Page() {
  const [load, setLoad] = useState(false);
  const [stimulation, setStimulation] = useState("Stimulation");
  const [type, setType] = useState("Type");
  const [background, setBackground] = useState("Background");

  const stimulationList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (type !== "Type") {
      filteredGames = filteredGames.filter(item => item.type.includes(type))
    }
    if (background !== "Background") {
      filteredGames = filteredGames.filter(item => item.background.includes(background))
    }
    filteredGames.forEach(game => {
      game.stimulation.forEach(stimulation => {
        if (!list.includes(stimulation)) list.push(stimulation)
      })
    })
    list.sort();
    return list;
  }, [type, background]);

  const typeList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (stimulation !== "Stimulation") {
      filteredGames = filteredGames.filter(item => item.stimulation.includes(stimulation))
    }
    if (background !== "Background") {
      filteredGames = filteredGames.filter(item => item.background.includes(background))
    }
    filteredGames.forEach(game => {
      game.type.forEach(type => {
        if (!list.includes(type)) list.push(type)
      })
    })
    list.sort();
    return list;
  }, [stimulation, background]);

  const backgroundList = useMemo(() => {
    var filteredGames = games;
    var list: string[] = [];
    if (stimulation !== "Stimulation") {
      filteredGames = filteredGames.filter(item => item.stimulation.includes(stimulation))
    }
    if (type !== "Type") {
      filteredGames = filteredGames.filter(item => item.type.includes(type))
    }
    filteredGames.forEach(game => {
      game.background.forEach(background => {
        if (!list.includes(background)) list.push(background)
      })
    })
    list.sort();
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

  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    var temp: string[] = [];
    if (filtered.length > 3) {
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * filtered.length);
        if (!temp.includes(filtered[random].name)) temp.push(filtered[random].name);
        else i--;
      }
    } else temp = filtered.map(item => item.name);
    setResult(temp);
  }, [filtered]);

  useEffect(() => {
    console.log(result.join('_'));
  }, [result]);

  return (
    <main className="w-full h-screen fixed flex flex-col items-center ">
      <div className={styles.background} />
      <div className="flex flex-col gap-28 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-1/2 items-center gap-10">
        <p className="text-center font-Pixeled text-2xl">Find what you want</p>
        <div className="w-full flex gap-[20px] flex-wrap justify-center">
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

      <Link className="top-[80%] left-1/2 translate-x-[-50%] translate-y-[-50%] fixed font-Pixeled" href={{
        pathname: '/result',
        query: {
          result: JSON.stringify(result),
          select: JSON.stringify([stimulation, type, background])
        }
      }}>
        <img src="/button.svg" className='w-[250px] h-auto block' />
        <h2 className='top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute font-Pixeled pb-2 text-white'>Play</h2>
      </Link>
    </main>
  )
}