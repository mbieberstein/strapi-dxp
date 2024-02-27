import { Component, ReactNode } from "react";
import { Button, Flex } from '@strapi/design-system';
import TreeView from "./TreeView";
import {TreeIcon, TreeIconType} from "./TreeIcon";

interface IProps {
    tree: TreeView
    data: IPage
    parent: TreeNode | null
    last: boolean
}

interface IState {
    expanded: boolean
    selected: boolean
}

class TreeNode extends Component<IProps, IState> {
    
    id: string = '';

    constructor(props: IProps) {
        super(props)

        this.id = this.props.data.id.toString()    
        this.state = {expanded: false, selected: false}
        this.props.tree.addNode(this)
    }

    toggleChildren = () => {
        this.setState({expanded: !this.state.expanded})
    }

    selectNode = (id: number) => {
        this.props.tree.selectNode(this)
        this.setState({selected: true})
    }
    
    hasChildren = () => {
        return this.props.data.attributes.children.data.length > 0
    }

    isLast = () => {
        return this.props.last;
    }

    isExpanded = () => {
        return this.state.expanded
    }

    render(): ReactNode {

        const id = this.props.data.id
        const page = this.props.data.attributes
        const children = page.children.data
        const buttonStyle = this.state.selected ? 'secondary' : 'tertiary'
      
        let lines = []
        let n: TreeNode = this
        while(n.props.parent != null) {
            const treeLine = n.props.parent.hasChildren() && !n.props.parent.isLast()
            const type = treeLine ? TreeIconType.line : TreeIconType.empty
            lines[lines.length] = <TreeIcon type={type}></TreeIcon>
            n = n.props.parent
        }

        lines = lines.reverse();

        return(
          <>                            
            <div style={{display: 'flex', alignItems: 'center', height: '48px'}}>
                
                {lines.map(( x => {return x}))}

                <TreeIcon customClickEvent={this.toggleChildren} node={this}/>    
                <Button variant={buttonStyle} onClick={this.selectNode.bind(this, id)}>{page.Title}</Button>
            </div>    
        
            {
                this.state.expanded && children.map((child: IPage, index: number) => {

                    const last: boolean = index == children.length-1
                    return <TreeNode last={last} parent={this} tree={this.props.tree} key={child.id.toString()} data={child}/>
                })
            }                
          </>
        )
    }
}

export default TreeNode