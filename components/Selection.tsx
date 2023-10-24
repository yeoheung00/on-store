'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ListModal from 'components/ListModal'
import { createPortal } from "react-dom";
import Image from "next/image";

type ParamsType = {
  current: string;
  stateHandler: (item: string) => void;
  title: string;
  list: string[];
}

export default function Selection({ current, stateHandler, title, list}: ParamsType) {
  let [listModal, setListModal] = useState(false);
  let [portalElement, setPortalElement] = useState<Element | null>(null);

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
      <button className="w-full pb-2 text-center border-b-4 border-main text-2xl" onClick={toggle}>{current}</button>
      {listModal && portalElement
        ? createPortal(<ListModal listModalHandler={listModalHandler} stateHandler={stateHandler} title={title} list={list} />, portalElement)
        : null}
    </div>
  )
}