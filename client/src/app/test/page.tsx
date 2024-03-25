'use client'
import React, { useEffect ,useState} from 'react';
import Image from 'next/image';

const Test:React.FC =()=>{
    const [dataState,setData]=useState<any>([]);
    

    useEffect(()=>{

        fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:venter').then(data=>{
            data.json().then(datas=>setData(datas.items))
        })
        
       
    },[])
    console.log(dataState,'data state');
    

    return (
        <>
        {dataState.map((d:any)=>{
            return (
                <>
                    {/* {console.log(d.volumeInfo.imageLinks.thumbnail)}
                    {/* <Image key={d.volumeInfo.imageLinks.thumbnail} src={d.volumeInfo.imageLinks.thumbnail} alt='cover' width={100} height={200}/> */}
                    {/* <h1 style={{color:"red"}}>{d.volumeInfo.title}</h1>
                    {d.volumeInfo.categories?<h3 style={{color:'green'}}>{d.volumeInfo.categories}</h3>:<h3>Doesn't exist</h3>}
                    {d.volumeInfo.authors.map((data:string)=>(<h4>{data}</h4>))}
                    <p style={{color:'blue'}}>{d.volumeInfo.description}</p> */}
                </>
            );
        })}
        </>
    );
}

export default Test;