//import Form from "antd/lib/form/Form";
import {
  EditOutlined,
  EllipsisOutlined, MinusCircleFilled,

  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import {
  AutoComplete, Avatar,
  Badge, Button, Card,
  Col, Form, Input, List,
  message, Modal,
  Popconfirm, Row, Select, Space, Tag, Typography, Upload
} from "antd";
import Meta from "antd/lib/card/Meta";
import TextArea from 'antd/lib/input/TextArea';
import { EditableTagGroup, MyEditor } from 'components';
import UploadableAvatar from "components/UploadableAvatar";
import React, { useEffect, useState } from "react";
import { accountServices, companyServices, getCityName, getSpecialty, jobServices } from "services";
import { Config } from "../../config/consts";
import '../assets/css/profile.css';
// import {Editor, EditorState} from 'draft-js';


const { Option } = Select;
const { Title } = Typography;
const jobs = [
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Junior",
    employment_type: "Full time",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  },
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Mid level",
    employment_type: "Part time",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  },
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Fresher",
    employment_type: "Remote",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  }
]

const speciality_data = [
  { speciality: 'code' },
  { speciality: 'testing' },
  { speciality: 'dev' }
]

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



function ProfileChange() {

  const [visible, setVisible] = useState(false);
  const [createJob_visible, setCreateJob_visible] = useState(false);
  const [editJob_visible, setEditJob_visible] = useState(false);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [outputHTML, setOutputHTML] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setfileList] = useState([]);
  const [autoCompleteCity, setAutoCompleteCity] = useState([]);
  const [autoCompleteSpeciality, setAutoCompleteSpeciality] = useState([]);
  const [autoCompleteEditCity, setAutoCompleteEditCity] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [companyBasicData, setCompanyBasicData] = useState([]);
  const [editorDescription, setEditorDescription] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobDetailVisible, setJobDetailVisible] = useState(false);

  const [selectedNewJobPicture, setSelectedNewJobPicture] = useState();

  var editTags = useState(null);
  var uploadableAvatarRef = useState(null);
  var createTags = useState(null);
  var editorRef = useState(null);

  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();

  useEffect(() => {
    let user = accountServices.userValue;
    if (user) {
      companyServices.getCompany(user.account.id);
      const subscription = companyServices.companyObject
        .subscribe((company) => {
          if (company) {
            setCompanyBasicData(company.basic_data);
            setJobData(company.job);;
            setEditorDescription(company.basic_data.description);
          }
        });
      return () => {
        subscription.unsubscribe();
      }
    }
    else {
      console.log("Oh no!");
    }
  }, [])

  const onUploadJobPicture = (data) => {
    setSelectedNewJobPicture(data)
    // studentServices.uploadStudentPictureProfile(multipart_formdata)
    //   .then(() => {
    //     message.success("Upload avatar successful!");
    //   });
  }

  const handleEditorChange = (editorState) => {
    // console.log(editorState);
    // setEditorState(editorState);
    // outputHTML: editorState.toHTML()
    // setOutputHTML(editorState.toHTML());
    // console.log(outputHTML);
  }

  const onEditorFinish = () => {
    // setOutputHTML(editorState.toHTML());
    var descriptionHtml = editorRef.getHtml();
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        companyBasicData.specialties,
        descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Updated description!');
        setEditorDescription(descriptionHtml);
      })
      .catch((error) => {
        message.success(error);
      });

  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const showCreateJobModal = () => {
    setCreateJob_visible(true);
  };

  const handleCreateJobCancel = (e) => {
    setCreateJob_visible(false);
  };

  const showEditJobModal = () => {
    setEditJob_visible(true);
  };

  const handleEditJobCancel = (e) => {
    setEditJob_visible(false);
  };

  const onAddJobFinish = (values) => {
    jobServices.createJob(
      values.title,
      values.description,
      values.seniority_level,
      values.employee_type,
      values.recruitment_url,
      [values.cities], // quick fix
      createTags.getTags(),
    )
      .then((listjob) => {
        if (selectedNewJobPicture) {
          var id_new_job = listjob[listjob.length - 1].id;
          let multipart_formdata = { 'file': selectedNewJobPicture.file, 'id': id_new_job };
          jobServices.uploadJobPicture(multipart_formdata)
            .then(() => {
              message.success("Tải ảnh bìa cho job thành công!");
            })
            .catch(error => {
              message.error(error);
            });
        }
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success("Tạo việc làm thành công!");
        handleCreateJobCancel();
      })
      .catch((error) => {
        message.error(error);
        handleCreateJobCancel();
      });

    setSelectedNewJobPicture("");
  };

  const onEditJob = (values) => {
    jobServices.updateJob(
      values.id,
      values.title,
      values.description,
      values.seniority_level,
      values.employee_type,
      values.recruitment_url,
      values.cities,
      editTags.getTags(),
    )
      .then(() => {

        if (selectedNewJobPicture) {
          let multipart_formdata = { 'file': selectedNewJobPicture.file, 'id': values.id };
          jobServices.uploadJobPicture(multipart_formdata)
            .then(() => {
              message.success("Tải ảnh bìa cho job thành công!");
            })
            .catch(error => {
              message.error(error);
            });
        }

        companyServices.getCompany(accountServices.userValue.account.id);
        message.success("Việc làm đã được cập nhật!");
        handleEditJobCancel();
      })
      .catch((error) => {
        message.success("Lỗi cập nhật việc làm");
        handleEditJobCancel();
      });

    setSelectedNewJobPicture("");
  };

  const onConfirmDeleteJob = (id) => {
    jobServices.deleteJob(id)
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success({ title: "uWu", content: "Việc làm đã được xóa" });

      })
      .catch((error) => {
        message.error({ title: "uWu", content: error });
      });
  }

  const onJobModify = (item) => {
    formEdit.setFieldsValue({
      id: item.id,
      title: item.title,
      seniority_level: item.seniority_level,
      cities: item.cities,
      employee_type: item.employment_type,
      description: item.description,
      recruitment_url: item.recruitment_url,
    });
    //EditTag.setState({tags: item.skills});
    editTags.setTags(item.skills);
    uploadableAvatarRef.setImageUrl(Config.backendUrl + item.job_picture);
    showEditJobModal();
  };

  const onAddSpecialityFinish = (values) => {
    var newSpeciality = companyBasicData.specialties;
    newSpeciality.push(values.speciality_info[0].speciality);
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        newSpeciality,
        companyBasicData.descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Updated speciality!');
      })
      .catch((error) => {
        console.log(error);
        message.success(error);
      });
  };

  const onConfirmDeleteSpeciality = (values) => {
    var new_speciality = companyBasicData.specialties;
    const index = new_speciality.indexOf(values);
    if (index > -1) {
      new_speciality.splice(index, 1);
    }
    // var descriptionHtml = editorRef.getHtml();
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        new_speciality,
        companyBasicData.descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Cập nhật specialty!');
      })
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
  }

  const showJobDetailModal = () => {
    setJobDetailVisible(true);
  };

  const handleJobDetailCancel = (e) => {
    setJobDetailVisible(false);
  };

  const onShowJobDetail = (values) => {
    setJobDetail(values);
    showJobDetailModal();
  };

  const onChangeAutoCompleteSpeciality = (data) => {
    if (data) {

      getSpecialty(data).then(data => {
        setAutoCompleteSpeciality(data.tag.map(x => ({ value: x })));
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteSpeciality([]);
    }
  }

  const onChangeAutoCompleteCity = (text) => {
    if (text) {
      getCityName(text).then(data => {
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteCity(data_name);
        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteCity([]);
    }
  };

  const onChangeAutoCompleteEditCity = (text) => {
    if (text) {
      getCityName(text).then(data => {
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteEditCity(data_name);
        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteEditCity([]);
    }
  };

  const handlePreviewCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    //   setState({
    // 	previewImage: file.url || file.preview,
    // 	previewVisible: true,
    // 	previewTitle:
    // 	  file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    //   });
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleUploadChange = ({ fileList }) => {
    // setState({ fileList });
    setfileList(fileList);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  return (
    <>
      <Card className="card-info" style={{ marginTop: 24 }} title={<Title level={3}>Mô tả</Title>}>
        <MyEditor ref={ref => (editorRef = ref)} descriptionData={editorDescription}></MyEditor>
        <Button type="primary" htmlType="submit" onClick={() => onEditorFinish()}>Lưu</Button>
      </Card>

      <Card
        className="card-info"
        style={{
          marginTop: 24,
        }}>
        <Meta title={<Title level={3}>Việc làm</Title>}></Meta>
        <List
          grid={{ gutter: 24, column: 2 }}
          dataSource={jobData}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <EditOutlined key="edit" onClick={() => onJobModify(item)} />,
                  <EllipsisOutlined key="info" onClick={() => onShowJobDetail(item)} />
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://image.flaticon.com/icons/svg/1063/1063196.svg"></Avatar>}
                  title={
                    <span >
                      <span>{item.title}</span>
                      <span>
                        <Popconfirm
                          title="Bạn có muốn xóa cái này?"
                          onConfirm={() => onConfirmDeleteJob(item.id)}
                          okText="Yes"
                          cancelText="No">
                          <MinusCircleFilled style={{ color: 'red', fontSize: 16, float: 'right' }} />
                        </Popconfirm>
                      </span>
                    </span>
                  }
                  description={<Space direction="vertical" size={3}>
                    <div>Yêu cầu: {item.seniority_level}</div>
                    <div>Địa điểm: {item.cities[0]}</div>
                    <div>Công việc: {item.employment_type}</div>
                    <List dataSource={item.skills} renderItem={skill => (<Tag style={{ margin: 3 }}>{skill}</Tag>)}></List>
                  </Space>}
                />
              </Card>
            </List.Item>
          )}>
        </List>
        <Button style={{ float: "right" }} size="large" type="primary" shape="circle" onClick={() => showCreateJobModal()}><PlusOutlined /></Button>
      </Card>

      <Modal
        forceRender
        title="Việc làm"
        visible={jobDetailVisible}
        onCancel={handleJobDetailCancel}
        footer={null}
      >
        <List grid={{ gutter: 24, column: 2 }}>
          <List.Item>
            <Meta
              avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
              title={jobDetail.title}
              description={<Space direction="vertical" size={3}>
                <div>Yêu cầu: {jobDetail.seniority_level}</div>
                <div>Địa điểm: <Space><List dataSource={jobDetail.cities} renderItem={city => (city)}></List></Space></div>
                <div>Công việc: {jobDetail.employment_type}</div>
                <div>Mô tả: {jobDetail.description}</div>
                <div style={{ display: 'flex' }}>
                  <div>Kỹ năng: </div>
                  <List dataSource={jobDetail.skills} renderItem={skills => (<Tag style={{ margin: 3 }}>{skills}</Tag>)}></List>
                </div>
              </Space>}
            />
          </List.Item>
        </List>
      </Modal>

      <Modal
        forceRender
        title="Tạo việc làm"
        visible={createJob_visible}
        onCancel={handleCreateJobCancel}
        onOk={() => {
          formCreate.validateFields()
            .then(values => {
              onAddJobFinish(values);
              formCreate.resetFields();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          id="createJob"
          form={formCreate}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Job title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Job Description"
            name="description"
            rules={[{ required: true, message: "Job description is required!" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Seniority level"
            name="seniority_level"
            rules={[{ required: true, message: "Seniority level is required!" }]}
          >
            <Select placeholder="select seniority level">
              <Option value="Junior">Junior</Option>
              <Option value="MidLevel">Mid Level</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Employee type"
            name="employee_type"
            rules={[{ required: true, message: "Employee type is required!" }]}
          >
            <Select placeholder="select employee type">
              <Option value="Full-time">Full time</Option>
              <Option value="Part-time">Part time</Option>
              <Option value="FullTime/PartTime">Full time/Part time</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Recruitment url"
            name="recruitment_url"
            rules={[{ required: true, message: "Recruitment url is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="cities"
            rules={[{ required: true, message: "City is required!" }]}
          >
            <AutoComplete style={{ width: '100%' }} options={autoCompleteCity} onChange={onChangeAutoCompleteCity}></AutoComplete>
          </Form.Item>

          <Form.Item
            initialValue="skill"
            label="Skill"
            name="skills"
          >
            <EditableTagGroup ref={ref => (createTags = ref)} />
          </Form.Item>

          <Form.Item label="Ảnh bìa">
            <UploadableAvatar onUploadImage={onUploadJobPicture}></UploadableAvatar>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        forceRender
        title="Chỉnh sửa việc làm"
        visible={editJob_visible}
        onCancel={handleEditJobCancel}
        onOk={() => {
          formEdit.validateFields()
            .then(values => {
              onEditJob(values);
            })
            .catch(info => {
            })
        }}
      >
        <Form
          id="editJob"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formEdit}
        >
          <Form.Item
            name="id"
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            initialValue="title"
            label="Title"
            name="title"
            rules={[{ required: true, message: "Job title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="seniority_level"
            label="Yêu cầu:"
            name="seniority_level"
            rules={[{ required: true, message: "Seniority level is required!" }]}
          >
            <Select>
              <Option value="Junior">Junior</Option>
              <Option value="MidLevel">Mid Level</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>

          <Form.Item
            initialValue="city"
            label="Địa điểm:"
            name="cities"
            rules={[{ required: true, message: "City is required!" }]}
          >
            <AutoComplete style={{ width: '100%' }} options={autoCompleteEditCity} onChange={onChangeAutoCompleteEditCity}></AutoComplete>
          </Form.Item>

          <Form.Item
            initialValue="employee_type"
            label="Công việc:"
            name="employee_type"
            rules={[{ required: true, message: "Employee type is required!" }]}
          >
            <Select>
              <Option value="Full-time">Full time</Option>
              <Option value="Part-time">Part time</Option>
              <Option value="FullTime/PartTime">Full time/Part time</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          </Form.Item>

          <Form.Item
            initialValue="description"
            label="Description:"
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            initialValue="recruitment_url"
            label="Recruitment url:"
            name="recruitment_url"
            rules={[{ required: true, message: "Recruitment url is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="skill"
            label="Skill:"
            name="skills"
            rules={[{ required: true, message: "Skill is required!" }]}
          >
            {/* <EditTag/> */}
            <EditableTagGroup ref={ref => (editTags = ref)} />
          </Form.Item>

          <Form.Item label="Ảnh bìa">
            <UploadableAvatar ref={ref => (uploadableAvatarRef = ref)} onUploadImage={onUploadJobPicture}></UploadableAvatar>
          </Form.Item>
        </Form>
      </Modal>

      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ marginTop: 24 }}>
            <Meta title={<Title level={3}>Chuyên môn</Title>}></Meta>
            <List
              style={{ marginTop: 24 }}
              grid={{ column: 2 }}
              dataSource={companyBasicData.specialties}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Popconfirm
                        title="Bạn có muốn xóa cái này?"
                        onConfirm={() => onConfirmDeleteSpeciality(item)}
                        okText="Yes"
                        cancelText="No">
                        <a>
                          <Badge
                            style={{ color: "red" }}
                            count={<MinusCircleOutlined />}
                          >
                            <Avatar src="https://image.flaticon.com/icons/svg/1828/1828749.svg" />
                          </Badge>
                        </a>
                      </Popconfirm>
                    }
                    title={item}
                  />
                </List.Item>
              )}
            />
            <Form
              name="add-speciality"
              autoComplete="off"
              onFinish={onAddSpecialityFinish}
            >
              <Form.List name="speciality_info">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field) => (
                        <Row gutter={12, 12}
                          key={field.key}
                          style={{
                            marginBottom: 8,
                            marginTop: 8,
                            width: '100%',
                          }}
                        >
                          <Col span={16}>
                            <Form.Item
                              {...field}
                              name={[field.name, "speciality"]}
                              fieldKey={[field.fieldKey, "speciality"]}
                              rules={[{ required: true, message: "Missing speciality" },]}
                            >
                              {/* <Input /> */}
                              <AutoComplete options={autoCompleteSpeciality} onChange={onChangeAutoCompleteSpeciality} placeholder="Chuyên môn công ty" ></AutoComplete>
                            </Form.Item>
                          </Col>
                          <Form.Item>
                            <MinusCircleOutlined
                              style={{ color: "red" }}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Form.Item>
                        </Row>
                      ))}

                      <Form.Item>
                        <Button type="dashed" shape="circle"
                          onClick={() => {
                            add();
                          }}
                        >
                          <PlusOutlined />
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>

              <Form.Item>
                <Button type="primary" htmlType="submit"> Submit </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="card-info" style={{ marginTop: 24 }}>
            <Meta title={<Title level={3}>Ảnh bìa</Title>}></Meta>
            <Upload
              //action ???
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
            >
              {/* max number of image upload */}
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handlePreviewCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );

}

export default ProfileChange;
