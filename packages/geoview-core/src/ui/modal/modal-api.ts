// import { Modal } from ".";
import { api } from "../../api/api";
import { EVENT_NAMES } from "../../api/event";
import { generateId } from "../../core/utils/utilities";
// import React from "react";
// React.ReactNode | Element

interface modalHeader {
  title: string | undefined;
  action: string | undefined; // <button></button>
}

interface modalFooter {
  actions: Array<string> | string | undefined;
}

export type typeModalProps = {
  id?: string | undefined;
  header?: modalHeader | string | undefined;
  content: string | undefined;
  footer?: modalFooter | string | undefined;
  status?: boolean | undefined;
  mapId?: string;
};

class ModalModel {
  id?: string | undefined;
  header?: modalHeader | string | undefined;
  content: string | undefined;
  footer?: modalFooter | string | undefined;
  status?: boolean | undefined;
  mapId?: string;

  constructor(content: string) {
    this.id = undefined;
    this.header = undefined;
    this.content = content;
    this.footer = undefined;
    this.status = false;
    this.mapId = undefined;
  }

  open = (): void => {
    this.status = true;
    api.event.emit(EVENT_NAMES.EVENT_MODAL_OPEN, this.mapId, {
      id: this.id,
      open: true,
    });
    console.log("OPENING MODAL", this.status);
  };

  close = (): void => {
    this.status = false;
    api.event.emit(EVENT_NAMES.EVENT_MODAL_CLOSE, this.mapId, {
      id: this.id,
      open: false,
    });
    console.log("CLOSING MODAL", this.status);
  };

  update = (modal: typeModalProps): void => {
    this.id = modal.id || this.id;
    this.header = modal.header || this.header;
    this.content = modal.content || this.content;
    this.footer = modal.footer || this.footer;
    this.status = modal.status || this.status;
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
    const id = modal.id ? modal.id : generateId("");
    this.modals[id] = new ModalModel(modal.content);
    this.modals[id].id = id;
    this.modals[id].mapId = this.mapId;
    this.modals[id].header = modal.header || this.modals[id].header;
    this.modals[id].content = modal.content;
    this.modals[id].footer = modal.footer || this.modals[id].footer;
    this.modals[id].status = modal.status || this.modals[id].status;

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
