import React, {  useCallback, useEffect, useState } from 'react'
import './App.css';
import CountryList from './Code.jsx'
import { ImArrowRight } from "react-icons/im";
const App = () => {

    // ---- amount usestate
    let [amount,setamount]=useState("1");
    //------ From and To usestate ----------------------------------- 
    let [from,setfrom]=useState("USD");
    let [to,seto]=useState("INR");
    // ----------image change usestate
    let [FromImg,setFromImg]=useState('https://flagsapi.com/US/flat/64.png')
    let [TOImg,setToImg]=useState('https://flagsapi.com/IN/flat/64.png')
    // -----convert,date usestate----------
    let[rate,setrate]=useState('');
    let[date,setdate]=useState('');
    
    // ---function to set amount--------------------------------------
    let fixamt=(e)=>{
        let amt=Math.max(0,e.target.value)
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
        setrate(amount*data[from.toLowerCase()][to.toLowerCase()]);
        setdate(data.date)
        
        },
        [amount,from,to]
    )

    useEffect(()=>{Convertcurrency()},[amount,from,to])
    return (
        <main className='flex justify-center items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: 'url(https://png.pngtree.com/background/20231016/original/pngtree-3d-rendering-of-bank-card-and-currency-conversion-picture-image_5573978.jpg)' }}>
          <form action="#" className='p-4 backdrop-blur-sm flex flex-col justify-around custom-border rounded w-full sm:w-80  box-border'>
            <h3 className='text-black text-center text-3xl mt-3.5  font-medium'>Currency-Converter</h3>
            <div className='border-white border-b-2 w-full mt-1 ml-4' />
            
            <div name='amount' className='m-1 mr-0.5'>
              <p className='text-white  text-2xl font-light m-1 ml-0'>Enter Amount</p>
              <input
                className='custom-border text-white  font-medium text-xl rounded p-0.5 pl-1 w-full'
                placeholder='Enter Amount..'
                type="number"
                value={amount}
                onChange={fixamt}
              />
            </div>
    
            <div className='select'>
              <div>
                <p className='text-white text-left font-medium'>FROM</p>
                <div name='select' className='custom-border TO-FROM'>
                  <img className='h-6 w-6' src={FromImg} alt="From Flag" />
                  <select className=' text-white font-medium border-none w-14 outline-none' name='from' value={from} onChange={Getfrom}>
                    {Object.keys(CountryList).map((countryCode) => (
                      <option  className='text-black' key={countryCode} value={countryCode}>
                        {countryCode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='flex mt-8 border-none'>
                <ImArrowRight className='fill-white ml-2 mr-2' />
              </div>
              <div>
                <p className='text-left font-medium text-white'>TO</p>
                <div name='select' className=' custom-border TO-FROM'>
                  <img className='h-6 w-6' src={TOImg} alt="To Flag" />
                  <select className=' text-white font-medium w-14 outline-none' name='to' value={to} onChange={Getto}>
                    {Object.keys(CountryList).map((currencyCode) => (
                      <option className='text-black ' key={currencyCode} value={currencyCode}>
                        {currencyCode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
    
            <div name='output' className='m-1 flex flex-col justify-around'>
              <p className='font-400 text-xl mb-0.5 text-white'>Date of Exchange Rate</p>
              <input className='custom-border text-xl text-white pl-2 font-500 rounded p-0.5 w-full' value={date} readOnly type="text" />
              <p className='font-400  text-xl mt-2 mb-0.5 text-white'>Exchange Value</p>
              <input className='custom-border text-xl font-500 pl-2 text-white rounded p-0.5 w-full' value={rate} readOnly type="text" />
            </div>
          </form>
        </main>
      );
    };
    
    export default App;