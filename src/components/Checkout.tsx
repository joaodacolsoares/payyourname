import React, { useState } from 'react'

interface PaymentFormProps {
  handleClick: (name: string, amount: number) => void
}

export default function Checkout({ handleClick } : PaymentFormProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState()

  const onNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  const onAmountChange = (event) => {
    const { value } = event.target
    setAmount(value)
  } 

  return (
    <section className='w-full from-black-to-transparent p-5 h-full justify-center box-border border-secondary-black border flex flex-col blur-md rounded-md'>
      <div className="flex flex-col mb-2 items-center">
        <input 
          className="p-3 w-full border-b-2 text-white bg-transparent border-white placeholder-gray-400 mb-2" 
          placeholder='Your name'
          onChange={onNameChange}
          value={name}/>
        <input 
          className="p-3 w-full border-b-2 text-white bg-transparent border-white placeholder-gray-400 mb-2" 
          placeholder='$ 0,00'
          onChange={onAmountChange}
          value={amount}/>
        <p className='text-gray-500 w-4/5 text-sm text-center mb-5'>To take the first place from 
          <span className='text-white'> Pipo </span> 
          you need to pay 
          <span className='text-main'> 0.01 US$</span>
        </p>
      </div>
      <button 
        className='bg-main w-full font-bold bg-blue-500 text-white text-lg p-4 rounded hover:opacity-70 transition-all' 
        type="button" 
        onClick={() => handleClick(name, amount)}>
        Pay your name
      </button>
    </section>
  )
}