
import { Component, ReactNode } from "react";
import { Typography, Box } from '@strapi/design-system';
import Form from "./Form";

interface IProps {

    name: string
    component: IComponent
    rendering: IRendering
    onChange: any
    parentForm: Form
}

class Rendering extends Component<IProps> {

    render(): ReactNode {
    
        return(
        <>         
            <Form parentForm={this.props.parentForm} isSubform={true} namespace={this.props.name} data={this.props.rendering} schema={this.props.component.schema} key={this.props.rendering.id} id="rendering-form" onChange={this.props.onChange}></Form>
        </>)
    }

}

export default Rendering