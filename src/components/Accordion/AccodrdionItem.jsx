import React, { useRef } from 'react'

export const AccordionItem = ({ faqItem, onClick, isOpen }) => {
  const itemRef = useRef(null)

  return (
    <li className='accordion-item'>
      <button className='accordion-header' onClick={() => onClick()}>
        {faqItem.q}
      </button>
      <div
        className='accordion-collapse'
        style={
          isOpen ? { height: itemRef.current.scrollHeight } : { height: '0px' }
        }
      >
        <div className='accordion-body' ref={itemRef}>
          {faqItem.a}
        </div>
      </div>
    </li>
  )
}
