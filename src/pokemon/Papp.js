import React, { useEffect, useState } from 'react';
import './style.css'

function Papp(){


     var [id,setid]=useState(1);
     const[type,settype]=useState([]);
     const[ability,setability]=useState([]);
     const [data,setdata]=useState(null);
     const [search,setsearch]=useState(null);
     const [name,setname]=useState(null);
     const [height,setheight]=useState(null);
     const [weight,setweight]=useState(null);
    

    useEffect(()=>{
        fetch(' https://pokeapi.co/api/v2/pokemon?limit=1118')
             .then(response => response.json())
             .then(pdata => setdata(pdata))

             console.log(data);
            

    },[search])

    function display()
    {
       data.results.map(item=>{
          if(item.name===search)
          {
             setname(item.name)
             setid(id);
             console.log(name);
             console.log(id);
             let url=item.url;
             fetch(url)
             .then(response => response.json())
             .then((pdata)=>{
                settype(pdata.types)
                setheight(pdata.height)
                setweight(pdata.weight)
                setability(pdata.abilities)
             })
            //  setheight(type.height)
            //  pdata => settype(pdata.types)

             console.log(type)
          }
          id++;
          
       })
   
    }
 
 

    return(
        <div>
            <div className="image"></div> <div className="head">Pokedex</div>
            <div className="searchbox">
          <input type="text" placeholder="Pokemon name here..." onChange={e=>{setsearch(e.target.value)}}></input>
          <button onClick={()=>{display()}}>Search</button>
          </div>
          {!name?(<div className="error">No  pokemon found..</div>):(
              <div className="card">
          <h1 className="name">{name}</h1>
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} height="200px" width="200px" />
           <div className="title">Info</div>
           <div className="infobox">
           <div className="height">Height - {height} ft</div>
           <div className="weight">Weight - {weight} kg</div>
           <div className="type">
                         Type - <ul>{type.map(item=>{  return (<li>{item.type.name}</li>)})}</ul>
           </div>
           <div className="ability">
            Ability - <ul>{ability.map(item=>{ return (<li>{item.ability.name}</li>)})}</ul>
           </div>
           </div>
                    {id=1}          
            </div>
          )}
          
         
        </div>
    )
}

export default Papp