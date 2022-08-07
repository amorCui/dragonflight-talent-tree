import { getProfessional, getprofessionalEdge } from './professionalData'

let data = {
    id: 2,
    displayName: 'Death Knight',
    name: 'DeathKnight',
    color: '#C41F3B',
    nameCh: '死亡骑士',
    icon: 'GameIcon-class-death-knight-vector',
    defaultSkill: [
        {
            name: '凋零缠绕',
            desc: '',
        },
        {
            name: '死亡之握',
            desc: '',
        },
        {
            name: '符文熔铸',
            desc: '',
        },
        {
            name: '黑暗命令',
            desc: '',
        },
        {
            name: '黑锋之门',
            desc: '',
        },
        {
            name: '死神降临',
            desc: '',
        },
        {
            name: '冰霜之路',
            desc: '',
        },
        {
            name: '枯萎凋零',
            desc: '',
        },
        {
            name: '符文打击',
            desc: '',
        },
    ],
    specs: [
        {
            id: 21,
            name: 'Blood',
            nameCh: '鲜血',
            desc: '黑暗的守护者，控制和腐蚀生命能量来抵御攻击。 偏好武器：双手斧、锤和剑',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/spell_deathknight_bloodpresence.jpg',
        },
        {
            id: 22,
            name: 'Frost',
            nameCh: '冰霜',
            desc: '冰冻末日的使者，引导符文能量，用武器猛攻敌人。 偏好武器：双持斧、锤和剑',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/spell_deathknight_frostpresence.jpg',
        },
        {
            id: 23,
            name: 'Unholy',
            nameCh: '邪恶',
            desc: '枯萎与凋零的主宰，能够散播疫病，召唤不死仆从。 偏好武器：双手斧、锤和剑',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/spell_deathknight_unholypresence.jpg',
        },
    ],
    talentTrees: {
        // 记录图的点
        professional: [],
        // 记录图的边
        professionalEdge: [],

        spec: [[{}], [{}], [{}], [{}]],
        specEdge: [[], [], [], []],
    },
}

data.talentTrees.professional = getProfessional()
data.talentTrees.professionalEdge = getprofessionalEdge()

export function getDeathKnightData() {
    return data
}
