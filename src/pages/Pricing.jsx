import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Divider, Table, Form } from "antd";
import { Layout, Menu, theme } from "antd";
import "../index.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Col, Row } from "antd";
import { Input, Space, Dropdown } from "antd";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { emptyMaterialData } from "../data/data";
import { request } from "../data/request";
import "../pages/pricing.css";

import { Navigate } from "react-router-dom";
const { Search } = Input;

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          // addonBefore="$"
          />
      </Form.Item>
    ) : (
      <div>
        <span>$</span>
        {children}
        <span className="editEffect">
          <FaEdit onClick={toggleEdit} />
        </span>
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const onSearch = (value) => console.log;
const { Header, Sider, Content } = Layout;
const Pricing = () => {
  const [authenticated, setauthenticated] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [materialData, setmaterialData] = useState([]);
  const [dataSource, setDataSource] = useState(emptyMaterialData);
  const [req, setRequest] = useState(request);
  const [error, setError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // const inputRef = useRef(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
      setmaterialData(emptyMaterialData);
    }
  }, []);

  // const trimDollar = (num) => {
  //   const str = num.split('$')
  //   const ans = str[1]
  //   if(ans) {
  //     return Number(ans)
  //   } else {
  //     return 0.00
  //   }
  // }

  const handleZipCodeChange = (e) => {
    console.log(e.target.value);
    setZipCode(e.target.value);
  };
  const saveButton = () => {
    //handling save button
    if (zipCode === "") {
      toast.error("Please enter the Zip Code!..", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.success("Updated Successfully!..", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  //submit button
  const handleButtonClick = () => {
    handleSubmit1();
    // handleSubmit2();
    saveButton();
  };

  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit1 = () => {
    console.log("handleSubmit1", materialData);

    let request = req;
    console.log(request);
    // console.log(request, request['13']['62dacd6df05cb1c8722ef034'])

    //
    //13 GL
    request["13"]["62dacd6df05cb1c8722ef034"]["63b334f99e56b3c73ed83997"] =
      Number(materialData[0][0].price).toFixed(2); // plastic bag
    request["13"]["62dacd6df05cb1c8722ef034"]["63b335139e56b3c73ed83998"] =
      Number(materialData[1][0].price).toFixed(2); // plastic drum
    request["13"]["62dacda4f05cb1c8722ef035"]["63b3355e9e56b3c73ed8399b"] =
      Number(materialData[2][0].price).toFixed(2); // metal bag
    request["13"]["62dacda4f05cb1c8722ef035"]["63b335679e56b3c73ed8399c"] =
      Number(materialData[3][0].price).toFixed(2); // metal drum
    request["13"]["62dacdb1f05cb1c8722ef036"]["63b3353e9e56b3c73ed83999"] =
      Number(materialData[4][0].price).toFixed(2); // glass bag
    request["13"]["62dacdb1f05cb1c8722ef036"]["63b335479e56b3c73ed8399a"] =
      Number(materialData[5][0].price).toFixed(2); // glass drum
    request["13"]["62dacdbff05cb1c8722ef037"]["63b3357b9e56b3c73ed8399d"] =
      Number(materialData[6][0].price).toFixed(2); // e waste bag
    request["13"]["62dacdbff05cb1c8722ef037"]["63b335849e56b3c73ed8399e"] =
      Number(materialData[7][0].price).toFixed(2); // e waste drum
    request["13"]["62dacdcbf05cb1c8722ef038"]["63b335929e56b3c73ed8399f"] =
      Number(materialData[8][0].price).toFixed(2); // other bag
    request["13"]["62dacdcbf05cb1c8722ef038"]["63b3359c9e56b3c73ed839a0"] =
      Number(materialData[9][0].price).toFixed(2); // other drum

    //27GL
    request["27"]["62dacd6df05cb1c8722ef034"]["63b334f99e56b3c73ed83997"] =
      Number(materialData[0][1].price).toFixed(2); //pastic bag
    request["27"]["62dacd6df05cb1c8722ef034"]["63b335139e56b3c73ed83998"] =
      Number(materialData[1][1].price).toFixed(2); //plastic drum
    request["27"]["62dacda4f05cb1c8722ef035"]["63b3355e9e56b3c73ed8399b"] =
      Number(materialData[2][1].price).toFixed(2); //metal bag
    request["27"]["62dacda4f05cb1c8722ef035"]["63b335679e56b3c73ed8399c"] =
      Number(materialData[3][1].price).toFixed(2); //metal drum
    request["27"]["62dacdb1f05cb1c8722ef036"]["63b3353e9e56b3c73ed83999"] =
      Number(materialData[4][1].price).toFixed(2); //glass bag
    request["27"]["62dacdb1f05cb1c8722ef036"]["63b335479e56b3c73ed8399a"] =
      Number(materialData[5][1].price).toFixed(2); //glass drum
    request["27"]["62dacdbff05cb1c8722ef037"]["63b3357b9e56b3c73ed8399d"] =
      Number(materialData[6][1].price).toFixed(2); //e bag
    request["27"]["62dacdbff05cb1c8722ef037"]["63b335849e56b3c73ed8399e"] =
      Number(materialData[7][1].price).toFixed(2); //e drum
    request["27"]["62dacdcbf05cb1c8722ef038"]["63b335929e56b3c73ed8399f"] =
      Number(materialData[8][1].price).toFixed(2); //other bag
    request["27"]["62dacdcbf05cb1c8722ef038"]["63b3359c9e56b3c73ed839a0"] =
      Number(materialData[9][1].price).toFixed(2); //other drum

    // 55 gl
    request["56"]["62dacd6df05cb1c8722ef034"]["63b334f99e56b3c73ed83997"] =
      Number(materialData[0][2].price).toFixed(2); //plastic bag
    request["56"]["62dacd6df05cb1c8722ef034"]["63b335139e56b3c73ed83998"] =
      Number(materialData[1][2].price).toFixed(2); //plastic drum
    request["56"]["62dacda4f05cb1c8722ef035"]["63b3355e9e56b3c73ed8399b"] =
      Number(materialData[2][2].price).toFixed(2); //metal bag
    request["56"]["62dacda4f05cb1c8722ef035"]["63b335679e56b3c73ed8399c"] =
      Number(materialData[3][2].price).toFixed(2); //metal drum
    request["56"]["62dacdb1f05cb1c8722ef036"]["63b3353e9e56b3c73ed83999"] =
      Number(materialData[4][2].price).toFixed(2); //glass bag
    request["56"]["62dacdb1f05cb1c8722ef036"]["63b335479e56b3c73ed8399a"] =
      Number(materialData[5][2].price).toFixed(2); //glass drum
    request["56"]["62dacdbff05cb1c8722ef037"]["63b3357b9e56b3c73ed8399d"] =
      Number(materialData[6][2].price).toFixed(2); //e bag
    request["56"]["62dacdbff05cb1c8722ef037"]["63b335849e56b3c73ed8399e"] =
      Number(materialData[7][2].price).toFixed(2); //e drum
    request["56"]["62dacdcbf05cb1c8722ef038"]["63b335929e56b3c73ed8399f"] =
      Number(materialData[8][2].price).toFixed(2); //other bag
    request["56"]["62dacdcbf05cb1c8722ef038"]["63b3359c9e56b3c73ed839a0"] =
      Number(materialData[9][2].price).toFixed(2); //other drum
    request["_id"] = zipCode;
    request["status"] = true;
    delete request["zipCode"];
    console.log(request, "test for data");
    // let data = request;

    axios
      .post(
        "https://eiazcci026.execute-api.us-east-1.amazonaws.com/test/apiForSetPricing",
        request
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getPircingData = async () => {
    console.log(zipCode);
    setmaterialData([]);
    try {
      let obj = {
        id: zipCode,
      };
      let res = await axios.post(
        "https://w9909rwdh1.execute-api.us-east-1.amazonaws.com/test/getApiForPricing",
        obj
      );

      const value = 32.42;
      const formattedValue = value.toFixed(2); // '42.42' (formatted as '00.00')
      let modifiedStr = JSON.stringify(emptyMaterialData);
      let modifiedArr = JSON.parse(modifiedStr);
      if (res && res.data && res.data.data && res.data.data.length > 0) {
        let obj1 = {
          13: res.data.data[0][13],
          27: res.data.data[0][27],
          56: res.data.data[0][56],
          _id: Number(res.data._id),
        };
        console.log(obj1);
        // localStorage.setItem("get existing data", JSON.stringify(obj1));
        let arr13 = obj1[13];
        // console.log(arr13, "arr13")
        let k = 0; // 13
        for (let i = 0; i < 5; i++) {
          // console.log("TEST",arr13[i]['categories'])
          // console.log(typeof arr13[i])
          let cat = arr13[i]["categories"]; // bag, drum

          // console.log(cat, "13GL")
          for (let j = 0; j < cat.length; j++) {
            // console.log(cat, j, k)
            modifiedArr[k][0].price = cat[j].price;
            k++;
          }
        }

        // for 27GL
        let arr27 = obj1[27];
        let k27 = 0;
        // console.log(arr27, 'arr27')
        for (let i = 0; i < 5; i++) {
          let cat27 = arr27[i]["categories"];
          // console.log(cat27)
          for (let j = 0; j < cat27.length; j++) {
            // console.log(cat27, j, k1)
            modifiedArr[k27][1].price = cat27[j].price;
            k27++;
          }
        }

        //for 55GL
        let arr56 = obj1[56];
        let k56 = 0;
        // console.log(arr55, "arr55")
        // let k2 = 2;
        for (let i = 0; i < 5; i++) {
          let cat56 = arr56[i]["categories"];
          // console.log(cat55)
          for (let j = 0; j < cat56.length; j++) {
            modifiedArr[k56][2].price = cat56[j].price;
            console.log((modifiedArr[k56][2].price = cat56[j].price), "56gl");
            k56++;
          }
        }
        console.log(modifiedArr, emptyMaterialData, "datafetch");
        // setmaterialData(obj1)
        setmaterialData(modifiedArr);
        setDataSource(modifiedArr);
      } else {
        setmaterialData(emptyMaterialData);
      }
    } catch (err) {
      setmaterialData(emptyMaterialData);
    }
  };

  setTimeout(() => {
    if (!authenticated) {
      return <Navigate replace to="/login" />;
    } else {
    }
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row, val) => {
    // console.log('VAL', val)
    let arr1d = [].concat(...dataSource);

    // let arr = dataSource[0]
    const newData = [...arr1d];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    let arr = [];

    while (newData.length) arr.push(newData.splice(0, 3));
    // console.log(arr)
    setDataSource(arr);
    setmaterialData(arr);
  };

  const defaultColumns = [
    {
      dataIndex: "name",
      key: "name",
      className: "cel",
    },
    {
      dataIndex: "price",
      key: "price",
      className: "cel",
      editable: true,
    },
  ];
  

  const columns =defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const searchClick = (e) => {
    if (!zipCode) {
      setError(true);
    }
  };
  return (
    <>
      <div className="header">
        <h2 style={{ paddingRight: "20px" }}>Pricing</h2>
      </div>
      <Content
        onClick={searchClick}
        style={{
          padding: 24,
          Height: "100%",
          background: colorBgContainer,
        }}
      >
        <Search
          placeholder="Zip Code"
          onSearch={getPircingData}
          size="large"
          enterButton
          onChange={handleZipCodeChange}
        />
        {error && zipCode.length <= 0 ? (
          <span
            style={{
              color: "red",
              marginTop: "5px",
              fontStyle: "italic",
              fontSize:"20px"
            }}
          >
            Please enter Zip Code...
          </span>
        ) : (
          ""
        )}
        <Divider className="divider" />

        {materialData && materialData.length > 0 ? (
          <>
            <Row gutter={16} style={{ marginBottom: "1rem" }}>
              <Col span={8}>
                <Card
                  title={
                    <div className="card-title">
                      <h6 className="card-name">Plastic Bottles</h6>
                      <Input
                        placeholder="Zip Code"
                        className="zipcode-input"
                        value={zipCode}
                        disabled
                        style={{ color: "black", fontWeight: "10px" }}
                      />
                    </div>
                  }
                  className="cardHeader ant-card ant-card-head"
                >
                  <Card
                    style={{ border: "2px solid #f0f0f0" }}
                    title="Plastic Bottles Bag"
                    bordered={false}
                    size="small"
                  >
                    {/* <span>
                      $
                    </span> */}
                    <Table
                      rowClassName={() => "editable-row"}
                      bordered

                      components={components}
                      dataSource={materialData[0]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>{" "}
                  <br />
                  <Card
                    style={{ border: "2px solid #f0f0f0" }}
                    title="Plastic Bottles Drum"
                    bordered={false}
                    size="small"
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[1]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={
                    <div className="card-title">
                      <h6 className="card-name">Metal Cans</h6>
                      <Input
                        placeholder="Zip Code"
                        className="zipcode-input"
                        value={zipCode}
                        disabled
                        style={{ color: "black", fontWeight: "10px" }}
                      />
                    </div>
                  }
                  className="cardHeader ant-card ant-card-head"
                >
                  <Card
                    title="Metal Cans Bag"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[2]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>{" "}
                  <br />
                  <Card
                    title="Metal Cans Drum"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[3]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={
                    <div className="card-title">
                      <h6 className="card-name">Glass Bottles</h6>
                      <Input
                        placeholder="Zip Code"
                        className="zipcode-input"
                        value={zipCode}
                        disabled
                        style={{ color: "black", fontWeight: "10px" }}
                      />
                    </div>
                  }
                  className="cardHeader ant-card ant-card-head"
                >
                  <Card
                    title="Glass Bottles Bag"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[4]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>{" "}
                  <br />
                  <Card
                    style={{ border: "2px solid #f0f0f0" }}
                    title="Glass Bottles Drum"
                    bordered={false}
                    size="small"
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[5]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Card>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8} offset={3}>
                <Card
                  title={
                    <div className="card-title">
                      <h6 className="card-name">E-Waste</h6>
                      <Input
                        placeholder="Zip Code"
                        className="zipcode-input"
                        value={zipCode}
                        disabled
                        style={{ color: "black", fontWeight: "10px" }}
                      />
                    </div>
                  }
                  className="cardHeader ant-card ant-card-head"
                >
                  <Card
                    title="E-Waste Bag"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[6]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>{" "}
                  <br />
                  <Card
                    title="E-Waste Drum"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[7]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Card>
              </Col>
              <Col span={8} offset={3}>
                <Card
                  title={
                    <div className="card-title">
                      <h6 className="card-name">Other</h6>
                      <Input
                        placeholder="Zip Code"
                        className="zipcode-input"
                        value={zipCode}
                        disabled
                        style={{ color: "black", fontWeight: "10px" }}
                      />
                    </div>
                  }
                  className="cardHeader ant-card ant-card-head"
                >
                  <Card
                    title="Other Bag"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[8]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>{" "}
                  <br />
                  <Card
                    title="Other Drum"
                    bordered={false}
                    size="small"
                    style={{ border: "2px solid #f0f0f0" }}
                  >
                    <Table
                      components={components}
                      rowClassName={() => "editable-row"}
                      bordered
                      dataSource={materialData[9]}
                      columns={columns}
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col
                span={6}
                offset={19}
                style={{ display: "flex", marginTop: "5px" }}
              >
                {error && zipCode.length >= 5 ? (
                  <Button
                    type="primary"
                    style={{ margin: "1rem" }}
                    size="large"
                    onClick={handleButtonClick}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    disabled
                    style={{ margin: "1rem" }}
                    size="large"
                  >
                    Save
                  </Button>
                )}
                <ToastContainer transition={Slide} theme="light" limit={1} />
                <Button
                  type="primary"
                  danger
                  size="large"
                  style={{ marginTop: "15px" }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="redirectmsg">Loading, Please Wait...</div>
          </div>
        )}
      </Content>
    </>
  );
};
export default Pricing;
