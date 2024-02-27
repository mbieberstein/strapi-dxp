import { Component, ReactNode } from "react";
import { SingleSelect, SingleSelectOption } from '@strapi/design-system';

interface IProps {

    value: any
    label: string
    placeholder: string
    onChange: any
    data: Array<IEntity> | null
}
  
class Select extends Component<IProps>{

    render(): ReactNode {

        let data = this.props.data

        if(!data || data.length === 0) {
            return
        }

        return(
            <>
            <SingleSelect label={this.props.label} placeholder={this.props.placeholder} value={this.props.value} onChange={(x: any) => this.props.onChange(x)}>
                {data.map((e: IEntity) => {

                    let name = ''

                    if(e.attributes) {
                        name = e.attributes.Title ?? e.attributes.name
                    }

                    return <SingleSelectOption value={e.id} key={e.id}>{name}</SingleSelectOption>
                })}
            </SingleSelect>;
            </>
        )
    }

}

export default Select