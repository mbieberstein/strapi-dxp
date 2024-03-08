import { Component, ReactNode } from "react"
import TreeNode from "./TreeNode"
import SvgIcon from "./icons/SvgIcon"

interface IProps {
    node?: TreeNode
    customClickEvent?: any
    type?: TreeIconType
    size?: number
    color?: string
}

enum TreeIconType {
    empty,
    line
}

class TreeIcon extends Component<IProps> {

    branch = "M 24 0 L 24 48 M 24 24 H 48"
    branchLast = "M 24 0 L 24 24 H 48"
    empty = ""
    line = "M 24 0 L 24 50"
    //minus = "M 24 0 L 24 14 M 14 14 H 34 V 34 H 14 V 14 M 24 34 L 24 48 M 34 24 H 48 M 18 24 H 30"
    minus = "M 24 0 L 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30 M 24 34 V 48"
    //minusLast = "M 24 0 L 24 14 M 14 14 H 34 V 34 H 14 V 14 M 24 34 M 34 24 H 48 M 18 24 H 30"
    minusLast = "M 24 0 L 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30"
    //plus = "M 24 0 L 24 14 M 14 14 H 34 V 34 H 14 V 14 M 24 34 L 24 48 M 34 24 H 48 M 24 18 V 30 M 18 24 H 30"
    plus = "M 24 0 L 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30 M 24 34 V 48 M 24 18 V 30"
    //plusLast = "M 24 0 L 24 14 M 14 14 H 34 V 34 H 14 V 14 M 24 34 M 34 24 H 48 M 24 18 V 30 M 18 24 H 30"
    plusLast = "M 24 0 L 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30 M 24 18 V 30"

    rootPlus = "M 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30 M 24 18 V 30"
    rootMinus = "M 24 14 A 1 1 0 0 0 24 34 A 1 1 0 0 0 24 14 M 34 24 H 48 M 18 24 H 30"

    parent = 1 << 1
    children = 1 << 2
    expanded = 1 << 3
    last = 1 << 4

    icons = new Map()

    constructor(props: IProps) {
        super(props)

        // Root
        this.icons.set(this.children + this.last, this.rootPlus)
        this.icons.set(this.children + this.last + this.expanded, this.rootMinus)

        // Child nodes
        // No children
        this.icons.set(this.parent, this.branch)
        this.icons.set(this.parent + this.last, this.branchLast)

        // Node with children
        // collapsed
        this.icons.set(this.parent + this.children, this.plus)
        this.icons.set(this.parent + this.children + this.last, this.plusLast)

        // expanded
        this.icons.set(this.parent + this.children + this.expanded, this.minus)
        this.icons.set(this.parent + this.children + this.expanded + this.last, this.minusLast)

        this.icons.set(TreeIconType.empty, this.empty)
        this.icons.set(TreeIconType.line, this.line)
    }

    getSvgData(): string {

        if(this.props.type !== undefined) {
            return this.icons.get(this.props.type)
        }

        if(this.props.node === undefined) {
            return ''
        }

        const n = this.props.node.props
        
        let state = 0;

        if(n.parent) {
            state += this.parent
        }

        if(n.data.attributes.children?.data.length > 0) {
            state += this.children
        }

        if(this.props.node.state.expanded) {
            state += this.expanded
        }

        if(n.last) {
            state += this.last
        }
        
        const data = this.icons.get(state)

        return data;
    }

    render(): ReactNode {
                
        const data = this.getSvgData()

        return (
            <div style={this.props.customClickEvent ? {cursor: 'pointer'} : {}} onClick={this.props.customClickEvent}>
                <SvgIcon data={data} size={48} color={"#ccc"} stroke={0.6}></SvgIcon>
            </div>)
    }

}

export {TreeIcon, TreeIconType}