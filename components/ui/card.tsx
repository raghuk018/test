'use client'

import * as React from 'react'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white text-gray-900 shadow ${className}`}
      {...props}
    />
  )
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export function CardContent({ className = '', ...props }: CardContentProps) {
  return <div className={`p-4 ${className}`} {...props} />
}

export default Card




