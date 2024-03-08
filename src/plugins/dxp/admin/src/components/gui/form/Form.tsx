import { Component, ReactNode } from "react";
import FormElement from "./FormElement";
import { Typography, Box } from '@strapi/design-system';

interface IProps {
    id: string
    type: IContentType
    data: object
    onChange?: any | null
}

class Form extends Component<IProps> {

    constructor(props: IProps) {

        super(props)

        this.state = {}
        
        this.mapState()
    }

    handleChange = (event: any) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        }, () => {
            
            if(this.props.onChange) {
                this.props.onChange(this.state)
            }
        });

    }

    // Copy props.data to the internal state
    mapState() {

        // Using the attributes form the content-type schema
        Object.entries(this.props.type.schema.attributes).forEach(([k, v]) => {

            let value: string|number|null = ''

            if(this.isKey(this.props.data, k)) { 

                value = this.props.data[k]

                // null values will produce a react warning
                if(value === null) {
                    value = ''
                }
            }

            //@ts-ignore
            this.state[k] = value
        })
    }

    render(): ReactNode {

        if(!this.props.type) {
            return null
        }
        
        const elements: any = []

        Object.entries(this.props.type.schema.attributes).forEach(([key, attribute]) => {
        
            //@ts-ignore
            const value = this.state[key]
            
            elements.push(<FormElement key={key} name={key} label={key} value={value} type={attribute.type} required={attribute.required} onChange={this.handleChange}></FormElement>)
        })

        return(
            <>
                <form>
                    <Box padding="1">
                        <Typography variant="beta">{this.props.type.schema.displayName}</Typography>
                    </Box>
                    <div>{elements}</div>
                </form>
            </>
        )
    }

    isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
      return k in x
    }
}

export default Form