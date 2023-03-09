import React, { useEffect } from 'react'
import wasmImage from 'scripts/wasm-game'

type Props = {}

export const WasmGame = (props: Props) => {
  useEffect(() => {
    wasmImage('game-of-life')
  }, [])
  return (
    <div
      style={{
        position: 'relative',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {' '}
      <canvas id="game-of-life" />{' '}
    </div>
  )
}
