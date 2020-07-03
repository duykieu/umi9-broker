import React from "react";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import CategoryService from "../../services/CategoryService";

const CategorySelectionComponent = ({ categories, change, value }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    CategoryService.get().then(({ data }) => {
      if (data.success) {
        setData(data.entries.categories);
      }
    });
  }, []);

  return (
    <ComboBoxComponent
      fields={{ text: "name", value: "slug" }}
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

export default CategorySelectionComponent;
