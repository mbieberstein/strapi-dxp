import { Component, ReactNode } from "react";
import {Field, Flex, FieldLabel, FieldInput, Box} from '@strapi/design-system';

interface IProps {

    name: string
    label: string
    value: string|number|null
    type: string
    required: boolean
    onChange: any
}

class FormElement extends Component<IProps> {

    private static inputTypes = new Map<string, string>(Object.entries({string: 'text', boolean: 'checkbox'}))


    render(): ReactNode {

        const inputType = FormElement.inputTypes.get(this.props.type)

        return(
            <Box hasRadius background="neutral100" padding={4}>
                <Field name={this.props.name} required={this.props.required}>
                    <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>{this.props.label}</FieldLabel>
                        {inputType && <FieldInput value={this.props.value} type={inputType} onChange={this.props.onChange}/>}
                    </Flex>
                </Field>
            </Box>
        )
    }
}

export default FormElement