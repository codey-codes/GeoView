import { api } from "../../api/api";
import { EVENT_NAMES } from "../../api/event";
import { generateId } from "../../core/utils/utilities";

interface modalHeader {
  title: string | undefined;
  action: JSX.Element | undefined; // <button></button>
}

interface modalFooter {
  actions: Array<string> | string | undefined;
}

export type typeModalProps = {
  id?: string | undefined;
  header?: modalHeader | string | undefined | any;
  content: string | undefined;
  footer?: modalFooter | string | undefined | any;
  active?: boolean | undefined;
  close?: undefined | any;

  mapId?: string;
};

class ModalModel {
  id?: string | undefined;
  header?: modalHeader | string | undefined;
  content: string | undefined;
  footer?: modalFooter | string | undefined;
  active?: boolean | undefined;

  mapId?: string;

  constructor(content: string) {
    this.id = undefined;
    this.header = undefined;
    this.content = content;
    this.footer = undefined;
    this.active = undefined;

    this.mapId = undefined;
  }

  open = (): void => {
    this.active = true;
    api.event.emit(EVENT_NAMES.EVENT_MODAL_OPEN, this.mapId, {
      id: this.id,
      open: true,
    });
  };

  close = (): void => {
    this.active = false;
    api.event.emit(EVENT_NAMES.EVENT_MODAL_CLOSE, this.mapId, {
      id: this.id,
      open: false,
    });
  };

  update = (modal: typeModalProps): void => {
    if (
      typeof modal.header?.action === "string" ||
      typeof modal.header?.action === "number" ||
      typeof modal.header?.action === "object"
    ) {
      alert("Header action needs to be a JSX element");
      modal.header.actions = undefined;
    }
    this.id = modal.id || this.id;
    this.header = modal.header || this.header;
    this.content = modal.content || this.content;
    this.footer = modal.footer || this.footer;
    this.active = modal.active || this.active;
  };
}

export class ModalApi {
  // reference to the map id
  mapId: string;

  modals: Record<string, ModalModel> = {};
  constructor(mapId: string) {
    this.mapId = mapId;
  }

  createModal = (modal: typeModalProps): void => {
    if (!modal.content) return;
    if (
      typeof modal.header?.action === "string" ||
      typeof modal.header?.action === "number" ||
      typeof modal.header?.action === "object"
    ) {
      alert("Header action needs to be a JSX element");
      modal.header.action = undefined;
    }
    const id = modal.id ? modal.id : generateId("");
    this.modals[id] = new ModalModel(modal.content);
    this.modals[id].id = id;
    this.modals[id].mapId = this.mapId;
    this.modals[id].header = modal.header || this.modals[id].header;
    this.modals[id].content = modal.content;
    this.modals[id].footer = modal.footer || this.modals[id].footer;

    api.event.emit(EVENT_NAMES.EVENT_MODAL_CREATE, this.mapId, {});
  };

  deleteModal = (id: string | any): void => {
    if (!Object.keys(this.modals)) return;
    delete this.modals[id];
  };

  viewAll = (): void => {
    console.log(this.modals);
  };
}
