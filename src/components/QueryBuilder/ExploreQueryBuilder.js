import React from "react";
import { Row, Col, Card, Divider } from "antd";
import styled from 'styled-components';
import { QueryBuilder } from "@cubejs-client/react";
import MemberGroup from "./MemberGroup";
import FilterGroup from "./FilterGroup";
import TimeGroup from "./TimeGroup";
import ChartRenderer from "../ChartRenderer";
import SelectChartType from './SelectChartType';

const ControlsRow = styled(Row)`
  background: #ffffff;
  margin-bottom: 12px;
  padding: 18px 28px 10px 28px;
`

const StyledDivider = styled(Divider)`
  margin: 0 12px;
  height: 4.5em;
  top: 0.5em;
  background: #F4F5F6;
`

const HorizontalDivider = styled(Divider)`
  padding: 0;
  margin: 0;
  background: #F4F5F6;
`

const ChartCard = styled(Card)`
  border-radius: 4px;
  border: none;
`

const ChartRow = styled(Row)`
  padding-left: 28px;
  padding-right: 28px;
`

const ExploreQueryBuilder = ({
  vizState,
  cubejsApi,
  setVizState,
  chartExtra
}) => (
  <QueryBuilder
    vizState={vizState}
    setVizState={setVizState}
    cubejsApi={cubejsApi}
    wrapWithQueryRenderer={false}
    render={({
      measures,
      availableMeasures,
      updateMeasures,
      dimensions,
      availableDimensions,
      updateDimensions,
      segments,
      availableSegments,
      updateSegments,
      filters,
      updateFilters,
      timeDimensions,
      availableTimeDimensions,
      updateTimeDimensions,
      isQueryPresent,
      chartType,
      updateChartType,
      validatedQuery,
      cubejsApi
    }) => [
      <ControlsRow type="flex" justify="space-around" align="top" key="1">
        <Col span={24}>
          <Row type="flex" align="top" style={{ paddingBottom: 23}}>
            <MemberGroup
              title="Measures"
              members={measures}
              availableMembers={availableMeasures}
              addMemberName="Measure"
              updateMethods={updateMeasures}
            />
            <StyledDivider type="vertical" />
            <MemberGroup
              title="Dimensions"
              members={dimensions}
              availableMembers={availableDimensions}
              addMemberName="Dimension"
              updateMethods={updateDimensions}
            />
            <StyledDivider type="vertical"/>
            <MemberGroup
              title="Segments"
              members={segments}
              availableMembers={availableSegments}
              addMemberName="Segment"
              updateMethods={updateSegments}
            />
            <StyledDivider type="vertical"/>
            <TimeGroup
              title="Time"
              members={timeDimensions}
              availableMembers={availableTimeDimensions}
              addMemberName="Time"
              updateMethods={updateTimeDimensions}
            />
          </Row>
          {!!isQueryPresent && ([
            <HorizontalDivider />,
            <Row type="flex" justify="space-around" align="top" gutter={24} style={{ marginTop: 10 }}>
              <Col span={24}>
                <FilterGroup
                  members={filters}
                  availableMembers={availableDimensions.concat(availableMeasures)}
                  addMemberName="Filter"
                  updateMethods={updateFilters}
                />
              </Col>
            </Row>
          ])}
        </Col>
      </ControlsRow>,
      <ChartRow type="flex" justify="space-around" align="top" gutter={24} key="2">
        <Col span={24}>
          {isQueryPresent ? ([
            <Row style={{ marginTop: 15, marginBottom: 25 }}>
              <SelectChartType
                chartType={chartType}
                updateChartType={updateChartType}
              />
            </Row>,
            <ChartCard style={{ minHeight: 420 }}>
              <ChartRenderer
                vizState={{ query: validatedQuery, chartType }}
                cubejsApi={cubejsApi}
              />
            </ChartCard>
          ]) : (
            <h2
              style={{
                textAlign: "center"
              }}
            >
              Choose a measure or dimension to get started
            </h2>
          )}
        </Col>
      </ChartRow>
    ]}
  />
);
export default ExploreQueryBuilder;

