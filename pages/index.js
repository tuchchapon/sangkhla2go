import React from 'react'
import { useRouter } from 'next/router'
export default function index() {
  const router = useRouter();

  const goNext =()=>{
    router.replace("/publicTransportation");
  }
  return (
    <div>
      <button onClick={goNext} >next page</button>
    </div>
  )
}
