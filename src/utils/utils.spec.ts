import { normalizeText, sortBy, markdown, toHypertext } from './utils'

describe('normalizeText', () => {
  it('trims both side', () => {
    expect(normalizeText(' hello, world ')).toEqual('hello, world')
  })

  it('squashes continuous spaces', () => {
    expect(normalizeText('hello,   world')).toEqual('hello, world')
  })
})

describe('sortBy', () => {
  const records = [{
    name: 'unecochan',
    age: 29,
  }, {
    name: 'roachan',
    age: 13,
  }, {
    name: 'ojisan',
    age: 36,
  }]

  it('sorts correctly', () => {
    const sorted = sortBy(records, ({ age }) => age)
    expect(sorted.map(({ name }) => name).join((','))).toEqual('roachan,unecochan,ojisan')
  })

  it('sorts correctly descending', () => {
    const sorted = sortBy(records, ({ age }) => age, true)
    expect(sorted.map(({ name }) => name).join((','))).toEqual('ojisan,unecochan,roachan')
  })
})

describe('markdown', () => {
  it('not emits <p> for paragraph', () => {
    const md = 'hello, `world`'
    expect(markdown(md)).toEqual('hello, <code>world</code>')
  })
})

describe('toHypertext', () => {
  it('emits correct vdom', () => {
    const html = 'hello, <code>world</code>'
    expect(toHypertext(html)).toEqual([
      {
        '$flags$': 0,
        '$text$': 'hello, ',
      },
      {
        '$attrs$': null,
        '$children$': [
          {
            '$flags$': 0,
            '$text$': 'world',
          },
        ],
        '$elm$': undefined,
        '$flags$': 0,
        '$key$': undefined,
        '$name$': undefined,
        '$tag$': 'code',
      },
    ])
  })
})
