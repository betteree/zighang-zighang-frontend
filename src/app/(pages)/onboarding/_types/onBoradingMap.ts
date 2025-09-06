import raw from "@/data/TL_SCCO_CTPRVN.json";
import type {
  FeatureCollection,
  Geometry,
  Polygon,
  MultiPolygon,
  GeoJsonProperties,
} from "geojson";

export type SidoProps = {
  CTPRVN_CD: string;
  CTP_ENG_NM: string;
  CTP_KOR_NM: string;
};

function isFeatureCollection(
  value: unknown
): value is FeatureCollection<
  Polygon | MultiPolygon | Geometry,
  SidoProps | GeoJsonProperties
> {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { type?: unknown }).type === "FeatureCollection" &&
    Array.isArray((value as { features?: unknown }).features)
  );
}

if (process.env.NODE_ENV !== "production") {
  if (!isFeatureCollection(raw)) {
    throw new Error("Invalid GeoJSON: not a FeatureCollection");
  }
}

export const SIDO_GEO: FeatureCollection<
  Polygon | MultiPolygon | Geometry,
  SidoProps | GeoJsonProperties
> = raw as unknown as FeatureCollection<
  Polygon | MultiPolygon | Geometry,
  SidoProps | GeoJsonProperties
>;
