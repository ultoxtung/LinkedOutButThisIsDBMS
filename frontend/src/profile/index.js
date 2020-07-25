import React from 'react';

import { ProfileSider } from "@/profile/ProfileSider";
import { ProfileContent } from "@/profile/ProfileContent";

import { MyHeader } from "@/components"
import { Layout, Menu, Row, Col } from 'antd';
const { Content } = Layout;



function Profile() {
	return (
		<Layout>
			<MyHeader/>
			<Layout>
				<ProfileSider/>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Row align="middle">
						<Col span={4}></Col>
						<Col span={16}><ProfileContent/></Col>
						<Col span={4}></Col>
					</Row>
				</Layout>
			</Layout>
		</Layout>
	);
}

export { Profile }