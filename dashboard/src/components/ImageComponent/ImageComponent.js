import React from "react";
import { connect } from "react-redux";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageComponent = ({
  listOfFiles,
  change,
  AuthReducer,
  isEmpty,
  resetImage,
  onImageResetComplete,
}) => {
  const [state, setState] = React.useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: listOfFiles || [],
  });

  const handleCancel = () => setState(state => ({ ...state, previewVisible: false }));

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState(state => ({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    }));
  };

  const handleChange = ({ fileList }) => {
    setState(state => ({ ...state, fileList }));
    const imageIds = [];
    fileList.forEach(file => {
      if (file.response && file.response.success) {
        imageIds.push(file.response.imageId);
      }
    });
    change(imageIds);
  };

  const { previewVisible, previewImage, fileList, previewTitle } = state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  React.useEffect(() => {
    if (resetImage) {
      setState(state => ({ ...state, fileList: [] }));
      onImageResetComplete();
    }
  }, [resetImage]);

  return (
    <div className="clearfix">
      <Upload
        action={process.env.REACT_APP_MAIN_API + "/image/upload"}
        headers={{
          Authorization: AuthReducer.token && `Bearer ${AuthReducer.token}`,
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ AuthReducer }) => ({ AuthReducer });

export default connect(mapStateToProps)(ImageComponent);
