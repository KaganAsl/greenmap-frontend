export const outerBounds = [
  [34, 24],
  [42, 47],
];

export const calculateBounds = ({lat, lng, radius}) => {
  const latInDegrees = lat;
  const lngInDegrees = lng;
  const radiusInDegrees = radius / 111.32;
  return [
    [latInDegrees - radiusInDegrees, lngInDegrees - radiusInDegrees],
    [latInDegrees + radiusInDegrees, lngInDegrees + radiusInDegrees],
  ];
}