/*
 *
 * HomePage
 *
 */

import { Component, ReactNode } from 'react';
import ApiAdapter from '../../data/ApiAdapter';
import TreeView from '../../components/gui/TreeView';
import JsonView from '../../components/gui/JsonView';
import { GridLayout } from '@strapi/design-system';
import { Box } from '@strapi/design-system';
import { BaseHeaderLayout, Breadcrumbs, Crumb, Divider } from '@strapi/design-system';
import {Field, Flex, FieldLabel, FieldInput} from '@strapi/design-system';


interface IProps {

}

class HomePage extends Component<IProps, IPage> {

  componentDidMount() {

      if (!this.state) {

        const apiAdapter = new ApiAdapter();

          apiAdapter.getHome().then(data => {

            this.setState(data)
          })
          .catch(err => {console.error(err) });
      }
  }

  render(): ReactNode {

    if(this.state === null) {
      return <em>Loading...</em>
    }
    else {
      return (          
               <>
               <BaseHeaderLayout title="Overview" subtitle={<Breadcrumbs label="pages">
                  <Crumb>Pages</Crumb>
              </Breadcrumbs>} as="h2" />
               <GridLayout>

               <Box hasRadius background="neutral100" padding={4}>
                <Field name="test" required={false}>
                    <Flex direction="column" alignItems="flex-start" gap={1}>
                        <FieldLabel>Test</FieldLabel>
                        <FieldInput value="test" type="text"/>
                    </Flex>
                </Field>
            </Box>
                  <Box hasRadius background="neutral0" padding={5}>
                      <TreeView data={this.state}></TreeView>
                  </Box>
                  </GridLayout>
                  <Divider/> 
                  <GridLayout>
                  <Box hasRadius background="neutral0" padding={5}>
                    <JsonView data={this.state}></JsonView>
                  </Box>
                </GridLayout>
               </>
              )
      }
  }
}

export default HomePage;
