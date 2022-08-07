import { getProfessional, getprofessionalEdge } from './professionalData'

let data = {
    id: 11,
    displayName: 'Druid',
    name: 'Druid',
    color: '#FF7D0A',
    nameCh: '德鲁伊',
    icon: 'GameIcon-class-druid-vector',
    defaultSkill: [
        {
            name: '愤怒',
            desc: '',
        },
        {
            name: '月火术',
            desc: '',
        },
        {
            name: '愈合',
            desc: '',
        },
        {
            name: '起死回生',
            desc: '',
        },
        {
            name: '纠缠根须',
            desc: '',
        },
        {
            name: '熊形态',
            desc: '',
        },
        {
            name: '树皮术',
            desc: '',
        },
        {
            name: '低吼',
            desc: '',
        },
        {
            name: '猎豹形态',
            desc: '',
        },
        {
            name: '潜行',
            desc: '',
        },
        {
            name: '急奔',
            desc: '',
        },
        {
            name: '凶猛撕咬',
            desc: '',
        },
        {
            name: '水栖形态',
            desc: '',
        },
        {
            name: '旅行形态',
            desc: '',
        },
        {
            name: '飞行形态',
            desc: '',
        },
        {
            name: '传送：月光林地',
            desc: '',
        },
        {
            name: '野性印记',
            desc: '为团队成员提供3%的爆击、加速和魔法减伤',
        },
        {
            name: '新生',
            desc: '',
        },
    ],
    specs: [
        {
            id: 104,
            name: 'Guardian',
            nameCh: '守护',
            desc: '强大的熊形态，吸收伤害并保护盟友。 偏好武器：法杖和长柄武器',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/ability_racial_bearform.jpg',
        },
        {
            id: 105,
            name: 'Restoration',
            nameCh: '恢复',
            desc: '使用自然魔法使盟友重焕活力。 偏好武器：法杖、匕首和锤',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/spell_nature_healingtouch.jpg',
        },
        {
            id: 102,
            name: 'Balance',
            nameCh: '平衡',
            desc: '变形为强大的枭兽，释放奥术和自然的平衡之力。 偏好武器：法杖、匕首和锤',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/spell_nature_starfall.jpg',
        },
        {
            id: 103,
            name: 'Feral',
            nameCh: '野性',
            desc: '致命的猎豹形态，利用撕咬和流血造成大量伤害。 偏好武器：法杖和长柄武器',
            specicon: 'https://wow-render.blzstatic.cn/cn/icons/56/ability_druid_catform.jpg',
        },
    ],
    talentTrees: {
        // 记录图的点
        professional: [],
        // 记录图的边
        professionalEdge: [],
        spec: [[{}], [{}], [{}], [{}]],
        specMap: [[], [], [], []],
    },
}

data.talentTrees.professional = getProfessional()
data.talentTrees.professionalEdge = getprofessionalEdge()

export function getDruidData() {
    return data
}
