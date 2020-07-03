import React from 'react';
import { deleteBlog } from 'service/blog';
import { Link } from 'react-router-dom';
import { Table, Button, notification } from 'antd';
import { connect } from 'react-redux';

class Blog extends React.Component {
  componentDidMount() {
    this.props.fetchList();
  }
  getColumns = () => {
    return [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'author',
        dataIndex: 'author'
      },
      {
        title: 'title',
        dataIndex: 'title'
      },
      {
        title: 'content',
        dataIndex: 'content'
      },
      {
        title: '操作',
        index: 'operate',
        render: ({ id }) => {
          return (
            <>
              <Link to={{ pathname: '/blog/edit', query: { id } }}>编辑</Link>
              <Button
                type='link'
                danger={true}
                onClick={() =>
                  deleteBlog({ id })
                    .then(() => notification.success({ message: '操作成功' }))
                    .then(this.props.fetchList)
                }
              >
                删除
              </Button>
            </>
          );
        }
      }
    ];
  };
  render() {
    const {
      elements: dataSource,
      page,
      pageSize,
      total,
      loading,
      pageChange,
      pageSizeChange
    } = this.props;
    return (
      <>
        <Table
          loading={loading}
          pagination={{
            onChange: pageChange,
            onShowSizeChange: (page, pageSize) => pageSizeChange(pageSize),
            pageSize,
            current: page,
            total
          }}
          dataSource={dataSource}
          columns={this.getColumns()}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  state = state.getIn(['blog', 'tableData']);
  return {
    page: state.getIn(['pagination', 'page']),
    pageSize: state.getIn(['pagination', 'pageSize']),
    total: state.getIn(['pagination', 'total']),
    loading: state.get('loading'),
    elements: state.get('list').toJS()
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch({ type: 'blog/get' }),
  pageChange: (page) =>
    dispatch({ type: 'blog/change-page', payload: { page } }),
  pageSizeChange: (pageSize) =>
    dispatch({ type: 'blog/change-page-size', payload: { pageSize } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
