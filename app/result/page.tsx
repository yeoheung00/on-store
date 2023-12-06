'use client'
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"

export default function Result() {
  const params = useSearchParams();
  let result = params.get("result");
  let games: string[] = [];
  if (result != null) {
    games = JSON.parse(result);
  } else {
    console.log("error");
  }
  return (
    <div>
      {
        games.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))
      }
    </div>
  )
}