// import React, { Fragment } from "react";
// import * as PropTypes from "prop-types";
// import { Row, Col, Divider, Card, Popover, Button } from "antd";
// import { SortAscendingOutlined, BorderInnerOutlined } from "@ant-design/icons";
// import { QueryBuilder } from "@cubejs-client/react";
// import ChartRenderer from "../ChartRenderer";
// import MemberGroup from "./MemberGroup";
// import FilterGroup from "./FilterGroup";
// import TimeGroup from "./TimeGroup";
// import SelectChartType from "./SelectChartType";
// import OrderGroup from "./Order/OrderGroup";
// import Pivot from "./Pivot/Pivot";
// export default function ExploreQueryBuilder({
//   vizState,
//   cubejsApi,
//   setVizState,
//   chartExtra
// }) {
//   return (
//     <QueryBuilder
//       vizState={vizState}
//       setVizState={setVizState}
//       cubejsApi={cubejsApi}
//       wrapWithQueryRenderer={false}
//       render={({
//         validatedQuery,
//         isQueryPresent,
//         chartType,
//         updateChartType,
//         measures,
//         availableMeasures,
//         updateMeasures,
//         dimensions,
//         availableDimensions,
//         updateDimensions,
//         segments,
//         availableSegments,
//         updateSegments,
//         filters,
//         updateFilters,
//         timeDimensions,
//         availableTimeDimensions,
//         updateTimeDimensions,
//         orderMembers,
//         updateOrder,
//         pivotConfig,
//         updatePivotConfig
//       }) => {
//         return (
//           <Fragment>
//             <Row
//               type="flex"
//               justify="space-around"
//               align="top"
//               gutter={24}
//               style={{
//                 marginBottom: 12
//               }}
//             >
//               <Col span={24}>
//                 <Card>
//                   <Row
//                     type="flex"
//                     justify="space-around"
//                     align="top"
//                     gutter={24}
//                     style={{
//                       marginBottom: 12
//                     }}
//                   >
//                     <Col span={24}>
//                       <MemberGroup
//                         members={measures}
//                         availableMembers={availableMeasures}
//                         addMemberName="Measure"
//                         updateMethods={updateMeasures}
//                       />
//                       <Divider type="vertical" />
//                       <MemberGroup
//                         members={dimensions}
//                         availableMembers={availableDimensions}
//                         addMemberName="Dimension"
//                         updateMethods={updateDimensions}
//                       />
//                       <Divider type="vertical" />
//                       <MemberGroup
//                         members={segments}
//                         availableMembers={availableSegments}
//                         addMemberName="Segment"
//                         updateMethods={updateSegments}
//                       />
//                       <Divider type="vertical" />
//                       <TimeGroup
//                         members={timeDimensions}
//                         availableMembers={availableTimeDimensions}
//                         addMemberName="Time"
//                         updateMethods={updateTimeDimensions}
//                       />
//                     </Col>
//                   </Row>

//                   <Row
//                     type="flex"
//                     justify="space-around"
//                     align="top"
//                     gutter={24}
//                     style={{
//                       marginBottom: 12
//                     }}
//                   >
//                     <Col span={24}>
//                       <FilterGroup
//                         members={filters}
//                         availableMembers={availableDimensions.concat(
//                           availableMeasures
//                         )}
//                         addMemberName="Filter"
//                         updateMethods={updateFilters}
//                       />
//                     </Col>
//                   </Row>

//                   <Row
//                     type="flex"
//                     justify="space-around"
//                     align="top"
//                     gutter={24}
//                   >
//                     <Col span={24}>
//                       <SelectChartType
//                         chartType={chartType}
//                         updateChartType={updateChartType}
//                       />

//                       <Divider type="vertical" />

//                       <Popover
//                         content={
//                           <OrderGroup
//                             orderMembers={orderMembers}
//                             onReorder={updateOrder.reorder}
//                             onOrderChange={updateOrder.set}
//                           />
//                         }
//                         placement="bottomLeft"
//                         trigger="click"
//                       >
//                         <Button
//                           disabled={!isQueryPresent}
//                           icon={<SortAscendingOutlined />}
//                         >
//                           Order
//                         </Button>
//                       </Popover>

//                       <Divider type="vertical" />

//                       <Popover
//                         content={
//                           <Pivot
//                             pivotConfig={pivotConfig}
//                             onMove={updatePivotConfig.moveItem}
//                             onUpdate={updatePivotConfig.update}
//                           />
//                         }
//                         placement="bottomLeft"
//                         trigger="click"
//                       >
//                         <Button
//                           disabled={!isQueryPresent}
//                           icon={<BorderInnerOutlined />}
//                         >
//                           Pivot
//                         </Button>
//                       </Popover>
//                     </Col>
//                   </Row>
//                 </Card>
//               </Col>
//             </Row>

//             <Row type="flex" justify="space-around" align="top" gutter={24}>
//               <Col span={24}>
//                 {isQueryPresent ? (
//                   <Card
//                     style={{
//                       minHeight: 420
//                     }}
//                     extra={chartExtra}
//                   >
//                     <ChartRenderer
//                       vizState={{
//                         query: validatedQuery,
//                         chartType,
//                         pivotConfig
//                       }}
//                       cubejsApi={cubejsApi}
//                     />
//                   </Card>
//                 ) : (
//                   <h2
//                     style={{
//                       textAlign: "center"
//                     }}
//                   >
//                     Choose a measure or dimension to get started
//                   </h2>
//                 )}
//               </Col>
//             </Row>
//           </Fragment>
//         );
//       }}
//     />
//   );
// }
// ExploreQueryBuilder.propTypes = {
//   vizState: PropTypes.object,
//   setVizState: PropTypes.func,
//   cubejsApi: PropTypes.object,
//   chartExtra: PropTypes.array
// };
// ExploreQueryBuilder.defaultProps = {
//   vizState: {},
//   setVizState: null,
//   cubejsApi: null,
//   chartExtra: null
// };
