import { Component as ReactComponent, ReactNode } from "react";
import DataProvider from "../../../data/DataProvider";
import { Typography, Box } from '@strapi/design-system';
import Rendering from "./Rendering";
import Form from "./Form";



interface IProps {
    name: string
    label: string
    data: IRendering[]
    onChange: any
    parentForm: Form
}

interface IState {
    components: Map<string, IComponent>|null
}

class DynamicZone extends ReactComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state = {components: null}
    }

    componentDidMount(): void {
        DataProvider.getComponents().then((components) => {
            this.setState({components: components})
        })
    }

    render(): ReactNode {

        if(this.state.components === null) {
            return null
        }

        if(!this.props.data) {
            return null
        }

        return (            

            <>
                <Typography variant="beta">{this.props.label}</Typography>
                {this.props.data.map((rendering: IRendering, index: number) => {
                    
                    const component = this.state.components?.get(rendering.__component)
                    if(!component) {
                        return null;
                    }

                    const name = `${this.props.name}.${index}.`

                    return (
                        <Box padding="1" key={index}>
                            <Rendering parentForm={this.props.parentForm} name={name} component={component} rendering={rendering} onChange={this.props.onChange} key={index}/>
                        </Box>
                    )
                    
                })}    
            </>
        )            
    }
}

export default DynamicZone