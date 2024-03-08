import React, { Component, ReactNode } from 'react';
import TreeNode from './TreeNode'
import HomePage from '../../pages/HomePage';
import Events from '../gui/Events'

interface IProps {
    data: IPage
    onClick: any
    onAddAction: any
    selectedPath?: string
}

class TreeView extends Component<IProps> {

    private nodes: Map<string, TreeNode> = new Map();
    selectedNode: TreeNode | null = null;

    constructor(props: IProps) {
        super(props)

        Events.subscribe(HomePage.EVENT_ON_AFTER_PAGE_ADDED, this.onAfterNodeAdded)
    }

    onAfterNodeAdded = (id: string) => {

        id = id.toString()

        this.selectedNode?.setState({selected: false, expanded: true}, () => {

            const node = this.nodes.get(id)
    
            if( node === undefined) {
                return
            }
    
            this.selectedNode = node
            node.setState({selected: true})
    
            this.props.onClick(node.id, node.path)    
        })
        
    }

    addNode(node: TreeNode) {
        this.nodes.set(node.id.toString(), node)
        console.log("Tree AddNode: " + node.id)
    }

    selectNode(node: TreeNode) {
        if(this.selectedNode) {
            this.selectedNode.setState({selected: false})
        }
        this.selectedNode = node;
        node.setState({selected: true})
        this.props.onClick(node.id, node.path)
    }

    render() {

        return (
            <div>
                <TreeNode selectedPath={this.props.selectedPath} last={true} parent={null} tree={this} data={this.props.data} onClick={this.props.onClick} onAdd={this.props.onAddAction}></TreeNode>
            </div>
        )
    }
}

export default TreeView