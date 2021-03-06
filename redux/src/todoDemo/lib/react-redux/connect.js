import React from 'react'
import Context from './context';

const connect = (mapStateToProps=()=>{}, mapDispatchToProps, mergeProps, options) => (WrappedComp) => {
  return class extends React.Component {
      constructor (props) {
          super(props)
          this.state = {
              allProps: {},
              ownProps: props
          }
      }
      static contextType = Context;

      componentDidMount () {
          const store = this.context;
          store.subscribe(this.update)
          this.update()
      }
      update = ()  => {
          const store = this.context;
          const { dispatch } = store;
          let stateProps = {}
          if(mapStateToProps){
            stateProps = mapStateToProps(store.getState(), this.state.ownProps)
          }
          let dispatchProps = {}
          if(typeof mapDispatchToProps === 'object'){
            const keys = Object.keys(mapDispatchToProps)
            keys.forEach(key => {
                dispatchProps[key] = (...args) => {
                    dispatch(mapDispatchToProps[key](...args))
                }
            })
          } else if(typeof mapDispatchToProps === 'function') {
            dispatchProps = mapDispatchToProps(dispatch, this.state.ownProps);
          }
          else {
            console.error(`${mapDispatchToProps} is neither an"object" nor a "function"!`)
          }
          this.setState({
              allProps: {
                  ...this.state.ownProps,
                  ...stateProps,
                  ...dispatchProps
              }
          })
      }
      render() {
          const { allProps } = this.state;
          return (
            <WrappedComp {...allProps} />
          )
      }
  }
}

export default connect;