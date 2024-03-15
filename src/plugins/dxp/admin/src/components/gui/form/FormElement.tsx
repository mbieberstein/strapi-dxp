import { Component, ReactNode } from "react";
import { Field, Flex, FieldLabel, FieldInput, Box } from '@strapi/design-system';
import Checkbox from "./Checkbox";
import DynamicZone from "./DynamicZone";
import Form from "./Form";

interface IProps {

    name: string
    label: string
    value: string|number|null
    type: string
    required: boolean
    onChange: any
    parentForm: Form
}

class FormElement extends Component<IProps> {

    private static inputTypes = new Map<string, string>(Object.entries({string: 'text', boolean: 'checkbox', dynamiczone: 'dynamiczone'}))


    render(): ReactNode {

        const inputType = FormElement.inputTypes.get(this.props.type)

        if(!inputType) {
            return null
        }

        return(
            <Box hasRadius background="neutral100" padding={4}>
                {inputType === 'text' && 
                <Field name={this.props.name} required={this.props.required}>
                    <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>{this.props.label}</FieldLabel>
                        {inputType && <FieldInput value={this.props.value} type={inputType} onChange={this.props.onChange}/>}
                    </Flex>
                </Field>
                }
                {inputType === 'checkbox' && <Checkbox parentForm={this.props.parentForm} required={this.props.required} label={this.props.label} name={this.props.name} onChange={this.props.onChange} value={this.props.value}>
                {this.props.label}
              </Checkbox>}
              {inputType === 'dynamiczone' && <DynamicZone parentForm={this.props.parentForm} name={this.props.name} label={this.props.label} data={this.props.value as unknown as IRendering[]} onChange={this.props.onChange}></DynamicZone>}
            </Box>
        )
    }
}

export default FormElement