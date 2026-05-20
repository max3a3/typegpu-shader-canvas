import { createShaderCanvas } from 'typegpu-shader-canvas';
import { type Infer, f32, i32, struct, vec2f } from 'typegpu/data'

import * as d from 'typegpu/data'
import { abs, floor, fract, length, sin, smoothstep, step } from 'typegpu/std'

import * as std from 'typegpu/std'





















let spanUniform

const initShader(root:TgpuRoot) {
  spanUniform = root.createUniform(d.vec2f)
spanUniform.write(d.vec2f(10,10))
}
export const shader = (uv) => {
  'use gpu'
  const red = std.floor(uv.x * spanUniform.$.x) / spanUniform.$.x
  const green = std.floor(uv.y * spanUniform.$.y) / spanUniform.$.y
  return d.vec4f(red, green, 0.5, 1.0)
}
shader.initShader = initShader

export function gradient( ) {
const canvas=  document.getElementById('canvas')
  const shaderCanvas = createShaderCanvas(canvas)

}