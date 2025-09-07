"use client";

import { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";

import type { Feature, Geometry, FeatureCollection } from "geojson";
import { geoCentroid } from "d3-geo";
import { REGION_OPTIONS, RegionValue } from "../../_types/regionTypes";

interface RegionProperties {
  CTP_KOR_NM?: string;
  SIDO_KOR_NM?: string;
  name?: string;
  adm_nm?: string;
}

function normalizeToRegionValue(
  props: RegionProperties
): Exclude<RegionValue, "전체" | "해외"> | null {
  const raw =
    props?.CTP_KOR_NM ||
    props?.SIDO_KOR_NM ||
    props?.name ||
    props?.adm_nm ||
    "";

  const map: Record<string, Exclude<RegionValue, "전체" | "해외">> = {
    서울특별시: "서울",
    부산광역시: "부산",
    대구광역시: "대구",
    인천광역시: "인천",
    광주광역시: "광주",
    대전광역시: "대전",
    울산광역시: "울산",
    세종특별자치시: "세종",
    경기도: "경기",
    강원특별자치도: "강원",
    강원도: "강원",
    충청북도: "충북",
    충청남도: "충남",
    전라북도: "전북",
    전북특별자치도: "전북",
    전라남도: "전남",
    경상북도: "경북",
    경상남도: "경남",
    제주특별자치도: "제주",
  };

  if (map[raw]) return map[raw];
  return raw in REGION_OPTIONS
    ? (raw as Exclude<RegionValue, "전체" | "해외">)
    : null;
}

function MapBase({
  geographies,
  value,
  onSelect,
  className,
}: {
  geographies: FeatureCollection | string;
  value: RegionValue | null;
  onSelect: (next: Exclude<RegionValue, "전체" | "해외">) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <ComposableMap
        width={400}
        height={400}
        projection="geoMercator"
        projectionConfig={{ scale: 3000, center: [127.4, 35.8] }}
        style={{ width: 400, height: "auto" }}
      >
        <Geographies geography={geographies}>
          {({ geographies }) => {
            // 라벨 정보 모으기 , 모았다가 한번에 렌더링
            // 이렇게 하지 않으면 라벨이 지도 밑으로 겹쳐서 보임
            const labelInfos: Array<{
              key: string;
              centroid: [number, number];
              label: string;
            }> = [];

            // 각 지역 모양 렌더링
            const shapes = geographies.map((geo) => {
              const props = geo.properties as RegionProperties;
              const region = normalizeToRegionValue(props);

              // 전체 선택하면 다 선택되도록
              const selected =
                value === "전체"
                  ? !!region
                  : value !== "해외" && region === value;

              // 해당 지도의 중심 찾기
              const centroid = geoCentroid(
                geo as Feature<Geometry, RegionProperties>
              ) as [number, number];

              // 라벨 지역
              const label = region ?? "";

              // 전체 선택했을 때 라벨이 모두 표시되지 않게
              // 단일 상태일 때만
              if (value !== "전체" && selected && label) {
                labelInfos.push({
                  key: geo.rsmKey,
                  centroid,
                  label,
                });
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => region && onSelect(region)}
                  tabIndex={region ? 0 : -1}
                  role="button"
                  aria-label={label || "비활성 지역"}
                  aria-pressed={!!selected}
                  onKeyDown={(e) => {
                    if (!region) return;
                    if (e.key === " ") e.preventDefault();
                    if (e.key === "Enter" || e.key === " ") onSelect(region);
                  }}
                  className={[
                    "stroke-[#303030] stroke-[0.9] outline-none transition-colors",
                    region ? "cursor-pointer" : "cursor-default",
                    selected
                      ? "fill-violet-200  active:fill-violet-400"
                      : "fill-white hover:fill-gray-50 active:fill-indigo-50",
                  ].join(" ")}
                />
              );
            });

            //라벨 렌더
            const labels = labelInfos.map((info) => (
              <Annotation
                key={`label-${info.key}`}
                subject={info.centroid}
                dx={0}
                dy={-15}
                connectorProps={{
                  stroke: "transparent",
                  strokeWidth: 0,
                  strokeLinecap: "round",
                }}
              >
                <foreignObject x={-30} y={0} width={56} height={22}>
                  <div
                    className="w-full h-full flex items-center justify-center
                               border-2 border-violet-600 rounded-full bg-white
                               text-[11px] font-semibold leading-[18px] text-violet-700
                               px-[6px]"
                  >
                    {info.label}
                  </div>
                </foreignObject>
              </Annotation>
            ));

            return (
              <>
                {shapes}
                {labels}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export const OnboardingMap = memo(MapBase);
