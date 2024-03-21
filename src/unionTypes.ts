const cardTypes = ['♥','♦','♣','♠'] as const
const numberTypes = ['A', '2', '3', '4'] as const

type Typecard = typeof cardTypes [number] // 元祖类型
type TypeNumber = typeof numberTypes [number]

function creatCard(type: Typecard, number: TypeNumber) {
    return type + number
}

creatCard('♣', '2')