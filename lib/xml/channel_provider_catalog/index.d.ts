type ChannelProviderCatalogDocumentTopElem = XmlTopElem & { Doc: ChannelProviderCatalogDocument } & 
AdminAccessBase & {
  id: XmlElem<number>;
  code: XmlElem<string>;
  name: XmlElem<string>;
  is_std: XmlElem<boolean>;
  changed: XmlElem<boolean>;
  modification_date: XmlElem<Date>;
  app_instance_id: XmlElem<string>;
}

type ChannelProviderCatalogDocument = XmlDocument & { TopElem: ChannelProviderCatalogDocumentTopElem; };
