import React from "react";

import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import GeoService from "../../services/GeoService";

export const StateSelectionComponent = ({ change }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    GeoService.fetchStates().then(({ data }) => {
      if (data.success) {
        setData(data.entries.states);
      }
    });
  }, []);

  return (
    <ComboBoxComponent
      change={change}
      fields={{ text: "name", value: "_id" }}
      dataSource={data}
    />
  );
};

export const CitySelectionComponent = ({ stateId, change, value }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!!stateId) {
      GeoService.fetchCities(stateId).then(({ data }) => {
        if (data.success) {
          setData(data.entries.cities);
        }
      });
    }
  }, [stateId]);

  return (
    <ComboBoxComponent
      readOnly={!stateId}
      change={change}
      value={value}
      fields={{ text: "name", value: "_id" }}
      dataSource={data}
    />
  );
};

export const StreetSelectionComponent = ({ stateId, cityId, change, value }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!!cityId && !!stateId) {
      GeoService.fetchStreets({ stateId, cityId }).then(({ data }) => {
        if (data.success) {
          setData(data.entries.streets);
        }
      });
    }
  }, [cityId, stateId]);

  return (
    <ComboBoxComponent
      readOnly={!cityId}
      change={change}
      fields={{ text: "name", value: "_id" }}
      dataSource={data}
      value={value}
    />
  );
};

export const WardSelectionComponent = ({ stateId, cityId, change, value }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!!cityId && !!stateId) {
      GeoService.fetchWards({ stateId, cityId }).then(({ data }) => {
        if (data.success) {
          setData(data.entries.wards);
        }
      });
    }
  }, [cityId, stateId]);

  return (
    <ComboBoxComponent
      readOnly={!cityId}
      change={change}
      fields={{ text: "name", value: "_id" }}
      dataSource={data}
      value={value}
    />
  );
};
