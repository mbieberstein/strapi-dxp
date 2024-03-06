import { Component, ReactNode } from "react";
import {Field, Flex, FieldLabel, FieldInput, Box} from '@strapi/design-system';

interface IProps {

    name: string
    label: string
    value: string|number|null
    type: string
    onChange: any
}

class FormElement extends Component<IProps> {

    render(): ReactNode {
        return(
            <Box hasRadius background="neutral100" padding={4}>
                <Field name={this.props.name} required={false}>
                    <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>{this.props.label}</FieldLabel>
                        <FieldInput value={this.props.value} type="text" onChange={this.props.onChange}/>
                    </Flex>
                </Field>
            </Box>
        )
    }
}

export default FormElement