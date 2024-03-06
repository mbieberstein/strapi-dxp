import type { Schema, Attribute } from '@strapi/strapi';

export interface GuiHeader extends Schema.Component {
  collectionName: 'components_gui_headers';
  info: {
    displayName: 'Header';
    icon: 'archive';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    Headline: Attribute.String;
    Description: Attribute.Blocks;
  };
}

export interface GuiTeaser extends Schema.Component {
  collectionName: 'components_gui_teasers';
  info: {
    displayName: 'Teaser';
    icon: 'apps';
  };
  attributes: {
    Title: Attribute.String;
    Image: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'gui.header': GuiHeader;
      'gui.teaser': GuiTeaser;
    }
  }
}
