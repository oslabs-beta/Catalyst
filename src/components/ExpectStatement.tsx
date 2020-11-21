import React from 'react'

interface Props{
  id: string
}


export const ExpectStatement: React.FC<Props> = ({id}: Props) =>{
  return(
    <div id = {`${id}`}>
      Expect
    </div>
  )
}