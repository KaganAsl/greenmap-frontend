function PutMarker(currentPosition = null) {
    return currentPosition === null ? null : (
      <Marker position={currentPosition}>
        <Popup>You are here</Popup>
      </Marker>
    )
}

export default PutMarker;