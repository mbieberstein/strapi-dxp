import { Component, ReactNode } from "react";
import { JSONInput } from '@strapi/design-system';
import { Button } from '@strapi/design-system';

interface IProps {
    data: object
}

interface IState {
    visible: boolean
}

class JsonView extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {visible: false}

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick()  {
        this.setState({visible : !this.state.visible});
    }

    render(): ReactNode {

        let value = '{}'

        if(this.props.data) {
            value = JSON.stringify(this.props.data, null, 2)            
        }

        return(
            <>            
                <Button variant={'secondary'} onClick={this.handleClick}>{this.state.visible ? "Hide Code" : "Show Code"}</Button>
                {this.state.visible && <JSONInput value={value}></JSONInput>}
            </>
        )
    }
}

export default JsonView