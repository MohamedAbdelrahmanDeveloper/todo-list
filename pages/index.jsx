// import Image from 'next/image'

import Head from "next/head";
import Image from "next/image";
import photo from "@/public/photo.avif";

import { useEffect, useState } from "react"
import Info from "@/components/Info";
// import Pagination from "@/components/Pangination";

export default function Home() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])


  const onLoadCom = () => {
    if (localStorage.getItem('todolist')) {
      const data = localStorage.getItem('todolist');
      setList(JSON.parse(data))
    }
    else {
      localStorage.setItem('todolist', '[]')
    }
  }

  const addToList = (e) => {
    e.preventDefault();
    if (text.trim() != '') {
      const newData = [...list, { id: list.length + 1, text: text }]
      setList(newData);
      localStorage.setItem('todolist', JSON.stringify(newData))
      setText('');
    }

  }

  const deleteTodo = (e) => {
    if (e != 'all') {
      let index = list.indexOf(e)
      list.splice(index, 1);
      setList([...list]);
      localStorage.setItem('todolist', JSON.stringify([...list]))
    }
    else {
      setList([]);
      localStorage.setItem('todolist', JSON.stringify([]))
    }
  }

  const changeText = (e) => {
    setText(e.target.value)
  }
  const review = () => {
    if (text) {
      return (
        <div className="flex items-center gap-2">
          <div
            className={`flex flex-grow items-center gap-2  bg-gray-200 p-2 rounded cursor-pointer`}
          >
            {/* <input className="flex-none" checked={e.id} type="checkbox" /> */}
            <div className="flex-grow">{text}</div>
          </div>
          <button onClick={() => setText('')} className="flex-none bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Clear
          </button>
        </div>
      )
    }
  }
  useEffect(() => {
    onLoadCom()
  }, [])
  return (
    <div className="">
      <Head>
        <title>Todo list app | by Mohamed Abdelrahman</title>
        <meta name="descripthion" content="this is weather app with nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]' />
        <Image src={photo}
          layout='fill'
          className='object-cover'
          alt='this is alt for image'
        />
        <div className='relative flex flex-col-reverse md:flex-row justify-between items-center w-full pt-4 px-4 z-10'>
          <div className="flex flex-col pt-8 max-w-2xl w-full mx-auto gap-4 h-[70vh] md:h-[90vh]">
            <form className="flex gap-2" onSubmit={addToList} >
              <input type="text" value={text} onChange={changeText}
                placeholder="New Todo"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button className="bg-blue-500 text-white font-bold p-2 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
            {/* <Pagination itemsPerPage={3}  /> */}
            <div className="flex flex-col gap-4 h-full overflow-y-scroll scrollbar-hide">
              {review()}
              {list.map((e, i) => (
                <div key={i} className="flex items-center gap-2"> <span className="w-5 text-white font-bold">{i + 1}</span>
                  <div
                    className={`flex flex-grow items-center gap-2  bg-gray-200 p-2 rounded cursor-pointer`}
                  >
                    {/* <input className="flex-none" checked={e.id} type="checkbox" /> */}
                    <div className="flex-grow">{e.text}</div>
                  </div>
                  <button onClick={() => deleteTodo(e)} className="flex-none bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Info />
        </div>
      </main>
    </div>
  )
}
