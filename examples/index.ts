import { highlight } from 'sugar-high';



import { gradient as gradientShader, initShader as initGradient } from './gradient';
import gradientSource from './gradient.ts?raw';
import { runExample as runGrid } from './grid';
import gridSource from './grid.ts?raw';
import { runExample as runLookAt } from './look-at';
import lookAtSource from './look-at.ts?raw';
import { runExample as runRgbWaves } from './rgb-waves';
import rgbWavesSource from './rgb-waves.ts?raw';
import { getTypeGpuRoot } from '../src/typegpu-shader-canvas'




const examples: Record<
  string,
  {
    run(): { dispose(): void }
    source: string
    init?: (root: TgpuRoot) => null
  }
> = {
  'rgb-waves': { run: runRgbWaves, source: rgbWavesSource },
  'look-at': { run: runLookAt, source: lookAtSource },
  grid: { run: runGrid, source: gridSource },
  gradient: { run: gradientShader, source: gridSource, init: initGradient },
}

const codeEl = document.getElementById('code')!
const tabsEl = document.getElementById('tabs')!

let current: { dispose: () => void } | null = null

function activate(name: string) {
  if (current) current.dispose()

  const example = examples[name]
  if (!example) return
  if (example.init)
    example.init(getTypeGpuRoot())

  current = example.run()
  codeEl.innerHTML = highlight(
    example.source
      .replace(/^export function.*\n/m, '')
      .replace(/^.*return shaderCanvas\n/m, '')
      .replace(/^}\n/m, '')
      .replace(/^  /gm, ''),
  )

  for (const tab of tabsEl.querySelectorAll('.tab')) {
    tab.classList.toggle(
      'active',
      (tab as HTMLElement).dataset.example === name,
    )
  }

  window.location.hash = name
}

tabsEl.addEventListener('click', (e) => {
  const tab = (e.target as HTMLElement).closest('.tab') as HTMLElement | null
  if (!tab) return
  const name = tab.dataset.example
  if (name) activate(name)
})

const initialExample = window.location.hash.slice(1) || 'rgb-waves'
activate(examples[initialExample] ? initialExample : 'rgb-waves')
