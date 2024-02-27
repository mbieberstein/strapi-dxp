import React, { Component, ReactNode } from 'react';
import TreeNode from './TreeNode'

interface IProps {
    data: IPage
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
    }

    render() {

        return (
            <div>
                <TreeNode last={true} parent={null} tree={this} data={this.props.data}></TreeNode>
            </div>
        )
    }
}

export default TreeView