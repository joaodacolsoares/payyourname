import React from 'react'

interface PaymentFormProps {
  handleClick: () => void,
  price: number
}

export default function PaymentForm({ handleClick, price } : PaymentFormProps) {
  return (
    <section className='w-full p-5 h-full justify-center bg-gray-100 rounded-lg flex flex-col'>
      <div className="flex  mb-2">
        <img
          className='w-16 h-16 rounded mr-2'
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description flex flex-col justify-center">
          <h3 className='font-bold text-sm'>Eternal Nickname</h3>
          <h5 className='text-sm text-gray-500'>${price || 0}.00</h5>
        </div>
      </div>
      <button 
        className='w-full font-bold bg-blue-500 text-white text-sm p-4 border rounded hover:opacity-70 transition-all' 
        type="button" 
        onClick={handleClick}>
        Checkout
      </button>
    </section>
  )
}