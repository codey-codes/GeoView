import React, {
  CSSProperties,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import { useMap } from "react-leaflet";

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
import { typeModalProps, ModalApi } from ".";
import { api } from "../../api/api";

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

  /**
   * Are we going to open multiple modals at the same time? In this case MOdal.tsx will need to be an array
   */

  useEffect(() => {
    api.event.on(
      EVENT_NAMES.EVENT_MODAL_OPEN,
      (args) => {
        console.log(args);
        if (id === args.id && args.handlerName === mapId) {
          modalID = args.id;

          const modal = api.map(mapId).modal.modals[modalID] as typeModalProps;
          console.log("ARGS", args);
          if (args.open) openEvent = true;

          setCreatedModal(<Dialog open={true}>{modal.content}</Dialog>);
        }
      },
      mapId
    );
    console.log("WORKED");

    return () => {
      api.event.off(EVENT_NAMES.EVENT_MODAL_OPEN, modalID);
      api.event.off(EVENT_NAMES.EVENT_MODAL_CLOSE, modalID);
    };
  }, []);

  const classes = useStyles();

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
