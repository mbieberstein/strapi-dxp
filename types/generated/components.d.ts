import type { Schema, Attribute } from '@strapi/strapi';

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
      'gui.teaser': GuiTeaser;
    }
  }
}
