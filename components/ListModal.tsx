
import { Dispatch, SetStateAction } from "react";
import Backdrop from "./Backdrop";
import Image from "next/image";

type ImageModalProps = {
  listModalHandler: () => void;
  stateHandler: (item: string) => void;
  title: string;
  list: string[];
};

export default function ImageModal({ listModalHandler, stateHandler, title, list }: ImageModalProps) {
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
        <div className="p-8 bg-white rounded-xl min-w-[200px]">
          <h1 className="text-2xl mb-8">{title}</h1>
          <div className="flex flex-col items-start gap-4 max-h-96 overflow-scroll">
            {list.map((item, idx) => (
              <button key={idx} className="block w-full text-left" onClick={() => stateHandler(item)}>{idx === 0 ? "All" : item}</button>
            ))}
          </div>
        </div>
      </div>
    </Backdrop>
  );
}