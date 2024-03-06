/*
 *
 * HomePage
 *
 */

import { Component, ReactNode } from 'react';
import ApiAdapter from '../../data/ApiAdapter';
import TreeView from '../../components/gui/TreeView';
import JsonView from '../../components/gui/JsonView';
import { Box, GridLayout, BaseHeaderLayout, Breadcrumbs, Crumb, Divider, Flex, Dialog, DialogBody, DialogFooter, Button } from '@strapi/design-system';
import { Trash, Information, Write } from '@strapi/icons';
import Select from '../../components/gui/form/Select';
import DataProvider from '../../data/DataProvider';
import Form from '../../components/gui/form/Form';

interface IProps {
}

interface IState {
  sites: ISite[]
  site: ISite
  root: IPage
  page: IPage
  locales: IEntity[]
  contentType: IContentType
  showDialog: boolean
}

class HomePage extends Component<IProps, IState> {

  siteId: number = 0
 
  locale: string = ''

  componentDidMount() {

      if (!this.state) {

        ApiAdapter.getSites().then(sites => {
          this.setState({sites: sites})
        })
        .catch(err => {console.error(err) });
      }
  }

  // Handles the selection of a site from the dropdown
  selectSite = (id: number) => {

    ApiAdapter.getLocales().then(data => {

      const locales = DataProvider.getLocales(data)
    
      this.setState({locales: locales})
    })
    .catch(err => {console.error(err) });

    this.siteId = id
    this.loadSite()
  }

  // Handles the selection of a locale from the dropdown
  selectLocale = (locale: string) => {
    this.locale = locale
    this.loadSite()
  }

  // Loads the tree of pages of a site, starting with the home page
  private loadSite = () => {

    ApiAdapter.getSite(this.siteId, this.locale).then(site => {
    
       const homeId = site.attributes.home.data.id

      ApiAdapter.getPage(homeId as number, this.locale, false, true).then(page => {

        this.setState({site: site, root: page})        
      })
      .catch(err => {console.error(err) });    
    })
    .catch(err => {console.error(err) });
  }


  // Handles the onClick event when slecting a page in the Treeview
  // Update the page and contentType in the state object
  selectPage = (id: number) => {

    ApiAdapter.getPage(id, this.locale).then(data => {

      ApiAdapter.getContentType('page', 'page').then( type => {

        this.setState({page: data, contentType: type})
      })
      .catch(err => {console.error(err)})
    })
    .catch(err => {console.error(err) });
  }

  openDialog = (id: number) => {

    this.setState({showDialog: true})
  }
  
  closeDialog = () => {

    this.setState({showDialog: false})
  }

  submitDialog = () => {

    const pageId = this.state.page.id

    this.setState({showDialog: false})
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

                {/* SITES SELECTION / LOCALES SELECTION */}
                <Box padding={3}>
                  <Flex background="neutral100" gap={1} padding={2}>
                    <Select data={this.state.sites} value={this.state.site?.id} label='Sites' placeholder='Select Site...' onChange={this.selectSite}></Select>
                    <Select data={this.state.locales} value={this.locale} label='Locales' placeholder='Select Locale...' onChange={this.selectLocale}></Select>
                  </Flex>
                </Box>;

                {/* TREEVIEW / FORM */}
                <Box hasRadius background="neutral100" padding={4}>
                  <GridLayout>
                    <Box hasRadius background="neutral0">
                      {this.state.root && <TreeView data={this.state.root} onClick={this.selectPage} onAdd={this.openDialog} />}
                    </Box>
                    <Box hasRadius background="neutral0">
                      {this.state.contentType && <Form type={this.state.contentType} data={this.state.page.attributes} />}
                      <JsonView data={this.state.page} visible={false}></JsonView>
                    </Box>
                  </GridLayout>
                </Box>
                                
                <Divider/> 
                
                {/* JSON VIEW */}
                <GridLayout>
                  <Box hasRadius background="neutral0" padding={2}>
                    <JsonView data={this.state.root} visible={false}></JsonView>
                  </Box>
                </GridLayout>

                {/* ADD NEW PAGE DIALOG */}
                <Dialog onClose={this.closeDialog} title="Add new Page" isOpen={this.state.showDialog}>
                  <DialogBody>                  
                      <Form type={this.state.contentType} data={{}}></Form>
                  </DialogBody>
                  <DialogFooter 
                    startAction={<Button onClick={this.closeDialog} variant="tertiary">Cancel</Button>} 
                    endAction={<Button variant="default" startIcon={<Write />} onClick={this.submitDialog}>Save</Button>} 
                  />
                </Dialog>                
               </>
              )
      }
  }
}

export default HomePage;
