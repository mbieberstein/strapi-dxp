import { Component, ReactNode } from "react";
import { Button, IconButton } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import TreeView from "./TreeView";
import {TreeIcon, TreeIconType} from "./TreeIcon";

interface IProps {
    tree: TreeView
    data: IPage
    parent: TreeNode | null
    last: boolean
    onClick: any
    onAdd: any
    selectedPath?: string
}

interface IState {
    expanded: boolean
    selected: boolean
    displayName: string
}

class TreeNode extends Component<IProps, IState> {
    
    id: string = '';
    path: string = ''

    constructor(props: IProps) {
        super(props)

        this.id = this.props.data.id.toString()    
        this.state = {
            expanded: false, 
            selected: false, 
            displayName: TreeNode.getDisplayName(this.props.data)
        }

        this.props.tree.addNode(this)
    }

    static getDisplayName(data: IPage) {
        return data.attributes.Title ?? data.attributes.name
    }

    toggleChildren = () => {
        this.setState({expanded: !this.state.expanded})
    }

    selectNode = () => {
        this.props.tree.selectNode(this)
        this.setState({selected: true})
    }
    
    onAdd = (id: number | string) => {
        this.props.onAdd(id);
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
        const children = page.children?.data
        const buttonStyle = this.state.selected ? 'secondary' : 'tertiary'
      
        let lines = []
        let n: TreeNode = this    

        this.path = this.id

        while(n.props.parent != null) {
            const treeLine = n.props.parent.hasChildren() && !n.props.parent.isLast()
            const type = treeLine ? TreeIconType.line : TreeIconType.empty
            lines[lines.length] = <TreeIcon type={type} key={n.props.parent.id}></TreeIcon>
            n = n.props.parent

            this.path = n.id + '/' + this.path
        }

        this.path = '/' + this.path

        //console.log("Node:" + this.path + " SelectedPath: " + this.props.selectedPath)

        lines = lines.reverse();

        return(
          <>                            
            <div style={{display: 'flex', alignItems: 'center', height: '48px'}}>
                
                {lines.map(( x => {return x}))}

                <TreeIcon customClickEvent={this.toggleChildren} node={this}/>    
                <Button variant={buttonStyle} onClick={this.selectNode}>{this.state.displayName}</Button>
                {this.state.selected && <IconButton onClick={this.onAdd.bind(this, id)} label="Add Page" icon={<Plus />} />}
            </div>    
        
            {
                this.state.expanded && children?.map((child: IPage, index: number) => {

                    const last: boolean = index == children.length-1
                    return <TreeNode selectedPath={this.props.selectedPath} last={last} parent={this} tree={this.props.tree} key={child.id.toString()} data={child} onClick={this.props.onClick} onAdd={this.props.onAdd}/>
                })
            }                
          </>
        )
    }
}

export default TreeNode