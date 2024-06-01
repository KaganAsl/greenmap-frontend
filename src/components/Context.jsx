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

const loggedInContext = React.createContext();

// Provider
const LoggedInProvider = ({ children, loggedIn, setLoggedIn }) => {
  //const [reRender, setReRender] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    loggedIn, // <------ Expose Value to Consumer
    setLoggedIn, // <------ Expose Setter to Consumer
  };

  return (
    <loggedInContext.Provider value={value}>
      {children}
    </loggedInContext.Provider>
  );
};

// Consumer
const LoggedInConsumer = ({ children }) => {
  return (
    <loggedInContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "ReRenderConsumer must be used within ReRenderProvider",
          );
        }
        return children(context);
      }}
    </loggedInContext.Consumer>
  );
};

// Hook
const useLoggedIn = () => {
  const context = React.useContext(loggedInContext);
  if (context === undefined)
    throw new Error("LoggedIn must be used within LoggedIn (Context)");
  return context;
};

const categoryContext = React.createContext();

// Provider
const CategoryProvider = ({ children, category, setCategory }) => {
  //const [reRender, setReRender] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    category, // <------ Expose Value to Consumer
    setCategory, // <------ Expose Setter to Consumer
  };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
};

// Consumer
const CategoryConsumer = ({ children }) => {
  return (
    <categoryContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "ReRenderConsumer must be used within ReRenderProvider",
          );
        }
        return children(context);
      }}
    </categoryContext.Consumer>
  );
};

// Hook
const useCategory = () => {
  const context = React.useContext(categoryContext);
  if (context === undefined)
    throw new Error("LoggedIn must be used within LoggedIn (Context)");
  return context;
};

const radiusContext = React.createContext();

// Provider
const RadiusProvider = ({ children, radius, setRadius }) => {
  //const [reRender, setReRender] = React.useState(initialState);

  // Context values passed to consumer
  const value = {
    radius, // <------ Expose Value to Consumer
    setRadius, // <------ Expose Setter to Consumer
  };

  return (
    <radiusContext.Provider value={value}>
      {children}
    </radiusContext.Provider>
  );
};

// Consumer
const RadiusConsumer = ({ children }) => {
  return (
    <radiusContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error(
            "ReRenderConsumer must be used within ReRenderProvider",
          );
        }
        return children(context);
      }}
    </radiusContext.Consumer>
  );
};

// Hook
const useRadius = () => {
  const context = React.useContext(radiusContext);
  if (context === undefined)
    throw new Error("LoggedIn must be used within LoggedIn (Context)");
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

  LoggedInProvider,
  LoggedInConsumer,
  useLoggedIn,

  RadiusProvider,
  RadiusConsumer,
  useRadius,

  CategoryProvider,
  CategoryConsumer,
  useCategory,
};
