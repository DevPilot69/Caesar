declare module "@svg-maps/india" {
  type SvgMapLocation = {
    id: string;
    name: string;
    path: string;
  };

  type SvgMap = {
    label: string;
    viewBox: string;
    locations: SvgMapLocation[];
  };

  const india: SvgMap;
  export default india;
}
