import './talent.css'
import './color.css'

import { useParams, NavLink } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import { getData } from '../../data/datas'
import { getTreeDataById } from '../../data/treeData'

function Talents() {
    let params = useParams()
    let professional = params.professional
    let spec = params.spec

    let data
    let specData

    console.log('params', params)

    let renderDomHead
    let renderDomBody
    let renderTrees

    if (professional) {
        data = getData(professional)

        if (data.specs.length > 0) {
            specData = data.specs.find((data) => data.name.toLowerCase() === spec)
        }
        console.log('specData', specData)

        renderDomHead = (
            <div>
                <h2 style={{ color: `${data.color}`, textAlign: 'center' }}>
                    {data.nameCh}|{data.displayName}
                </h2>
                <div className="skillList">
                    {data.defaultSkill.map((skill) => (
                        <div className="skillList-item" key={`${professional}-${spec}-${skill.name}`}>
                            <span data-tip={skill.desc} data-for={`skill-desc-${data.name}-${skill.name}`} key={`${data.name}_defaultskill_${skill.name}`}>
                                {skill.name}
                            </span>
                            <ReactTooltip id={`skill-desc-${data.name}-${skill.name}`} />
                        </div>
                    ))}
                </div>
            </div>
        )
        renderDomBody = (
            <div className="spec">
                {data.specs.map((talent) => (
                    <NavLink className="spec-item" to={{ pathname: `/talent/${data.name.toLowerCase()}/${talent.name.toLowerCase()}` }} key={`${data.name}_${talent.name}`}>
                        <div className="spec-item-head">
                            <div className="spec-icon GameIcon GameIcon--medium">
                                <div className={'GameIcon-icon'} style={{ backgroundImage: `url(${talent.specicon})` }}></div>
                            </div>
                            <div className="spec-name">{talent.nameCh}</div>
                        </div>
                        <div className="spec-item-body">{talent.desc}</div>
                    </NavLink>
                ))}
            </div>
        )

        if (spec && specData) {
            // 职业天赋树
            let telTree = new TalentTree(specData, '职业天赋树', data.name, data.nameCh, data.id, getTreeDataById(data.id)).render()
            // 专精天赋树
            let specTree = new TalentTree(specData, '专精天赋树', specData.name, specData.nameCh, specData.id, getTreeDataById(specData.id)).render()

            renderTrees = (
                <div
                    data-class-spec=""
                    className="talent-trees"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6666), transparent 50px),url(/source/bg/druid-balance.webp)`,
                        backgroundColor: '#161734',
                    }}>
                    {telTree}
                    {specTree}
                </div>
            )
        }
    }

    return (
        <div>
            {renderDomHead}
            {renderDomBody}
            {renderTrees}
        </div>
    )
}

/**
 * 天赋树object
 */
let TalentTree = function TalentTree(specData, title, name, nameCh, key, data) {
    this.specData = specData
    this.title = title
    this.name = name
    this.nameCh = nameCh
    this.key = key
    this.data = data

    this.width = 17

    this.render = () => {
        return (
            <div className="talent-tree" key={key}>
                <div className="talent-tree-head">
                    <div className="talent-tree-head-name">
                        <span>
                            {this.title}|{this.nameCh}({this.name} Tree)
                        </span>
                    </div>
                    <div className="talent-tree-head-point c11">
                        <span>花费点数：0/30 </span>
                    </div>
                    <div className="talent-tree-head-level c11">
                        <span>需求等级：0 </span>
                    </div>
                </div>
                <div className="talent-tree-body">
                    <div className="talent-tree-space">{this.items()}</div>
                </div>
            </div>
        )
    }

    this.items = () => {
        return (
            <div className="talent-tree-grid">
                {Object.keys(this.data.talents).map((idKey) => {
                    let talentSkills = this.data.talents[idKey]

                    return this.item(talentSkills)

                    // else {
                    //     // 多选技能区域
                    //     // return (
                    //     //     <a className="talent-tree-talent" data-row="1" data-column="3" data-cell="2" data-talent-type="1" data-tooltip-mode="icon" data-no-touch-lightbox="true" href="https://www.wowhead.com/beta/spell=1822/rake" data-available="1">
                    //     //         <div className="dragonflight-talent-tree-talent-name">Test</div>
                    //     //         <div className="dragonflight-talent-tree-talent-boundary">
                    //     //             <div className="dragonflight-talent-tree-talent-inner">
                    //     //                 <div className="dragonflight-talent-tree-talent-inner-background"></div>
                    //     //             </div>
                    //     //         </div>
                    //     //     </a>
                    //     // )
                    // }
                })}
            </div>
        )
    }

    this.item = (talentSkills) => {
        console.log('talentSkills', talentSkills)
        // 只有一个技能的区域
        if (talentSkills.length === 1) {
            let talentSkill = talentSkills[0]
            let column = (talentSkill.cell % this.width) + 1
            let row = Math.floor(talentSkill.cell / this.width) + 1
            let isDefaultSkill = talentSkill.defaultSpecs[0] === this.specData.id

            if (!isDefaultSkill) {
                // 非 default skill 可以编辑
                return (
                    // data-available="1" 彩色色块
                    // data-full="1" 金色边框
                    <div className="talent-tree-talent" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} data-tooltip-mode="icon" data-available={isDefaultSkill ? '1' : '0'} data-full={isDefaultSkill ? '1' : '0'} data-no-touch-lightbox="true" key={talentSkill.spells[0].spell}>
                        <a href={`https://www.wowhead.com/beta/spell=${talentSkill.spells[0].spell}/${talentSkill.spells[0].name}`}>
                            <div className="talent-tree-talent-name">{talentSkill.spells[0].name}</div>
                            <div className="talent-tree-talent-boundary">
                                <div className="talent-tree-talent-inner">
                                    <div
                                        className="talent-tree-talent-inner-background"
                                        style={{
                                            // https://wow.zamimg.com/images/wow/icons/large/xxx.jpg
                                            backgroundImage: `url('http://www.wowdb.cn/icons/large/${talentSkill.spells[0].icon}.jpg')`,
                                        }}></div>
                                </div>
                            </div>
                        </a>
                        <div className="talent-tree-talent-points" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} dangerouslySetInnerHTML={{ __html: `0/${talentSkill.spells[0].points}` }}></div>
                    </div>
                )
            } else {
                // default skill    不可以编辑区域
                return (
                    // data-available="1" 彩色色块
                    // data-full="1" 金色边框
                    <div className="talent-tree-talent" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} data-tooltip-mode="icon" data-available={isDefaultSkill ? '1' : '0'} data-full={isDefaultSkill ? '1' : '0'} data-no-touch-lightbox="true" key={talentSkill.spells[0].spell}>
                        <a href={`https://www.wowhead.com/beta/spell=${talentSkill.spells[0].spell}/${talentSkill.spells[0].name}`}>
                            <div className="talent-tree-talent-name">{talentSkill.spells[0].name}</div>
                            <div className="talent-tree-talent-boundary">
                                <div className="talent-tree-talent-inner">
                                    <div
                                        className="talent-tree-talent-inner-background"
                                        style={{
                                            // https://wow.zamimg.com/images/wow/icons/large/xxx.jpg
                                            backgroundImage: `url('http://www.wowdb.cn/icons/large/${talentSkill.spells[0].icon}.jpg')`,
                                        }}></div>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            }
        } else {
            // 多选技能区域
            let talentSkill = talentSkills[0]
            let column = (talentSkill.cell % this.width) + 1
            let row = Math.floor(talentSkill.cell / this.width) + 1
            let isDefaultSkill = talentSkill.defaultSpecs[0] === this.specData.id
            return (
                <div className="talent-tree-talent" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} data-tooltip-mode="icon" data-available={isDefaultSkill ? '1' : '0'} data-full={isDefaultSkill ? '1' : '0'} data-no-touch-lightbox="true" key={talentSkill.spells[0].spell}>
                    <a href={`https://www.wowhead.com/beta/spell=${talentSkill.spells[0].spell}/${talentSkill.spells[0].name}`}>
                        <div className="talent-tree-talent-name">{talentSkill.spells[0].name}</div>
                        <div className="talent-tree-talent-boundary">
                            <div className="talent-tree-talent-inner">
                                <div
                                    className="talent-tree-talent-inner-background"
                                    style={{
                                        // https://wow.zamimg.com/images/wow/icons/large/xxx.jpg
                                        backgroundImage: `url('http://www.wowdb.cn/icons/large/${talentSkill.spells[0].icon}.jpg')`,
                                    }}></div>
                            </div>
                        </div>
                    </a>
                    <div className="talent-tree-talent-points" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} dangerouslySetInnerHTML={{ __html: `0/${talentSkill.spells[0].points}` }}></div>
                </div>
            )
        }
    }
}

export default Talents
