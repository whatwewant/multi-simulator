import React, { PureComponent } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class ModalForm extends PureComponent {

  static defaultProps = {
    onOk: () => null,
  };

  onOk = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  };

  render() {
    const { visible, title } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };

    return (
      <Modal
        visible={visible}
        title={title}
        footer={[
          <Button key="submit" type="primary" onClick={this.onOk}>Open</Button>,
        ]}
      >
        <Form>
          <FormItem label="Site">
            {getFieldDecorator('site', {
              rules: [{
                required: true, message: 'Please input your site!',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}