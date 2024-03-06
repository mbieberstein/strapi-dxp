import React, { Component, ReactNode } from 'react';
import TreeNode from './TreeNode'

interface IProps {
    data: IPage
    onClick: any
    onAdd: any
}

class TreeView extends Component<IProps> {

    nodes: Map<string, TreeNode> = new Map();
    selectedNode: TreeNode | null = null;

    addNode(node: TreeNode) {
        this.nodes.set(node.id.toString(), node)
    }

    selectNode( node: TreeNode) {
        if(this.selectedNode) {
            this.selectedNode.setState({selected: false})
        }
        this.selectedNode = node;
        node.setState({selected: true})
        this.props.onClick(node.id)
    }

    render() {

        return (
            <div>
                <TreeNode last={true} parent={null} tree={this} data={this.props.data} onClick={this.props.onClick} onAdd={this.props.onAdd}></TreeNode>
            </div>
        )
    }
}

export default TreeView