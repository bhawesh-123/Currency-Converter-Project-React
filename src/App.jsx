import React, {  useCallback, useEffect, useState } from 'react'
import './App.css';
import CountryList from './Code.jsx'
import { ImArrowRight } from "react-icons/im";
const App = () => {

    // ---- amount usestate
    let [amount,setamount]=useState(1);
    //------ From and To usestate ----------------------------------- 
    let [from,setfrom]=useState("USD");
    let [to,seto]=useState("INR");
    // ----------image change usestate
    let [FromImg,setFromImg]=useState('https:/flagsapi.com/US/flat/64.png')
    let [TOImg,setToImg]=useState('https:/flagsapi.com/IN/flat/64.png')
    // -----convert,date usestate----------
    let[rate,setrate]=useState('');
    let[date,setdate]=useState('');
    
    // ---function to set amount--------------------------------------
    let fixamt=(e)=>{
        let amt=Math.max(1,e.target.value)
        setamount(amt);
    }
    // ----function to select to and from-----------------------------
    let Getfrom=(e)=>{
        setfrom(e.target.value) 
        let currcode=e.target.value;  
        let countrycode=CountryList[currcode];
        setFromImg(`https:/flagsapi.com/${countrycode}/flat/64.png`)
         
    }

    let Getto=(e)=>{
        seto(e.target.value)    
        let currcode=e.target.value;  
        let countrycode=CountryList[currcode];
        setToImg(`https:/flagsapi.com/${countrycode}/flat/64.png`)
        
    }
    // convert function-------------
     let Convert=(e)=>{
        console.log("value of from is "+from)
        console.log("value of To is "+to)
        e.preventDefault()
    }

    // ----------------------------------

    let  Convertcurrency=useCallback(
       async () => {
            
        let newapi=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`
    
    
        let response=await fetch(newapi);
        let data = await response.json();
        setrate([amount]*data[from.toLowerCase()][to.toLowerCase()]);
        setdate(data.date)
        
        },
        [amount,from,to]
    )

    useEffect(()=>{Convertcurrency()},[amount,from,to])

return (
    <main className='flex justify-center  bg-black items-center min-h-screen  bg-cover bg-center' style={{ backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/10/Dollar-Sign-HD-Wallpapers.jpg)' }}>    
        
        <form action="#" className='p-1 backdrop-blur-sm border-white flex flex-col justify-around border-2 h-85 w-60 box-border '>

            <h3 className=' text-white text-center text-2xl mt-3.5 font-medium'>Currency-Converter</h3>
            <div className='  border-white border-b-2 w-50  mt-1 ml-4'/>
            <div name='amount' className='m-1 mr-0.5'>
                <p className=' text-white sfont-medium'>Enter Amount</p>
                <input className='  border-white border-2 rounded p-0.5 mr-0.5' type="number" value={amount} onChange={fixamt}/>  
            </div>

        
            <div className='  flex p-1 justify-between  '>
            
                <div  className='' >
                    <p className=' text-white text-left font-medium'>FROM</p>

                    <div name='select' className=' p-0.5 border-white border-2 flex rounded  '> 
                        
                        <img className='h-6 w-6' src={FromImg}/>
                        
                        <select  className='text-black font-medium border-none' name='from' id="" value={from} onChange={Getfrom} >
                        {Object.keys(CountryList).map((CountryList)=>(
                            
                            <option key={CountryList}  value={CountryList}  >
                            {CountryList}
                            
                            </option>
                        ))
                        }           
                        </select>
                    </div>
                </div>
                <div className='flex mt-8 '>< ImArrowRight className='fill-white'/></div>
                <div  className=''>
                    <p className='text-left font-medium text-white'>TO</p>
                    <div name=' select' className=' p-0.5  border-white border-2 flex rounded'> 
                        <img className='h-6 w-6' src={TOImg}/>
                        
                        <select  className=' border-none text-black font-medium' name='to' value={to} onChange={Getto}>
                        {Object.keys(CountryList).map((currencyCode) => (
                        
                        <option key={currencyCode} value={currencyCode}>
                        {currencyCode}
                        </option>
                        ))}
                        </select>

                    </div>

                </div>
            </div>

            <div name='output' className='m-1 flex flex-col justify-around'>
                <p className='font-medium mb-0.5 text-white'>Date of Exchange Rate</p>
                <input className='  border-white border-2 font-medium rounded p-0.5' value={date}  readOnly type="text" name="" id="" />
                <p className='font-medium  mt-2  mb-0.5 text-white'>Exchange Value</p>
                <input className='border-2 font-medium border-white mb-2 rounded p-0.5' value={rate}  readOnly type="text" name="" id="" />

                {/* <button className=' mt-2 border-2 p-0.5 rounded' onClick={Convert}>Convert</button> */}
            </div>
            
        
      </form>
       
    </main>
   )
}

export default App