import { Component, ReactNode } from "react";

interface IProps {
    data: string
    size: number
    color: string
    stroke: number
}

class SvgIcon extends Component<IProps> {

    render(): ReactNode {
        
        const viewBox = `0 0 ${this.props.size} ${this.props.size}`

        return(
            <svg width={this.props.size} height={this.props.size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={this.props.data} stroke={this.props.color} strokeWidth={this.props.stroke} fill="none"/>
            </svg>
        )
    }
}

export default SvgIcon