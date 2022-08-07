import { getDruidData } from './druid/initData'
import { getDeathKnightData } from './deathKnight/initData'

let datas = []
datas.push(getDruidData())
datas.push(getDeathKnightData())

export function getDatas() {
    return datas.sort((a, b) => {
        return a - b
    })
}

export function getData(name) {
    return datas.find((data) => data.name.toLowerCase() === name)
}
