import React from "react";
import Slider from "@material-ui/core/Slider";
import FieldComponent from "../../components/FieldComponent/FieldComponent";
import {
  StateSelectionComponent,
  CitySelectionComponent,
  StreetSelectionComponent,
} from "../../components/GeoComponents/GeoComponents";

import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

const FilterComponent = () => {
  const [state, setState] = React.useState({
    state: "",
    city: "",
    street: "",
    price: [0, 50],
    width: [0, 100],
  });

  const setFilter = (name, value) => {
    setState(state => ({ ...state, [name]: value }));
  };

  const rentFilter = () => (
    <div className="card">
      <div className="filter">
        <div className="row">
          <FieldComponent size="6">
            <div className="form-group">
              <label>Từ khoá </label>
              <input placeholder="Từ khoá" className="form-control input-sync" />
            </div>
          </FieldComponent>
          <FieldComponent size="6">
            <label>Tỉnh/thành</label>
            <StateSelectionComponent change={({ value }) => setFilter("state", value)} />
          </FieldComponent>
          <FieldComponent size="6">
            <label>Quận/huyện</label>
            <CitySelectionComponent
              value={state.city}
              stateId={state.state}
              change={({ value }) => setFilter("city", value)}
            />
          </FieldComponent>
          <FieldComponent size="6">
            <label>Tuyến đường</label>
            <StreetSelectionComponent
              stateId={state.state}
              cityId={state.city}
              value={state.street}
              change={({ value }) => setFilter("street", value)}
            />
          </FieldComponent>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="slider">
              <Slider
                value={state.width}
                onChange={(event, value) =>
                  setState({ ...state, filter: { ...state, width: value } })
                }
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={value => `${value}Tr+`}
              />
              <div className="slider-description">
                <div>Từ: {state.width[0]}</div>
                <div>Chiều ngang</div>
                <div>Đến: {state.width[1]}m+</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="slider">
              <Slider
                value={state.price}
                onChange={(event, value) =>
                  setState({ ...state, filter: { ...state, price: value } })
                }
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                scale={value => value * 5}
                getAriaValueText={value => `${value}Tr+`}
              />
              <div className="slider-description">
                <div>Từ: {state.price[0] * 5}</div>
                <div>Giá</div>
                <div>Đến: {state.price[1] * 5}Tr+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const saleFilter = () => <h1>Sale Filter</h1>;

  return (
    <div className="card">
      <TabComponent heightAdjustMode="Auto">
        <TabItemsDirective>
          <TabItemDirective header={{ text: "Nhà đất cho thuê" }} content={rentFilter} />
          <TabItemDirective header={{ text: "Nhà đất bán" }} content={saleFilter} />
        </TabItemsDirective>
      </TabComponent>
    </div>
  );
};
export default FilterComponent;
