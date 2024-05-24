import React from "react";

// https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

const SelectedMarkerContext = React.createContext();

// Provider
const SelectedMarkerProvider = ({
  children,
  selectedMarker,
  setSelectedMarker,
}) => {
  //const [selectedMarker, setSelectedMarker] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    selectedMarker, // <------ Expose Value to Consumer
    setSelectedMarker, // <------ Expose Setter to Consumer
  };

  return (
    <SelectedMarkerContext.Provider value={value}>
      {children}
    </SelectedMarkerContext.Provider>
  );
};

// Consumer
const SelectedMarkerConsumer = ({ children }) => {
  return (
    <SelectedMarkerContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "SelectedMarkerConsumer must be used within SelectedMarkerProvider",
          );
        }
        return children(context);
      }}
    </SelectedMarkerContext.Consumer>
  );
};

// Hook
const useSelectedMarker = () => {
  const context = React.useContext(SelectedMarkerContext);
  if (context === undefined)
    throw new Error(
      "useSelectedMarker must be used within SelectedMarker (Context)",
    );
  return context;
};

const TempMarkerContext = React.createContext();

// Provider
const TempMarkerProvider = ({ children, tempMarker, setTempMarker }) => {
  //const [tempMarker, setTempMarker] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    tempMarker, // <------ Expose Value to Consumer
    setTempMarker, // <------ Expose Setter to Consumer
  };

  return (
    <TempMarkerContext.Provider value={value}>
      {children}
    </TempMarkerContext.Provider>
  );
};

// Consumer
const TempMarkerConsumer = ({ children }) => {
  return (
    <TempMarkerContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "TempMarkerConsumer must be used within TempMarkerProvider",
          );
        }
        return children(context);
      }}
    </TempMarkerContext.Consumer>
  );
};

// Hook
const useTempMarker = () => {
  const context = React.useContext(TempMarkerContext);
  if (context === undefined)
    throw new Error(
      "useTempMarker must be used within useTempMarker (Context)",
    );
  return context;
};

const ReRenderContext = React.createContext();

// Provider
const ReRenderProvider = ({ children, reRender, setReRender }) => {
  //const [reRender, setReRender] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    reRender, // <------ Expose Value to Consumer
    setReRender, // <------ Expose Setter to Consumer
  };

  return (
    <ReRenderContext.Provider value={value}>
      {children}
    </ReRenderContext.Provider>
  );
};

// Consumer
const ReRenderConsumer = ({ children }) => {
  return (
    <ReRenderContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "ReRenderConsumer must be used within ReRenderProvider",
          );
        }
        return children(context);
      }}
    </ReRenderContext.Consumer>
  );
};

// Hook
const useReRender = () => {
  const context = React.useContext(ReRenderContext);
  if (context === undefined)
    throw new Error("useReRender must be used within ReRender (Context)");
  return context;
};

export {
  SelectedMarkerProvider,
  SelectedMarkerConsumer,
  useSelectedMarker,
  TempMarkerProvider,
  TempMarkerConsumer,
  useTempMarker,
  ReRenderProvider,
  ReRenderConsumer,
  useReRender,
};
