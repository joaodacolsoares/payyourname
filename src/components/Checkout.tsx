import React, { useContext, useState } from 'react'
import { NicknameContext } from '../contexts/NicknameContext'
import NumberFormat from 'react-number-format';

interface PaymentFormProps {
  handleClick: (name: string, amount: number) => void
}

export default function Checkout({ handleClick } : PaymentFormProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState()
  const { getTopNickname } = useContext(NicknameContext)
  const topNickname = getTopNickname()

  const onNameChange = (event) => {
    const { value } = event.target
    setName(value)
  }

  const onAmountChange = ({ floatValue }) => {
    setAmount(floatValue)
  } 

  return (
    <section className='w-full from-black-to-transparent p-5 h-full justify-center box-border border-secondary-black border flex flex-col rounded-md'>
      <div className="flex flex-col mb-2 items-center">
        <input 
          className="p-3 w-full border-b-2 text-white bg-transparent border-white placeholder-gray-400 mb-2" 
          placeholder='Your name'
          onChange={onNameChange}
          value={name}/>
        <NumberFormat 
          className="p-3 w-full border-b-2 text-white bg-transparent border-white placeholder-gray-400 mb-2" 
          placeholder='$ 0,00'
          thousandsGroupStyle="thousand"
          allowNegative={false}
          prefix='$'
          inputMode="decimal"
          decimalSeparator=","
          thousandSeparator="."
          displayType="input"
          type="text"
          decimalScale={2}
          onValueChange={onAmountChange}
          fixedDecimalScale={true}
          value={amount}/>
        {
          topNickname && 
          <p className='text-gray-500 w-4/5 text-sm text-center mb-5'>To take the first place from 
            <span className='text-white'> { topNickname.name } </span> 
            you need to pay 
            <span className='text-main'> { topNickname.amount } US$</span>
          </p>
        }
      </div>
      <button 
        className='bg-main w-full font-bold bg-blue-500 text-white text-lg p-4 rounded hover:opacity-70 transition-all disabled:opacity-50 disabled:cursor-not-allowed' 
        type="button"
        disabled={!amount || !name}
        onClick={() => handleClick(name, amount)}>
        Pay your name
      </button>
    </section>
  )
}