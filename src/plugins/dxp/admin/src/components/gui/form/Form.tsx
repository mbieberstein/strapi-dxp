import React, { Component, ReactNode } from "react";
import FormElement from "./FormElement";
import { Typography, Box } from '@strapi/design-system';

interface IProps {
    id: string
    namespace?: string
    schema: ISchema
    data: object
    onChange?: any | null
    isSubform?: boolean
    parentForm?: Form
}

class Form extends Component<IProps> {

    constructor(props: IProps) {

        super(props)

        this.state = {}

        this.mapState()
    }

    handleChange = (event: any) => {

        console.log(this.props.id + "\n" + event)

        if (!event.target) {
            return
        }

        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name

        const callback = () => {

            if (this.props.parentForm) {
                this.props.parentForm.handleChange(event)
            }
            else {
                if (this.props.onChange) {
                    this.props.onChange(this.state)
                }
            }
        }

        // @ts-ignore
        const field: any = this.props.schema.attributes[name]

        if (field.type === 'dynamiczone') {

            const nameparts = name.split('.')
            // Do something ha ha
        }

        this.setState({
            [name]: value
        }, callback)        

    }

    // Copy props.data to the internal state
    mapState() {

        // Using the attributes form the content-type schema
        Object.entries(this.props.schema.attributes).forEach(([k, v]) => {

            let value: string | number | null = ''

            if (this.isKey(this.props.data, k)) {

                value = this.props.data[k]

                // null values will produce a react warning
                if (value === null) {
                    value = ''
                }
            }

            const name = this.getElementName(k)

            //@ts-ignore
            this.state[name] = value
        })
    }

    render(): ReactNode {

        if (!this.props.schema) {
            return null
        }

        const elements: any = []

        Object.entries(this.props.schema.attributes).forEach(([key, attribute]) => {

            const name = this.getElementName(key)

            //@ts-ignore
            const value = this.state[name]

            const onChange = this.handleChange

            elements.push(<FormElement parentForm={this.props.parentForm ?? this} key={key} name={name} label={key} value={value} type={attribute.type} required={attribute.required} onChange={onChange}></FormElement>)
        })

        if (this.props.isSubform) {
            return (
                <>
                    <Box padding="1">
                        <Typography variant="beta">{this.props.schema.displayName}</Typography>
                    </Box>
                    <div>{elements}</div>
                </>
            )
        }

        return (
            <>
                <form>
                    <Box padding="1">
                        <Typography variant="beta">{this.props.schema.displayName}</Typography>
                    </Box>
                    <div>{elements}</div>
                </form>
            </>
        )
    }

    private getElementName(name: string) {
        if (this.props.isSubform && this.props.namespace) {
            name = `${this.props.namespace}${name}`
        }
        return name
    }

    private isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
        return k in x
    }
}

export default Form