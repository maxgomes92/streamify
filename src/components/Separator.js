import React from 'react'

export default function Separator ({ height = 1, width = 1 }) {
  const display = height === 1 ? 'inline-block' : 'block'

  return (
    <div style={{ height, width, display }} />
  )
}