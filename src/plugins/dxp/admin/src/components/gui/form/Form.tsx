import { Component, ReactNode } from "react";
import FormElement from "./FormElement";
import { Typography, Box } from '@strapi/design-system';
import ApiAdapter from "../../../data/ApiAdapter";
import DataProvider from "../../../data/DataProvider";

interface IProps {
    type: IContentType
    data: object
}

class Form extends Component<IProps> {

    constructor(props: IProps) {
        super(props)

        this.state = {name : ''}

        Object.entries(this.props.type.schema.attributes).forEach(([k, v]) => {

            let value: string|number|null = ''

            if(this.isKey(this.props.data, k)) { 

                //console.log(k, this.props.data[k]) 

                value = this.props.data[k]

                if(value === null) {
                    value = ''
                }
            }

            //@ts-ignore
            this.state[k] = value
        })
    }

    handleSubmit = async (event: any) => {
        
        console.log(this.state)

        event.preventDefault();
    }

    handleChange = (event: any) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    render(): ReactNode {

        if(!this.props.type) {
            return null
        }
        
        const elements: any = []

        Object.entries(this.props.type.schema.attributes).forEach(([k, v]) => {
        
            //@ts-ignore
            const value = this.state[k]
            
            elements.push(<FormElement key={k} name={k} label={k} value={value} type={v.type} onChange={this.handleChange}></FormElement>)
        })

        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <Box padding="1">
                        <Typography variant="beta">{this.props.type.schema.displayName}</Typography>
                    </Box>
                    <div>{elements}</div>
                    <button type="submit">Save</button>
                </form>
            </>
        )
    }

    isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
      return k in x
    }
}

export default Form