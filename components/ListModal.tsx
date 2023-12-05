
import { Dispatch, SetStateAction } from "react";
import Backdrop from "./Backdrop";
import db from 'db/games.json'

type ImageModalProps = {
  listModalHandler: () => void;
  stateHandler: (item: string) => void;
  title: string;
  current: { [k: string]: string };
};

export default function ImageModal({ listModalHandler, stateHandler, title, current }: ImageModalProps) {
  switch (title) {
    case 'stimulation':
      if (current['type'] !== 'All') {

      }
      break;
    case 'type':
      break;
    case 'background':
      break;
  }
  return (
    <Backdrop listModalHandler={listModalHandler}>
      <style jsx>{`
        
          .image{
            width: 100%;
            height: 100%;
            object-fit: contain;
            z-index: 99999
          }
        
        `
      }</style>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-8 bg-white rounded-xl">
          <h1 className="text-2xl mb-8">{title}</h1>
          <div className="flex flex-col items-start gap-4 max-h-96 overflow-scroll">
            {/* {list.map((item, idx) => (
              <button key={idx} className="block w-full text-left" onClick={() => stateHandler(item)}>{idx === 0 ? "All" : item}</button>
            ))} */}
          </div>
        </div>
      </div>
    </Backdrop>
  );
}