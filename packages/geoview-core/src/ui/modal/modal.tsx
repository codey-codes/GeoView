import React, { CSSProperties, useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps as MaterialDialogProps,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { EVENT_NAMES } from "../../api/event";

import { TypeChildren } from "../../core/types/cgpv-types";
import { typeModalProps } from ".";
import { api } from "../../api/api";
import { Button, CloseIcon, IconButton } from "..";

const useStyles = makeStyles((theme) => ({
  dialog: {
    position: "absolute",
  },
  backdrop: {
    position: "absolute",
    background: theme.palette.backdrop,
  },
  content: {
    padding: theme.spacing(5),
  },
  //   createdModal: {
  //     "& .MuiDialog-container .MuiPaper-root > *": {
  //       margin: "-5px",
  //     },
  //   },
  createdTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  createdContent: {
    display: "block",
    minWidth: 500,
    minHeight: 40,
  },
  createdClosedModal: {
    display: "none",
  },
  createdAction: {
    width: `30%`,
    alignSelf: "flex-end",
    "& > * ": {
      textAlign: "center",
    },
  },
}));

/**
 * Customized Material UI Dialog Properties
 */
interface DialogProps extends Omit<MaterialDialogProps, "title"> {
  id?: string;

  // custom dialog classes and styles
  className?: string;
  style?: CSSProperties;

  // custom title
  title?: TypeChildren;
  titleId?: string;

  // dialog content and content styling
  content?: TypeChildren;
  contentClassName?: string;
  contentStyle?: CSSProperties;

  // dialog text content container styling
  contentTextId?: string;
  contentTextClassName?: string;
  contentTextStyle?: CSSProperties;

  // action elements / buttons
  actions?: TypeChildren;

  mapId: string;
}

/**
 * Create a customized Material UI Dialog
 *
 * @param {DialogProps} props the properties passed to the Dialog element
 * @returns {JSX.Element} the created Dialog element
 */

export const Modal = (props: DialogProps): JSX.Element => {
  const [createdModal, setCreatedModal] = useState<JSX.Element>();

  let openEvent = false;
  let modalID: any = null;
  // const map = useMap();
  // const mapId = api.mapInstance(map)!.id;

  const {
    id,
    title,
    titleId,
    className,
    style,
    container,
    open,
    actions,
    fullScreen,
    content,
    contentClassName,
    contentStyle,
    contentTextId,
    contentTextClassName,
    contentTextStyle,
    mapId,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    // TO OPEN THE MODAL
    api.event.on(
      EVENT_NAMES.EVENT_MODAL_OPEN,
      (args) => {
        if (id === args.id && args.handlerName === mapId) {
          modalID = args.id;
          const modal = api.map(mapId).modal.modals[modalID] as typeModalProps;
          // To check if any other modals are open
          const openModals = Object.values(api.map(mapId).modal.modals).filter(
            (modal) => modal.active
          );
          // this openEvent will be passed into the Dialog and has nothing to do with closing the current modals
          if (args.open) openEvent = true;
          // To close currently opened modals
          openModals.forEach((openModal) => {
            if (openModal.id !== modal.id) openModal.close();
          });

          setCreatedModal(
            <Dialog
              open={openEvent}
              onClose={modal.close}
              container={document.querySelector(`#${modal.mapId}`)}
              className={`${classes.dialog} ${className && className}`}
              aria-labelledby={props["aria-labelledby"]}
              aria-describedby={props["aria-describedby"]}
              fullScreen={fullScreen}
              BackdropProps={{
                classes: { root: classes.backdrop },
              }}
            >
              <DialogTitle className={classes.createdTitle}>
                {modal.header?.title || null}
                <IconButton onClick={modal.close}>
                  {modal.header?.action || <CloseIcon />}
                </IconButton>
              </DialogTitle>
              <DialogContent className={classes.createdContent}>
                <DialogContentText>{modal.content || null}</DialogContentText>
              </DialogContent>
              <DialogActions>
                {modal.footer?.actions.map((a: any) => {
                  return (
                    <Button
                      key={a}
                      onClick={modal.close}
                      type="text"
                      tooltipPlacement="top"
                      tooltip={a}
                      className={classes.createdAction}
                    >
                      {a.toUpperCase()}
                    </Button>
                  );
                }) || null}
              </DialogActions>
            </Dialog>
          );
        }
      },
      mapId
    );

    // TO CLOSE THE MODAL
    api.event.on(
      EVENT_NAMES.EVENT_MODAL_CLOSE,
      (args) => {
        if (id === args.id && args.handlerName === mapId) {
          modalID = args.id;
          if (!args.open) openEvent = false;
          setCreatedModal(
            <Dialog
              open={openEvent}
              className={classes.createdClosedModal}
            ></Dialog>
          );
        }
      },
      mapId
    );

    return () => {
      api.event.off(EVENT_NAMES.EVENT_MODAL_OPEN, modalID);
      api.event.off(EVENT_NAMES.EVENT_MODAL_CLOSE, modalID);
    };
  }, []);

  return createdModal ? (
    createdModal
  ) : (
    <Dialog
      open={open || openEvent}
      className={`${classes.dialog} ${className && className}`}
      style={{ ...style, position: "absolute" }}
      aria-labelledby={props["aria-labelledby"]}
      aria-describedby={props["aria-describedby"]}
      fullScreen={fullScreen}
      BackdropProps={{
        classes: { root: classes.backdrop },
      }}
      container={container}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent className={contentClassName} style={contentStyle}>
        <div
          id={contentTextId}
          className={`${classes.content} ${
            contentTextClassName && contentTextClassName
          }`}
          style={contentTextStyle}
        >
          {content}
        </div>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
