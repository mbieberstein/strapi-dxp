/*
 *
 * HomePage
 *
 */

import { Component, ReactNode } from 'react';
import ApiAdapter from '../../data/ApiAdapter';
import TreeView from '../../components/gui/TreeView';
import JsonView from '../../components/gui/JsonView';
import { Box, GridLayout, BaseHeaderLayout, Breadcrumbs, Crumb, Divider, Flex, Dialog, DialogBody, DialogFooter, Button, Alert } from '@strapi/design-system';
import { Trash, Information, Write } from '@strapi/icons';
import Select from '../../components/gui/form/Select';
import DataProvider from '../../data/DataProvider';
import Form from '../../components/gui/form/Form';
import Events from '../../components/gui/Events';

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
  selectedPath: string
  showUpdateMessage: boolean
  showSaveButton: boolean
}

class HomePage extends Component<IProps, IState> {

  siteId: number = 0
 
  locale: string = ''

  formData: object = {}

  eventBus: any = {}

  unsubscribe: any = {}


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
  private loadSite = (callback: any = null) => {

    ApiAdapter.getSite(this.siteId, this.locale).then(site => {
    
      const homeId = site.attributes.home.data.id

      ApiAdapter.getPage(homeId as number, this.locale, false, true).then(page => {

        this.setState({site: site, root: page}, () => {
          if(callback) {
            callback()
          }
        })        
      })
      .catch(err => {console.error(err) });    
    })
    .catch(err => {console.error(err) });
  }


  // Handles the onClick event when selecting a page in the Treeview
  // Update the page and contentType in the state object
  selectPage = (id: number, path: string) => {

    ApiAdapter.getPage(id, this.locale).then(data => {

      ApiAdapter.getContentType('page', 'page').then( type => {
        console.log("Select Page:" + path)
        this.formData = {}
        this.setState({page: data, contentType: type, selectedPath: path, showUpdateMessage: false, showSaveButton: false})
      })
      .catch(err => {console.error(err)})
    })
    .catch(err => {console.error(err) });
  }

  openDialog = () => {

    this.setState({showDialog: true})
  }
  
  closeDialog = () => {

    this.setState({showDialog: false})
  }

  submitDialog = () => {

    const pageId = this.state.page.id

    DataProvider.addChildPage(this.state.contentType, pageId as number, this.formData).then((page): void => {
      
      const selectedPath = this.state.selectedPath + '/' + page.id
      this.setState({showDialog: false, page: page, selectedPath: selectedPath}, 
        () => {
          this.loadSite(() => {Events.raise(Events.ON_AFTER_PAGE_ADDED, page.id)})          
        }
      )
    })
  }

  updatePage = () => {

    if(Object.keys(this.formData).length === 0) {
      return
    }

    const pageId = this.state.page.id

    DataProvider.updatePage(this.state.contentType, pageId as number, this.formData).then((page: any): void => {
      this.setState({page: page, showUpdateMessage: true, showSaveButton: false}, () => {
        Events.raise(Events.ON_AFTER_PAGE_UPDATED, page)
      })
    })
  }

  formChangedHandler = (data: object) => {
    this.formData = data

    console.log(this.formData)
    if(this.state.showUpdateMessage || !this.state.showSaveButton) {
      this.setState({showUpdateMessage: false, showSaveButton: true})
    }
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
                    {this.state.showSaveButton && <Button style={{marginTop: "20px"}} variant="default" startIcon={<Write />} onClick={this.updatePage}>Save</Button>}
                  </Flex>
                </Box>;

                {/* MESSAGES */}
                {this.state.showUpdateMessage && <Alert closeLabel="Close" title="OK:" variant="success">Successfuly updated the page data</Alert>}                

                {/* TREEVIEW / FORM */}
                {this.state.root && 
                <Box hasRadius background="neutral100" padding={4}>
                  <GridLayout>
                    <Box hasRadius background="neutral0">
                      {this.state.root && <TreeView data={this.state.root} onClick={this.selectPage} onAddAction={this.openDialog} selectedPath={this.state.selectedPath} />}
                    </Box>
                    {this.state.contentType &&
                    <Box hasRadius background="neutral0">
                      <Form key={this.state.page.id} id='update-page' schema={this.state.contentType.schema} data={this.state.page.attributes} onChange={this.formChangedHandler} />
                      <JsonView data={this.state.page} visible={false} title='JSON'></JsonView>
                      <JsonView data={this.state.contentType} visible={false} title='Schema'></JsonView>
                    </Box>
                    }
                  </GridLayout>
                </Box>
                }                            
                     
                {/* JSON VIEW */}
                {this.state.root && 
                <div>
                <Divider/>
                <Box hasRadius background="neutral100" padding={4}>
                <GridLayout>
                  <Box hasRadius background="neutral0" padding={2}>
                    <JsonView title='Site JSON' data={this.state.root} visible={false}></JsonView>
                  </Box>
                </GridLayout>
                </Box>
                </div>
                }    

                {/* ADD NEW PAGE DIALOG */}
                {this.state.contentType && 
                <Dialog onClose={this.closeDialog} title="Add new Page" isOpen={this.state.showDialog}>
                  <DialogBody>                  
                      <Form id="create-page" schema={this.state.contentType.schema} data={{}} onChange={this.formChangedHandler} />
                  </DialogBody>
                  <DialogFooter 
                    startAction={<Button onClick={this.closeDialog} variant="tertiary">Cancel</Button>} 
                    endAction={<Button variant="default" startIcon={<Write />} onClick={this.submitDialog}>Save</Button>} 
                  />
                </Dialog> 
                }
                
               </>
              )
      }
  }
}

export default HomePage;
