import { createShaderCanvas } from 'typegpu-shader-canvas';

import * as d from 'typegpu/data'
import * as std from 'typegpu/std'

const span = 10

export function gradient() {
  const canvas = document.getElementById('canvas')
  const shaderCanvas = createShaderCanvas(canvas, ({ uv }) => {
    'use gpu'
    const red = std.floor(uv.x * span) / span
    const green = std.floor(uv.y * span) / span
    return d.vec4f(red, green, 0.5, 1.0)
  })

  shaderCanvas.startRendering()
  return shaderCanvas
}

















