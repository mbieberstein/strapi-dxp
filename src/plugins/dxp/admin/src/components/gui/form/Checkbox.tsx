import { Component, ReactNode } from "react";
import { Box, Checkbox as StrapiCheckbox} from '@strapi/design-system';
import Form from "./Form";

interface IProps {

    name: string
    label: string
    value: string|number|null
    required: boolean
    onChange: any
    parentForm: Form
}

interface IState {
    value: string|number|null
}

class Checkbox extends Component<IProps, IState> {

    render(): ReactNode {
        
        return (<StrapiCheckbox name={this.props.name} onChange={this.props.onChange} value={this.props.value}>
        {this.props.label}
        </StrapiCheckbox>)
    }

}

export default Checkbox