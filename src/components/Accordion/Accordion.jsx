import React, { useState } from 'react'
import { AccordionItem } from './AccordionItem'

export const Accordion = ({ faqList }) => {
  const [openId, setId] = useState(null)

  return (
    <ul className='accordion'>
      {faqList.map((faqItem, id) => {
        return (
          <AccordionItem
            onClick={() => (id === openId ? setId(null) : setId(id))}
            faqItem={faqItem}
            isOpen={id === openId}
            key={id}
          />
        )
      })}
    </ul>
  )
}
