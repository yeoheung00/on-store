'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ListModal from 'components/ListModal'
import { createPortal } from "react-dom";

type ParamsType = {
  current: { [k: string]: string };
  stateHandler: (item: string) => void;
  selection: string;
}

export default function Selection({ current, stateHandler, selection }: ParamsType) {
  let [listModal, setListModal] = useState(false);
  let [portalElement, setPortalElement] = useState<Element | null>(null);
  let list: string[] = [];
  useEffect(() => {
    setPortalElement(document.getElementById("portal"));
  }, [listModal]);

  const listModalHandler = () => {
    setListModal(!listModal);
  };
  const toggle = () => setListModal(prev => !prev);
  return (
    <div className="flex-1 flex justify-center">
      <style jsx>{`
        .image {
          position: relative;
          width: 100%;
          height: 400px;
        }
      `}
      </style>
      <button className="w-full pb-2 text-center border-b-4 border-main text-2xl" onClick={toggle}>{current[selection]}</button>
      {listModal && portalElement
        ? createPortal(<ListModal listModalHandler={listModalHandler} stateHandler={stateHandler} title={selection} current={current} />, portalElement)
        : null}
    </div>
  )
}