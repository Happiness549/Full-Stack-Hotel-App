import React from 'react'

type Props = {
    variant?: String,
    children?: React.ReactNode,
    className?: string,
}

export const Text: React.FC<Props> = ({variant, children, className}) => {
  if(variant === 'span') return <span className={className}>{children}</span>
  if(variant === 'h1') return <h1 className={className}>{children}</h1>
  if(variant === 'h2') return <h2 className={className}>{children}</h2>
  if(variant === 'h3') return <h3 className={className}>{children}</h3>
  if(variant === 'h4') return <h4 className={className}>{children}</h4>
  if(variant === 'p') return <p className={className}>{children}</p>
   


    return (
    <div className={className}>{children}</div>
  )
}