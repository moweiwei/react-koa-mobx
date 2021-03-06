/*
 * Created: Tue Apr 21 2020
 * Author: Apple
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { Layout, Spin } from 'antd'

import styles from './index.scss'

@inject('rootStore')
@observer
class DetailLayout extends Component {
  static propTypes = {
    module: PropTypes.string,
    component: PropTypes.object,
  }

  static defaultProps = {
    module: '',
  }

  constructor(props) {
    super(props)

    this.state = { initializing: true }
    this.detailRef = React.createRef()
  }

  componentDidMount() {
    this.init(this.props.match.params)
  }

  async init() {
    this.setState({ initializing: false })
  }

  goBack = () => {
    const routing = this.props.rootStore.routing

    return routing.go(-1)
  }

  render() {
    const { component, rootStore, ...rest } = this.props
    const DetailComponent = component
    const commonProps = {
      rootStore,
      projectStore: rootStore.project,
      ...rest,
    }

    if (this.state.initializing) {
      return <Spin wrapperClassName="page-loading" />
    }

    return (
      <Layout className={styles.wrapper}>
        <DetailComponent {...commonProps} ref={this.detailRef} />
      </Layout>
    )
  }
}

export default DetailLayout
