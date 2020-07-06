import React from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import PriceModelService from "../../services/PriceModelService";

const PriceModelSelectionComponent = ({ change, value }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    PriceModelService.get().then(({ data }) => {
      if (data.success) {
        setData(data.entries.priceModels);
      }
    });
  }, []);

  return (
    <ComboBoxComponent
      fields={{ text: "name", value: "code" }}
      dataSource={data}
      allowFiltering
      ignoreAccent
      filterType="Contains"
      placeholder="Vui lòng chọn"
      change={change}
      value={value}
    />
  );
};

export default PriceModelSelectionComponent;
