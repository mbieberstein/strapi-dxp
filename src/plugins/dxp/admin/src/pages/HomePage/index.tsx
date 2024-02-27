/*
 *
 * HomePage
 *
 */

import { Component, ReactNode } from 'react';
import ApiAdapter from '../../data/ApiAdapter';
import TreeView from '../../components/gui/TreeView';
import JsonView from '../../components/gui/JsonView';
import { Box, GridLayout, BaseHeaderLayout, Breadcrumbs, Crumb, Divider, TwoColsLayout, Flex } from '@strapi/design-system';
import Select from '../../components/gui/form/Select';
import DataProvider from '../../data/DataProvider';

interface IProps {
}

interface IState {
  sites: ISite[]
  site: ISite
  page: IPage
  locales: IEntity[]
}

class HomePage extends Component<IProps, IState> {

  siteId: number = 0
  pageId: number | string = 0
  locale: string = ''

  componentDidMount() {

      if (!this.state) {

        const apiAdapter = new ApiAdapter();

        apiAdapter.getSites().then(sites => {
          this.setState({sites: sites})
        }).catch(err => {console.error(err) });

      }
  }

  setSite = (id: number) => {

    const apiAdapter = new ApiAdapter();

    apiAdapter.getLocales().then(data => {

      const locales = DataProvider.getLocales(data)
    
      this.setState({locales: locales})
    }).catch(err => {console.error(err) });

    this.siteId = id
    this.load()
  }

  setLocale = (locale: string) => {
    this.locale = locale
    this.load()
  }

  load = () => {

    const apiAdapter = new ApiAdapter();

    apiAdapter.getSite(this.siteId, this.locale).then(site => {
    
      this.pageId = site.attributes.home.data.id

      apiAdapter.getPage(this.pageId as number, this.locale, false, true).then(page => {

        this.setState({site: site, page: page})
        
      }).catch(err => {console.error(err) });
    
    }).catch(err => {console.error(err) });
  }

  render(): ReactNode {

    if(!this.state || !this.state.sites) {
      return <em>Loading...</em>
    }
    else {
      return (          
               <>
                <BaseHeaderLayout title="Websites" subtitle={<Breadcrumbs label="Overview">
                  <Crumb>Overview</Crumb>
                </Breadcrumbs>} as="h2" />

                {/* SITES SELECTION / Locales SELECTION */}
                <Box padding={3}>
                  <Flex background="neutral100" gap={1} padding={2}>
                    <Select data={this.state.sites} value={this.state.site?.id} label='Sites' placeholder='Select Site...' onChange={this.setSite}></Select>
                    <Select data={this.state.locales} value={this.locale} label='Locales' placeholder='Select Locale...' onChange={this.setLocale}></Select>
                  </Flex>
                </Box>;

                {/* PAGES TREEVIEW */}
                <Box padding={3} background="neutral100">
                  <TwoColsLayout startCol={                  
                    <Box hasRadius background="neutral0" padding={3}>
                      {this.state.page && <TreeView data={this.state.page}></TreeView>}
                    </Box>
} 
                      endCol={<Box padding={3}>

                      </Box>} />
                </Box>
                                
                <Divider/> 
                
                {/* JSON VIEW */}
                <GridLayout>
                  <Box hasRadius background="neutral0" padding={5}>
                    <JsonView data={this.state.page}></JsonView>
                  </Box>
                </GridLayout>
               </>
              )
      }
  }
}

export default HomePage;
