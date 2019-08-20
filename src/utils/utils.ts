import marked from 'marked'
import { h } from '@stencil/core'

export function normalizeText (text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

export function onCustomEvent <T> (target: HTMLElement, name: string, listener: (event: CustomEvent<T>) => void) {
  target.addEventListener(name, listener as any)
}

export function sortBy <T> (array: T[], iteratee: (value: T) => number, desc = false) {
  return array.sort((a, b) => iteratee(desc ? b : a) - iteratee(desc ? a : b))
}

const renderer = new marked.Renderer()
renderer.paragraph = (text) => text
export function markdown (text: string) {
  return marked(text, { renderer })
}

const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body']

export function renderHypertext (data: any[]) {
  if (!Array.isArray(data)) {
    console.error('content error, hypertext is undefined')
    return null
  }

  function buildArgument(index: number, argument: any): any {
    if (index === 0 && typeof argument === 'string' && tagBlacklist.includes(argument.toLowerCase().trim())) {
      return 'template'

    } else if (index === 1 && argument) {
      const attributes: { [key: string]: any, } = {}
      for (const key of Object.keys(argument)) {
        const k = key.toLowerCase()
        if (!k.startsWith('on') && k !== 'innerhtml') {
          attributes[key] = argument[key]
        }
      }
      return attributes

    } else if (index > 1) {
      if (Array.isArray(argument)) {
        return renderHypertext(argument)
      }
    }
    return argument
  }

  const elementArguments = data.map((argument, i) => buildArgument(i, argument))
  return (h as any)(...elementArguments)
}

function convertElementToHypertextData(node: Node): any {
  const data = []

  if (node.nodeType === 1) {
    const elm = node as HTMLElement
    let tag = elm.tagName.toLowerCase()

    if (tagBlacklist.includes(tag)) {
      tag = 'template'
    }

    data.push(tag)

    if (elm.attributes.length > 0) {
      const attributes: { [key: string]: string | null, } = {}
      for (let j = 0; j < elm.attributes.length; j++) {
        const attribute = elm.attributes.item(j)
        if (attribute) {
          attributes[attribute.nodeName] = attribute.nodeValue
        }
      }
      data.push(attributes)

    } else {
      data.push(null)
    }

    for (let i = 0; i < elm.childNodes.length; i++) {
      data.push(convertElementToHypertextData(elm.childNodes[i]))
    }

    return data

  } else if (node.nodeType === 3) {
    return (node as Text).textContent
  }

  return ''
}

export function convertHtmlToHypertextData(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  return convertElementToHypertextData(div)
}

export function toHypertext(html: string) {
  function extractChildren (rendered: any): any {
    return Object.values(rendered).find((v) => Array.isArray(v))
  }
  return extractChildren(renderHypertext(convertHtmlToHypertextData(html)))
}
