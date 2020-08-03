import React from 'react'
import { Component } from 'react';
import {Tabs,Menu, Form, Input, Button, Dropdown, Upload, Space, DatePicker, Modal} from  'antd';
import{ Row, Col, Avatar, Switch} from 'antd';
import {EditOutlined, UploadOutlined} from '@ant-design/icons';             
import moment from 'moment';
import { studentServices } from "@/services";
import { accountServices } from "@/services";


const dateFormat = 'YYYY/MM/DD';
const  {TabPane} =  Tabs;
const color = (
    <Menu style={{ marginLeft:450}}>
        <Button  key='3' title="Orange" style={{backgroundColor:"rgb(250,173,20"}}>Orange</Button>
        <Button key='4'title="Daybreak Blue" style={{backgroundColor:'rgb(24,144,255)'}}>LBlue</Button>
        <Button key='5'title="Red" style={{backgroundColor:"rgb(245,34,45)"}}>Red</Button>
        <Button key='6'title="Volcano" style={{backgroundColor:"rgb(250,84,28)"}}>Volc</Button>
        <Button key='7'title="Cyan" style={{backgroundColor:"rgb(19,194,194)"}}>Cyan</Button>
        <Button key='8'title="Green" style={{backgroundColor:"rgb(82,196,26)"}}>Green</Button>
        <Button key='9'title="Geek Blue" style={{backgroundColor:"rgb(47,84,235)"}}>GBlue</Button>
        <Button key='10'title="Purple" style={{backgroundColor:"rgb(114,46,209)"}}>Purple</Button>
    </Menu>
    )
class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            disabled:false,
            firstName:'Phu Truong',
            lastName:'Nguyen',
           email:"nguyenphutruong2525@god.com",
          password:"1234567890123",
          phoneNumber:"0987987987",
          dateOfBirth:'2000/02/27',
           avatar:"https://image.flaticon.com/icons/svg/3084/3084416.svg",
           description:"hihihi"
        }
    }

    changeDisabled = () =>{
        this.setState({
            disabled: !this.state.disabled,
          });
        }
    editProfileStudent = values =>{
        if(values.firstName==null) values.firstName =  this.state.firstName;
        if(values.lastName==null) values.lastName =  this.state.lastName;
        if(values.email==null) values.email =  this.state.email;
        if(values.dateOfBirth==null) values.dateOfBirth =  this.state.dateOfBirth;
        if(values.phoneNumber==null) values.phoneNumber =  this.state.phoneNumber;

        console.log(values);
        studentServices.updateBasicStudent(
            values.firstName,
            values.lastName,
            values.dateOfBirth,
            this.state.description
        )
        studentServices
        .updateStudentPhone(
            values.phoneNumber,
        )
        studentServices
        .updateStudentEmail(
            values.email,
        )
        .then(() => {
            Modal.success({title: "\^o^/", content: "Success"});
        })
        .catch((error)=>{
            console.log(error);
            Modal.error({title: "╯︿╰", content: error});
        });
        
        
    }
    onFinishChangePass =values =>{
        console.log(values.newPass, values.oldPass);
            if (values.newPass!==values.confPass){
               alert('Password not match!');
            }else{
                accountServices.changePassword(values.oldPass, values.newPass).then()
                .then(()=>{
                    Modal.success({title: "\^o^/", content: "Change Password successfully!!!"});
                })
                .catch((error)=>{
                    Modal.error({title: "╯︿╰", content:error});
                })
            }
        }
    render()
    {
        return(
            <Menu  mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{padding: 24,
                margin: 0,
                minHeight: 600,
                marginTop: 24,
                }}
                title="Thay đổi" icon={<EditOutlined />}  key="sub1"
                >
                    <Tabs  tabPosition="left" style={{marginLeft:24}}>
                        <TabPane tab="Thông tin tài khoản" key="1" style={{marginTop:20}}>
                            <span style={{fontWeight: "bold"}}>THÔNG TIN TÀI KHOẢN</span>
                            <Row align="middle">
                            
                                <Col span="14">
                                    <Form  onFinish={this.editProfileStudent} style={{marginTop:32}} >
                                        
                                        <span>First Name</span>
                                        <Form.Item name="firstName" >
                                            <Input  defaultValue={this.state.firstName}   ></Input>
                                        </Form.Item>
                                        <span>Last Name</span>
                                        <Form.Item name="lastName" >
                                            <Input  defaultValue={this.state.lastName} ></Input>
                                        </Form.Item>

                                        <span>Email</span>
                                        <Form.Item  name="email" >
                                            <Input defaultValue={this.state.email}  ></Input>
                                        </Form.Item>

                                        <span>Date of birth</span>
                                        <Form.Item  name="dateOfBirth">
                                            <DatePicker  defaultValue={moment(this.state.dateOfBirth, dateFormat)} format={dateFormat}  />
                                        </Form.Item>
                                        
                                        <span>Phone Number</span>
                                        <Form.Item  name="phoneNumber"  >
                                            <Input  defaultValue={this.state.phoneNumber}  />
                                        </Form.Item>

                                        <Button type="primary" htmlType="submit">Save</Button>
                                        <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                                    </Form>
                                </Col>
                                <Col span="6" offset="11" style={{position:'absolute',top:150}}>
                                <Avatar style={{width: 180, height: 180, marginBottom:10}}src={this.state.avatar} ></Avatar>
                                    <Space style={{position:'relative', right:-20}}>
                                        <Upload >
                                    <Button >
                                        <UploadOutlined /> Change avatar
                                    </Button>
                                    </Upload>
                                    </Space>
                                    
                                </Col>
                            </Row>
                            
                        </TabPane>
                        <TabPane tab="Change Password" key="3" style={{ marginTop:20}}   >
                        <span style={{fontWeight: "bold"}}>CHANGE PASSWORD</span>
                            <Form  onFinish={this.onFinishChangePass} style={{marginTop:32, marginRight:150}} >
                                            <span> Old Password</span>
                                            <Form.Item  span="6" name="oldPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password    placeholder="Old Password"  ></Input.Password>
                                            </Form.Item>

                                            <span>New Password</span>
                                            <Form.Item span="6" name="newPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password   placeholder="New Password"  ></Input.Password>
                                            </Form.Item>

                                            <span> Confirm Password</span>
                                            <Form.Item span="6" name="confPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password   placeholder="Confirm Password" ></Input.Password>
                                            </Form.Item>

                                            <Button type="primary" htmlType="submit" >Save</Button>
                                            <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                            </Form>
                        
                            </TabPane>
                         <TabPane tab="Settings" key="2" style={{fontSize: 16, marginTop:32}}>
                             <Row>
                                <Col>Theme Color</Col>
                                <Col style={{position:'absolute', right:64}}> <Switch    checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={this.changeDisabled} /></Col>
                             </Row>
                            <Row>
                                <Dropdown disabled={this.state.disabled} overlay={color} placement="bottomCenter" >
                                  <Button class="changeColor" style={{marginTop:24}}>Color</Button>
                              </Dropdown>
                            </Row>
                         </TabPane>
                        
                     </Tabs>
             </Menu>
        
           
        );
    }
}
 
export {ProfileEdit};