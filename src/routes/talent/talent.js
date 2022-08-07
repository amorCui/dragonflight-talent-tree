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
            let telTree = new TalentTree('职业天赋树', data.name, data.nameCh, data.id, getTreeDataById(data.id)).render()
            // 专精天赋树
            let specTree = new TalentTree('专精天赋树', specData.name, specData.nameCh, specData.id, getTreeDataById(specData.id)).render()

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
let TalentTree = function TalentTree(title, name, nameCh, key, data) {
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
                    <div className="talent-tree-space">{this.items}</div>
                </div>
            </div>
        )
    }

    this.items = (
        <div className="talent-tree-grid">
            {Object.keys(this.data.talents).forEach((idKey) => {
                let talentSkills = this.data.talents[idKey]
                if (talentSkills.length === 1) {
                    let talentSkill = talentSkills[0]
                    let column = (talentSkill.cell % this.width) + 1
                    let row = Math.floor(talentSkill.cell / this.width) + 1
                    console.log('talentSkill', talentSkill)
                    // 只有一个技能的区域
                    return (
                        <a className="talent-tree-talent" data-row={row} data-column={column} data-cell={talentSkill.cell} data-talent-type={talentSkill.type} data-tooltip-mode="icon" data-no-touch-lightbox="true" href="https://www.wowhead.com/beta/spell=1822/rake" data-available="1" key={talentSkill.spells[0].spell}>
                            <div className="talent-tree-talent-name">Rake</div>
                            <div className="talent-tree-talent-boundary">
                                <div className="talent-tree-talent-inner">
                                    <div className="talent-tree-talent-inner-background"></div>
                                </div>
                            </div>
                        </a>
                    )
                } else {
                    return <div></div>
                }
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

export default Talents
